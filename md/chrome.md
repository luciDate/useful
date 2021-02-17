# Chrome 调试

```javascript
//样式输出
console.log("%caza%ccool", "color:red;font-size:20px", "color:blue");
//表格化输出
const arr = [
  { id: 1, name: "aza" },
  { id: 2, name: "azazel" },
  { id: 3, name: "null" },
];
console.table(arr);

function fib(n) {
  //输出前n个斐波那契数列值
  if (n == 0) return;
  console.count("调用次数"); //放在函数里，每当这句代码运行输出所在函数执行次数
  console.trace(); //显示函数调用轨迹(访问调用栈）
  var a = arguments[1] || 1;
  var b = arguments[2] || 1;
  console.log("fib=" + a);
  [a, b] = [b, a + b];
  fib(--n, a, b);
}

//fib(6);

console.time() //计时开始
fib(100); //用上述函数计算100个斐波那契数
console.timeEnd() //计时结束并输出时长

//debugger

//右边按钮如下：

// Pause/Resume script execution：暂停/恢复脚本执行（程序执行到下一断点停止）。
// Step over next function call：执行到下一步的函数调用（跳到下一行）。
// Step into next function call：进入当前函数。
// Step out of current function：跳出当前执行函数。
// Deactive/Active all breakpoints：关闭/开启所有断点（不会取消）。
// Pause on exceptions：异常情况自动断点设置。

//点击行设置断点

//选中变量右键点击 Add selected text to watches

//Add selected text to watches 也可以监听表达式 比如 fib() 里面的 a + b
//只要选中右键点击 Add selected text to watches就可以

//遇到vm之类的新标签，不能调试的话。退出调试刷新页面就可以

```
