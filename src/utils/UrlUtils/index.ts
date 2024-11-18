import { env } from "hono/adapter";
import type { Context } from "hono";

export const getAccessControlAllowOrigin = (context: Context): string[] => {
  const { ACCESS_CONTROL_ALLOW_ORIGIN } = env<{
    ACCESS_CONTROL_ALLOW_ORIGIN: string;
  }>(context);
  return ACCESS_CONTROL_ALLOW_ORIGIN.split(",");
};

const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const convertToUrlObjects = (origins: string[]): URL[] => {
  return origins.map((origin) => new URL(origin));
};

export const isAllowedOrigin = (
  requestOrigin: string = "",
  allowedOrigins: string[]
): boolean => {
  if (allowedOrigins.includes("*")) return true;
  if (!validateUrl(requestOrigin)) return false;

  const requestURL = new URL(requestOrigin);
  const allowedURLs = convertToUrlObjects(allowedOrigins);
  return allowedURLs.some((allowedURL) => {
    return (
      requestURL.hostname === allowedURL.hostname &&
      requestURL.protocol === allowedURL.protocol &&
      requestURL.port === allowedURL.port
    );
  });
};

export const UrlUtils = {
  getAccessControlAllowOrigin,
  isAllowedOrigin,
};

export default UrlUtils;
