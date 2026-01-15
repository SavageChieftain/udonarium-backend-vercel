import * as SkywayAuth from '../../../../src/utils/SkywayAuth';

describe('SkywayAuth', () => {
  it('should be defined', () => {
    expect(SkywayAuth).toBeDefined();
  });

  it('generate returns JWT string (all params)', async () => {
    const token = await SkywayAuth.SkywayAuth.generate({
      appId: 'app',
      secret: 'secret',
      lobbySize: 2,
      channelName: 'room',
      peerId: 'peer',
      jti: 'jti',
      iat: 123,
    });
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3);
  });

  it('generate returns JWT string (default jti/iat)', async () => {
    const token = await SkywayAuth.SkywayAuth.generate({
      appId: 'app',
      secret: 'secret',
      lobbySize: 2,
      channelName: 'room',
      peerId: 'peer',
    });
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3);
  });

  it('generate throws if secret missing', async () => {
    await expect(
      // @ts-expect-error - secret intentionally missing to test runtime behavior
      SkywayAuth.SkywayAuth.generate({
        appId: 'app',
        lobbySize: 2,
        channelName: 'room',
        peerId: 'peer',
      }),
    ).rejects.toThrow();
  });
});
