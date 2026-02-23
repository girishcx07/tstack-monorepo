import baseConfig from '@repo/eslint-config/base';
import reactConfig from '@repo/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['.output/**', 'dist/**', 'routeTree.gen.ts'],
  },
  ...baseConfig,
  ...reactConfig,
  {
    rules: {
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
    },
  },
  {
    ignores: ['eslint.config.js', 'prettier.config.js'],
  },
];
