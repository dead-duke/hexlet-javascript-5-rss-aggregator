import globals from 'globals'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      globals: { ...globals.browser },
    },
    rules: {
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': 'off',
      '@stylistic/brace-style': ['error', 'stroustrup'],
      '@stylistic/quote-props': ['error', 'consistent-as-needed'],
    },
  },
]