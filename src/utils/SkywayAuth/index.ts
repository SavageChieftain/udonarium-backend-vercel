import type { AppScope, ChannelScope } from '@skyway-sdk/token';
import { uuid, hmacSHA256 } from '../CryptoUtils';
import { encode as Base64UrlEncode } from '../Base64Url';

interface SkywayAuthParams {
  appId: string;
  secret: string;
  lobbySize: number;
  channelName: string;
  peerId: string;
  jti?: string;
  iat?: number;
}

const generate = async (params: SkywayAuthParams): Promise<string> => {
  const {
    appId,
    secret,
    lobbySize,
    channelName,
    peerId,
    jti = uuid(),
    iat = Math.floor(Date.now() / 1000),
  } = params;

  const lobbyChannels: ChannelScope[] = [
    {
      name: `udonarium-lobby-*-of-${lobbySize}`,
      actions: ['read', 'create'],
      members: [
        {
          name: peerId,
          actions: ['write'],
          publication: {
            actions: [],
          },
          subscription: {
            actions: [],
          },
        },
      ],
    },
  ];

  const roomChannels: ChannelScope[] = [
    {
      name: channelName,
      actions: ['read', 'create'],
      members: [
        {
          name: peerId,
          actions: ['write'],
          publication: {
            actions: ['write'],
          },
          subscription: {
            actions: ['write'],
          },
        },
        {
          name: '*',
          actions: ['signal'],
          publication: {
            actions: [],
          },
          subscription: {
            actions: [],
          },
        },
      ],
    },
  ];

  const header = { alg: 'HS256', typ: 'JWT' };

  const scope: { app: AppScope } = {
    app: {
      id: appId,
      turn: true,
      actions: ['read'],
      channels: lobbyChannels.concat(roomChannels),
    },
  };

  const payload = {
    jti: jti,
    iat: iat,
    exp: iat + 60 * 60 * 24,
    version: 2,
    scope: scope,
  };

  const jwtHeader = Base64UrlEncode(JSON.stringify(header));
  const jwtPayload = Base64UrlEncode(JSON.stringify(payload));
  const jwtSignature = Base64UrlEncode(await hmacSHA256(jwtHeader + '.' + jwtPayload, secret));
  const token = `${jwtHeader}.${jwtPayload}.${jwtSignature}`;

  return token;
};

export const SkywayAuth = {
  generate,
};

export default SkywayAuth;
