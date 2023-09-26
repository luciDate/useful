# Javascript 面试题收集

## 大纲

[什么是 javascript](#tip-0)

[值类型和表达式](#tip-1)

[原型和原型链](#tip-2)

[作用域和闭包](#tip-3)

[异步](#tip-4)

[常用 API](#tip-5)

[web API](#tip-6)

[页面优化](#tip-7)

[安全性](#tip-8)

[var 变量](#tip-9)

[模块化](#tip-10)

[Promise](#tip-11)

---

> 什么是 javascript

- 使用 ECMAScript 语法规范，外加 web API

- 两者结合，可以完成 DOM 操作，BOM 操作，事件绑定，Ajax 等大多数客户端操作

> 什么是 nodejs

- 使用 ESMAScript 语法规范，外加 nodejs API

- 两者结合，即可完成 http 处理，文件处理，等大多数 server 端操作

> 什么是 cookie

- 存储在浏览器的一段字符串（5kb）

- 跨域不共享

- 格式如 k1=v1,k2=v2 因此可以存储结构化数据

- 每次发送 http 请求，会将请求域的 cookie 发送给 server

- server 端可以修改 cookie 并返回浏览器

- 浏览器也可以通过 javascript 有限制的修改 cookie

> 什么是 session

- cookie 中存储 userId 来联动 server 端存储的用户信息

- 比如客户端留下一个 Math.random()的随机 userid,userid 对应一个全局变量 SESSION_DATA 的空对象,SESSION_DATA = {userid:{}},登录成功后会变为 SESSION_DATA = {username:'awwwk'},登录验证 if session 里的 username 即可

> session 的缺点

- session 是 nodejs 变量，放在 nodejs 进程内存中

- 如果访问量过大，内存会紧张

- 多线程中，进程之间的内存无法共享

---

## <a id="tip-1">值类型和表达式</a>

Q : typeof 能判断出哪些类型

A :

```javascript
let a = [];
let s = '233';

// typeof 只能判断值类型的变量
console.log(typeof s);
// instanceof 能判断引用类型的变量
console.log(a instanceof Array);
```

这一句能精准判断数据类型比如 Object.prototype.toString.call(async function) === '[object AsyncFunction]'

```javascript
return Object.prototype.toString.call(o) === '[object Object]';
```

---

Q : 何时使用 === 何时使用 ==

A :

```javascript
// 强制类型转换

//字符串拼接
let i = 100 + 10; // 110
let ii = 100 + '10'; // 10010

// ==运算符
100 == '100'; //100转换为字符串100 true
0 == ''; //0和空字符串都转换为false true
null == undefined; // true
100 === '100'; //false

// 可选连接符
const obj = {
  name: 'aza'
};
// console.log(obj.name.gg.zz); // 程序崩溃 Uncaught TypeError: Cannot read properties of undefined (reading 'zz')
console.log(obj.name?.gg); // 可选连接符 简化对可能为 null 或 undefined 的对象属性或方法的访问 避免程序崩溃

// if判断
let a = 100;
let b = '';

if (a) {
  console.log('x');
}

if (!b) {
  console.log('o');
}

console.log(10 && 'x'); //0
console.log('' || 'abc'); //abc
console.log(!window.abc); //true

let iii = 100;
console.log(!!a); //true
```

```javascript
// 除了用来判断一个变量是否是null或者undefined使用==。剩下的全部使用 ===

let obj = { b: 'b' };
if (obj.a == null) {
  console.log('x');
}
```

Q : 内置函数

A :

```javascript
new String();
new Number();
new Boolean();
new Array();
new Object();
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
let iii = { name: 'aza' };
let iv = iii;
iv.name = 'azazel';
console.log({ iii: `${iii.name}`, iv: `${iv.name}` });

let v = { phone: 188 };
// let vi = JSON.parse(JSON.stringify(v));
// 对象深拷贝
let vi = Object.assign({}, v);
vi.phone = 100;
console.log({ v: `${v.phone}`, vi: `${vi.phone}` });

// 数组转对象
const arr = [1, 2, 3, 4, 5];

const obj = { arr };

// {arr : [1, 2, 3]}
console.log(obj);
```

Q : 如何理解 JSON

A :

```javascript
// JSON和Math都是内置的对象，但不是函数
// JSON是内置对象JSON.parse(),JSON.stringify()也是一种数据格式{name:aza}
// 当浏览器显示[object]这种不清晰的数据类型时，可以尝试JSON.tostring()来解析它

//对象JSON
//键一般为字符串名称。值为指定值或者变量
const obj = { a: 100 };
//字符串JSON
const obji = '{"aza":888}';
```

表达式收集

```javascript
const i = 100;
//二元表达式
i && console.log('bingo');
//三元表达式
i ? console.log('233') : console.log('666');
// 多重三元表达式
function chain(value) {
  return value > 0 && value < 3 ? '1' : value > 3 && value < 6 ? '2' : 'null';
}
console.log(chain(5));

//while 循环
//一般用于不知道循环次数的情况。维持循环的是一个条件表达式，条件成立执行循环体，条件不成立退出循环。
let i = 1;

while (i <= 10) {
  console.log('x');
  i++;
}

//do while循环 先执行一次代码块。再按条件真假决定是否继续
let iii = 0;
do {
  console.log(iii);
  iii++;
} while (iii <= 5);

// i++ 和 ++i的区别
let iv = 10;
// 先赋值iv = 10 ,再进行运算. iv = 0 , iv = 11
iv++;

let v = 100;
// 先运算，再赋值。 v = 101 , v = 101
++v;

//展开符
function i(name, age) {
  return ((...arguments) => {
    console.log(name);
  })();
}
i('j', 12);

const arr = [1, 2, 3];
const arri = [4, 5, 6];
// 会复制数组的全部值，而不是整个数组
const remixArr = [...arr, ...arri];
console.log(remixArr);

//形参默认值

class People {
  constructor(name, age, aka = 'dahl') {
    this.name = name;
    this.age = age;
    this.aka = aka;
  }
  eat() {
    console.log(`${this.name} is eating`);
  }
  speak() {
    console.log(
      `my name is ${this.name} , i am ${this.age} year old , aka ${this.aka}`
    );
  }
}

const x = new People('aza', 18);
x.eat();
x.speak();

const i = 0;
//只返回一行，可以省略花括号
if (i === 0) console.log('233');

//箭头函数只有一个形参可以省略()
//只有一行可以省略{} 和 return
const i = (x) => x;
console.log(i('aza'));

//函数返回对象一些情况需要()包起来
const i = () => ({ x: 100 });
console.log(i());

//动态键名
const i = 'name';
const ii = {};
ii[i] = 'aza';
console.log(ii);

//捕获异常
// 尝试可能出现错误的代码。 捕获它让它不至于干扰程序运行
// 也可以运用于一些开源库。不让一些错误提示显示
function i() {
  const i = new Error('233');
  console.log(i);
}
try {
  i();
} catch (error) {
  console.log(error);
} finally {
  // ...
}

function funny() {
  try {
    // 原版Error 采用了 toString(),可以用解构查看具体内容
    throw new Error();
    console.log('233');
  } catch (err) {
    console.log({ err });
  }
}

funny();

//多重数组遍历;
const i = [1, 2, 3, 4, 5, 6, 7, 8, [1, 2, 3]];
//length要比index大1，所以用小于
for (let index = 0; index < i.length; index++) {
  if (i[index] instanceof Array) {
    for (let k = 0; k < i[index].length; k++) {
      console.log(i[index][k]);
    }
    //这个break有点讲究。能防止第一重循环再打印一次下标8
    break;
  }
  console.log(i[index]);
}

// 多重数组遍历
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [1, 2, 3]
];

arr.forEach(([one, two, three]) => {
  console.log([one, three]);
});
/*
[ 1, 3 ]
[ 4, 6 ]
[ 1, 3 ]
*/

//递归
const arr = [{ id: 1 }, { id: 2, child: [{ id: 3 }, { id: 4 }] }];

function fn(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    if (arr[i].child) {
      fn(arr[i].child);
    }
  }
}

fn(arr);

const routes = [
  { name: 'user', path: '/user', hide: true },
  {
    name: 'home',
    path: '/home',
    children: [{ name: 'admin', path: '/admin' }]
  },
  {
    name: 'details',
    path: '/details',
    children: [
      { name: 'id-1', path: '/id-1' },
      { name: 'id-2', path: '/id-2' },
      { name: 'id-3', path: '/id-3' },
      {
        name: 'id-4',
        path: '/id-4',
        children: [{ name: 'id-4-1', hide: true, path: '/id-4-1' }]
      }
    ]
  }
];

//过滤掉数组中hide:true和子数组hide:true
function formatData(data) {
  const arr = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].name && data[i].children && !data[i].hide) {
      let newItem = { ...data[i] };
      if (data[i].children && !data[i].children.hide) {
        newItem.children = formatData(data[i].children);
      }
      arr.push(newItem);
    } else if (!data[i].children && !data[i].hide) {
      arr.push(data[i]);
    }
  }
  return arr;
}

console.log(formatData(routes));

const arr = [
  { name: 'aran' },
  { phne: 188 },
  { email: [{ id: 1, email: [{ id: 11 }] }, { id: 2 }, { id: 3 }] }
];

function recursion(arr, level = 0, pid = '') {
  return arr.map((item) => {
    item.level = level;
    item.pid = pid;
    if (item.email && item.email.length > 0) {
      item.email = recursion(item.email, level + 1, item.id);
    }
    return item;
  });
}

console.log(recursion(arr));

//条件判断
const a = 100;
//视条件是否发生
function aza(num) {
  if (num === 100) console.log(666);
  console.log('still happend');
}
//条件2选1
function azai(num) {
  if (num === 100) {
    console.log(666);
  } else {
    console.log(000);
  }
}
//条件3选1
function azaii(num) {
  if (num === 100) {
    console.log(100);
  } else if (num === 200) {
    console.log(200);
  } else {
    console.log(300);
  }
}

//对象双重解构
const item = { id: 1, title: '华为 Mate 20', price: 3999, inventory: 2 };
const number = 3;
// item = item , number = number
const itemPuls = { item, number };
console.log(itemPuls);

//解构item里面的id
function i({ item: { id }, number }) {
  console.log(id);
  console.log(number);
}

i(itemPuls);
// 数组对象双重解构
const obj = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' }
];

const [{ id }] = obj;

// 数组多个值解构
const obj = { name: 'awwwk', phone: 188 };
// [ [ 'name', 'awwwk' ], [ 'phone', 188 ] ]
// key 解构的是第一个参数 value第二个
const remixObj = Object.entries(obj).map(([key, value]) => {
  return { key: key, value: value };
});

console.log(remixObj);

console.log(id);

// 数组与对象合并
const arri = [{ id: 1, name: 'a' }];
const arrii = { a: [1, 2, 3] };
let resolve = [];

arri.forEach((item) => {
  const { id, name } = item;
  const temp = arrii[name];
  resolve.push({
    id,
    name: [name, temp]
  });
});
console.log(resolve);
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
    console.log(`my name is ${this.name} , i am ${this.age} year old`);
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

let aza = new Student('aza', 18, 188);
aza.study();
aza.eat();
```

面试装逼版。原型继承实现链式操作

```html
<body>
  <div id="test"></div>
  <script>
    //改变html内容，添加链式操作，添加事件
    class Element {
      constructor() {
        this.el = document.getElementById('test');
      }
      html(val) {
        if (val) {
          this.el.innerText = val;
          return this;
        } else {
          return this.el.innerText;
        }
      }
      on(type, fn) {
        this.el.addEventListener(type, fn);
      }
    }

    const e = new Element();
    e.html('666').on('click', () => {
      console.log('666');
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
// str --> new String() --> new Object() --> null
class Foo {
  constructor(name) {
    this.name = name;
  }
  alertName() {
    alert(this.name);
  }
}

let f = new Foo('aza');
f.alertName();
f.toString();
```

Q : 判断数据是否是自身的 key 而不是原型链上的 key class 防继承关系 extend

```javascript
model.hasOwnProperty(key);
```

Q : 描述 new 一个对象的过程

A :

1. 创建一个新对象
2. this 指向这个新对象
3. 对 this.赋值
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

```javascript
// promise 的上下文会执行全部代码块再resolve
function tryc() {
  const obj = { name: 'aran' };
  return new Promise((resolve, reject) => {
    resolve(obj);
    try {
      obj.phone = 188;
    } catch (error) {
      throw new Error(error);
    }
  });
}

tryc().then((x) => {
  // {name: 'aran', phone: 188}
  console.log(x);
});
```

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
  const t = document.querySelector('#test');
  t.addEventListener('click', function () {
    console.log(this);
  });

  function callName(name) {
    console.log(name);
    console.log(this);
  }

  //立刻执行函数，并且改变this，向函数传参
  callName.call({ a: 100 }, 'aza');
</script>
```

Q : 创建 10 个`<a>`标签，点击弹出序号

A :

```javascript
const ul = document.createElement('ul');

for (let i = 1; i <= 10; i++) {
  const li = document.createElement('li');
  li.innerHTML = i;
  li.classList.add('item');
  ul.appendChild(li);
}

ul.addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    console.log(e.target.innerHTML);
  }
});

//window指的是一个浏览器窗口
document.body.appendChild(ul);
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

```javascript
// 闭包漏洞

// 自执行函数，故返回的是Object
const o = (() => {
  const obj = {
    a: 1,
    b: 2
  };
  // 这里return一个对象非常蠢
  return {
    get: (n) => {
      // 禁止原型链修改
      if (!obj.hasOwnProperty(n)) {
        throw new Error('bad request');
      }
      return obj[n];
    }
  };
})();

console.log(typeof o);
console.log(o.get('a'));
// 拿到闭包对象
const remixObj = o;
remixObj.c = 3;
console.log(o.get('c'));
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
const month = d.getMonth() + 1;
const day = d.getDate();

const dateStr = `${year}-${month}-${day}`;
console.log(dateStr);
```

Q : 获取随机数，要求长度是一致的字符串格式

```javascript
const temp = '0000000000';
const n = Math.random();
const tempN = n + temp;
const i = tempN.slice(0, 10);
console.log(i);
```

Q : 写一个能遍历对象和数组的 forEach 函数

```javascript
function formatEach(type, fn) {
  if (type instanceof Array) {
    type.forEach((item, index) => {
      fn(index, item);
    });
  } else {
    for (let key in type) {
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

Q : 写一个切换 class

```html
<style>
  .test {
    color: red;
  }
  .test.active {
    color: blue;
  }
</style>
</head>
<body>
<button class="test">click me</button>
<script>
  const t = document.querySelector(".test");

  t.addEventListener("click", () => {
    t.classList.toggle("active");
  });

</script>
</body>
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
d.getHours();
d.getMinutes();
d.getSeconds();
```

字符串

```javascript
const str = 'helloWorld';
const result = str.indexOf('hello');
//找到返回下标，同样适用于数组
//没有返回-1
console.log(result);

const arr = ['1', '2', '3'];
arr.indexOf('1'); // 0

//字符串反转
const h = 'hello,vue';
const hh = h.split('').reverse().join('');
console.log(hh);

// 字符串截取
const str = 'www.baidu.com/dir';
const i = str.substr(13, 4);
console.log(i);
// 字符串替代
const ss = 'www.baidu.com';
// 替换返回的第一个匹配
const ssremix = ss.replace('.', ',');
// 替换所有匹配
const ssremixi = ss.replace(/\./g, ',');
console.log(ssremix);
console.log(ssremixi);

//url拼接
const url = '/api/dashboard/chart';
const name = url.split('/api/')[1].split('/').join('_');
console.log(name);

//字母转小写
const str = 'XIxi';
const newStr = str.toLowerCase();
console.log(newStr);

//字符串数字互转
let i = '6';
//字符串转数字
let ii = +i;
console.log(typeof ii);
let iii = ii.toString();
console.log(typeof iii);
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
const i = 6.6666;
const ii = 1.1111;
const iii = i + ii;
//结果竟然是7.777699999999999
console.log(parseFloat(iii).toFixed(2));
```

数组

```javascript
const arr = [1, 2, 3, 4, 5];

//一般遍历
arr.forEach((item, index) => {
  console.log(`${index} -- ${item}`);
});

//打断遍历
const arr = [1, 2, 3, 4, 5, 6];

for (let index = 0; index < arr.length; index++) {
  if (arr[index] == 5) break;
  console.log(arr[index]);
}

//item检查

//每一个都是2返回true
const result = arr.every((item, index) => {
  if (item == 2) {
    return true;
  }
});
console.log(result);
//只有一个是2返回false
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

// map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。

arrMap = arr.map((item, index) => {
  return `<span>${item}</span>`;
});

var numbers = [4, 9, 16, 25];

function myFunction() {
  x = document.getElementById('demo');
  x.innerHTML = numbers.map(Math.sqrt);
}

// 2,3,4,5

//映射结构

const arr = [1, 2, 3];

// 返回一个对象需要括号包起来
const remixArr = arr.map((item) => ({ item: item }));

console.log(remixArr);

//数组转字符串
console.log(arrMap.join(''));

//过虑
arrFilter = arr.filter((item, index) => {
  if (item % 2 == 0) {
    return true;
  }
});
console.log(arrFilter);

//找到符合条件的并返回第一个
const arr = [1, 2, 3, 4, 5, 6];
const result = arr.find((item) => {
  return item > 4;
});
console.log(result);

//数组深拷贝可以玩点花活 数组扁平化
const arr = [1, 2, 3, [4, 5, 6]];
function recursion(arr) {
  return [].concat(
    ...arr.map((item) => {
      if (item instanceof Array) {
        recursion(item);
      }
      return item;
    })
  );
}

console.log(recursion(arr));

let arr = [1, 2, 3, 4, 5];
//当前下标1开始，删除一个，再添加9，也就是替换了
arr.splice(1, 1, 9);
console.log(arr);
//下标0，删除0个,添加8
arr.splice(0, 0, 8);
console.log(arr);
```

类数组转数组操作与数组添加删除

```html
<body>
  <div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
  </div>
  <script>
    const c = document.querySelector('.container');
    let items = [...document.querySelectorAll('.item')];
    const item = document.createElement('div');

    item.className = 'item';
    item.innerHTML = 'new';
    items.splice(2, 0, item);
    let length = items.length;

    //相同dom节点会自行替换
    for (let i = 0; i < length; i++) {
      c.appendChild(items[i]);
    }
  </script>
</body>
```

对象

```javascript
const obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
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

// 对象统计
const obj = {
  a: '1,2,3,4,5,6',
  b: '1,2'
};
const objRemix = {};

for (const key in obj) {
  const sl = obj[key].split(',').length;
  objRemix[key] = sl;
}
console.log(objRemix);
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
    const t = document.querySelector('#test');
    console.log(t.getAttribute('data-index'));
    t.setAttribute('data-index', 1);
    console.log(t.getAttribute('data-index'));

    t.style.border = 'solid 1px blue';
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
    const c = document.querySelector('.container');
    const i = document.querySelectorAll('.item')[2];
    const li = document.createElement('li');
    li.classList.add('item');
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

获取 tagName

```html
<body>
  <div class="test">
    <input type="text" value="666" />
  </div>

  <script>
    const i = document.querySelector('.test');
    const ii = document.getElementsByTagName('input');
    console.log(i.tagName);
    console.log(ii[0].value);
  </script>
</body>
```

Q : BOM 操作

检查浏览器

```javascript
//检查 url
const ua = navigator.userAgent;
const isChrome = ua.indexOf('Chrome');
console.log(isChrome);
```

```html
<body>

    //返回屏幕可用的宽高
    console.log(window.screen.width);
    console.log(window.screen.height);

    //返回文档窗口可用的宽高
    console.log(window.innerWidth);
    console.log(window.innerHeight);

    //网页宽高
    console.log(document.documentElement.clientWidth);
    console.log(document.documentElement.clientHeight);

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

    // 改变窗口url
    t.addEventListener("click", () => {
      location.href = "https://www.baidu.com?name=aza&password=xixi";
    });

    // 指定地址打开新窗口
    x.addEventListener("click", () => {
      window.open("http://www.baidu.com");
    });

    //url字符串转对象
    const i = location.search;
    const temp = i.split("?")[1].split("&");
    console.log(temp);

    const obj = {};
    for (let index = 0; index < temp.length; index++) {
      const ii = temp[index].split("=");
      console.log(ii);
      obj[ii[0]] = ii[1];
    }
    console.log(obj);
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
    const a = document.querySelector('.test');
    const d = document.querySelector('.testi');
    a.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('bingo');
    });

    function formatEvent(el, type, fn) {
      //函数本身没有e可以从外部把e传过来
      el.addEventListener(type, fn);
    }

    formatEvent(d, 'click', (e) => {
      e.preventDefault();
      console.log('233');
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
  const c = document.querySelector('.container');
  c.addEventListener('click', (e) => {
    if (e.target.classList.contains('item')) {
      console.log(e.target.innerHTML);
    }
  });
</script>
```

事件代理双向版与通用事件绑定函数

```html
<body>
  <div class="container">
    <p class="item" id="no-proxy">激活</p>
    <p class="item">取消</p>
    <p class="item">取消</p>
    <p class="item">取消</p>
    <p class="item">取消</p>
  </div>
  <script>
    const c = document.querySelector('.container');
    const noProxy = document.querySelector('#no-proxy');

    //第三个参数选择是否代理
    function formatEvent(elem, type, proxy, fn) {
      //参数做一下兼容
      if (fn == null) {
        fn = proxy;
        proxy = null;
      }
      elem.addEventListener(type, (e) => {
        if (proxy) {
          //校验触发dom
          if (e.target.classList.contains(proxy)) {
            fn.call(e.target);
          }
        } else {
          fn(e);
        }
      });
    }

    //如果addEventListener要精准this是不能使用箭头函数的，箭头默认没this，如果使用this会向上下文去寻找
    formatEvent(c, 'click', 'item', function () {
      console.log(this.innerText);
    });
    formatEvent(noProxy, 'click', function (e) {
      e.stopPropagation();
      console.log(noProxy.innerText);
    });
  </script>
</body>
```

跨域

1. 浏览器有同源规则。不允许 ajax 访问其他域接口
2. 跨域条件 : 协议，域名，端口，有一个不同就算跨域
3. 有三个标签可以允许跨域`<img>`,`<link>`,`<script>`
4. JSONP 也可以利用回调函数允许跨域

```html
<script>
  function callback(data) {
    //这里是我门获取的跨域信息
    console.log(data);
  }
</script>

<script src="xxx.com/api.js">
  //通过script标签跨域加载js文件 js文件返回一个函数
  //callback({a:100,b:200})
</script>
```

跨域可执行版本

```html
<body>
  <div id="test-jsonp"></div>
  <script>
    //先定义函数再执行JSONP跨域。不然程序会找不到函数定义
    function refreshPrice(data) {
      const p = document.querySelector('#test-jsonp');
      p.innerText = '当前价格' + data['0000001'].name + data['0000001'].price;
    }
  </script>
  <script src="http://api.money.126.net/data/feed/0000001,1399001?callback=refreshPrice"></script>
  <!-- 标签返回一个函数 refreshPrice({"0000001":{"code": "0000001", ... }) -->
</body>
```

实现 CORS 通信的关键是服务器。只要服务器实现了 CORS 接口，就可以跨源通信

本地存储

```javascript
//key设定要使用字符串格式
localStorage.setItem('name', 'aza');
localStorage.setItem('phone', '188');
console.log(localStorage.getItem('name'));

localStorage.removeItem('name');
console.log(localStorage.getItem('phone'));

localStorage.clear();
```

手写一个 ajax

```javascript
// 设置请求方法和 URL
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://jsonplaceholder.typicode.com/posts/1', true);
// 发送请求
xhr.send();
// 处理响应
xhr.onload = () => {
  if (xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.error(`request fail: ${xhr.status}`);
  }
};
```

---

## <a id="tip-7">页面优化</a>

Q : 输入 url 到得到 html 的过程

A :

1. 浏览器根据 DNS 服务器得到域名地址,建立 TCP 连接(询问服务器是否可用)，发送 http 请求 请求的头部告诉服务端客户端是什么样子的，有什么信息，有什么要求
2. server 端收到 http 请求，处理并返回
3. 客户端收到返回数据，开始渲染页面
   > 请求头可以向 server 端描述客户端有什么要求有什么信息

Q : 浏览器渲染页面过程

A :

1. 根据 HTML 生成 DOM 树
2. 根据 CSS 生成 CSSOM
3. 将 DOM 和 CSSOM 结合生成 RenderTree
4. 根据 RenderTree 开始渲染和展示
5. 遇到`<script>`会阻塞渲染

Q : widnow.onload 和 DOMContentLoaded 的区别

1. 页面全部资源加载才执行，包括图片，视频
2. DOM 渲染后即可执行

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
const items = document.querySelectorAll('.item');
const length = items.length;

for (let i = 0; i < length; i++) {
  //do something ...
}
```

DOM 合并插入

```javascript
//createDocumentFragment() 需要appendchild 一个真实的DOM不是innerHTML
const frag = document.createDocumentFragment();
for (let i = 0; i <= 10; i++) {
  const d = document.createElement('div');
  d.innerHTML = i;
  frag.appendChild(d);
}
document.body.appendChild(frag);
```

事件节流(事件 cd)

```html
<body>
  <button id="test">click me</button>
  <script>
    const btn = document.querySelector('#test');

    function throttle(fn, delay) {
      let flag = false;
      return (...args) => {
        if (!flag) {
          flag = true;
          fn();
          setTimeout(() => {
            flag = false;
          }, delay);
        }
      };
    }

    btn.addEventListener(
      'click',
      throttle(() => {
        console.log('clicked');
      }, 5000)
    );
  </script>
</body>
```

事件防抖

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

---

## <a id="tip-8">安全性</a>

XSS 不信任用户的输入。检查用户的特殊字符

XSRF 敏感的网络请求。要添加手机，邮箱验证码

## <a id="tip-9">var 变量</a>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <ul class="list">
      <li class="item">1</li>
      <li class="item">2</li>
      <li class="item">3</li>
      <li class="item">4</li>
      <li class="item">5</li>
      <li class="item">6</li>
    </ul>
    <script>
      // 闭包只能在函数里面return function
      //自执行函数 (function(){}())

      const items = document.querySelectorAll('.item');
      for (var i = 0; i < items.length; i++) {
        items[i].addEventListener(
          'click',
          ((n) => {
            return () => {
              console.log(n);
            };
          })(i)
        );
      }
    </script>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      //普通函数的this指向window。绑定self为this
      const video = {
        title: 'a',
        tags: ['a', 'b', 'c'],
        showTags() {
          var self = this;
          this.tags.forEach(function (item) {
            console.log(`${self.title}  -- ${item}`);
          });
        }
      };

      video.showTags();

      const list = {
        title: 'a',
        tags: ['1', '2', '3'],
        showTags() {
          this.tags.forEach(
            function (item) {
              console.log(`${this.title} -- ${item}`);
            }.bind(this)
          );
        }
      };

      list.showTags();
    </script>
  </body>
</html>
```

---

## <a id="tip-10">模块化</a>

> commonjs 中的模块化

```javascript
// 导出
module.exports = { a, b };

// 导入
const { a, b } = require('./test.js');

const _ = require('lodash');
```

> es6 模块化

```javascript
// 导出
export default a
export {a,b}

// 导入
import a from 'test.js'
import {a,b as bb} from 'test.js'

//html 模块化导入
<script type="module" src="./test.js">
```

<a id="tip-11">Promise</a>

> 什么是回调函数

- nodejs 有大量的非阻塞 io，这些非阻塞 io 的结果是需要通过回调函数莱获取的

```javascript
// promise 取值
const pm = new Promise((resolve, reject) => {
  resolve({ name: 'aza' });
});

pm.then((payload) => {
  console.log(payload);
});

// 异常捕获
function interview(callback) {
  // 注意 主函数interview 与 setTimeout里的焊条函数完全不在一个调用栈上，所以trycatch不能捕获到回调函数发现的error
  setTimeout(() => {
    if (Math.random() < 0.5) {
      callback(null, 'suceess');
    } else {
      callback(new Error('fail'));
      // 异步任务是不能够被外面的trycatch捕获的
      // throw new Error('fail');
    }
  }, 1000);
}

// 链式
interview(function (err) {
  if (err) {
    return console.log('cry at 1st round');
  }
  interview(function (err) {
    if (err) {
      return console.log('cry at 2nd round');
    }
    interview(function (err) {
      if (err) {
        return console.log('cry at 3rd round');
      }
      console.log('smile');
    });
  });
});

// 异常捕获
// interview(function (res) {
//   // nodejs规定了一个写回调函数的规范，所有error都作为第一个参数以及第一个判断
//   if (res) {
//     return console.log('cry');
//   }
//   console.log('smile');
// });

// try {
//   interview(function () {
//     console.log('smlie');
//   });
// } catch (e) {
//   console.log('cry', e);
// }
```

> 什么是 Promise

- Promise 是一种异步编程解决方案，其本身也是一个异步函数

- resolve 会回调后面第一个.then

- reject 会回调第一个.catch

- 任何一个 reject 状态且后面的.catch 的 promise，都会造成浏览器或者 node 环境的全局错误，全局错误就意味着程序崩溃

- 执行 then 和 catch 会返回一个新的 promise，该 promise 最终状态根据 then 和 catch 的回调函数的执行结果决定

  - 如果回调的是 throw，该 promise 是 reject 状态

  - 如果回调的是 return 该 promise 是 resolve 状态

  - 但如果 return 了一个 promise，该 promise 会和回调函数 return 的 promise 状态保持一致

```javascript
// basic
(function () {
  const promise = interview();
  promise
    .then((res) => {
      console.log('smile');
    })
    .catch((e) => {
      console.log('cry');
    });

  function interview() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('success');
        } else {
          reject(new Error('fail'));
        }
      }, 1000);
    });
  }
})();
```

```javascript
(function () {
  function errhandler(falg) {
    return new Promise((resolve, reject) => {
      // 根据实参改变error捕获场景
      if (falg === 0) {
        reject(new Error('fail'));
      }
      throw new Error('bad');
    });
  }

  try {
    errhandler(1)
      .then((resolve) => {})
      .catch((e) => {
        //
        console.log(e);
      });
  } catch (e) {
    console.log(e);
  }
})();
```

```javascript
// state
(function () {
  const promise = interview();
  const promisei = promise.catch((res) => {
    return 'accept';
  });

  setTimeout(() => {
    console.log(promise);
    console.log(promisei);
  }, 800);

  function interview() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 必须错误
        if (Math.random() > 1) {
          resolve('success');
        } else {
          reject(new Error('fail'));
        }
      }, 500);
    });
  }
})();
```

```javascript
// state-i

(function () {
  const promise = interview();
  const promisei = promise.then((res) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('accept');
      }, 400);
    });
  });

  // 查看未完成promise的状态
  setTimeout(() => {
    console.log(promise);
    console.log(promisei);
  }, 800);

  // 检查完成promise的状态
  setTimeout(() => {
    console.log(promise);
    console.log(promisei);
  }, 1000);

  function interview() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 必须成功
        if (Math.random() > 0) {
          resolve('success');
        } else {
          reject(new Error('fail'));
        }
      }, 500);
    });
  }
})();
```

```javascript
// chainType
(function () {
  const promise = interview(1)
    .then(() => {
      return interview(2);
    })
    .then(() => {
      return interview(3);
    })
    .then(() => {
      console.log('smile');
    })
    .catch((err) => {
      console.log('cry at ' + err.round + ' round');
    });

  function interview(round) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 8成成功
        if (Math.random() > 0.2) {
          resolve('success');
        } else {
          const error = new Error('fail');
          error.round = round;
          reject(error);
        }
      }, 500);
    });
  }
})();
```

```javascript
// concurrency
(function () {
  Promise.all([interview('geekbang'), interview('tencent')])
    .then(() => {
      // 同时成功
      console.log('smile');
    })
    .catch((err) => {
      // 第一个失败就触发
      console.log('cry for ' + err.name);
    });

  function interview(name) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 8成成功
        if (Math.random() > 0.2) {
          resolve('success');
        } else {
          const error = new Error('fail');
          error.name = name;
          reject(error);
        }
      }, 500);
    });
  }
})();
```

> asnyc 和 await

- async function 是一个 return Promise 的普通函数，是一种 promise 语法糖

```javascript
console.log(async function () {
  return 4;
});

console.log(function () {
  return new Promise((resolve, reject) => {
    resolve(4);
  });
});
```

```javascript
// chainType
(async function () {
  try {
    await interview(1);
    await interview(2);
    await interview(3);
  } catch (e) {
    // 这里的return用来打断
    return console.log('cry at ' + e.round);
  }
  console.log('smile');
})();

function interview(round) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 8成成功
      if (Math.random() > 0.2) {
        resolve('success');
      } else {
        const error = new Error('fail');
        error.round = round;
        reject(error);
      }
    }, 500);
  });
}
```

```javascript
//concurrency
(async function () {
  try {
    await Promise.all([interview(1), interview(2), interview(3)]);
  } catch (e) {
    // 这里的return用来打断
    return console.log('cry at ' + e.round);
  }
  console.log('smile');
})();

function interview(round) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 8成成功
      if (Math.random() > 0.2) {
        resolve('success');
      } else {
        const error = new Error('fail');
        error.round = round;
        reject(error);
      }
    }, 500);
  });
}
```
