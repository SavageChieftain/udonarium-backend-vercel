import { handle } from 'hono/vercel';

import { createApp } from '../src/http/app';

export const config = {
  runtime: 'edge',
};

export const app = createApp();

export default handle(app);
