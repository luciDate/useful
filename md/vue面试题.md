- v-show 与 v-if 有什么区别

> v-show 通过 css display 控制隐藏和显示

> v-if 是组件的渲染和销毁，而不是显示隐藏

> 频繁切换显示状态用 v-show,否则 v-if

---

- 什么 v-for 中使用 key

> 必须使用 key，且不能是 index 和 random

> diff 算法中通过 tag 和 key 来判断，是否是相同的节点

> 减少渲染次数，提升渲染性能

---

- vue 生命周期

> 包括 beforeCreate,created. beforeMount,mounted. beforeUpdate,updated. beforeDestroy,destroyed

> created 是 vue 实例已经初始化成功，而 mounted 是组件挂载，页面开始渲染。ajax 操作中因为放在 created 中因为 javascript 是单线程如果请求变多，页面的白屏时间会变长，所以一般放在 mounted 中

> 生命周期顺序。 以 index 为父组件 list 为子组件为列子。

> 创建阶段 index created --> list created --> list mounted --> index mounted 父组件开始渲染等待子组件渲染完毕后才完成渲染

> 更新阶段 index beforeUpdate --> list beforeUpdate --> list updated --> index updated

> 卸载阶段 index beforeUpdate --> list destroyed --> index updated

- 组件如何通讯

> 父子组件中的 props 和 this.$emit

> vuex

- 渲染组件渲染和更新过程

> 初次渲染过程。解析模板为 render 函数，触发响应式，监听 data 属性的 geeter 和 setter，执行 render 函数，生成 vnode，path

> 更新过程。修改 data，触发 setter，重新执行 render 函数，生成 vnode。

---

- v-model 的实现原理

单组件

```html
<template>
  <div id="app">
    <custom-model></custom-model>
  </div>
</template>

<script>
  import CustomModel from "./components/CustomModel.vue";

  export default {
    name: "App",
    components: { CustomModel },
  };
</script>

<style></style>
```

父子组件

```html
<template>
  <div id="app">
    <p>{{name}}</p>
    <custom-model v-model="name" :name="name"></custom-model>
  </div>
</template>

<script>
  import CustomModel from "./components/CustomModel.vue";

  export default {
    name: "App",
    components: { CustomModel },
    data() {
      return {
        name: "aza",
      };
    },
  };
</script>

<style></style>
```

```html
<template>
  <div>
    <input
      type="text"
      :value="name"
      @input="$emit('inputChange', $event.target.value)"
    />
  </div>
</template>

<script>
  export default {
    model: {
      props: "name",
      event: "inputChange",
    },
    props: {
      name: {
        type: String,
      },
    },
  };
</script>

<style></style>
```

- MVVM

> M 表示模型 V 表示 view VM 表示 viewmodel 就是数据操作视图的意思

- computed 特点

> 缓存数据，如果数据不变不会重新计算，提高性能

- 为什么组件的 data 必须是一个函数

> 维护一份单独的数据，让组件的数据留在闭包当中

- 多个组件有相同的逻辑如何抽离

> mixin 可以将组件共用的 methods 和 data 公用到其他组件

```html
<template>
  <div>
    <p>{{ name }} -- {{ major }} -- {{ city }}</p>
    <button @click="showName">显示姓名</button>
  </div>
</template>

<script>
  import myMixin from "./mixin";
  export default {
    // 可以添加多个，会自动合并起来
    mixins: [myMixin],
    data() {
      return {
        name: "aza",
        major: "webDesign",
      };
    },
    methods: {},
    mounted() {
      console.log("component mounted", this.name);
    },
  };
</script>

<style></style>
```

mixin.js

```javascript
export default {
  data() {
    return {
      city: "北京",
    };
  },
  methods: {
    showName() {
      console.log(this.name);
    },
  },
  mounted() {
    console.log("mixin mounted", this.name);
  },
};
```

- 何时使用异步组件

> 加载大组件

> 异步路由加载

```html
<template>
  <div>
    <p>CustomAsync</p>
  </div>
</template>

<script>
  export default {};
</script>

<style></style>
```

```html
<template>
  <div id="app">
    <CustomAsync v-show="flag" />
    <button @click="flag = true">lol</button>
  </div>
</template>

<script>
  export default {
    name: "App",
    components: {
      CustomAsync: () => import("./components/customAsync.vue"),
    },
    data() {
      return {
        flag: false,
      };
    },
  };
</script>

<style></style>
```

正常路由

```javascript
const routes = [
  { path: "/foo", component: RouterDemo, name: "1" },
  { path: "/a", redirect: "/bar" },
  { path: "*", component: RouterDemo, name: "404" },
];
```

异步路由

```javascript
const routes = [
  {
    path: "/403",
    name: "403",
    component: () => import(/* webpackChunkName: "other" */ "../views/403.vue"),
  },
];
```

- 何时使用 keep-alive

> 缓存组件不需要重新渲染,优化性能

> 多个静态 tab 的切换

```html
<template>
  <div id="app">
    <button v-for="tab in tabs" :key="tab" @click="current = tab">
      {{tab}}
    </button>

    <keep-alive>
      <component :is="currentTab"></component>
    </keep-alive>
  </div>
</template>

<script>
  import TrendPosts from "./components/Trendi.vue";
  import TrendArchive from "./components/Trendii.vue";

  export default {
    name: "App",
    components: {
      // eslint-disable-next-line vue/no-unused-components
      TrendPosts,
      // eslint-disable-next-line vue/no-unused-components
      TrendArchive,
    },
    data() {
      return {
        current: "Posts",
        tabs: ["Posts", "Archive"],
      };
    },
    computed: {
      currentTab() {
        return "Trend" + this.current;
      },
    },
    methods: {},
  };
</script>

<style></style>
```

Trendi.vue

```html
<template>
  <div>
    <p>Posts</p>
  </div>
</template>

<script>
  export default {};
</script>

<style></style>
```

Trendii.vue

```html
<template>
  <div>
    <p>Archive</p>
  </div>
</template>

<script>
  export default {};
</script>

<style></style>
```

- 使用 beforeDestroy 前需要注意什么

> 解绑自定义与 DOM 事件 event.$off

> 清除定时器

- 什么是插槽

```html
<template>
  <div id="app">
    <slot-demo :url="website.url">
      <template v-slot:header>
        <h1>将插入name = header中</h1>
      </template>
    </slot-demo>
  </div>
</template>

<script>
  import SlotDemo from "./components/SlotDemo.vue";

  export default {
    name: "App",
    components: {
      SlotDemo,
    },
    data() {
      return {
        website: {
          url: "https://www.baidu.com",
        },
      };
    },
  };
</script>

<style></style>
```

```html
<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <a :href="url">
      <slot>默认值</slot>
    </a>
  </div>
</template>

<script>
  export default {
    props: ["url"],
  };
</script>

<style></style>
```

作用域插槽的作用在于插槽中的 data 可以提取出来给父组件公用

```html
<template>
  <div id="app">
    <scoped-slot-demo :url="website.url">
      <template v-slot="slotProps">{{ slotProps.slotData.title }}</template>
    </scoped-slot-demo>
  </div>
</template>

<script>
  import ScopedSlotDemo from "./components/ScopedSlotDemo.vue";
  export default {
    name: "App",
    components: { ScopedSlotDemo },
    data() {
      return {
        website: {
          url: "https://www.baidu.com",
          title: "imoc",
          subTitle: "233",
        },
      };
    },
  };
</script>

<style></style>
```

```html
<template>
  <div>
    <a :href="url">
      <slot :slotData="website">{{ website.subTitle }}</slot>
    </a>
  </div>
</template>

<script>
  export default {
    props: ["url"],
    data() {
      return {
        website: {
          url: "https://www.baidu.com",
          title: "aza",
          subTitle: "aza编辑器",
        },
      };
    },
  };
</script>

<style></style>
```

- vuex 里面的 action 和 mutation 有什么区别

> action 可以处理异步操作，mutation 不可以

> mutation 适合做原子操作也就是一次操作

> action 可以整合多个 mutation

- vue-router 常用的路由模式

> hash 模式与 h5 history 模式

> 其中 history 模式需要服务器支持

---

用 vdom 描述一个 DOM 结构

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
    <div id="div" class="container">
      <p>vdom</p>
      <ul style="font-size: 20px;">
        <li>a</li>
      </ul>
    </div>
    <script>
      const list = {
        tag: "div",
        props: {
          className: "container",
          id: "div1",
        },
        children: [
          {
            tag: "p",
            children: "vdom",
          },
          {
            tag: "ul",
            props: {
              style: "font-size:20px",
              children: [
                {
                  tag: "li",
                  children: "a",
                },
              ],
            },
          },
        ],
      };
    </script>
  </body>
</html>
```

- 监听 data 变化的核心 api 是什么

> Object.defineProperty

监听普通数据

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
  set: function (newValue) {
    console.log("set");
    name = newValue;
  },
});

console.log(data.name);
data.name = "list";
console.log(data.name);
```

监听数组

Object.defineProperty 不能监听数组变化

需要重写原型

Proxy 可以监听数组变化

```javascript
const data = {
  name: "zhangsan",
  age: 20,
  info: {
    address: "北京",
  },
  nums: [10, 20, 30],
};

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

function defineReactive(target, key, value) {
  observer(value);

  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      observer(newValue);

      if (newValue !== value) {
        value = newValue;
        updateView();
      }
    },
  });
}

observer(data);
data.nums.push(4);
```

监听对象

```javascript
const data = {
  name: "zhangsan",
  age: 20,
  info: {
    address: "北京",
  },
};

function updateView() {
  console.log("视图更新");
}
function observer(target) {
  if (typeof target !== "object" || target === null) {
    return target;
  }
  for (let key in target) {
    defineReactive(target, key, target[key]);
  }
}
function defineReactive(target, key, value) {
  observer(value);

  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      observer(newValue);
      if (newValue !== value) {
        value = newValue;
        updateView();
      }
    },
  });
}

//当一个对象里面还有一个对象的时候使用老办法递归

//把data设为响应式数据
observer(data);

//监听一二级数据
data.name = "1st";
data.age = 23;
data.info.address = "广西";
data.age = { num: 22 };
//所以在使用vue设置data的新属性或者删除属性时需要使用Vue.set,Vue.delete这两个api
data.x = 1000;
```

- 描述响应式原理

> 利用 Object.defineProperty 监听 data 变化

- 初次渲染的过程

> 解析模板为 render 函数（或者再开发环境中完成，vue-loader）

> 触发响应式，监听 data 属性 getter 和 setter

> 执行 render 函数，生成 vnode，path

- 更新过程

> 修改 data，触发 setter（此前再 getter 中已被监听）

> 重新执行 render 函数，生成 newVnode

> patch(vnode,newNode)

- h 函数

> 返回一个对象即 vnode 数据结构

* patch函数

> 创建一个空的 vnode 关联到一个真的 dom

> 更新的时候用新的 vnode 代替旧的 vnode，比如两者在对比的时候，新的vnode有值而旧的vnode没有值则addVnodes(),新的vnode没有值而而旧的vnode有值则removeVnodes()

> updateChildren() 比如两个vnode都有children，要对他们进行比较时就会触发updateChildren().用 key 做两个 dom 中子元素的对比，如果发生变化只是移动，而不是删除插入，key 不能为随机数或者数组下标，会引起排序错误



* diff算法的时间复杂度

> O(n)

> O(n^3) on的3次方上做出的优化,比如说只比较同一层级，只是tag不相同我们就销毁重建，通过tag和key来判断它是不是相同组件

> 只比较同一层级，不跨级比较

> tag 不同，则直接删除重建，不再进行深度比较

> tag 和 key，两者相同，则认为是相同节点，不在深度比较

* vnode的特点

> 基于数据操作视图，优化dom操作

* Vue为什么是异步渲染，$nextTick有什么用

> 异步渲染可以用于合并多个data修改，提高性能

> $nextTick在DOM更新完之后，触发回调，能监听最新的data修改

* Vue性能优化

> 合理使用v-show和v-if

> 合理使用computed

> v-for必须带key，v-for比v-if优先级更高，避免同时使用

> beforeDestroy之前需要解绑自定义事件，计时器

> 合理使用异步组件，合理使用keep-alive

> 因为defineProperty需要递归，所以data不合适层级太深

> 通用的优化方案，懒加载，节流，防抖










