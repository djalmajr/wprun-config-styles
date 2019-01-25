const autoprefixer = require("autoprefixer");
const MiniCssPlugin = require("mini-css-extract-plugin");

const DEV = process.env.NODE_ENV === "development";

const styleLoaders = [
  DEV ? { loader: "style-loader" } : MiniCssPlugin.loader,
  {
    loader: "css-loader",
    options: {
      camelCase: true,
      sourceMap: true,
      modules: true,
      importLoaders: true,
      localIdentName: "[name]__[local]__[hash:base64:10]",
    },
  },
  {
    loader: "postcss-loader",
    options: { plugins: () => [autoprefixer] },
  },
];

module.exports = {
  plugins: [new MiniCssPlugin({ filename: "style.css" })],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [DEV ? "style-loader" : MiniCssPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [...styleLoaders, { loader: "less-loader" }],
      },
      {
        test: /\.s[ac]ss$/,
        use: [...styleLoaders, { loader: "sass-loader" }],
      },
    ],
  },
};
