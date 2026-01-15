const encoder = new TextEncoder();

export const encode = (arg: string | ArrayBuffer): string => {
  const buffer: Uint8Array = typeof arg === 'string' ? encoder.encode(arg) : new Uint8Array(arg);
  const base64String = btoa(String.fromCharCode(...buffer));
  return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export default encode;
