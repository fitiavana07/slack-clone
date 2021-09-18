module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  rules: {
    'react/jsx-uses-react': 'error',
    'react/prop-types': 0,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
}
