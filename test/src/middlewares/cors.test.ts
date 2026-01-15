import { Hono } from 'hono';

import { corsHandler } from '../../../src/middlewares/cors';

// Mock hono/adapter env to provide ACCESS_CONTROL_ALLOW_ORIGIN
vi.mock('hono/adapter', () => ({
  env: (c: any) => ({ ACCESS_CONTROL_ALLOW_ORIGIN: 'https://example.com' }),
}));

describe('corsHandler middleware', () => {
  it('allows request from allowed origin', async () => {
    const app = new Hono();
    app.use('/', corsHandler());
    app.get('/', (c) => c.text('ok'));

    const res = await app.fetch(new Request('http://localhost/')); // no Origin header
    // when no Origin, middleware should return 400
    expect(res.status).toBe(400);

    // with allowed origin
    const res2 = await app.fetch(
      new Request('http://localhost/', {
        headers: { Origin: 'https://example.com' },
      }),
    );
    expect(res2.status).toBe(200);
  });

  it('rejects request from disallowed origin', async () => {
    const app = new Hono();
    app.use('/', corsHandler());
    app.get('/', (c) => c.text('ok'));

    const res = await app.fetch(
      new Request('http://localhost/', {
        headers: { Origin: 'https://evil.com' },
      }),
    );
    expect(res.status).toBe(403);
  });
});
