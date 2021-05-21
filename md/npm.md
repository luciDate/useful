安装nodeJs自动会安装上npm

```bash
node -v

npm -v
```

更新版本

```bash
npm install npm@x.x.x -g

npm install npm@latest -g
```

使用npm前需要初始化文件夹

```bash
npm init -y
```

安装与卸载依赖

```bash
npm install xxx

npm install xxx@0.0.1

npm install xxx@0.0.1 -g

npm update xxx

npm uninstall xxx

npm uninstall xxx -g

```

安装生产环境(默认)或开发环境

```bash
npm install xxx -D
```

切换镜像源

管理员运行cmd

```bash
npm config set registry http://registry.npm.taobao.org

config get registry
```

看到http://registry.npm.taobao.org/说明成功