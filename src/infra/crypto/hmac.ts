import { encodeData } from './encoding';

export const hmacSHA256 = async (
  message: ArrayBuffer | string,
  secret: ArrayBuffer | string,
): Promise<ArrayBuffer> => {
  const key = await crypto.subtle.importKey(
    'raw',
    encodeData(secret),
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign'],
  );
  return crypto.subtle.sign('HMAC', key, encodeData(message));
};
