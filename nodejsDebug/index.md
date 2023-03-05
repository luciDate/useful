> nodejs 调试

- 新建一个 npm 项目

```bash
npm init -y
```

- 注意入口文件要与 package.json 的 main 键一致

- 在 vscode 中打开项目

- index.js

```javascript
for (let i = 0; i <= 10; i++) {
  console.log(i);
}
```

- 点击调试

![image text](./images/debug0.png)

- 锁定第二行

![image text](./images/debug1.png)

- 接着就可以一步一步观察执行代码了

![image text](./images/debug2.png)
