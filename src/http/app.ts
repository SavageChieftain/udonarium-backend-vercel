import { Hono } from 'hono';

import { onError } from './errors/handler';
import { configLoader } from './middlewares/config-loader';
import { createCorsMiddleware } from './middlewares/cors';
import { rootRoute } from './routes/root';
import { v1Routes } from './routes/v1';
import type { AppEnv } from './context';

export const createApp = (): Hono<AppEnv> => {
  const app = new Hono<AppEnv>();
  app.onError(onError);
  app.route('/', rootRoute);
  app.use('/v1/*', configLoader(), createCorsMiddleware());
  app.route('/v1', v1Routes);
  return app;
};
