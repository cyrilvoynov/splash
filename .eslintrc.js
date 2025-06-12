module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}; 