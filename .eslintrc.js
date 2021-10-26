module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-undef": 1,
    "no-unused-vars": 1,
    "vue/no-unused-vars": 1,
    "vue/no-use-v-if-with-v-for": 1,
    "no-irregular-whitespace": 1,
    "no-mixed-spaces-and-tabs": 1,
    "no-fallthrough": 1,
  },
};
