import { Hono } from "hono";
import { env } from "hono/adapter";
import { SkywayAuth } from "../../utils/SkywayAuth";

export const config = {
  runtime: "edge",
};

const app = new Hono();

interface TokenRequestParam {
  formatVersion: number;
  channelName: string;
  peerId: string;
}

app.get("/status", (c) => {
  return c.text("OK");
});

app.post("/skyway2023/token", async (c) => {
  const { SKYWAY_APP_ID, SKYWAY_SECRET, SKYWAY_UDONARIUM_LOBBY_SIZE } = env<{
    ENVIRONMENT: string;
    SKYWAY_APP_ID: string;
    SKYWAY_SECRET: string;
    SKYWAY_UDONARIUM_LOBBY_SIZE: number;
  }>(c);

  if (!SKYWAY_APP_ID || !SKYWAY_SECRET) {
    return c.text("Bad Request", 400);
  }

  let param: TokenRequestParam = {
    formatVersion: 1,
    channelName: "",
    peerId: "",
  };

  console.log(await c.req.json());

  try {
    param = await c.req.json<TokenRequestParam>();
  } catch (e) {
    console.log(e);
    return c.text("Bad Request", 400);
  }

  const token = await SkywayAuth.generate({
    appId: SKYWAY_APP_ID,
    secret: SKYWAY_SECRET,
    lobbySize: SKYWAY_UDONARIUM_LOBBY_SIZE ?? 3,
    channelName: param.channelName,
    peerId: param.peerId,
  });

  return c.json({ token: token });
});

export default app;
