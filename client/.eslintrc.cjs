module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'eslint.validate': [
      'javascript',
      'javascriptreact',
      'typescript',
      'typescriptreact',
    ],
    'import/resolver': {
      typescript: {},
    },
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:tailwindcss/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      legacyDecorators: true,
      globalReturn: true,
      impliedStrict: true,
    },
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'simple-import-sort',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-undef': 'off',
    'no-spaced-func': 0,
    'no-underscore-dangle': 'off',
    'no-case-declarations': 'off',
    'no-param-reassign': 'off',
    'react/require-default-props': 'off',
    'linebreak-style': [
      'error', (process.platform === 'win32' ? 'windows' : 'unix'),
    ],
    'no-trailing-spaces': 'error',
    'no-void': ['error', { allowAsStatement: true }],
    'no-nested-ternary': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx', '.ts', '.js'] }],
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
