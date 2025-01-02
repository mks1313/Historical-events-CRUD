import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,  // Manténer las variables globales para el navegador
        ...globals.node,     // Agregar las variables globales para Node.js
      },
    },
  },
  pluginJs.configs.recommended,
];
