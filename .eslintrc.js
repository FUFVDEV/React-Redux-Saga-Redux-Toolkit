module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime", // Evita importar React.
    "standard",
    "eslint-config-prettier", // <=== extensión a agregar.
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": 0,
  },
};
