import { env } from "hono/adapter";
import { isAllowedOrigin } from "../utils/UrlUtils";
import type { MiddlewareHandler, Context, Next } from "hono";

export const corsHandler = (): MiddlewareHandler => {
  return async (context: Context, next: Next) => {
    const { ACCESS_CONTROL_ALLOW_ORIGIN } = env<{
      ACCESS_CONTROL_ALLOW_ORIGIN: string[] | string;
    }>(context);
    const requestOrigin = context.req.header("Origin") ?? "";

    if (!isAllowedOrigin(requestOrigin, ACCESS_CONTROL_ALLOW_ORIGIN)) {
      context.res = new Response("Forbidden", {
        status: 403,
        headers: new Headers({ "Access-Control-Allow-Origin": requestOrigin }),
      });
      return;
    }

    await next();
    context.res.headers.set("Access-Control-Allow-Origin", requestOrigin);
  };
};

export default corsHandler;
