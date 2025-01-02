import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,  // Mantén las variables globales para el navegador
        ...globals.node,     // Agrega las variables globales para Node.js
      },
    },
  },
  pluginJs.configs.recommended,
];
