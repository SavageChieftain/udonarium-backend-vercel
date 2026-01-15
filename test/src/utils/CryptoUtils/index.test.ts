import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as CryptoUtils from '../../../../src/utils/CryptoUtils';
import { encodeText, encodeData } from '../../../../src/utils/CryptoUtils';

describe('CryptoUtils', () => {
  let origError: typeof console.error;
  let called = false;
  let encodeSpy: ReturnType<typeof vi.spyOn> | undefined;

  interface EncoderLike {
    encode(input?: string): Uint8Array;
  }

  beforeEach(() => {
    origError = console.error;
    called = false;
    console.error = () => {
      called = true;
    };
  });

  afterEach(() => {
    console.error = origError;
    if (encodeSpy) {
      encodeSpy.mockRestore();
      encodeSpy = undefined;
    }
  });

  it('should be defined', () => {
    expect(CryptoUtils).toBeDefined();
  });

  it('uuid returns a string', () => {
    expect(typeof CryptoUtils.uuid()).toBe('string');
  });

  it('hmacSHA256 returns ArrayBuffer', async () => {
    const ab = await CryptoUtils.hmacSHA256('msg', 'secret');
    expect(ab).toBeInstanceOf(ArrayBuffer);
    expect(ab.byteLength).toBeGreaterThan(0);
  });

  it('encodeData handles string', () => {
    const result = encodeData('abc');
    expect(result).toBeInstanceOf(Uint8Array);
  });

  it('encodeData handles ArrayBuffer', () => {
    const ab = new ArrayBuffer(3);
    const result = encodeData(ab);
    expect(result).toBeInstanceOf(Uint8Array);
  });

  it('encodeText throws and logs on error', () => {
    encodeSpy = vi
      .spyOn(TextEncoder.prototype as unknown as EncoderLike, 'encode')
      .mockImplementation(function (this: TextEncoder) {
        throw new Error('fail');
      });
    expect(() => encodeText('x')).toThrow();
    expect(called).toBe(true);
  });
});
