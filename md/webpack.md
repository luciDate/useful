# webpack

[安装与测试](#tip-1)

[基本概念](#tip-2)

[进阶操作](#tip-3)

---

## <a id="tip-1">安装与测试</a>

windows10 需要提前全局安装

管理员权限启动 cmd

npm install webpack -g

npm install webpack-cli -g

之后就是同老师一样的局部安装操作

切换到指定文件夹

npm init -y

npm install webpack webpack-cli --save-dev

powershell 如出现无法加载文件 XXX，因为在此系统上禁止运行脚本。

管理员启动 powershell

set-executionpolicy remotesigned

选 y

测试目录中
新建 src 目录。新建 index.js,hello.js

index.js

```javascript
import { helloWorld } from "./hello";

document.write(helloWorld());
```

hello.js

```javascript
export function helloWorld() {
  return "hello webpack";
}
```

目录下新建 webpack.config.js

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "production",
};
```

package.json 中设置

```javascript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  }
```

powershell

```bash
npm run build
```

即可完成打包

---

## <a id="tip-2">基本概念</a>

entry

指定打包的入口

单入口

```javascript
module.exports = {
  entry: "./path/to/my/entry/file.js",
};
```

多入口

```javascript
module.exports = {
  entry: {
    app: "./src/app.js",
    adminApp: "./src/adminApp.js",
  },
};
```

output

指定编译后的文件输出位置

配合多入口出口设置

```javascript
module.exports = {
  // entry: "./src/index.js",
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  mode: "production",
};
```

loaders

loaders 可以支持其他文件的模块，添加到 webpack 中

```javascript
const path = require('path)

module.exports = {
  output:{
    filename:'bundle.js'
  },
  module:{
    rules:[
      {test:/\.txt$/,use:'raw-loader'}
    ]
  }
}
```

plugins

用于 bundle 文件的优化，资源管理和变量注入

```javascript
const path = require("path");

module.exports = {
  output: {
    filename: "bundle.js",
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
```

mode

有三个参数

development

production

none

---

解析 ES6

```bash
npm install @babel/preset-env babel-loader @babel/core -D
```

根目录下新建.babelrc

```
{
    "presets":[
        "@babel/preset-env"
    ]
}
```

webpack.config.js 添加

```javascript
  mode: "production",
  module: {
    rules: [
      {
        test: /.js$/,
        use: "babel-loader",
      },
    ],
  },
```

解析 React

```bash
npm install react react-dom @babel/preset-react -D
```

.babelrc

```
{
    "presets":[
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
```

新建一个 js 文件

```javascript
import React from "react";
import ReactDOM from "react-dom";

class Search extends React.Component {
  render() {
    return <div>Search Text</div>;
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
```

打包完成后新建一个 html 文件

```html
<body>
  <div id="root"></div>
  <script src="./search.js"></script>
</body>
```

解析 CSS 和 LESS

```bash
npm install style-loader css-loader -D
```

src 下新建 css 文件

```css
.search-text {
  font-size: 20px;
  color: #ff0000;
}
```

src 下新建 js 文件

```javascript
import React from "react";
import ReactDOM from "react-dom";
import "./search.css";

class Search extends React.Component {
  render() {
    return <div className="search-text">Search Text</div>;
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
```

webpack.config.js 编辑
注意 loader 的加载是从下到上那么会先加载 css-loader,再 style-loader

```javascript
const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  mode: "production",
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
    ],
  },
};
```

打包完成后新建一个 html 文件

```html
<body>
  <div id="root"></div>
  <script src="./search.js"></script>
</body>
```

安装 LESS 依赖

```bash
npm install less less-loader -D
```

把之前的 css 改成 less

js 引用的位置也修改下

webpack.config.js

```javascript
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
        test: /.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
```

解析图片字体

```bash
npm install file-loader -D
```

src 下新建 images 文件夹随意拖进一张图片和字体文件

src 下编辑 js 文件

```javascript
import React from "react";
import ReactDOM from "react-dom";
import logo from "./images/logo.jpg";
import "./search.less";

class Search extends React.Component {
  render() {
    return (
      <div className="search-text">
        Search Text
        <img src={logo} />
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
```

webpack.config.js

```javascript
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
        test: /.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test:/.(png|jpg|gif|jpeg)$/,
        use:'file-loader'
      },
      {
        test:/\.(woff|woff2|eot|ttf|otf)$/,
        use:[
          'file-loader'
        ]
      }
    ],
  },
```

解析字体

```javascript
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
```

url-loader 可以设置较小资源转 base64

```bash
npm install url-loader -D
```

```javascript
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
```

设置热更新

```bash
npm i webpack-dev-server -D
```

package.json 设置

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "dev":"webpack serve --config webpack.dev.js"
  },
```

webpack.dev.js

```javascript
const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
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
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
};
```

webpack.prod.js

```javascript
const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  mode: "production",
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
};
```

```bash
npm run dev
```

文件指纹

顾名思义就是给引入文件随机名，避免浏览器缓存

这里我们把 webpack.config.js 分为

webpack.dev.js

webpack.prod.js

package.json 设置

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack-dev-server --config webpack.dev.js --open"
  },
```

```bash
npm install mini-css-extract-plugin -D
```

编辑 webpack.prod.js

```javascript
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js",
  },
  mode: "production",
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
        test: /.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8][ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
  ],
};
```

html css js 文件压缩

```bash
npm install optimize-css-assets-webpack-plugin -D
npm install html-webpack-plugin -D
```

webpack.prod.js 编辑

```javascript
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

plugins: [
  new MiniCssExtractPlugin({
    filename: "[name]_[contenthash:8].css",
  }),
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
  }),
];
```

js 默认是压缩状态，故我们不需要处理

src 下新建两个默认状态的 html 模板

```javascript
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js",
  },
  mode: "production",
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
        test: /.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8][ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
      filename: "index.html",
      chunks: ["index"],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/search.html"),
      filename: "search.html",
      chunks: ["search"],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
  ],
};
```

---

## <a id="tip-3">进阶操作</a>

自动清除 dist 文件夹下的文件

```bash
npm install clean-webpack-plugin@2.0.2 -D
```

webpack.prod.js 与 webpack.dev 编辑

```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

{
  plugins: [new CleanWebpackPlugin()];
}
```

自动补全 CSS 前缀

```bash
npm install postcss-loader@3.0.0 -D

npm install autoprefixer@9.5.1 -D
```

```javascript
{
  test: /.less$/,
  use: [
    MiniCssExtractPlugin.loader,
    "css-loader",
    "less-loader",
    {
      loader: "postcss-loader",
      options: {
        plugins: () => [
          require("autoprefixer")({
            browsers: ["last 2 version", ">1%", "ios 7"],
          })
        ],
      },
    },
  ],
},
```

px 单位转 rem 单位

```bash
npm install px2rem-loader@0.1.9 -D

npm install lib-flexible@0.3.2
```

webpack.prod.js 编辑

```javascript
{
  test: /.less$/,
  use: [
    MiniCssExtractPlugin.loader,
    "css-loader",
    "less-loader",
    {
      loader: "postcss-loader",
      options: {
        plugins: () => [
          require("autoprefixer")({
            browsers: ["last 2 version", ">1%", "ios 7"],
          }),
        ],
      },
    },
    {
      loader: "px2rem-loader",
      options: {
        remUnit: 75,
        remPrecision: 8,
      },
    },
  ],
},
```

在 node_modules 中找到 lib-flexible 中的 flexible.js 的内容复制进 html 内联 head 中的 script 标签中,需要页面前置计算

静态资源内联，方便 CSS,JS 初始化设置，与避免 CSS 首屏闪动

```bash
npm install raw-loader@0.5.1 -D
```

html 内联

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <%= require('raw-loader!./meta.html') %>
    <title>Document</title>
    <script>
      ${ require('raw-loader!babel-loader!../node_modules/lib-flexible/flexible.js') }
    </script>
  </head>

  <body></body>
</html>
```

meta.html

```html
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

多页面打包

重构 src 下的目录，index 文件夹下放 index.html 资源，search 同理

参考[链接](https://gitee.com/geektime-geekbang/geektime-webpack-course/tree/master/code/chapter03/my-project)

```bash
npm install glob@7.1.4 -D
```

编辑 webpack.prod.js

```javascript
const glob = require("glob");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

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
          removeComments: false,
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
    filename: "[name]_[chunkhash:8].js",
  },
  mode: "production",
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
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")({
                  browsers: ["last 2 version", ">1%", "ios 7"],
                }),
              ],
            },
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8][ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
    }),
    new CleanWebpackPlugin(),
  ].concat(htmlWebpackPlugins),
};
```

sourcemap dev 模式下使用，能方便打包的时候调试

search 文件夹下编辑 index.js

```javascript
  render() {
    debugger;
    return (
      <div className="search-text">
        Search Info
        <img src={logo} />
      </div>
    );
  }
```

webpack.dev.js 编辑

```javascript
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  devtool:'source-map'
```

提取多页面公共资源

cnd 版本

```bash
npm install html-webpack-externals-plugin -D
```

编辑 webpack.prod.js

```javascript
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

plugins: [
  new HtmlWebpackExternalsPlugin({
    externals: [
      {
        module: "react",
        entry: "https://11.url.cn/now/lib/16.2.0/react.min.js",
        global: "React",
      },
      {
        module: "react-dom",
        entry: "https://11.url.cn/now/lib/16.2.0/react-dom.min.js",
        global: "ReactDOM",
      },
    ],
  }),
];
```

html 文件引入静态资源

```html
<script
  type="text/javascript"
  src="https://11.url.cn/now/lib/16.2.0/react.min.js"
></script>
<script
  type="text/javascript"
  src="https://11.url.cn/now/lib/16.2.0/react-dom.min.js"
></script>
```

多页面打包本地公共资源

删除掉上面的 html 静态资源

根目录下新建 common 文件夹编辑 index.js

```javascript
export function common() {
  return "common module";
}
```

index,search 文件夹下都

```javascript
import "../../common";
```

编辑 webpack.prod.js

```javascript
.concat(htmlWebpackPlugins),
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
```

treeShaking 代码压缩阶段删减掉不被使用的函数代码

search 目录下新建 tree-shaking.js

```javascript
export function a() {
  return "This is  func a";
}

export function b() {
  return "This is  func b";
}
```

search 文件夹下的 index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import logo from "./images/logo.jpg";
import "./search.less";
import "../../common";
import { a } from "./tree-shaking";

class Search extends React.Component {
  render() {
    //debugger;
    const funcA = a();
    return (
      <div className="search-text">
        {funcA}
        搜索文字内容
        <img src={logo} />
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
```

javascript 按需加载

```bash
npm install @babel/plugin-syntax-dynamic-import@7.2.0 -D
```

编辑根目录下的.babelrc

```
{
    "presets": [
        [
            "@babel/preset-env"
        ],
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-syntax-dynamic-import"
    ]
}
```

search 下新建 text.js

```javascript
import React from "react";

export default () => <div>动态 import</div>;
```

编辑 webpack.prod.js

```javascript
const glob = require("glob");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

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
          removeComments: false,
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
    filename: "[name]_[chunkhash:8].js",
  },
  mode: "production",
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
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")({
                  browsers: ["last 2 version", ">1%", "ios 7"],
                }),
              ],
            },
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8][ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "react",
          entry: "https://11.url.cn/now/lib/16.2.0/react.min.js",
          global: "React",
        },
        {
          module: "react-dom",
          entry: "https://11.url.cn/now/lib/16.2.0/react-dom.min.js",
          global: "ReactDOM",
        },
      ],
    }),
  ].concat(htmlWebpackPlugins),
  /*
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
  */
};
```

配置 eslint 建议直接下载 package.json

```bash
npm install eslint-config-airbnb eslint-plugin-impor eslint-plugin-jsx-a11y eslint-plugin-react -D
```

根目录下新建.eslint.js

```javascript
module.exports = {
  parser: "babel-eslint",
  extends: "airbnb",
  env: {
    browser: true,
    node: true,
  },
};
```

webpack.prod.js 编辑

```javascript
{
 test: /.js$/,
 use: [
   "babel-loader",
   "eslint-loader"
 ],
},
```

ssr 打包

根目录下新建 webpack.ssr.js 编辑

```javascript
const glob = require("glob");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index-server.js"));
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index-server\.js/);
    const pageName = match && match[1];
    if (pageName) {
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
            removeComments: false,
          },
        })
      );
    }
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
    filename: "[name]-server.js",
    libraryTarget: "umd",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          "babel-loader",
          // "eslint-loader"
        ],
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")({
                  browsers: ["last 2 version", ">1%", "ios 7"],
                }),
              ],
            },
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8][ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "react",
          entry: "https://11.url.cn/now/lib/16.2.0/react.min.js",
          global: "React",
        },
        {
          module: "react-dom",
          entry: "https://11.url.cn/now/lib/16.2.0/react-dom.min.js",
          global: "ReactDOM",
        },
      ],
    }),
  ].concat(htmlWebpackPlugins),
  /*
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
  */
};
```

根目录下新建 server 文件夹新建 index.js

```javascript
if (typeof window === "undefined") global.window = {};

const express = require("express");
const { renderToString } = require("react-dom/server");
const SSR = require("../dist/search-server");

const renderMarkup = (str) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
      </head>
      <body>
          <div id='root'>${str}</div>
      </body>
      </html>
      `;
};

const server = (port) => {
  const app = express();

  //设置静态目录
  app.use(express.static("dist"));

  app.get("/search", (req, res) => {
    const html = renderMarkup(renderToString(SSR));
    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log("Server is running on port:" + port);
  });
};

server(process.env.PORT || 3000);
```

src 下新建 index-server.js

```javascript
// import React from "react";
// import ReactDOM from "react-dom";
// import logo from "./images/logo.jpg";
// import "./search.less";
// import "../../common";

const React = require("react");
const logo = require("./images/logo.jpg");
require("./search.less");

class Search extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      Text: null,
    };
  }

  loadComponent() {
    import("./text.js").then((Text) => {
      this.setState({
        Text: Text.default,
      });
    });
  }

  render() {
    //debugger;
    const { Text } = this.state;
    return (
      <div className="search-text">
        {Text ? <Text /> : null}
        搜索文字内容
        <img src={logo} onClick={this.loadComponent.bind(this)} />
      </div>
    );
  }
}

module.exports = <Search />;
```

编辑 package.json

```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack --config webpack.prod.js",
  "dev": "webpack-dev-server --config webpack.dev.js --open",
  "build:ssr": "webpack --config webpack.ssr.js"
}
```

运行打包

```
npm run build:ssr
```

根目录下运行 server

```
node server/index.js
```

因为浏览器有全局变量如 window,document

将不兼容的组件根据打包环境进行适配

请求适配，发送请求尽量使用 axios

SSR 这时候不支持 CSS 渲染

server 新建 data.json

```json
{
  "error": [],
  "extra": [],
  "data": {
    "list": [
      [
        {
          "sub_count": 5556,
          "column_type": 1,
          "id": 192,
          "column_price_market": 9900,
          "column_bgcolor": "#F6F7FB",
          "column_title": "SQL必知必会",
          "column_cover_small": "https://static001.geekbang.org/resource/image/1c/38/1c5a5b154b543af952312eef33217438.jpg",
          "column_cover": "https://static001.geekbang.org/resource/image/c7/0d/c7ee0aabbcb6d2da09a1b4a56c1a730d.jpg",
          "had_sub": false,
          "price_type": 2,
          "column_unit": "45讲",
          "is_experience": false,
          "column_ctime": 1559640855,
          "update_frequency": "每周一 / 三 / 五更新",
          "is_onboard": true,
          "author_intro": "清华大学计算机博士",
          "column_sku": 100029501,
          "column_cover_wxlite": "https://static001.geekbang.org/resource/image/cd/f0/cd26b744d388dbd4387dcfaa66dd8bf0.jpg",
          "column_price": 6800,
          "column_price_sale": 6800,
          "author_name": "陈旸",
          "column_subtitle": "从入门到数据实战"
        },
        {
          "sub_count": 5446,
          "column_type": 1,
          "id": 191,
          "column_price_market": 9900,
          "column_bgcolor": "#F6F7FB",
          "column_title": "Kafka核心技术与实战",
          "column_cover_small": "https://static001.geekbang.org/resource/image/be/d9/be55e9cfe7b542ef6284e3e5722b9bd9.jpg",
          "column_cover": "https://static001.geekbang.org/resource/image/49/92/49d8686324a61b106f9fbeb45c9d7192.jpg",
          "had_sub": false,
          "price_type": 1,
          "column_unit": "42讲",
          "is_experience": false,
          "column_ctime": 1559009326,
          "update_frequency": "每周二 / 四 / 六更新",
          "is_onboard": true,
          "author_intro": "人人贷计算平台部总监，Apache Kafka Contributor",
          "column_sku": 100029201,
          "column_cover_wxlite": "https://static001.geekbang.org/resource/image/fc/f6/fcddac07fdd4530b99b5a1049b6aa5f6.jpg",
          "column_price": 9900,
          "column_price_sale": 9900,
          "author_name": "胡夕",
          "column_subtitle": "全面提升你的Kafka实战能力"
        },
        {
          "sub_count": 4209,
          "column_type": 1,
          "id": 189,
          "column_price_market": 9900,
          "column_bgcolor": "#F6F7FB",
          "column_title": "透视HTTP协议",
          "column_cover_small": "https://static001.geekbang.org/resource/image/7f/6e/7ff02fbdbc37331b10c5435dc86e4f6e.jpg",
          "column_cover": "https://static001.geekbang.org/resource/image/2a/10/2ac9b106533a4904f66041143a0e1b10.jpg",
          "had_sub": false,
          "price_type": 1,
          "column_unit": "40讲",
          "is_experience": false,
          "column_ctime": 1558689100,
          "update_frequency": "每周一／三／五更新",
          "is_onboard": true,
          "author_intro": "奇虎360技术专家，Nginx/OpenResty开源项目贡献者",
          "column_sku": 100029001,
          "column_cover_wxlite": "https://static001.geekbang.org/resource/image/b6/53/b60efb231d0ccc797b4329cd58b57453.jpg",
          "column_price": 9900,
          "column_price_sale": 9900,
          "author_name": "罗剑锋（Chrono）",
          "column_subtitle": "深入理解HTTP协议本质与应用"
        }
      ],
      [
        {
          "sub_count": 1196,
          "column_type": 3,
          "id": 181,
          "column_price_market": 12900,
          "column_bgcolor": "#FFFFFF",
          "column_title": "零基础学Java",
          "column_cover_small": "https://static001.geekbang.org/resource/image/1e/d5/1eb010e6535872bf773b222a68ef48d5.jpg",
          "column_cover": "https://static001.geekbang.org/resource/image/18/b2/18540a6c839dcd85527417e0a20ad5b2.jpg",
          "had_sub": false,
          "price_type": 1,
          "column_unit": "141讲",
          "is_experience": false,
          "column_ctime": 1557310171,
          "update_frequency": "141课时，约1500分钟",
          "is_onboard": true,
          "author_intro": "PayPal数据处理组技术负责人",
          "column_sku": 100027801,
          "column_cover_wxlite": "https://static001.geekbang.org/resource/image/f2/56/f24feba110c1c9a2d45799fe19ea9f56.jpg",
          "column_price": 12900,
          "column_price_sale": 12900,
          "author_name": "臧萌",
          "column_subtitle": "通俗易懂的Java入门课"
        },
        {
          "sub_count": 5120,
          "column_type": 3,
          "id": 175,
          "column_price_market": 12900,
          "column_bgcolor": "#FFFFFF",
          "column_title": "Web协议详解与抓包实战",
          "column_cover_small": "https://static001.geekbang.org/resource/image/6f/46/6f1e665a01d20dd237cbdd2210563f46.jpg",
          "column_cover": "https://static001.geekbang.org/resource/image/04/0a/0430f8402be85def96111b2d4950290a.jpg",
          "had_sub": false,
          "price_type": 1,
          "column_unit": "83讲",
          "is_experience": false,
          "column_ctime": 1556262573,
          "update_frequency": "83课时，约1000分钟",
          "is_onboard": true,
          "author_intro": "智链达CTO，前阿里云高级技术专家",
          "column_sku": 100026801,
          "column_cover_wxlite": "https://static001.geekbang.org/resource/image/cf/6d/cf98743409df276e2dce76631dd1a56d.jpg",
          "column_price": 12900,
          "column_price_sale": 12900,
          "author_name": "陶辉",
          "column_subtitle": "系统掌握Web协议，高效解决网络难题"
        },
        {
          "sub_count": 1390,
          "column_type": 3,
          "id": 169,
          "column_price_market": 12900,
          "column_bgcolor": "#FFFFFF",
          "column_title": "从0开发一款iOS App",
          "column_cover_small": "https://static001.geekbang.org/resource/image/fd/c6/fd828461c4a3cfa0a6a93dd1817001c6.jpg",
          "column_cover": "https://static001.geekbang.org/resource/image/19/46/198d9604ea72cfb812442ab2b5d01b46.jpg",
          "had_sub": false,
          "price_type": 3,
          "column_unit": "61讲",
          "is_experience": false,
          "column_ctime": 1555323160,
          "update_frequency": "61课时，约500分钟",
          "is_onboard": true,
          "author_intro": "腾讯高级工程师",
          "column_sku": 100025901,
          "column_cover_wxlite": "https://static001.geekbang.org/resource/image/b6/78/b67742c736399370628bfc202b646f78.jpg",
          "column_price": 9900,
          "column_price_sale": 12900,
          "author_name": "朱德权",
          "column_subtitle": "手把手带你构建类今日头条的App"
        }
      ],
      [
        {
          "sub_count": 9580,
          "column_type": 2,
          "id": 75,
          "column_price_market": 900,
          "column_bgcolor": "#ffffff",
          "column_title": "深入浅出gRPC",
          "column_cover_small": "https://static001.geekbang.org/resource/image/f3/f6/f3abb28a927bf207332f7ce41c5e3bf6.png",
          "column_cover": "https://static001.geekbang.org/resource/image/73/a0/73abcab9cd7e8127d15dc11e84339ea0.jpg",
          "had_sub": false,
          "price_type": 1,
          "column_unit": "6讲",
          "is_experience": false,
          "column_ctime": 1520409029,
          "update_frequency": "全集",
          "is_onboard": true,
          "author_intro": "《Netty 权威指南》、《分布式服务框架原理与实践》作者。",
          "column_sku": 100005601,
          "column_cover_wxlite": "https://static001.geekbang.org/resource/image/fe/57/fe319ec636d61d7b30a46bedf6b80657.jpg",
          "column_price": 900,
          "column_price_sale": 900,
          "author_name": "李林锋",
          "column_subtitle": "详解gRPC运作机制与原理"
        },
        {
          "sub_count": 5761,
          "column_type": 2,
          "id": 73,
          "column_price_market": 900,
          "column_bgcolor": "#ffffff",
          "column_title": "Service Mesh实践指南",
          "column_cover_small": "https://static001.geekbang.org/resource/image/62/c8/6219bb77d64a1d4f0492e462fbc914c8.png",
          "column_cover": "https://static001.geekbang.org/resource/image/3d/75/3d12373859e03012332614996351ce75.jpg",
          "had_sub": false,
          "price_type": 1,
          "column_unit": "6讲",
          "is_experience": false,
          "column_ctime": 1518082159,
          "update_frequency": "全集",
          "is_onboard": true,
          "author_intro": "微博平台研发技术专家，高性能OpenResty开发框架Vanilla作者。",
          "column_sku": 100005401,
          "column_cover_wxlite": "https://static001.geekbang.org/resource/image/ea/54/eacd1c6a1889c86f7d514f049228af54.jpg",
          "column_price": 900,
          "column_price_sale": 900,
          "author_name": "周晶",
          "column_subtitle": "来自一线大厂的第一手经验总结"
        },
        {
          "sub_count": 15259,
          "column_type": 2,
          "id": 61,
          "column_price_market": 100,
          "column_bgcolor": "#eac44b",
          "column_title": "如何做好一场技术演讲",
          "column_cover_small": "https://static001.geekbang.org/resource/image/cc/fb/ccb3acf6fcfab959aee1d800b882f7fb.png",
          "column_cover": "https://static001.geekbang.org/resource/image/0a/2d/0a3ec20c90b059cab58e15e91d02662d.jpg",
          "had_sub": false,
          "price_type": 1,
          "column_unit": "6讲",
          "is_experience": false,
          "column_ctime": 1511953968,
          "update_frequency": "全集",
          "is_onboard": true,
          "author_intro": "极客时间编辑部",
          "column_sku": 100003001,
          "column_cover_wxlite": "https://static001.geekbang.org/resource/image/d3/a4/d33c2ee1b89006207992bcc7d26ff8a4.jpg",
          "column_price": 100,
          "column_price_sale": 100,
          "author_name": "极客时间",
          "column_subtitle": "程序员都应该学学怎么表达"
        }
      ]
    ],
    "nav": [
      {
        "id": 1,
        "name": "专栏",
        "color": "#5ba6ff",
        "icon": "https://static001.geekbang.org/resource/image/dd/9e/dd8cbc79f017d1b01f643c7ea929d79e.png"
      },
      {
        "id": 3,
        "name": "视频课程",
        "color": "#79c109",
        "icon": "https://static001.geekbang.org/resource/image/4a/c3/4aebe8fb752fa21a0fd989a45d9847c3.png"
      },
      {
        "id": 2,
        "name": "微课",
        "color": "#5ba6ff",
        "icon": "https://static001.geekbang.org/resource/image/9c/f1/9c223ccae33c5245a3009857582f1df1.png"
      }
    ]
  },
  "code": 0
}
```

编辑 src 下的 index.html 提供占位符 把渲染好的组件通过占位符嵌套到 html 里面

```html
<body>
  <div id="root"><!--HTML_PLACEHOLDER--></div>
  <script
    type="text/javascript"
    src="https://11.url.cn/now/lib/16.2.0/react.min.js"
  ></script>
  <script
    type="text/javascript"
    src="https://11.url.cn/now/lib/16.2.0/react-dom.min.js"
  ></script>
  <!--INITIAL_DATA_PLACEHOLDER-->
</body>
```

编辑 server 文件夹下的 index.js

```javascript
if (typeof window === "undefined") global.window = {};

const fs = require("fs");
const path = require("path");
const express = require("express");
const { renderToString } = require("react-dom/server");
const SSR = require("../dist/search-server");
const template = fs.readFileSync(
  path.join(__dirname, "../dist/search.html"),
  "utf-8"
);
const data = require("./data.json");

const renderMarkup = (str) => {
  const dataStr = JSON.stringify(data);
  return template
    .replace("<!--HTML_PLACEHOLDER-->", str)
    .replace(
      "<!--INITIAL_DATA_PLACEHOLDER-->",
      `<script>window.__initial_data=${dataStr}</script>`
    );
};

const server = (port) => {
  const app = express();

  //设置静态目录
  app.use(express.static("dist"));

  app.get("/search", (req, res) => {
    const html = renderMarkup(renderToString(SSR));
    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log("Server is running on port:" + port);
  });
};

server(process.env.PORT || 3000);
```

更友好的错误提示

```bash
npm install friendly-errors-webpack-plugin -D
```

编辑 webpack.prod.js 与 webpack.dev.js

```javascript
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

new FriendlyErrorsWebpackPlugin();
```

webpack 错误码见 37 号视频
