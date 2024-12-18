import { Hono } from "hono";
import { handle } from "hono/vercel";
import v1 from "../src/routes/v1";
import { corsHandler } from "../src/middlewares/cors";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/");

app.use("/v1/*", corsHandler());

app.get("/", (c) => {
  return c.json({ message: "Hello udonarium-backend-vercel!" });
});

app.route("/v1", v1);

export default handle(app);
