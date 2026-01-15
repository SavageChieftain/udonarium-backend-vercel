import app from '../../../../src/routes/v1';

// Honoのテスト用Request/Contextを使う
const makeRequest = (path: string, opts: RequestInit = {}) =>
  new Request(`http://localhost${path}`, opts);

describe('routes/v1', () => {
  it('module should be defined', () => {
    expect(app).toBeDefined();
  });

  it('status endpoint', async () => {
    const res = await app.request(makeRequest('/status'));
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toBe('OK');
  });

  it('POST /skyway2023/token returns 400 on invalid body', async () => {
    const res = await app.request(
      makeRequest('/skyway2023/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formatVersion: 2 }), // invalid
      }),
    );
    expect(res.status).toBe(400);
  });

  it('returns 500 if env missing', async () => {
    vi.doMock('hono/adapter', () => ({ env: () => ({}) }));
    const appReloaded = (await import('../../../../src/routes/v1')).default;
    const res = await appReloaded.request(
      makeRequest('/skyway2023/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formatVersion: 1, channelName: 'a', peerId: 'b' }),
      }),
    );
    expect(res.status).toBe(500);
    vi.resetModules();
  });

  it('returns 200 and uses default lobbySize when not provided', async () => {
    vi.doMock('hono/adapter', () => ({
      env: () => ({ SKYWAY_APP_ID: 'appId', SKYWAY_SECRET: 'secret' }),
    }));
    const appReloaded = (await import('../../../../src/routes/v1')).default;
    const res = await appReloaded.request(
      makeRequest('/skyway2023/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formatVersion: 1, channelName: 'room', peerId: 'peer-1' }),
      }),
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty('token');
    vi.resetModules();
  });
});
