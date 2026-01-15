import { encode } from '../../../../src/utils/Base64Url/encode';
import { decode } from '../../../../src/utils/Base64Url/decode';

const encoder = new TextEncoder();

describe('Base64Url encode/decode', () => {
  it('roundtrips a UTF-8 string', () => {
    const orig = 'hello world';
    const b64Url = encode(orig);
    const decoded = new Uint8Array(decode(b64Url));
    const expected = encoder.encode(orig);
    expect(Array.from(decoded)).toEqual(Array.from(expected));
  });

  it('roundtrips binary data', () => {
    const data = new Uint8Array([0, 255, 1, 2, 3]);
    const b64Url = encode(data.buffer);
    const decoded = new Uint8Array(decode(b64Url));
    expect(Array.from(decoded)).toEqual(Array.from(data));
  });
});
