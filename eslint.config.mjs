import nxEslintPlugin from '@nx/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    plugins: {
      '@nx': nxEslintPlugin,
    },
  },

  {
    files: ['**/*.ts'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.base.json'],
      },
    },

    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,

          allow: [],

          depConstraints: [
            // Applications
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:lib',
                'scope:shared',
              ],
            },

            // Shared Libraries
            {
              sourceTag: 'type:lib',
              onlyDependOnLibsWithTags: [
                'type:lib',
                'scope:shared',
              ],
            },

            // Shared Scope
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'type:lib',
              ],
            },

            // Shell
            {
              sourceTag: 'scope:shell',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'type:lib',
              ],
            },
          ],
        },
      ],
    },
  },

  {
    files: ['**/*.html'],
    rules: {},
  },
];