# Javascript 面试题收集

## 大纲

[值类型和表达式](#tip-1)

[原型和原型链](#tip-2)

[作用域和闭包](#tip-3)

[异步](#tip-4)

[常用 API](#tip-5)

[web API](#tip-6)

[页面优化](#tip-7)

[安全性](#tip-8)

---

## <a id="tip-1">值类型和表达式</a>

Q : typeof 能判断出哪些类型

A :

```javascript
let a = [];
let s = "233";

// typeof 只能判断值类型的变量
console.log(typeof s);
// instanceof 能判断引用类型的变量
console.log(a instanceof Array);
```

---

Q : 何时使用 === 何时使用 ==

A :

```javascript
// 强制类型转换

//字符串拼接
let i = 100 + 10; // 110
let ii = 100 + "10"; // 10010

// ==运算符
100 == "100"; //100转换为字符串100 true
0 == ""; //0和空字符串都转换为false true
null == undefined; // true

// if判断
let a = true;

if (a) {
  //过
}

let b = 100;
if (b) {
  //过
}

let c = ""; //0或者""

if (!c) {
  console.log("bingo");
}

console.log(10 && 0); //0
console.log("" || "abc"); //abc
console.log(!window.abc); //true

let iii = 100;
console.log(!!a); //true
```

```javascript
// 除了用来判断一个变量是否是null或者undefined使用==。剩下的全部使用 ===

if (obj.a == null) {
  console.log("bingo");
}
```

Q : 内置函数

A :

```javascript
new Object();
new Array();
new Boolean();
new Number();
new String();
new Function();
new Date();
new RegExp();
new Error();
```

Q : 基本数据类型

A :

```javascript
//值类型
null;
undefined;
Boolean;
String;
Number;
Symbol;

//引用类型
Object;
Array;
Date;
RegExp;
Function;
```

这里有个技巧

```javascript
// 新建值类型会开辟新的内存地址。所以一个变量编辑不会影响另一个变量
let i = 100;
let ii = i;
ii += 100;
console.log({ i: `${i}`, ii: `${ii}` });

// 新建值类型不开辟新的内存地址。所以一个变量编辑会影响另一个变量
let iii = { name: "aza" };
let iv = iii;
iv.name = "azazel";
console.log({ iii: `${iii.name}`, iv: `${iv.name}` });

let v = { phone: 188 };
//let vi = JSON.parse(JSON.stringify(v));
let vi = Object.assign({}, v);
vi.phone = 100;
console.log({ v: `${v.phone}`, vi: `${vi.phone}` });
```

Q : 如何理解 JSON

A :

```javascript
//JSON和Math都是内置的对象，但不是函数
//JSON是内置对象JSON.parse(),JSON.stringify()也是一种数据格式{name:aza}
```

---

## <a id="tip-2">原型和原型链</a>

Q : 如何判断一个变量是否是数组

A :

```javascript
let a = [];
console.log(a instanceof Array);
```

Q : 写一个原型链继承的列子

A :
基本版

```javascript
class People {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {
    console.log(`${this.name} eat something`);
  }
  speak() {
    console.log(`my name is ${this.name} , i am ${age} year old`);
  }
}

class Student extends People {
  constructor(name, age, number) {
    //super会把参数带给父类来处理
    super(name, age);
    this.number = number;
  }
  study() {
    console.log(`${this.number} study`);
  }
}

let aza = new Student("aza", 18, 188);
aza.study();
aza.eat();
```

面试装逼版。原型继承实现链式操作

```html
<body>
  <div id="test"></div>
  <script>
    class Elem {
      constructor(id) {
        this.elem = document.getElementById(id);
      }
      html(val) {
        if (val) {
          this.elem.innerHTML = val;
          return this;
        } else {
          return this.elem.innerHTML;
        }
      }
      on(type, fn) {
        this.elem.addEventListener(type, fn);
      }
    }

    const d = new Elem("test");

    d.html("666").on("click", () => {
      alert("aza");
    });
  </script>
</body>
```

Q : 原型规则

A :

1. 所有引用类型，都具有对象特性。即可自由拓展属性
2. 所有的引用类型，都有一个`__proto__`属性(隐式原型)。属性值是一个普通对象。
3. 所有函数，都有一个 prototype(显示原型),属性值也是一个普通对象
4. 所有引用类型的`__proto__`属性都指向它的构造函数的 prototype 属性值
5. 当试图得到一个对象某个属性时。如果这个对象本身没有这个属性，那么会去它的`__proto__`(它构造函数的 prototyp)去寻找

```javascript
let obj = {};
let arr = [];
obj.a = 100;
arr.a = 100;
function coo() {}
coo.a = 100;

console.log(obj.__proto__);
console.log(arr.__proto__);
console.log(coo.__proto__);

console.log(coo.prototype);

console.log(obj.__proto__ === Object.prototype);
```

Q : 原型链

A :

1. toString()是 Object 的属性
2. f 本身没有这个属性，所以它会向上去`__proto__`去寻找
3. `f.__proto__` --> `Foo.__proto__` --> `Object.__proto__`,就找到了
4. 为了避免死循环。`Object.__proto__` = null

```javascript
class Foo {
  constructor(name) {
    this.name = name;
  }
  alertName() {
    alert(this.name);
  }
}

let f = new Foo("aza");
f.alertName();
f.toString();
```

Q : 描述 new 一个对象的过程

A :

1. 创建一个新对象
2. this 指向这个新对象
3. 执行代码，即对 this.赋值
4. 返回 this

```javascript
class Coo(){
  constructor(name,phone){
    this.name = name
    this.phone = phone
  }
  doSomething(){
    console.log("do something...")
  }

  // return this 默认有这一行
}

let c = new Coo("aza","188")

```

---

## <a id="tip-3">作用域和闭包</a>

Q : 变量提升的理解

1. 这里扯到一个问题就是执行上下文
2. JavaScript 标准把一段`<script></script>`一段代码（包括函数），执行所需的所有信息定义为：“执行上下文”。
3. 全局定义的变量定义，函数声明都会拉到最前面
4. 函数的变量定义，函数声明，this，arguments 拉到最前面

A :

```javascript
a = 10;
console.log(a);
var a;
```

Q : this 的几种场景

1. 指向构造函数本身
2. 普通函数指向 window
3. call()

特殊情况收集:

```html
<div id="test">666</div>
<script>
  //this指向dom
  const t = document.querySelector("#test");
  t.addEventListener("click", function () {
    console.log(this);
  });

  function callName(name) {
    console.log(name);
    console.log(this);
  }

  //立刻执行函数，并且改变this，向函数传参
  callName.call({ a: 100 }, "aza");
</script>
```

Q : 创建 10 个`<a>`标签，点击弹出序号

A :

```javascript
//建立一个空节点避免过多DOM操作
const u = document.createElement("ul");
u.addEventListener("click", (e) => {
  if (e.target.classList.contains("item")) {
    console.log(e.target.innerHTML);
  }
});
for (let index = 1; index <= 10; index++) {
  const l = document.createElement("li");
  l.innerHTML = index;
  l.classList.add("item");
  u.appendChild(l);
}
document.body.appendChild(u);
```

Q : 如何理解作用域

A :

1. let 和 const 有块级作用域
2. 在代码块({})之外的是全局作用域
3. 在代码块({})之内的是块级作用域

作用域链:

```javascript
const a = 300;
function coo() {
  let a = 100;
  function coo1() {
    console.log(a); //没有在作用域定义的叫自由变量
  }
  coo1();
}
coo();
console.log(a);
```

Q : 实际开发中闭包的作用

A :

1. 闭包是绑定了执行环境的函数
2. 它在实际开发的作用在于封装变量，收敛权限
3. 注意\_list。如果不用函数封装。到全局定义，会很容易被其他人修改

```javascript
function isFirstLoad() {
  let _list = [];
  return function (id) {
    if (_list.indexOf(id) === 0) {
      return false;
    } else {
      _list.push(id);
      return true;
    }
  };
}

const t = isFirstLoad();
console.log(t(100));
console.log(t(100));
console.log(t(99));
console.log(t(99));
```

---

## <a id="tip-4">异步</a>

Q : 同步和异步分别是什么?

1. 同步会阻塞代码，异步不会
2. 同步的场景有 alert()
3. 异步的场景有 setTimeout(),setInterval(),ajax 请求,动态`<img>`加载,事件绑定(比如 click 事件，什么时候用户点击什么时候执行代码)

Q : 一个关于 setTimeout 的面试题

JavaScript 因为单线程的原因。会把异步操作单独暂存起来，代码执行完毕之后在按顺序执行

```javascript
console.log(1);
setTimeout(() => {
  console.log(2);
}, 0);
console.log(3);
setTimeout(() => {
  console.log(4);
}, 1000);
console.log(5);

//1,3,5,2,4
```

---

## <a id="tip-5">常用 API</a>

Q : 获取 2017-06-10 格式的日期

```javascript
const d = new Date();
const year = d.getFullYear();
const month = d.getMonth();
const day = d.getDate();
const str = `${year}-${month}-${day}`;
console.log(str);
```

Q : 获取随机数，要求长度是一致的字符串格式

```javascript
const temp = "0000000000";
const n = Math.random();
const remix = n + temp;
const remixI = remix.slice(0, 10);
console.log(remixI);
```

Q : 写一个能遍历对象和数组的 forEach 函数

1. 这个也能比较好的解释回调函数(一个函数需要一个函数作为参数就叫回调函数)

```javascript
function formatEach(type, fn) {
  if (type instanceof Array) {
    type.forEach((item, index) => {
      fn(index, item);
    });
  } else {
    for (key in type) {
      fn(key, type[key]);
    }
  }
}
const arr = [1, 2, 3];
const obj = { x: 100, y: 200 };

formatEach(arr, (index, value) => {
  console.log(`${index}-${value}`);
});

formatEach(obj, (key, value) => {
  console.log(`${key}-${value}`);
});
```

自己收集的 API

日期

```javascript
Date.now(); //返回当前时间戳
let d = new Date();
d.getTime(); //返回当前时间戳
d.getFullYear();
d.getMonth() + 1;
d.getDate();
d.getHours;
d.getMinutes();
d.getSeconds();
```

字符串

```javascript
const str = "helloWorld";
const result = str.indexOf("hello");
//没有返回-1
console.log(result);

//字符串反转
const h = "hello,vue";
const hh = h.split("").reverse().join("");
console.log(hh);

//url拼接
const url = "/api/dashboard/chart";
const name = url.split("/api/")[1].split("/").join("_");
console.log(name);
```

数字

```javascript
Math.random();

function formatRandom(max, min) {
  return Math.random() * (max - min) + min;
}

//返回1到5之间的数字,实际抛出的数字不大于5，toFixed()四舍五入取整,保留0位小数。
console.log(formatRandom(5, 1).toFixed(0));

//JavaScript在精度计算上会有偏差
//parseFloat()解析字符串返回浮点数
let n = 6.666;
let nn = 5.123;
let nnn = n + nn;
console.log(nnn);
console.log(parseFloat(nnn.toFixed(0)));
```

数组

```javascript
const arr = [1, 2, 3, 4, 5];

//一般遍历
arr.forEach((item, index) => {
  console.log(`${index} -- ${item}`);
});

//打断遍历
for (item of arr) {
  if (item >= 2) {
    break;
  }
  console.log(`${item}`);
}

//item检查
const result = arr.every((item, index) => {
  if (item == 2) {
    return true;
  }
});
console.log(result);
const resolve = arr.some((item, index) => {
  if (item == 2) {
    return true;
  }
});
console.log(resolve);

//排序
//会改变原数组
let arrSort = arr.sort((a, b) => {
  //倒序
  return b - a;

  //正序
  //return a - b;
});
console.log(arrSort);

//映射
arrMap = arr.map((item, index) => {
  return `<span>${item}</span>`;
});
//数组转字符串
console.log(arrMap.join(""));

//过虑
arrFilter = arr.filter((item, index) => {
  if (item % 2 == 0) {
    return true;
  }
});
console.log(arrFilter);

//数组深拷贝

const arr = [1, 2, 3, 4, 5];
let arri = arr;
arri[0] = 11;

console.log(arr);
console.log(arri);

const arrr = Object.assign([], arr);
arrr[0] = 666;
console.log(arr);
console.log(arrr);
```

类数组转数组操作与数组添加删除

```html
<body>
  <ul class="container">
    <li class="item">1</li>
    <li class="item">2</li>
    <li class="item">3</li>
    <li class="item">4</li>
    <li class="item">5</li>
  </ul>
  <script>
    const items = document.querySelectorAll(".item");
    const arrCopy = Array.from(items);
    // items.forEach((item) => {
    //   console.log(item)
    // })

    const arr = [1, 2, 3, 4, 5];
    //下标2开始删除，删除2个包括下标2
    arr.splice(2, 2);
    console.log(arr);
    //下标2开始删除0个，在下标2添加666
    arr.splice(2, 0, 666);
    console.log(arr);

    const l = document.createElement("li");
    l.classList.add("item");
    l.innerHTML = "0";
    arrCopy.splice(0, 0, l);
    console.log(items);
    console.log(arrCopy);

    const frag = document.createDocumentFragment();
    arrCopy.forEach((item) => {
      frag.appendChild(item);
    });
    document.body.appendChild(frag);
  </script>
</body>
```

对象

```javascript
const obj = { a: 1, b: 2, c: 3 };
for (key in obj) {
  //判断属性是否是对象本身的。而不是从原型中继承的属性
  if (obj.hasOwnProperty(key)) {
    console.log(`${key} -- ${obj[key]}`);
  }
}

const obj = { a: 1, b: 2, c: 3 };
for (key in obj) {
  //判断属性是否是对象本身的。而不是从原型中继承的属性
  if (obj.hasOwnProperty(key)) {
    console.log(`${key} -- ${obj[key]}`);
  }
}

//assign可以用来深拷贝，或者对象合并，第一个参数填目标，第二个填对象
let objI = Object.assign({}, obj);
objI.a = 100;
console.log(obj);
console.log(objI);

const objII = { d: 4, e: 5, f: 6 };
const objIII = Object.assign(obj, objII);
console.log(objIII);
```

---

## <a id="tip-6">web API</a>

Q : DOM 是哪种基本的数据结构

A : DOM 是一种浏览器可以识别，JavaScript 可以识别的树形结构

Q : DOM 的常用 API 有哪些

```javascript
document.querySelector();
document.querySelectorAll();
```

Q : DOM 节点的 attr 和 property 有什么差别

A :

1. attr 是 DOM 已有的标签属性
2. property 是 js 可以操作的 DOM 对象

```html
<body>
  <div id="test" data-index="0" style="border: solid 1px #ff0000;">666</div>
  <script>
    const t = document.querySelector("#test");
    console.log(t.getAttribute("data-index"));
    t.setAttribute("data-index", 1);
    console.log(t.getAttribute("data-index"));

    t.style.border = "solid 1px blue";
  </script>
</body>
```

Q : DOM 节点操作

```html
<body>
  <ul class="container">
    <li class="item">1</li>
    <li class="item">2</li>
    <li class="item">3</li>
    <li class="item">4</li>
    <li class="item">5</li>
  </ul>
  <script>
    const c = document.querySelector(".container");
    const i = document.querySelectorAll(".item")[2];
    const li = document.createElement("li");
    li.classList.add("item");
    li.innerHTML = 6;
    c.appendChild(li);
    console.log(i);

    console.log(i.parentElement);
    console.log(i.nextElementSibling);
    console.log(i.previousElementSibling);
    console.log(c.children);

    c.removeChild(i);
  </script>
</body>
```

Q : BOM 操作

检查浏览器

```javascript
const ua = navigator.userAgent;
const isChrome = ua.indexOf("Chrome");
console.log(isChrome);
```

检查 url

```html
<body>
  <div class="test" style="width:100px;height:100px;border:solid 1px #ff0000">
    click me
  </div>
  <script>
    const t = document.querySelector(".test");
    const ua = navigator.userAgent;
    const isChrome = ua.indexOf("Chrome");
    console.log(isChrome);

    //返回屏幕可用的宽高
    console.log(screen.width);
    console.log(screen.height);

    //网页宽高
    console.log(window.innerWidth);
    console.log(window.innerHeight);

    //dom宽高
    console.log(t.clientWidth);
    console.log(t.clientHeight);

    //dom距离网页顶部的距离
    const bound = t.getBoundingClientRect();
    console.log(bound.top);

    //浏览器前进后退
    history.back();
    history.forward();

    //解剖url

    //获取url
    console.log(location.href);
    //获取http协议
    console.log(location.protocol);
    //获取域名
    console.log(location.host);
    //获取路径
    console.log(location.pathname);
    //获取?后面的参数
    console.log(location.search);
    //获取#后面的哈希
    console.log(location.hash);

    t.addEventListener("click", () => {
      location.href = "https://www.baidu.com";
    });
  </script>
</body>
```

事件
Q : 写一个通用的事件绑定函数

```html
<body>
  <a class="test" href="https://www.baidu.com">click me</a>
  <div class="testi">666</div>
  <script>
    const a = document.querySelector(".test");
    const d = document.querySelector(".testi");
    a.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("bingo");
    });

    function formatEvent(el, type, fn) {
      //函数本身没有e可以从外部把e传过来
      el.addEventListener(type, fn);
    }

    formatEvent(d, "click", (e) => {
      e.preventDefault();
      console.log("233");
    });
  </script>
</body>
```

Q : 事件代理

标准版事件代理 :

```html
<ul class="container">
  <li class="item">1</li>
  <li class="item">2</li>
  <li class="item">3</li>
  <li class="item">4</li>
  <li class="item">5</li>
</ul>
<script>
  const c = document.querySelector(".container");
  c.addEventListener("click", (e) => {
    if (e.target.classList.contains("item")) {
      console.log(e.target.innerHTML);
    }
  });
</script>
```

事件代理双向版

```html
<body>
  <div id="div1">
    <p id="p1">激活</p>
    <p id="p2">取消</p>
    <p id="p3">取消</p>
    <div class="div2">
      <p id="p4">取消</p>
      <p id="p5">取消</p>
    </div>
  </div>
  <script>
    const d = document.querySelector("#div1");
    const b = document.body;
    const p = document.querySelector("#p1");

    p.addEventListener("click", (e) => {
      //阻止事件冒泡
      e.stopPropagation();
      console.log("激活");
    });

    b.addEventListener("click", () => {
      console.log("取消");
    });
  </script>
</body>
```

通用事件绑定函数

```html
<body>
  <div id="div1">
    <p id="p1">激活</p>
    <p id="p2">取消</p>
    <p id="p3">取消</p>
    <div class="div2">
      <p id="p4">取消</p>
      <p id="p5">取消</p>
    </div>
  </div>
  <script>
    //第三个参数选择是否代理
    function formatEvent(elem, type, proxy, fn) {
      if (fn == null) {
        //参数做一下兼容
        fn = proxy;
        proxy = null;
      }
      elem.addEventListener(type, (e) => {
        let target;
        if (proxy) {
          target = e.target;
          //检查target是否是p标签
          if (target.matches(proxy)) {
            fn.call(target, e);
          }
        } else {
          fn(e);
        }
      });
    }
    const d = document.querySelector("#div1");
    const p = document.querySelector("#p1");

    //如果addEventListener要精准this是不能使用箭头函数的，箭头默认没this，如果使用this会向上下文去寻找
    formatEvent(d, "click", "p", function () {
      console.log(this.innerHTML);
    });

    formatEvent(p, "click", function (e) {
      e.stopPropagation();
      console.log(p.innerHTML);
    });
  </script>
</body>
```

跨域

1. 浏览器有同源规则。不允许 ajax 访问其他域接口
2. 跨域条件 : 协议，域名，端口，有一个不同就算跨域
3. 有三个标签可以允许跨域`<img>`,`<link>`,`<script>`
4. JSONP 也可以利用回调函数允许跨域

```javascript
window.callback(data){
  //这里是我门获取的跨域信息
  console.log(data)
}
```

本地存储

```javascript
//key设定要使用字符串格式
localStorage.setItem("name", "aza");
localStorage.setItem("phone", "188");
console.log(localStorage.getItem("name"));

localStorage.removeItem("name");
console.log(localStorage.getItem("phone"));

localStorage.clear();
```

---

## <a id="tip-7">页面优化</a>

Q : 输入 url 到得到 html 的过程

A :

1. 浏览器根据 DNS 服务器得到域名地址
2. 向这个 ip 地址发送 http 请求
3. 服务器收到，处理并返回 http 请求
4. 浏览器得到返回内容

Q : 浏览器渲染页面过程

A :

1. 根据 HTML 生成 DOM 树
2. 根据 CSS 生成 CSSOM
3. 将 DOM 和 CSSOM 结合生成 RenderTree
4. 根据 RenderTree 开始渲染和展示
5. 遇到`<script>`会阻塞渲染

Q : widnow.onload 和 DOMContentLoaded 的区别

1. 页面全部资源加载才执行，包括图片，视频
2. DOM 渲染即可执行

页面性能优化主要方案

A :

原则

1. 多是用内存，缓存或者其他方案
2. 减少 CPU 计算，较少网络请求

加载资源优化

1. 静态资源压缩合并

2. 静态资源缓存

3. 使用 CDN 让资源加载更快

4. 使用 SSR 服务器渲染，数据直接输入到 html 中

渲染优化

1. css 放前面，`<script>`放后面

2. 懒加载

3. 减少 DOM 查询，做 DOM 查询缓存

4. 减少 DOM 操作，多个操作合并为一个

5. 事件节流

6. 尽早执行操作(如 DOMContentLoaded)

DOM 查询缓存实列

```javascript
//多次查询DOM组会造成性能的浪费
const items = document.querySelectorAll(".item");
const length = items.length;

for (let i = 0; i < length; i++) {
  //do something ...
}
```

DOM 合并插入

```javascript
const frag = document.createDocumentFragment();
for (let i = 0; i <= 10; i++) {
  const d = document.createElement("div");
  d.innerHTML = i;
  frag.appendChild(d);
}
document.body.appendChild(frag);
```

事件节流(事件 cd)

```html
<body>
  <button id="myid">click me</button>
  <script>
    function throttle(fn, delay) {
      let last = 0;
      return (...args) => {
        const now = new Date().getTime();
        if (now - last < delay) {
          return;
        }
        last = now;
        return fn(...args);
      };
    }

    const b = document.querySelector("#myid");
    b.addEventListener(
      "click",
      throttle(() => {
        console.log("you clicked me");
      }, 5000)
    );
  </script>
</body>
```

事件防抖(事件节流)

```javascript
  <body>
    <button id="myid">click me</button>
    <script>
      function debounce(fn,delay){
        let timeoutID
        return (...args) => {
          if(timeoutID) clearTimeout(timeoutID)
          timeoutID = setTimeout(() => {
            fn(...args)
          }, delay);
        }
      }

      const d = document.querySelector("#myid");
      d.addEventListener("click", debounce(()=>{
        console.log("clicked")
      },2000))
    </script>
  </body>
```

脚本尽快执行

```javascript
window.addEventListener("DOMCoentLoaded", () => {
  // do something
});
```

---

## <a id="tip-8">安全性</a>

XSS 不信任用户的输入。检查用户的特殊字符

XSRF 敏感的网络请求。要添加手机，邮箱验证码
