import path from "path";
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';


const config = {
  entry: ["@babel/polyfill", "./src/index.ts", "./src/styles/style.scss"],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
          // "style-loader",
     
        ],
      },
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".scss", ".ts", ".js"],
  },
  output: {
    filename: "tictactoe.js",
    path: path.resolve(__dirname, "dist"),
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  },
  plugins: [
    new HTMLWebpackPlugin({template: 'index.html'}),
    new MiniCssExtractPlugin({filename: 'styles/style.css',})
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
};

export default config;