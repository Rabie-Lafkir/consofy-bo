import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import boundaries from 'eslint-plugin-boundaries'
import fsd from '@feature-sliced/eslint-config'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  react.configs.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  fsd,


  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      import: importPlugin,
      boundaries: boundaries,
    },

    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },

    // ─── Rules ──────────────────────────────────────────
    rules: {
      /* import hygiene */
      'import/order': ['error', { 'newlines-between': 'always' }],
      'import/no-duplicates': 'error',

      /* FSD layer boundaries */
      'boundaries/element-types': ['error', {
        default: 'disallow',
        rules: [
          { from: ['app'], allow: ['widgets', 'features', 'entities', 'shared'] },
          { from: ['widgets'], allow: ['features', 'entities', 'shared'] },
          { from: ['features'], allow: ['entities', 'shared'] },
          { from: ['entities'], allow: ['shared'] },
          { from: ['shared'], allow: ['shared'] },
        ],
      }],
    },

    // ─── Settings ──────────────────────────────────────
    settings: {
      /* tell boundaries where each layer lives */
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'shared', pattern: 'src/shared/**' },
      ],
      /* allow import plugin to resolve TS paths */
      'import/resolver': { typescript: {} },
    },
  },
])
