import { env } from 'hono/adapter';
import type { MiddlewareHandler } from 'hono';

import { parseConfig } from '../../config/index.js';
import type { AppEnv } from '../context.js';

export const configLoader = (): MiddlewareHandler<AppEnv> => async (c, next) => {
  c.set('config', parseConfig(env(c)));
  await next();
};
