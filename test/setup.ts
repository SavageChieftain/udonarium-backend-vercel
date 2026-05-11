import { webcrypto } from 'node:crypto';
import { TextEncoder as NodeTextEncoder } from 'node:util';

interface PolyfillTarget {
  crypto?: unknown;
  TextEncoder?: unknown;
  btoa?: (s: string) => string;
  atob?: (s: string) => string;
}

const g = globalThis as unknown as PolyfillTarget;

if (!g.crypto) g.crypto = webcrypto;
if (!g.TextEncoder) g.TextEncoder = NodeTextEncoder;
if (!g.btoa) g.btoa = (s: string) => Buffer.from(s, 'binary').toString('base64');
if (!g.atob) g.atob = (s: string) => Buffer.from(s, 'base64').toString('binary');
