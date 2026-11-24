import crypto from 'node:crypto';
import { describe, expect, it } from 'vitest';
// @ts-expect-error a plain .mjs script, written for node and without type declarations
import { idBytes, verifyCrx3 } from '../scripts/crx.mjs';

/**
 * S-12: the drift job unpacked three extensions from Google's update service on trust. The check
 * is offline and pins nothing: the key must hash to the id asked for, and have signed the bytes.
 */
const varint = (n: number): Buffer => {
  const out: number[] = [];
  do {
    out.push((n & 0x7f) | (n > 0x7f ? 0x80 : 0));
    n = Math.floor(n / 128);
  } while (n > 0);
  return Buffer.from(out);
};
const field = (no: number, body: Buffer): Buffer => Buffer.concat([varint(no * 8 + 2), varint(body.length), body]);

function makeCrx(archive: Buffer, opts: { signWith?: crypto.KeyObject; idKey?: Buffer } = {}) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
  const der = publicKey.export({ type: 'spki', format: 'der' });
  const crxId = crypto.createHash('sha256').update(opts.idKey ?? der).digest().subarray(0, 16);
  const signedData = field(1, crxId);
  const len = Buffer.alloc(4);
  len.writeUInt32LE(signedData.length);
  const payload = Buffer.concat([Buffer.from('CRX3 SignedData\0', 'latin1'), len, signedData, archive]);
  const sig = crypto.createSign('sha256').update(payload).sign(opts.signWith ?? privateKey);
  const header = Buffer.concat([field(2, Buffer.concat([field(1, der), field(2, sig)])), field(10000, signedData)]);
  const head = Buffer.alloc(12);
  head.write('Cr24', 0, 'ascii');
  head.writeUInt32LE(3, 4);
  head.writeUInt32LE(header.length, 8);
  const id = [...crxId.toString('hex')].map((c) => String.fromCharCode(97 + parseInt(c, 16))).join('');
  return { crx: Buffer.concat([head, header, archive]), id };
}

describe('verifyCrx3', () => {
  const zip = crypto.randomBytes(500);

  it('reads an extension id as the 16 bytes it spells', () => {
    expect(idBytes('abcdefghijklmnopabcdefghijklmnop').toString('hex')).toBe('0123456789abcdef0123456789abcdef');
  });

  it('hands back the archive of a CRX signed by the key behind its id', () => {
    const { crx, id } = makeCrx(zip);
    expect(verifyCrx3(crx, id).equals(zip)).toBe(true);
  });

  it('refuses a CRX asked for under another id', () => {
    const { crx } = makeCrx(zip);
    expect(() => verifyCrx3(crx, 'a'.repeat(32))).toThrow(/another extension id/);
  });

  it('refuses an archive that was changed after signing', () => {
    const { crx, id } = makeCrx(zip);
    crx[crx.length - 1] = (crx[crx.length - 1] ?? 0) ^ 1;
    expect(() => verifyCrx3(crx, id)).toThrow(/no valid signature/);
  });

  it('refuses a signature made by a key that is not the id\'s', () => {
    const other = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 }).privateKey;
    const { crx, id } = makeCrx(zip, { signWith: other });
    expect(() => verifyCrx3(crx, id)).toThrow(/no valid signature/);
  });

  it('refuses something that is not a CRX', () => {
    expect(() => verifyCrx3(Buffer.from('PK\u0003\u0004 not a crx at all'), 'a'.repeat(32))).toThrow(/not a CRX/);
  });
});
