// Setup for Vitest: ensure Web Crypto, TextEncoder, and btoa/atob are available in test environment
if (!(globalThis as any).crypto) {
  // Node >= 18 exposes webcrypto under crypto.webcrypto
  try {
    (globalThis as any).crypto = require("node:crypto").webcrypto;
  } catch (e) {
    // ignore
  }
}

if (!(globalThis as any).TextEncoder) {
  try {
    (globalThis as any).TextEncoder = require("util").TextEncoder;
  } catch (e) {
    // ignore
  }
}

// Polyfill btoa/atob using Buffer for Node test env
if (!(globalThis as any).btoa) {
  (globalThis as any).btoa = (str: string) =>
    Buffer.from(str, "binary").toString("base64");
}
if (!(globalThis as any).atob) {
  (globalThis as any).atob = (b64: string) =>
    Buffer.from(b64, "base64").toString("binary");
}
