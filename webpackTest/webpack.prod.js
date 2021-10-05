const glob = require("glob");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//多页面打包约定函数
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
  //指定webpack的打包入口
  entry: entry,
  //指定打包后的文件输出到哪个磁盘位置
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js",
  },
  mode: "production",
  //loader,让webpack去支持它原生不支持的文件类型，并添加到它的依赖图中
  module: {
    rules: [
      {
        test: /.js$/,
        use: "babel-loader",
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          // 小图片base64
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              outputPath: "/images/",
            },
          },
          // 文件名指纹
          // {
          //   loader: "file-loader",
          //   options: {
          //     name: "[name]_[hash:8].[ext]",
          //   },
          // },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  //插件用于bundle文件的优化，资源管理和环境变量注入
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    //css单独打包
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
    }),
    //dist自动清理
    new CleanWebpackPlugin(),
  ].concat(htmlWebpackPlugins),
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        //公共第三方库模块抽离
        vendor: {
          name: "vendor",
          priority: 1,
          test: /node_modules/,
          minSize: 30000,
          minChunks: 1,
        },
        //公共代码抽离
        commons:{
          name:'commons',
          priority:0,
          minSize:0,
          minChunks:2
        }
      },
    },
  },
};

/*

module -各个源码文件，webpack中js，css，图片，字体一切都是模块
chunk - 多个模块的集合
bundle - 最终输出的文件
source map - 定位源码，便于调式
tree sharking - 没有使用到的代码会被擦洗掉，默认开启
scope hoisting = 模式设置为production默认开启，可以把代码按照顺序放在一个作用域里，减少函数声明和内衬开销

*/
