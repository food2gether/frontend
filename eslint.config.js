import js from "@eslint/js";
import react from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser";

export default [
  js.configs.recommended, // Standardregeln von ESLint
  {
    plugins: {
      react, // React-Plugin im neuen Format
    },
    languageOptions: {
      ecmaVersion: "latest", // Moderne JavaScript-Features
      sourceType: "module",  // ES Module aktivieren
      parser: babelParser,   // Babel Parser für JSX
      parserOptions: {
        requireConfigFile: false, // Babel-Konfigurationsdatei nicht nötig
        ecmaFeatures: {
          jsx: true, // JSX aktivieren
        },
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Bei modernen React-Versionen unnötig
    },
  },
];
