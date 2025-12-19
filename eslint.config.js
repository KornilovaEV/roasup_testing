import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: [
      'webpack.config.js', // webpack НЕ трогаем
      'dist/**',
      'node_modules/**',
      '.husky/**',
    ],
  },

  // Основная конфигурация
  js.configs.recommended,
  {
    files: ['src/**/*.js'], // Только src!
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
];
