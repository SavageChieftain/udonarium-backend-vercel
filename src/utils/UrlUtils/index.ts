const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isAllowedOrigin = (
  requestOrigin: string = "",
  allowedOrigins: string[] | string = ""
): boolean => {
  if (allowedOrigins === "*") return true;
  if (!validateUrl(requestOrigin)) return false;

  const origins = Array.isArray(allowedOrigins)
    ? allowedOrigins
    : [allowedOrigins];
  const requestURL = new URL(requestOrigin);
  return origins.some((origin) => {
    const allowedURL = new URL(origin);
    return (
      requestURL.hostname === allowedURL.hostname &&
      requestURL.protocol === allowedURL.protocol
    );
  });
};

export const UrlUtils = {
  isAllowedOrigin,
};

export default UrlUtils;
