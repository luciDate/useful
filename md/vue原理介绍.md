## [MVVM](#tip-1)

## [响应式视图](#tip-2)

## [虚拟 DOM](#tip-3)

## [diff 算法](#tip-4)

## [模板编译](#tip-5)

## [阶段小结](#tip-6)

## [前端路由](#tip-7)

---

<a id="tip-1">MVVM</a>

M 表示 model（模型）V 表示 view（视图），VM 表示 viewmodel

简单来说就是数据操作视图

---

<a id="tip-2">响应式</a>

vue 实现响应式的核心 api 是 Object.defineProperty

Object.defineProperty 基本用法 （通知浏览器数据已变化）

```javascript
const data = {};
let name = "zhangsan";

//设置data的一个属性键为"name",值为“zhangsan”
Object.defineProperty(data, "name", {
  get: function () {
    console.log("get");
    return name;
  },
  //设置data旧值换新值
  set: function (newVal) {
    console.log("set");
    name = newVal;
  },
});

console.log(data.name);
data.name = "list";
console.log(data.name);
```

深度监听之对象版本

```javascript
function updateView() {
  console.log("视图更新");
}

function defineReactive(target, key, value) {
  //深度监听observer
  observer(value);

  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      //深度监听
      observer(newValue);

      if (newValue !== value) {
        //注意，value一直存在闭包中，此处设置完成后，再get也能获取最新的值
        value = newValue;
        updateView();
      }
    },
  });
}

function observer(target) {
  if (typeof target !== "object" || target === null) {
    return target;
  }

  for (let key in target) {
    defineReactive(target, key, target[key]);
  }
}

const data = {
  name: "zhangsan",
  age: 20,
  info: {
    address: "北京",
  },
};

//把data扔进observer中data就已经是响应式数据了
observer(data);

//一级属性情况下只能监听到
data.name = "list";
data.age = 21;
console.log("age", data.age);
//二级属性正常情况无法监听
data.info.address = "上海";
data.age = { num: 21 };
//新增或删除一个没有的属性，无法触发更新
//所以在使用vue设置data的新属性或者删除属性时需要使用Vue.set,Vue.delete这两个api
data.x = "100";
//delete data.name;
```

深度监听之数组版

```javascript
function updateView() {
  console.log("视图更新");
}

const oldArrayProperty = Array.prototype;
//创建新对象，原型指向 oldArrayProperty,再扩展方法不会影响原型
const arrProto = Object.create(oldArrayProperty);

["push", "pop", "shift", "unshit", "splice"].forEach((methodName) => {
  arrProto[methodName] = function () {
    updateView();
    oldArrayProperty[methodName].call(this, ...arguments);
  };
});

function defineReactive(target, key, value) {
  //深度监听observer
  observer(value);

  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      //深度监听
      observer(newValue);

      if (newValue !== value) {
        //注意，value一直存在闭包中，此处设置完成后，再get也能获取最新的值
        value = newValue;
        updateView();
      }
    },
  });
}

function observer(target) {
  if (typeof target !== "object" || target === null) {
    return target;
  }

  if (Array.isArray(target)) {
    target.__proto__ = arrProto;
  }

  for (let key in target) {
    defineReactive(target, key, target[key]);
  }
}

const data = {
  name: "zhangsan",
  age: 20,
  info: {
    address: "北京",
  },
  nums: [10, 20, 30],
};

//把data扔进observer中data就已经是响应式数据了
observer(data);

//一级属性情况下只能监听到
data.name = "list";
data.age = 21;
console.log("age", data.age);
//二级属性正常情况无法监听
data.info.address = "上海";
data.age = { num: 21 };
//新增或删除一个没有的属性，无法触发更新
//所以在使用vue设置data的新属性或者删除属性时需要使用Vue.set,Vue.delete这两个api
data.x = "100";
//delete data.name;
//正常情况下Object.defineProperty()是无法监听数组的
data.nums.push(4);
```

<a id="tip-3">虚拟 DOM</a>

用 JavaScript 模拟 DOM 结构，计算出最小变更，操作 DOM

```html
<div id="div1" class="container">
  <p>vdom</p>
  <ul style="font-size: 20px">
    <li>a</li>
  </ul>
</div>
```

```javascript
const list = {
  tag: "div",
  props: {
    className: "container",
    id: "div",
  },
  children: [
    {
      tag: "p",
      //有innerHTML就放在children里就行了
      children: "vdom",
    },
    {
      tag: "ul",
      props: { style: "font-size:20px" },
      children: [{ tag: "li", children: "a" }],
    },
  ],
};
```

<a id="tip-4">diff 算法</a>

以 snabbdom 为列子

- 比如一个虚拟 dom 的更新

> 只比较同一层级，不跨级比较

> tag 不同，则直接删除重建，不再进行深度比较

> tag 和 key，两者相同，则认为是相同节点，不在深度比较

- h 函数

> 返回一个对象即 vnode 数据结构

```javascript
// sel 就是选择器
return vnode(sel, data, children, text, undefined);
```

- patch 函数

> 创建一个空的 vnode 关联到一个真的 dom

> 用新的 vnode 代替旧的 vnode

> tag 不同，则直接删除重建，不再进行深度比较,tag 和 key，两者相同，则认为是相同节点，不在深度比较

> 比如两个 dom 都有 children，新的有 children 旧的没有就执行添加，新的 children 没有，而旧的 dom 有则执行删除

- updateChildren 函数

> 用 key 做两个 dom 中子元素的对比，如果发生变化只是移动，而不是删除插入，key 不能为随机数或者数组下标，会引起排序错误

<a id="tip-5">模板编译</a>

- 过程

> 前置知识,javascript 的 with 语法

> 模板到 render 函数，再到 vnode，再到渲染更新

with 基本语法

```javascript
const obj = { a: 1, b: 2 };
//使用with，能改变{}内变量的查找方式，将{}内的自由变量，当作obj的属性来查找
with (obj) {
  console.log(a);
  console.log(b);
}
```

<a id="tip-6">阶段小结</a>

- 初次渲染的过程

> 解析模板为 render 函数（或者再开发环境中完成，vue-loader）

> 触发响应式，监听 data 属性 getter 和 setter

> 执行 render 函数，生成 vnode，path

```html
<body>
  <p>{{message}}</p>
  <script>
    export default {
      data() {
        return {
          //被模板使用会触发get
          message: "hello",
          //不会触发get,因为没有被模板用到。和视图没关系
          city: "北京",
        };
      },
    };
  </script>
</body>
```

- 更新过程

> 修改 data，触发 setter（此前再 getter 中已被监听）

> 重新执行 render 函数，生成 newVnode

> patch(vnode,newNode)

- 组件是异步渲染的

> 汇总 data 的修改，一次性更新视图

> 减少 DOM 操作次数，提高性能

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  </head>
  <body>
    <div id="app">
      <ul ref="ul1">
        <li v-for="(item,index) in  list" :key="index">{{item}}</li>
      </ul>
      <button @click="addItem">添加一项</button>
    </div>
    <script>
      const app = new Vue({
        el: "#app",
        data: {
          list: ["a", "b", "c"],
        },
        methods: {
          addItem() {
            this.list.push(`${Date.now()}`);
            this.list.push(`${Date.now()}`);
            this.list.push(`${Date.now()}`);

            //const ulElem = this.$refs.ul1
            //console.log(ulElem.childNodes.length)
            //得出结果是3，因为vue的组件是异步渲染的

            // $nextTick函数可以等待DOM渲染完成之后在回调结果
            // 页面渲染的时候，会将data的修改做出整合，多次修改只会渲染一次
            this.$nextTick(() => {
              const ulElem = this.$refs.ul1;
              console.log(ulElem.childNodes.length);  
            });
          },
        },
      });
    </script>
  </body>
</html>
```

<a id="tip-7">前端路由</a>

- 前端路由原理

> hash 的变化会触发页面的跳转，即浏览器的前进和后退

> hash 变化不会刷新页面，SPA 必须的特点

> hash 永远不会提交到 server 端

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <p>hash test</p>
    <button id="btn-1">修改hash</button>

    <script>
      //hash的变化包括
      //javascript修改url
      //手动修改url的hash
      //浏览器前进，后退
      //这些操作都不会触发浏览器的刷新
      window.onhashchange = (event) => {
        console.log("old url", event.oldURL);
        console.log("new url", event.newURL);

        console.log("hash:", location.hash);
      };

      document.addEventListener("DOMContentLoaded", () => {
        console.log("hash:", location.hash);
      });

      document.getElementById("btn-1").addEventListener("click", () => {
        location.href = "#/user";
      });
    </script>
  </body>
</html>
```
