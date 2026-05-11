import { cors } from 'hono/cors';
import type { MiddlewareHandler } from 'hono';

import { isAllowedOrigin } from '../../infra/url/origin';
import { AppError } from '../errors/app-error';
import type { AppEnv } from '../context';

export const createCorsMiddleware = (): MiddlewareHandler<AppEnv> => async (c, next) => {
  const { allowedOrigins } = c.var.config.cors;
  const requestOrigin = c.req.header('Origin');
  if (!requestOrigin) {
    throw new AppError('ORIGIN_REQUIRED', 400, 'Origin header is required.');
  }
  if (!isAllowedOrigin(requestOrigin, allowedOrigins)) {
    throw new AppError('ORIGIN_FORBIDDEN', 403, 'Origin is not allowed.');
  }
  return cors({
    origin: [requestOrigin],
    allowHeaders: ['Content-Type', 'Accept'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    maxAge: 86_400,
  })(c, next);
};
