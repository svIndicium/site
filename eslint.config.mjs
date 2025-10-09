// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      // Disable stylistic rules that conflict with Prettier
      '@stylistic/semi': 'off',
      '@stylistic/brace-style': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/indent': 'off',
      '@stylistic/indent-binary-ops': 'off',
      '@stylistic/arrow-parens': 'off',
    },
  },
);
