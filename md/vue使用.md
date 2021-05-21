## [vue-cli](#tip-1)

## [vue 基本操作](#tip-2)

---

<a id="tip-1">Vue-cli</a>

安装(windows 需管理员)

```bash
npm install -g @vue/cli
```

查看版本

```
vue --version
```

服务器启动原型单文件

```bash
npm install -g @vue/cli-service-global
```

目录下新建 app.vue

```html
<template>
  <h1>Hello vue</h1>
</template>
```

目录下 bash

```
vue serve
```

打包 dist 文件夹下用 server 启动浏览

```bash
vue build app.vue
```

创建一个项目

```bash
vue create test-v
```

---

<a id="tip-2">vue 基本操作</a>

模板插值

新项目的驱动文件为 app.vue 与 main.js

components 下新建 baseUse 新建 TplDemo

```html
<template>
  <div>
    <p>文本插值{{message}}</p>
    <p>JS 表达式 {{flag ? 'yes' : 'no'}} (只能是表达式不能是JS语句)</p>
    <p :id="dynamicId">动态属性id</p>
    <hr />
    <p v-html="rawHtml">
      <span>xss风险</span>
      <span>使用v-html后会覆盖子元素</span>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: "hello,vue",
        flag: true,
        rawHtml: "指令 - 原始 html <b>加粗</b> <i>斜体</i>",
        dynamicId: `id-${Date.now()}`,
      };
    },
  };
</script>

<style></style>
```

app.vue 引入就 ok 啦

- 这里我发现一个小技巧

  > 引入组件的时候直接 \<watch-demo> 就能自动引用

computed 计算属性与监听属性拉一起 A 了

- 关于组件的格式

  > 采用<List /> 格式在cli兼容更好

computed

```html
<template>
  <div>
    <p>数据缓存,数据不变只会计算一次</p>
    <p>num {{ num }}</p>
    <p>doubel {{ double1 }}</p>
    <input type="text" v-model="double2" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: 20,
      };
    },
    computed: {
      double1() {
        return this.num * 2;
      },
      double2: {
        get() {
          return this.num * 2;
        },
        set(val) {
          this.num = val / 2;
        },
      },
    },
  };
</script>

<style></style>
```

watch

```html
<template>
  <div>
    <p>监听数据的新值与旧值</p>
    <input type="text" v-model="name" />
    <input type="text" v-model="info.city" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: "双越",
        info: {
          city: "北京",
        },
      };
    },
    watch: {
      //值类型，能正常拿到
      name(oldVal, val) {
        console.log("watch name", oldVal, val);
      },
      //引用类型，需要深度监听
      "info.city": {
        handler(val, oldVal) {
          console.log(val, oldVal);
        },
        deep: true,
      },
    },
  };
</script>

<style></style>
```

style 与 class 动态绑定

```html
<template>
  <div>
    <p :class="{ black: isBlack, yellow: isYellow }">使用 class</p>
    <p :class="[black, yellow]">使用 class（数组）</p>
    <p :style="styleData">使用 style</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isBlack: true,
        isYellow: false,
        black: "black",
        yellow: "yellow",
        styleData: {
          //使用驼峰命名法
          fontSize: "40px",
          color: "red",
          background: "#ccc",
        },
      };
    },
  };
</script>

<style>
  .black {
    font-weight: 700;
    color: rgba(0, 0, 0, 0.85);
  }
  .yellow {
    background: yellow;
  }
</style>
```

条件判断

```html
<template>
  <div>
    <p>遍历数组</p>
    <ul>
      <!-- v-for需要key key的值为唯一值 -->
      <!-- v-for与v-if是不能出现在同一行的 -->
      <li v-for="(item, index) in listArr" :key="item.id">
        <div v-if="!item.display">
          {{ index }} -- {{ item.id }} -- {{ item.title }}
        </div>
      </li>
    </ul>
    <p>遍历对象</p>
    <ul>
      <li v-for="(val, key, index) in listObj" :key="key">
        {{ index }} -- {{ key }} - {{ val.title }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        listArr: [
          { id: "a", title: "标题1", display: true },
          { id: "b", title: "标题2", display: false },
          { id: "c", title: "标题3", display: false },
        ],
        listObj: {
          a: { title: "标题1" },
          b: { title: "标题2" },
          c: { title: "标题3" },
        },
      };
    },
  };
</script>

<style>
  li {
    list-style: none;
  }
</style>
```

遍历

```html
<template>
  <div>
    <p>遍历数组</p>
    <ul>
      <!-- v-for需要key key的值为唯一值 -->
      <!-- v-for与v-if是不能出现在同一行的 -->
      <li v-for="(item, index) in listArr" :key="item.id">
        <div v-if="!item.display">
          {{ index }} -- {{ item.id }} -- {{ item.title }}
        </div>
      </li>
    </ul>
    <p>遍历对象</p>
    <ul>
      <li v-for="(val, key, index) in listObj" :key="key">
        {{ index }} -- {{ key }} - {{ val.title }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        listArr: [
          { id: "a", title: "标题1", display: true },
          { id: "b", title: "标题2", display: false },
          { id: "c", title: "标题3", display: false },
        ],
        listObj: {
          a: { title: "标题1" },
          b: { title: "标题2" },
          c: { title: "标题3" },
        },
      };
    },
  };
</script>

<style>
  li {
    list-style: none;
  }
</style>
```

事件

```html
<template>
  <div>
    <p>{{ num }}</p>
    <button @click="increment1">+1</button>
    <button @click="increment2(2, $event)">+2</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: 0,
      };
    },
    methods: {
      increment1(event) {
        //事件是原生的 事件挂载到当前元素
        console.log("event", event, event.__proto__.constructor);
        console.log(event.target);
        console.log(event.currentTarget);
        this.num++;
      },
      increment2(val, event) {
        console.log(event.target);
        this.num = this.num + val;
      },
    },
  };
</script>

<style></style>
```

表单

```html
<template>
  <div>
    <p>输入框: {{ name }}</p>
    <input type="text" v-model.trim="name" />
    <input type="text" v-model.lazy="name" />
    <input type="text" v-model.number="age" />

    <p>多行文本: {{ desc }}</p>
    <textarea v-model="desc"></textarea>
    <!-- 注意，<textarea>{{desc}}</textarea> 是不允许的！！！ -->

    <p>多个复选框 {{ checkedNames }}</p>
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames" />
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
    <label for="mike">Mike</label>

    <p>单选 {{ gender }}</p>
    <input type="radio" id="male" value="male" v-model="gender" />
    <label for="male">男</label>
    <input type="radio" id="female" value="female" v-model="gender" />
    <label for="female">女</label>

    <p>下拉列表选择 {{ selected }}</p>
    <select v-model="selected">
      <option disabled value="">请选择</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>

    <p>下拉列表选择（多选） {{ selectedList }}</p>
    <select v-model="selectedList" multiple>
      <option disabled value="">请选择</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: "双越",
        age: 18,
        desc: "自我介绍",
        checked: true,
        checkedNames: [],
        gender: "male",
        selected: "",
        selectedList: [],
      };
    },
  };
</script>
```

组件

分为 index InputVi List ， 其中 index 作为入口

index.vue

```html
<template>
  <div>
    <input-vi @add="addHandler" />
    <list :list="list" @delete="deleteHandler" />
  </div>
</template>

<script>
  import InputVi from "./InputVi.vue";
  import List from "./List.vue";
  export default {
    components: { InputVi, List },
    data() {
      return {
        list: [
          {
            id: "id-1",
            title: "标题1",
          },
          {
            id: "id-2",
            title: "标题2",
          },
        ],
      };
    },
    methods: {
      addHandler(title) {
        this.list.push({
          id: `id-${Date.now()}`,
          title,
        });
      },
      deleteHandler(id) {
        this.list = this.list.filter((item) => {
          return item.id !== id;
        });
      },
    },
    created() {
      console.log("index created");
    },
    mounted() {
      console.log("index mounted");
    },
    beforeUpdate() {
      console.log("index before update");
    },
    updated() {
      console.log("index update");
    },
  };
</script>

<style></style>
```

inputVi.vue

```html
<template>
  <div>
    <input type="text" v-model="title" />
    <button @click="addTitle">add</button>
  </div>
</template>

<script>
  import event from "./event";
  export default {
    data() {
      return {
        title: "",
      };
    },
    methods: {
      addTitle() {
        this.$emit("add", this.title);
        event.$emit("onAddTitle", this.title);
        this.title = "";
      },
    },
  };
</script>

<style></style>
```

list.vue

```html
<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id">
        {{ item.title }}
        <button @click="deleteItem(item.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import event from "./event";
  export default {
    props: {
      list: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return {};
    },
    methods: {
      deleteItem(id) {
        this.$emit("delete", id);
      },
      addItemdHandler(title) {
        console.log("on add title", title);
      },
    },
    created() {
      console.log("list created");
    },
    mounted() {
      console.log("list mounted");
    },
    beforeUpdate() {
      console.log("list beforeUpdate");
    },
    updated() {
      console.log("list updated");
    },
    beforeDestroy() {
      event.$off("onAddTitle", this.addItemdHandler);
    },
  };
</script>

<style></style>
```

生命周期

- created 和 mounted 的 区别

  > created 是 vue 实列已经初始化成功，而 mounted 是组件挂载，页面开始渲染，其中关于 mounted 中的操作比较多，比如 ajax 与事件绑定

- updated 与 beforeDestroy

  > 一个用于组件重新渲染并应用更新，一个用于组件销毁之前用于解除绑定与销毁事件监听器

- 生命周期的顺序

  > 创建阶段 以上面组件 DEMO 为列子 index created --> list created --> list mounted --> index mounted 父组件开始渲染，等待子组件渲染完成才完成渲染

  > 更新阶段 index beforeupdate --> list beforeupdate --> list updated --> index updated 同上父组件接到更新等待子组件完成才算完成

- 卸载阶段

  > index beforeupdate --> list destroyed --> index updated

复现卸载组件

index.vue

```html
<template>
  <div>
    <input-vi @add="addHandler" />
    <list :list="list" @delete="deleteHandler" />
    <test-destroy v-if="flag" />
    <button @click="change">click</button>
  </div>
</template>

<script>
  import InputVi from "./InputVi.vue";
  import List from "./List.vue";
  import TestDestroy from "./TestDestroy.vue";
  export default {
    components: { InputVi, List, TestDestroy },
    data() {
      return {
        list: [
          {
            id: "id-1",
            title: "标题1",
          },
          {
            id: "id-2",
            title: "标题2",
          },
        ],
        flag: true,
      };
    },
    methods: {
      addHandler(title) {
        this.list.push({
          id: `id-${Date.now()}`,
          title,
        });
      },
      deleteHandler(id) {
        this.list = this.list.filter((item) => {
          return item.id !== id;
        });
      },
      change() {
        this.flag = !this.flag;
      },
    },
    created() {
      console.log("index created");
    },
    mounted() {
      console.log("index mounted");
    },
    beforeUpdate() {
      console.log("index before update");
    },
    updated() {
      console.log("index update");
    },
  };
</script>

<style></style>
```

testDestroy.vue

```html
<template>
  <p>test</p>
</template>

<script>
  export default {
    data() {
      return {};
    },
    beforeDestroy() {
      console.log("666");
    },
    destroyed() {
      console.log("777");
    },
  };
</script>

<style></style>
```

自定义双向绑定

index.vue

```html
<template>
  <div>
    <p>{{ name }}</p>
    <custom-v-model v-model="name" />
  </div>
</template>

<script>
  import CustomVModel from "./CustomVModel.vue";

  export default {
    components: {
      CustomVModel,
    },
    data() {
      return {
        name: "aza",
      };
    },
  };
</script>

<style></style>
```

custom vmodel

```html
<template>
  <input
    type="text"
    :value="text"
    @input="$emit('inputChange', $event.target.value)"
  />
</template>

<script>
  export default {
    model: {
      props: "text",
      event: "inputChange",
    },
    props: {
      text: String,
      default() {
        return "";
      },
    },
  };
</script>

<style></style>
```

vue 组件是异步渲染的 使用 nexttick 获取最新 dom
异步渲染的好处是不管修改状态几次，都会被整合为一次

```html
<template>
  <div>
    <ul ref="ul1">
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
    <button @click="addItem">添加一项</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: ["a", "b", "c"],
      };
    },
    methods: {
      addItem() {
        this.list.push(`${Date.now()}`);
        this.list.push(`${Date.now()}`);
        this.list.push(`${Date.now()}`);

        this.$nextTick(() => {
          const ulElem = this.$refs.ul1;
          console.log(ulElem.childNodes.length);
        });
      },
    },
  };
</script>

<style></style>
```

mixin 多个组件相同逻辑，抽离出来

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

插槽 分为普通，具名，作用域，其中作用域插槽子组件的 data 可共享给父组件

index.vue

```html

```

slotDemo.vue

```html
<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <a :href="url">
      <slot> 默认值 </slot>
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

scopedSlotDemo.vue

```html
<template>
  <div>
    <a :href="url">
      <slot :slotData="website">
        {{ website.subTitle }}
      </slot>
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

动态组件与组件缓存（需要频繁切换但不需要重复渲染）

设计个treni和trenii模板

```html
<template>
  <div>
      trand-i
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
```

```html
<template>
  <div>
      trand-ii
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
```

index.vue

```html
<template>
  <div>
    <p>{{ name }}</p>
    <custom-v-model v-model="name" />
    <hr />
    <next-tick />
    <hr />
    <mixin-demo />
    <hr />
    <slot-demo>
      <template v-slot:header>
        <h1>将插入header slot中</h1>
      </template>
      {{ website.title }}
    </slot-demo>
    <hr />
    <scoped-slot-demo :url="website.url">
      <template v-slot="slotProps">
        {{ slotProps.slotData.title }}
      </template>
    </scoped-slot-demo>
    <hr />
    <button v-for="tab in tabs" :key="tab">{{ tab }}</button>

    <keep-alive>
      <component :is="currentTab"></component>
    </keep-alive>

  </div>
</template>

<script>
import CustomVModel from "./CustomVModel.vue";
import MixinDemo from "./MixinDemo.vue";
import NextTick from "./NextTick.vue";
import ScopedSlotDemo from "./ScopedSlotDemo.vue";
import SlotDemo from "./SlotDemo.vue";
import Trendi from "./trendi";
import Trendii from "./trendii";

export default {
  components: {
    CustomVModel,
    NextTick,
    MixinDemo,
    SlotDemo,
    ScopedSlotDemo,
    Trendi,
    Trendii,
  },
  data() {
    return {
      name: "aza",
      website: {
        url: "http://imooc.com/",
        title: "imooc",
        subTitle: "233",
      },
      showFormDemo: false,
      current:"i",
      tabs: ["i", "ii"],
    };
  },
  methods: {},
  computed:{
    currentTab(){
      return "Trend" + this.current.toLowerCase()
    }
  }
};
</script>

<style></style>
```

异步组件（什么时候用什么时候加载,针对比较大的组件）

设计一个async组件













