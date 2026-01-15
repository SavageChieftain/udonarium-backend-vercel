import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./test/setup.ts"],
    include: ["test/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,js}", "api/**/*.{ts,js}"],
    },
  },
});
