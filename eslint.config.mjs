import js from '@eslint/js'
import prettier from 'eslint-config-prettier/flat'
import importPlugin from 'eslint-plugin-import'
import jestPlugin from 'eslint-plugin-jest'
import nodePlugin from 'eslint-plugin-n'
import promisePlugin from 'eslint-plugin-promise'
import reactPlugin from 'eslint-plugin-react'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      '**/build/**',
      '**/coverage/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/.snapshots/**',
      '**/playwright-report/**',
      '**/test-results/**',
      '**/*.min.js'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended,
    files: ['**/*.{js,jsx,ts,tsx}']
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      import: importPlugin,
      jest: jestPlugin,
      n: nodePlugin,
      promise: promisePlugin
    },
    settings: {
      react: {
        version: '18.3'
      }
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'import/first': 'error',
      'import/no-absolute-path': 'error',
      'import/no-duplicates': 'error',
      'import/no-named-default': 'error',
      'import/no-webpack-loader-syntax': 'error',
      'n/no-callback-literal': 'error',
      'n/no-deprecated-api': 'error',
      'n/process-exit-as-throw': 'error',
      'no-constant-condition': ['error', { checkLoops: false }],
      'no-undef': 'error',
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true
        }
      ],
      'no-unused-vars': [
        'error',
        {
          args: 'none',
          ignoreRestSiblings: true,
          vars: 'all'
        }
      ],
      'no-use-before-define': 'off',
      'promise/param-names': 'error',
      'react/jsx-fragments': 'off',
      'react/jsx-handler-names': 'off',
      'react/jsx-no-bind': [
        'error',
        {
          allowArrowFunctions: true,
          allowBind: false,
          ignoreRefs: true
        }
      ],
      'react/no-did-update-set-state': 'error',
      'react/no-deprecated': 'off',
      'react/no-unknown-property': 'error',
      'react/no-unused-prop-types': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'error'
    }
  },
  {
    files: [
      'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
      'example/src/**/*.{test,spec}.{js,jsx,ts,tsx}'
    ],
    ...jestPlugin.configs['flat/recommended']
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'none',
          ignoreRestSiblings: true,
          vars: 'all'
        }
      ],
      'no-undef': 'off',
      'no-unused-vars': 'off'
    }
  },
  prettier
)
