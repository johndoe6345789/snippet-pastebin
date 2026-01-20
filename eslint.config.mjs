import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default [
  {
    ignores: ['node_modules', '.next', 'dist', 'coverage', 'src/styles/m3-scss/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  nextPlugin.configs['core-web-vitals'],
  {
    name: 'react-hooks/custom',
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    rules: {
      '@next/next/no-page-custom-font': 'off',
    },
  },
  {
    files: ['*.config.js', '*.config.cjs', '*.config.mjs', 'next.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
]
