module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "standard",
    "@react-native-community",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:promise/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module",
  },
  plugins: ["prettier", "@typescript-eslint"],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "no-empty-pattern": ["off"],
    "no-undef": ["error"],
    "no-var": ["error"],
    "object-curly-spacing": ["error", "always"],
    indent: ["off"],
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        semi: true,
      },
    ],
  },
  env: {
    // change as necessary
    node: false,
  },
};
