const glob = require("glob");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
        },
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /.js$/,
        use: "babel-loader",
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins:[].concat(htmlWebpackPlugins),

  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  //开启source-map，有利于源码调试
  devtool:'source-map'
};
