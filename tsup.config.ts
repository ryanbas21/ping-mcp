import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/main.ts"],
  tsconfig: './tsconfig.src.json',
  clean: true,
  treeshake: "smallest",
})
