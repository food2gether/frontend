import js from "@eslint/js";
import react from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser";

export default [
    js.configs.recommended,
    {
        plugins: {
            react,
        },
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            "react/react-in-jsx-scope": "off",
        },
    },
];
