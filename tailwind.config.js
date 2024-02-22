module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/assets/stylesheets/**/*.css",
    "./app/javascript/**/*.js",
    "./app/javascript/**/*.jsx",
    "./app/javascript/**/*.tsx",
    "./app/javascript/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        "bubble-gum": "#ff90e8",
      },
      fontFamily: {
        sans: ['"Space Grotesk"', "sans-serif"],
      },
    },
  },
};
