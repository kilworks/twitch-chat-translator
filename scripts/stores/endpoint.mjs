/**
 * Where the store scripts send their credentials.
 *
 * CWS_TOKEN_URL, CWS_API and AMO_API exist for the selftests, which stand a server up on
 * 127.0.0.1. An inherited variable on the maintainer's machine must not be able to send a
 * service-account JWT or an AMO token anywhere else, so an override is taken only when it
 * points at the loopback, and is refused otherwise.
 */
export function endpoint(name, fallback) {
  const v = process.env[name];
  if (!v) return fallback;
  if (!/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?(\/|$)/.test(v)) {
    throw new Error(`${name} may only point at http://127.0.0.1 (a selftest); unset it to use ${fallback}`);
  }
  return v;
}
