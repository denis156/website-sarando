// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      // Vue
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      'vue/no-empty-component-block': 'warn',
      'vue/no-unused-refs': 'warn',
      'vue/prefer-true-attribute-shorthand': 'warn',
      'vue/require-default-prop': 'off',

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'off',

      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-unused-vars': 'off',
    },
  },
)
