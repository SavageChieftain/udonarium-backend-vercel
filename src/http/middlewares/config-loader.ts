import { env } from 'hono/adapter';
import type { MiddlewareHandler } from 'hono';

import { parseConfig } from '../../config';
import type { AppEnv } from '../context';

export const configLoader = (): MiddlewareHandler<AppEnv> => async (c, next) => {
  c.set('config', parseConfig(env(c)));
  await next();
};
