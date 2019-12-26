const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const files = fs
  .readdirSync(path.resolve(__dirname, "src"))
  .filter(item => item.endsWith(".html"));

const entry = {};

files.forEach(file => {
  const { name } = path.parse(file);
  const entryFile = `./src/${name}.js`;
  if (!fs.existsSync(entryFile)) {
    fs.writeFileSync(entryFile, "");
  }
  entry[name] = entryFile;
});

module.exports = {
  //...
  mode: "development",
  entry,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      _LIST_: JSON.stringify(files)
    }),
    new CleanWebpackPlugin(),

    ...files.map(
      file =>
        new HtmlWebpackPlugin({
          title: `开发·${file}`,
          filename: file,
          template: `src/${file}`,
          chunks: [path.parse(file).name]
        })
    )
  ],
  output: {
    filename: "[name].dev.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    host: "n.u.c"
  },
  stats: "minimal"
};
