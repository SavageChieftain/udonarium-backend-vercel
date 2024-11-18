import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import type { MiddlewareHandler, Context, Next } from "hono";

import {
  isAllowedOrigin,
  getAccessControlAllowOrigin,
} from "../utils/UrlUtils";

export const corsHandler = (): MiddlewareHandler => {
  return async (context: Context, next: Next) => {
    const REQUEST_ORIGIN = context.req.header("Origin");

    const ACCESS_CONTROL_ALLOW_ORIGIN = getAccessControlAllowOrigin(context);

    if (REQUEST_ORIGIN == undefined || REQUEST_ORIGIN === "") {
      throw new HTTPException(400, { message: "Origin is required." });
    }

    if (!isAllowedOrigin(REQUEST_ORIGIN, ACCESS_CONTROL_ALLOW_ORIGIN)) {
      throw new HTTPException(403, { message: "Forbidden." });
    }

    const corsMiddlewareHandler = cors({
      origin: [REQUEST_ORIGIN],
      allowHeaders: ["Content-Type", "Accept"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      maxAge: 86400,
    });
    return corsMiddlewareHandler(context, next);
  };
};

export default corsHandler;
