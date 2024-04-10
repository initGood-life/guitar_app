module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends:  [
    "airbnb-typescript/base",
    'plugin:@typescript-eslint/recommended',
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],

  overrides: [
    {
      env: {
        node: true,
      },
      files: ['*.tsx', '*.ts', '*.jsx', '*.js'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project:"./tsconfig.json",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      legacyDecorators: true,
      globalReturn: true,
      impliedStrict: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'simple-import-sort',
  ],
  settings: {
    "import/resolver": {
      typescript: {}
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/semi': ['error'],
    "@typescript-eslint/no-misused-promises": "off",
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    "@typescript-eslint/naming-convention": "off",
    '@typescript-eslint/type-annotation-spacing': ['error',
      {
        before: false,
        after: true,
      },
    ],
    "@typescript-eslint/no-throw-literal": "off",
    "eqeqeq": "error",
    'no-unused-vars': 'off',
    'import/order': 'error',
    "import/no-unused-modules": [1, {"unusedExports": true}],
    'simple-import-sort/imports': 'error',
    "no-extra-semi": "error",
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions':'off',
    'no-undef': 'off',
    "no-throw-literal": "off",
    'no-underscore-dangle': 'off',
    'no-case-declarations': 'off',
    'linebreak-style': ['error', 'unix'],
    'no-console': 0,
  },
};
