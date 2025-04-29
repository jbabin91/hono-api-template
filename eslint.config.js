import js from '@eslint/js';
import configPrettier from 'eslint-config-prettier';
import pluginImportX from 'eslint-plugin-import-x';
// @ts-ignore
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
// @ts-ignore
import pluginSortKeysFix from 'eslint-plugin-sort-keys-fix';
import pluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import("typescript-eslint").Config} */
export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/.output/**',
      '**/.vinxi/**',
      '**/storybook-static/**',
      '**/*.gen.ts',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.builtin,
      },
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
  },
  {
    ...js.configs.recommended,
    ...pluginUnicorn.configs.recommended,
    plugins: {
      'import-x': pluginImportX,
      'simple-import-sort': pluginSimpleImportSort,
      'sort-keys-fix': pluginSortKeysFix,
      unicorn: pluginUnicorn,
    },
    rules: {
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-keys-fix/sort-keys-fix': 'error',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: false,
            kebabCase: true,
            pascalCase: false,
          },
          ignore: [String.raw`^\$.*\.tsx?$`], // Allow parameter files starting with $
        },
      ],
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  {
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
  {
    files: ['**/routes/**/*.ts', '**/schema/**/*.ts', '**/db/seed.ts'],
    rules: {
      'sort-keys-fix/sort-keys-fix': 'off',
    },
  },
  configPrettier,
);
