/**
 * Check a CRX3 file against the extension id it was asked for.
 *
 * The weekly drift job downloads 7TV, BTTV and FFZ from Google's update service and loads them
 * in a browser that visits live channels. The download used to be unpacked on trust. A CRX3
 * carries its publisher's public key and a signature over the archive, and the extension id IS
 * the first 16 bytes of the key's SHA-256, so the three facts can be checked offline with no
 * pin that would break on every release of those extensions: the key hashes to the id that was
 * asked for, and it signed exactly these bytes.
 */
import crypto from 'node:crypto';

/** Protobuf wire format, only what a CRX3 header uses: varints and length-delimited fields. */
function fields(buf) {
  const out = [];
  let i = 0;
  const varint = () => {
    let v = 0;
    let shift = 0;
    for (;;) {
      const b = buf[i++];
      if (b === undefined) throw new Error('truncated header');
      v += (b & 0x7f) * 2 ** shift;
      if (!(b & 0x80)) return v;
      shift += 7;
    }
  };
  while (i < buf.length) {
    const tag = varint();
    const field = Math.floor(tag / 8);
    const wire = tag & 7;
    if (wire === 0) out.push({ field, value: varint() });
    else if (wire === 2) {
      const len = varint();
      if (i + len > buf.length) throw new Error('truncated header');
      out.push({ field, value: buf.subarray(i, i + len) });
      i += len;
    } else throw new Error(`unsupported wire type ${wire}`);
  }
  return out;
}

/** 'ammjkodg...' (a to p, one nibble each) as the 16 bytes it spells. */
export function idBytes(id) {
  if (!/^[a-p]{32}$/.test(id)) throw new Error(`not an extension id: ${id}`);
  return Buffer.from(id.replace(/./g, (c) => (c.charCodeAt(0) - 97).toString(16)), 'hex');
}

const u32le = (n) => {
  const b = Buffer.alloc(4);
  b.writeUInt32LE(n);
  return b;
};

/** Returns the archive (the zip) when `crx` is a CRX3 signed by the key behind `id`, else throws. */
export function verifyCrx3(crx, id) {
  if (crx.toString('ascii', 0, 4) !== 'Cr24') throw new Error('not a CRX');
  if (crx.readUInt32LE(4) !== 3) throw new Error(`CRX version ${crx.readUInt32LE(4)}, only 3 is checked`);
  const headerLen = crx.readUInt32LE(8);
  const header = crx.subarray(12, 12 + headerLen);
  const archive = crx.subarray(12 + headerLen);
  const parts = fields(header);
  const signedData = parts.find((p) => p.field === 10000)?.value;
  if (!Buffer.isBuffer(signedData)) throw new Error('no signed header data');
  const crxId = fields(signedData).find((p) => p.field === 1)?.value;
  if (!Buffer.isBuffer(crxId) || !crxId.equals(idBytes(id))) throw new Error('the CRX is for another extension id');
  const payload = Buffer.concat([
    Buffer.from('CRX3 SignedData\0', 'latin1'),
    u32le(signedData.length),
    signedData,
    archive,
  ]);
  // Both key types a CRX3 may carry: RSA (field 2) and ECDSA (field 3).
  for (const field of [2, 3]) {
    for (const proof of parts.filter((p) => p.field === field)) {
      const kv = fields(proof.value);
      const key = kv.find((p) => p.field === 1)?.value;
      const sig = kv.find((p) => p.field === 2)?.value;
      if (!Buffer.isBuffer(key) || !Buffer.isBuffer(sig)) continue;
      if (!crypto.createHash('sha256').update(key).digest().subarray(0, 16).equals(crxId)) continue;
      const ok = crypto.createVerify('sha256').update(payload).verify(
        { key: crypto.createPublicKey({ key, format: 'der', type: 'spki' }) },
        sig,
      );
      if (ok) return archive;
    }
  }
  throw new Error('no valid signature from the key behind this id');
}
