import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "react/no-unescaped-entities": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true
      }]
    }
  },
  {
    files: ["app/**/*.{ts,tsx}"],
    rules: {
      "react/no-unescaped-entities": "off"
    }
  },
  {
    files: ["**/*.test.{ts,tsx}", "test/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off"
    }
  },
  {
    files: ["command/**/*.{js,ts}"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true
      }]
    }
  }
]);

export default eslintConfig;
