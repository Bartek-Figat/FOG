/**
 * ESLint Configuration
 */
module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  plugins: ['import'],
  rules: {
    // Separate import groups with newline by section
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
        'newlines-between': 'always',
      },
    ],
    'no-console': 1, // Warning to reduce console logs used throughout app
    'react/prop-types': 0, // Not using prop-types because we will refactor to TypeScript
    'newline-before-return': 1,
    'no-useless-return': 1,
    'prefer-const': 1,
    'no-useless-return': 1,
    'no-unused-vars': 0,
  },
  settings: {
    'import/resolver': {
      // Allow `@/` to map to `src/client/`
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
