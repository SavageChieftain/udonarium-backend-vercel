import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { HTTPException } from 'hono/http-exception';
import { vValidator } from '@hono/valibot-validator';
import { object, pipe, number, value, string } from 'valibot';

import { SkywayAuth } from '../../utils/SkywayAuth';

const schema = object({
  formatVersion: pipe(number(), value(1)),
  channelName: string(),
  peerId: string(),
});

export const config = {
  runtime: 'edge',
};

const app = new Hono();

app.get('/status', (c) => {
  return c.text('OK');
});

app.post(
  '/skyway2023/token',
  vValidator('json', schema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, { message: 'Bad Request.' });
    }
  }),
  async (c) => {
    const { SKYWAY_APP_ID, SKYWAY_SECRET, SKYWAY_UDONARIUM_LOBBY_SIZE } = env<{
      ENVIRONMENT: string;
      SKYWAY_APP_ID: string;
      SKYWAY_SECRET: string;
      SKYWAY_UDONARIUM_LOBBY_SIZE: number;
    }>(c);

    if (!SKYWAY_APP_ID || !SKYWAY_SECRET) {
      throw new HTTPException(500, { message: 'Internal Server Error.' });
    }

    const data = c.req.valid('json');

    const token = await SkywayAuth.generate({
      appId: `${SKYWAY_APP_ID}`,
      secret: `${SKYWAY_SECRET}`,
      lobbySize: SKYWAY_UDONARIUM_LOBBY_SIZE ?? 3,
      channelName: `${data.channelName}`,
      peerId: `${data.peerId}`,
    });

    return c.json({ token }, 200);
  },
);

export default app;
