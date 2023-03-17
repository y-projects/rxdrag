import typescript from "rollup-plugin-typescript2";
import external from "rollup-plugin-peer-deps-external";
import less from "rollup-plugin-less";

import pkg from "./package.json" assert { type: "json" };

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  external: [
    "antd",
    "@reduxjs/toolkit",
    "@ant-design/icons",
    "redux",
    "@rxdrag/react-core",
    "@rxdrag/shared",
    "lodash",
    "react",
    "@monaco-editor/react",
    "@rxdrag/core",
    "@rxdrag/react-shared",
    "react-dom/client",
    "styled-components",
  ],
  plugins: [
    less({ insert: true }),
    // Exclude peer dependencies from the bundle
    external(),
    // Compile TypeScript files
    typescript(),
  ],
};
