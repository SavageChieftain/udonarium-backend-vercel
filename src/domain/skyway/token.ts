import { buildJwtHeader, buildJwtPayload, signJwt } from './jwt';
import { buildLobbyChannelScope, buildRoomChannelScope } from './scopes';
import type { IssueTokenDeps, IssueTokenInput } from './types';

export const issueSkywayToken = async (
  input: IssueTokenInput,
  deps: IssueTokenDeps,
): Promise<string> => {
  const jti = input.jti ?? deps.uuid();
  const iat = input.iat ?? deps.now();
  const scopes = [
    buildLobbyChannelScope(input.peerId, deps.config.lobbySize),
    buildRoomChannelScope(input.channelName, input.peerId),
  ];
  const header = buildJwtHeader();
  const payload = buildJwtPayload({
    appId: deps.config.appId,
    scopes,
    jti,
    iat,
    ttlSeconds: deps.config.tokenTtlSeconds,
  });
  return signJwt(header, payload, deps.config.secret, {
    hmacSHA256: deps.hmacSHA256,
    encode: deps.encode,
  });
};
