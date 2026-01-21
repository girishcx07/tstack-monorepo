//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config";
import { restrictEnvAccess } from "@repo/eslint-config/base";
import reactConfig from "@repo/eslint-config/react";

export default [
  ...tanstackConfig,
  ...restrictEnvAccess,
  ...reactConfig,
  {
    files: ["vite.config.ts"],
    rules: {
      "no-restricted-properties": "off",
    },
  },
];
