// Mock hono/adapter env for routes that use env()
vi.mock('hono/adapter', () => ({
  env: (c: any) => ({
    ENVIRONMENT: 'test',
    SKYWAY_APP_ID: 'appId',
    SKYWAY_SECRET: 'secret',
    SKYWAY_UDONARIUM_LOBBY_SIZE: '3',
    ACCESS_CONTROL_ALLOW_ORIGIN: 'https://example.com',
  }),
}));

import { app } from '../../api/index';

describe('api entry', () => {
  it('responds to /', async () => {
    const res = await app.fetch(new Request('http://localhost/'));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('message');
  });

  it('v1 status endpoint', async () => {
    const res = await app.fetch(
      new Request('http://localhost/v1/status', {
        headers: { Origin: 'https://example.com' },
      }),
    );
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toBe('OK');
  });

  it('v1 token endpoint returns token with valid body', async () => {
    const body = JSON.stringify({
      formatVersion: 1,
      channelName: 'room',
      peerId: 'peer-1',
    });
    const res = await app.fetch(
      new Request('http://localhost/v1/skyway2023/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://example.com',
        },
        body,
      }),
    );
    // Since SkywayAuth.generate uses crypto and creates a token, expect 200
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty('token');
  });
});
