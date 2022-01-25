module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
  },
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
  rules: {
    'no-console': 'warn',
    'no-sequences': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
          ],
          // Packages. `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(@|@app)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          // ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
    eqeqeq: 'error',
    'simple-import-sort/exports': 'error',
    'no-useless-return': 'error',
    'newline-per-chained-call': ['error', {ignoreChainWithDepth: 2}],
    'no-irregular-whitespace': [
      'error',
      {
        skipStrings: true,
        skipComments: true,
        skipTemplates: true,
      },
    ],
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        ignore: ['1n', 1, 0, -1],
        ignoreArrayIndexes: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    semi: ['error', 'never'],
  },
}
