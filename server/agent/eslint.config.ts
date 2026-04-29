import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import {defineConfig} from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';


export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/indent': [
        'warn',
        2,
        {
          SwitchCase: 1
        }
      ],
      '@stylistic/quotes': ['warn', 'single'],
      '@stylistic/semi': ['warn', 'always'],
      '@stylistic/max-len': ['warn', 135],
      '@stylistic/comma-dangle': ['warn', 'never']
    },
    ignores: ['package*.json', 'package-lock.json', 'node_modules', '**/package-lock.json']
  },
  tseslint.configs.recommended,
  {
    files: ['**/*.json'],
    plugins: {json},
    language: 'json/json',
    extends: ['json/recommended'],
    ignores: ['package*.json', 'package-lock.json', 'node_modules', '**/package-lock.json']
  }
]);
