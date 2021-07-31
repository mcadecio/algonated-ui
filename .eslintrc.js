module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  parser: "babel-eslint",
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",
  },
};
