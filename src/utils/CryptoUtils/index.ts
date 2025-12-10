const encoder = new TextEncoder();

const encodeText = (text: string): Uint8Array => {
  try {
    return encoder.encode(text);
  } catch (error) {
    console.error("エンコード中にエラーが発生しました:", error);
    throw error;
  }
};

const encodeData = (data: ArrayBuffer | string): Uint8Array<ArrayBuffer> => {
  if (typeof data === "string") {
    return encodeText(data) as Uint8Array<ArrayBuffer>;
  }
  return new Uint8Array(data) as Uint8Array<ArrayBuffer>;
};

export const hmacSHA256 = async (
  message: ArrayBuffer | string,
  secret: ArrayBuffer | string
): Promise<ArrayBuffer> => {
  const messageData = encodeData(message);
  const keyData = encodeData(secret);
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    {
      name: "HMAC",
      hash: { name: "SHA-256" },
    },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, messageData);
  return signature;
};

export const uuid = (): string => {
  return crypto.randomUUID();
};

export const CryptoUtils = {
  hmacSHA256,
  uuid,
};

export default CryptoUtils;
