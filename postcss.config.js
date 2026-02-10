module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 16,
      propList: ["*"],
      selectorBlackList: [".no-rem"],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
  },
};
