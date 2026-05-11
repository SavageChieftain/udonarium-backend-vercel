import { Hono } from 'hono';
import { vValidator } from '@hono/valibot-validator';
import type { Context } from 'hono';

import { issueSkywayToken } from '../../../domain/skyway/token';
import { encode as base64UrlEncode } from '../../../infra/encoding/base64url';
import { hmacSHA256 } from '../../../infra/crypto/hmac';
import { uuid } from '../../../infra/crypto/uuid';
import { AppError } from '../../errors/app-error';
import type { AppEnv } from '../../context';
import { skywayTokenRequestSchema } from './schemas';

const handle = async (
  c: Context<AppEnv, string, { in: { json: { channelName: string; peerId: string } } }>,
) => {
  const body = c.req.valid('json');
  const token = await issueSkywayToken(
    { channelName: body.channelName, peerId: body.peerId },
    {
      config: c.var.config.skyway,
      uuid,
      now: () => Math.floor(Date.now() / 1000),
      hmacSHA256,
      encode: base64UrlEncode,
    },
  );
  return c.json({ token }, 200);
};

const validator = vValidator('json', skywayTokenRequestSchema, (result) => {
  if (!result.success) {
    throw new AppError('VALIDATION_FAILED', 400, 'Invalid request body.');
  }
});

export const skywayTokenRoute = new Hono<AppEnv>()
  .post('/skyway/tokens', validator, handle)
  .post('/skyway2023/token', validator, async (c) => {
    c.header('Deprecation', 'true');
    c.header('Link', '</v1/skyway/tokens>; rel="successor-version"');
    return handle(c);
  });
