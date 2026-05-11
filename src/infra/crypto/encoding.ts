const encoder = new TextEncoder();

export const encodeText = (text: string): Uint8Array => encoder.encode(text);

export const encodeData = (data: ArrayBuffer | string): Uint8Array =>
  typeof data === 'string' ? encodeText(data) : new Uint8Array(data);
