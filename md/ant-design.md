# 项目流程与备忘

## 规范代码风格

```bash
vue create aza-admin
```

根目录新建.prettierrc.json 文件

```javascript
{
  "printWidth": 120,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none"
}
```

---

## 项目前准备

安装基本依赖

```bash
yarn add ant-design-vue moment
```

根目录新建 vue.config.js

```javascript
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
};
```

让项目支持 ant 组件按需加载

```bash
yarn add babel-plugin-import --dev
```

编辑 babel.config.js

```javascript
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true },
    ],
  ],
};
```

此时项目有些代码不适合 esllint 规范，格式化或者右键快速修复

main.js 全局注册组件

```javascript
import { Button } from "ant-design-vue";
Vue.use(Button);
```

然后你在需要显示的组件里面使用`<a-button></a-button>`就好了

---

## 添加路由

view 新建 User 文件夹放有关于 user 类的页面

新建 Register.vue

新建 Login.vue

src 下新建一个 layouts 文件夹，放相关布局组件

新建 UserLayout.vue

layouts 需要一个 basiclayout.vue 引入 新建的 Header,SiderMenu,`<router-view></router-view>`,Footer

我们还需要在 views 匹配文件设置好 Dashboard,Form 文件夹.其中 StepForm 需要一个 index.vue 作为匹配分步的组件

布局的最后写 403，404.

yarn add nprogress 添加路由动画

最后附上目前的路由文件

```javascript
import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
    children: [
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login.vue"),
      },
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register.vue"),
      },
    ],
  },
  {
    path: "/",
    meta: { authority: ["user", "admin"] },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    children: [
      // dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis",
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            meta: { title: "分析页" },
            name: "analysis",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis.vue"
              ),
          },
        ],
      },
      // form
      {
        path: "/form",
        name: "form",
        component: { render: (h) => h("router-view") },
        meta: { icon: "form", title: "表单", authority: ["admin"] },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/BasicForm.vue"
              ),
          },
          {
            path: "/form/step-form",
            name: "stepform",
            hideChildrenInMenu: true,
            meta: { title: "分布表单" },
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/StepForm/index.vue"
              ),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info",
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1.vue"
                  ),
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2.vue"
                  ),
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3.vue"
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: () => import(/* webpackChunkName: "other" */ "../views/403.vue"),
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: () => import(/* webpackChunkName: "other" */ "../views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
```

注意 rander 函数可以直接渲染`<router-view></router-view>`让父路由直接匹配子路由组件

把 APP.vue 两个链接删掉，两个组件我们也不需要了

---

## 页面布局

从 ant 官网上拉取布局模板

basicLayout.vue 编辑模板代码，把我们写好的组件替换掉模板代码,如果模板引入了 Icon，我们需要在 main.js 引入 Icon

新建 settingDrawer 文件夹创建 index.vue。从 ant 官网拉取抽屉模板。加入切换主题，切换导航模式功能。basiclayout.vue 把组件引入。main.js 注册 Drawer

从 ant 官网拉取单选框。main.js 引入 radio。radio 用 change 事件改变值，然后把值添加到路由里。父组件读取路由从而改变主题或者布局

路由守卫加个条件判断，实现改变 path 但不显示路由过渡动画

```javascript
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  next();
});
```

主要编辑文件一览

SettingDrawer > index.vue

```html
<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      :visible="visible"
      @close="onClose"
      width="300px"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <h2>整体风格定制</h2>
        <a-radio-group
          :value="$route.query.navTheme || 'dark'"
          @change="e => handleSettingChange('navTheme', e.target.value)"
        >
          <a-radio value="dark">黑色</a-radio>
          <a-radio value="light">白色</a-radio>
        </a-radio-group>
        <h2>导航模式</h2>
        <a-radio-group
          :value="$route.query.navLayout || 'left'"
          @change="e => handleSettingChange('navLayout', e.target.value)"
        >
          <a-radio value="left">左侧</a-radio>
          <a-radio value="top">顶部</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      onClose() {
        this.visible = false;
      },
      handleSettingChange(type, value) {
        this.$router.push({ query: { ...this.$route.query, [type]: value } });
      },
    },
  };
</script>
<style scoped>
  .handle {
    position: absolute;
    top: 260px;
    right: 300px;
    width: 42px;
    height: 42px;
    background: #1890ff;
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 42px;
    border-radius: 3px 0 0 3px;
  }
</style>
```

basicLayout.vue

```html
<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout
      id="components-layout-demo-custom-trigger"
      :style="{ height: '100%', width: '100%', position: 'absolute' }"
    >
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        v-model="collapsed"
        :trigger="null"
        collapsible
        width="260"
        collapsedWidth="100"
      >
        <div class="logo">Aza ╈ admin</div>
        <SiderMenu></SiderMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0; clear: both">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <header></header>
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px 0 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
          <router-view></router-view>
        </a-layout-content>
        <footer></footer>
      </a-layout>
    </a-layout>
    <SettingDrawer></SettingDrawer>
  </div>
</template>

<script>
  import Header from "./Header";
  import SiderMenu from "./SiderMenu";
  import Footer from "./Footer";
  import SettingDrawer from "../components/SettingDrawer/index.vue";

  export default {
    components: {
      Header,
      SiderMenu,
      Footer,
      SettingDrawer,
    },
    computed: {
      navTheme() {
        return this.$route.query.navTheme || "dark";
      },
      navLayout() {
        return this.$route.query.navLayout || "left";
      },
    },
    data() {
      return {
        collapsed: false,
      };
    },
  };
</script>

<style>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 48px;
    line-height: 48px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    text-align: center;
    overflow: hidden;
  }
  .nav-theme-dark #components-layout-demo-custom-trigger .logo {
    color: #fff;
  }
</style>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Layout, Icon, Drawer, Radio, Menu } from "ant-design-vue";

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

Header.vue 记得把父组件 clear:both 一下

```html
<template>
  <div class="header">Header</div>
</template>

<script>
  export default {};
</script>

<style>
  .header {
    float: right;
    margin-right: 30px;
  }
</style>
```

router 下的 index.js 编辑

```javascript
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  next();
});
```

---

## 路由与菜单结合

从 ant 官网拉取单文件递归菜单模板到 SiderMenu.vue 把需要递归的组件写为函数式组件 SubMenu.vue

同时，我们需要同步改变主题，basiclayout.vue 把 navTheme 作为 props 传递给在递归组件 SiderMenu.vue

递归路由，在路由添加 meta 标志位。来判断是否显示，父子层级。

清空 SiderMenu.vue 的 list，用递归函数来映射我们需要的数组

模板里面有判断是否有 children 来遍历模板

subMenu.vue 是函数式组件无法读取$router.我们需要使用parent.$router

BasicLayout.vue 的 collapsed 可以传递给 SiderMenu.vue 来控制

主要编辑文件一览

SiderMenu.vue

```javascript
<template>
  <div style="width: 260px">
    <a-menu :selectedKeys="selectedKeys" :openKeys.sync="openKeys" mode="inline" :theme="theme">
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from './SubMenu.vue'
export default {
  components: {
    'sub-menu': SubMenu
  },
  props: {
    theme: {
      type: String,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    '$route.path': function(val) {
      this.selectedKeys = this.selectedKeysMap[val]
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
    },
    collapsed: function(val) {
      this.openKeys = val ? [] : this.openKeysMap[this.$route.path]
    }
  },
  data() {
    this.selectedKeysMap = {}
    this.openKeysMap = {}
    const menuData = this.getMenuData(this.$router.options.routes)
    return {
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = []
      routes.forEach(item => {
        this.openKeysMap[item.path] = parentKeys
        this.selectedKeysMap[item.path] = [selectedKey || item.path]

        if (item.name && !item.hideInMenu) {
          const newItem = { ...item }
          delete newItem.children
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [...parentKeys, item.path])
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            )
          }
          menuData.push(newItem)
        } else if (!item.hideInMenu && !item.hideChildrenInMenu && item.children) {
          menuData.push(...this.getMenuData(item.children, [...parentKeys, item.path]))
        }
      })
      return menuData
    }
  }
}
</script>

```

SubMenu.vue

```javascript
<template functional>
  <a-sub-menu :key="props.menuInfo.path">
    <span slot="title">
      <a-icon v-if="props.menuInfo.meta.icon" :type="props.menuInfo.meta.icon" />
      <span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.path"
        @click="() => parent.$router.push({ path: item.path, query: parent.$route.query })"
      >
        <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
export default { props: ['menuInfo'], };
```

BasicLayout 编辑`<SiderMenu :theme="navTheme" :collapsed="collapsed"></SiderMenu>`

---

## 路由权限校验

src 下新建文件夹 utils 新建文件 auth.js 写上权限把控函数

yarn add lodash 我们需要它的 findLast 方法

编辑 route 下的 index.js 文件,编辑 siderMenu.vue 把 forEach 改为 for of 支持循环打断（break）

这里有路由提示我们不需要，所以跳过

主要文件一览

auth.js
```javascript
export function getCurrentAuthority() {
  return ['admin']
}

export function check(authority) {
  const current = getCurrentAuthority()
  return current.some(item => authority.includes(item))
}

export function isLogin() {
  const current = getCurrentAuthority()
  return current && current[0] !== 'guest'
}
```

router > index.js
```javascript
import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { check, isLogin } from "../utils/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
    children: [
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login.vue"),
      },
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register.vue"),
      },
    ],
  },
  {
    path: "/",
    meta: { authority: ["user", "admin"] },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    children: [
      // dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis",
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        // 提供<router-view></router-view>占位符，渲染匹配到的组件
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            meta: { title: "分析页" },
            name: "analysis",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis.vue"
              ),
          },
        ],
      },
      // form
      {
        path: "/form",
        name: "form",
        component: { render: (h) => h("router-view") },
        meta: { icon: "form", title: "表单", authority: ["admin"] },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/BasicForm.vue"
              ),
          },
          {
            path: "/form/step-form",
            name: "stepform",
            hideChildrenInMenu: true,
            meta: { title: "分布表单" },
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/StepForm/index.vue"
              ),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info",
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1.vue"
                  ),
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2.vue"
                  ),
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3.vue"
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: () => import(/* webpackChunkName: "other" */ "../views/403.vue"),
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: () => import(/* webpackChunkName: "other" */ "../views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, (record) => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login",
      });
    } else if (to.path !== "/403") {
      next({
        path: "/403",
      });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
```

SiderMenu.vue

```javascript
for (let item of routes) {
  if (item.meta && item.meta.authority && !check(item.meta.authority)) {
    break;
  }
  this.openKeysMap[item.path] = parentKeys;
  this.selectedKeysMap[item.path] = [selectedKey || item.path];

  if (item.name && !item.hideInMenu) {
    const newItem = { ...item };
    delete newItem.children;
    if (item.children && !item.hideChildrenInMenu) {
      newItem.children = this.getMenuData(item.children, [
        ...parentKeys,
        item.path,
      ]);
    } else {
      this.getMenuData(
        item.children,
        selectedKey ? parentKeys : [...parentKeys, item.path],
        selectedKey || item.path
      );
    }
    menuData.push(newItem);
  } else if (!item.hideInMenu && !item.hideChildrenInMenu && item.children) {
    menuData.push(
      ...this.getMenuData(item.children, [...parentKeys, item.path])
    );
  }
}
```

精细化权限管理。比如权限判断某个 button 是否显示

新建 directives 文件夹 auth.js 文件写 vue 指令

main.js 注册 Use 该指令 在收缩菜单的标签上使用`v-auth="['admin']"`使他触发指令
但是该指令无法在组件上使用，只有标签能使用

这时候我们需要组件式权限判断

components 下新建组件 authorized.vue

其中 scopedSlots 指的是通用插槽

mian.js 引入 authorized.vue 并且全局注册`Vue.component('Authorized', Authorized)`

---

## 封装第三方图形库

yarn add echarts

封装好的 Chart.vue

```javascript
<template>
  <div ref="chartDom" style="height:100px;"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted() {
    var myChart = echarts.init(this.$refs.chartDom)
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
  }
}
</script>

<style></style>
```

其中如果需要调试 f12 开发者工具 点 Source 面板 找到 Webpack 就可以了

yarn add resize-detector 支持动态改变 chart 实列宽高

封装好组件销毁函数，路由发生改变的时候。组件销毁我们也需要销毁 CHart 实列

借助 lodash 函数给 resize 添加防抖效果。

父组件传递给子组件的 style 默认会挂载到子组件的根节点上，所以不需要单独设置 props

把配置数据移动到父组件 Analysis.vue

深度监听是非常耗性能的

这里我们直接在父组件中新数据替换掉旧的数据，传递给子组件就好

主要编辑文件一览

Chart.vue

```javascript
<template>
  <div ref="chartDom" style="height:400px;"></div>
</template>

<script>
import echarts from 'echarts'
import debounce from 'lodash/debounce'
import { addListener, removeListener } from 'resize-detector'
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    option(val) {
      this.chart.setOption(val)
    }
  },
  created() {
    this.resize = debounce(this.resize, 300)
  },
  mounted() {
    this.renderChart()
    addListener(this.$refs.chartDom, this.resize)
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    resize() {
      this.chart.resize()
    },
    renderChart() {
      this.chart = echarts.init(this.$refs.chartDom)
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style></style>
```

Analysis.vue

```javascript
<template>
  <div>
    <Chart :option="chartOption" style="height:400px"></Chart>
  </div>
</template>

<script>
import Chart from '../../components/Chart'
import random from 'lodash/random'

export default {
  components: {
    Chart
  },
  mounted() {
    this.interval = setInterval(() => {
      this.chartOption.series[0].data = this.chartOption.series[0].data.map(() => random(100))
      this.chartOption = { ...this.chartOption }
    }, 3000)
  },
  data() {
    return {
      chartOption: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style></style>

```

---

## 表单与基本校验

main.js 引入 Form，Input 组件。
ant 官网上拉取基础的表单模板
验证控制
v-model 一个变量
根据这个变量改变组件约定好的`:validateStatus="fieldStatus"`和`:help="fieldHelp"`来改变 input 状态

主要编辑文件一栏

BasicForm.vue

```html
<template>
  <a-form :layout="formLayout">
    <a-form-item
      label="Form Layout"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-radio-group
        default-value="horizontal"
        @change="handleFormLayoutChange"
      >
        <a-radio-button value="horizontal"> Horizontal </a-radio-button>
        <a-radio-button value="vertical"> Vertical </a-radio-button>
        <a-radio-button value="inline"> Inline </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="Field A"
      :validateStatus="fieldStatus"
      :help="fieldHelp"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input v-model="fieldA" placeholder="input placeholder" />
    </a-form-item>
    <a-form-item
      label="Field B"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-model="fieldB"
        label="Field B"
        placeholder="input placeholder"
      />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit"> Submit </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  export default {
    data() {
      return {
        formLayout: "horizontal",
        fieldA: "",
        fieldB: "",
        fieldStatus: "",
        fieldHelp: "",
      };
    },
    watch: {
      fieldA(val) {
        if (val.length <= 5) {
          this.fieldStatus = "error";
          this.fieldHelp = "必须大于5个字符";
        } else {
          this.fieldStatus = "";
          this.fieldHelp = "";
        }
      },
    },
    computed: {
      formItemLayout() {
        const { formLayout } = this;
        return formLayout === "horizontal"
          ? {
              labelCol: { span: 4 },
              wrapperCol: { span: 14 },
            }
          : {};
      },
      buttonItemLayout() {
        const { formLayout } = this;
        return formLayout === "horizontal"
          ? {
              wrapperCol: { span: 14, offset: 4 },
            }
          : {};
      },
    },
    methods: {
      handleFormLayoutChange(e) {
        this.formLayout = e.target.value;
      },
    },
    handleSubmit() {
      if (this.fieldA.length <= 5) {
        this.fieldStatus = "error";
        this.fieldHelp = "必须大于5个字符";
      } else {
        console.log({
          fieldA: this.fieldA,
          fieldB: this.fieldB,
        });
      }
    },
  };
</script>
```

让表单自动校验。`this.form = this.$form.createForm(this)`让 from 支持黑盒保存数据，数据不会影响到其他组件的变量展示。
如果需要同步数据到 data 可以使用`data = form.getFieldsValue()`

如果需要后台异步返回的数据作为变量展示。

可以通过`this.form.setFieldsValue({ fieldA: 'hello world' })`这个 api 来实现

---

## 分布表单

引入 utils 下的 request.js。该文件用来封装 axios 向后台放送请求。

修改 vue.config.js 编辑代理地址

store 下新建 modules 文件夹。新建 form.js 存贮全局变量

之后编辑 Steo.vue。注意 commit 是提交 mutations 而 dispatch 是提交 actions

---

## 封装一个支持校验的表单组

components 文件夹下新建 ReceiverAccount.vue
mian.js 注册 Select。ant 官网上截取我们需要的代码模板

```html
<a-input-group compact>
  <a-select default-value="Option1">
    <a-select-option value="Option1"> Option1 </a-select-option>
    <a-select-option value="Option2"> Option2 </a-select-option>
  </a-select>
  <a-input style="width: 50%" default-value="input content" />
</a-input-group>
```

组件约定好 value 和 change 事件，他们都可以通知父组件改变状态。

自动校验一般是检查值，如果变量是一个对象。我们需要使用

```javascript
validator: (rule, value, callback) => {
  if (value && value.number) {
    callback();
  } else {
    callback(false);
  }
};
```

---

## 在系统中使用图标

从阿里 Icon 下载本地文件到本地

main.js 引入 icon.js，记得打 es-lint 注释。
public 下的 index.html 引入 style 标签

---

## 动态编辑页面皮肤

编辑 vue.config.js

编辑 public 下的 html

原页面有一我们定义好的设置框。新建 less 文件。引入 less，并让 less 文件读取 less 变量

并通过 window.less.modifyVars({"@primary-color":"red"})来实现换肤

---

## 国际化

mian.js 注册 ConfigProvider 和 Dropdown 和 DatePicker

`Vue.component(ConfigProvider.name, ConfigProvider)`

编辑 APP.vue,Header.vue,Analysis.vue

APP.vue

```html
<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>
<script>
  import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
  import enUS from "ant-design-vue/lib/locale-provider/en_US";
  import moment from "moment";

  export default {
    data() {
      return {
        locale: zhCN,
      };
    },
    watch: {
      "$route.query.locale": function (val) {
        this.locale = val === "enUS" ? enUS : zhCN;
        moment.locale(val === "enUS" ? "en" : "zh-cn");
      },
    },
  };
</script>
<style></style>
```

Header.vue

```html
<template>
  <div class="header">
    <a-dropdown>
      <a-icon type="global" />
      <a-menu
        slot="overlay"
        @click="localeChange"
        :selectedKeys="[$route.query.locale || 'zhCN']"
      >
        <a-menu-item key="zhCN"> 中文 </a-menu-item>
        <a-menu-item key="enUS"> English </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
  export default {
    methods: {
      localeChange({ key }) {
        this.$router.push({ query: { ...this.$route.query, locale: key } });
      },
    },
  };
</script>

<style>
  .header {
    float: right;
    margin-right: 30px;
  }
</style>
```

Analysis.vue

```html
<template>
  <div>
    <a-date-picker></a-date-picker>
    <Chart :option="chartOption" style="height:400px"></Chart>
  </div>
</template>

<script>
  import Chart from "../../components/Chart";
  import random from "lodash/random";

  export default {
    components: {
      Chart,
    },
    mounted() {
      this.interval = setInterval(() => {
        this.chartOption.series[0].data = this.chartOption.series[0].data.map(
          () => random(100)
        );
        this.chartOption = { ...this.chartOption };
      }, 3000);
    },
    data() {
      return {
        chartOption: {
          title: {
            text: "ECharts 入门示例",
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20],
            },
          ],
        },
      };
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
  };
</script>

<style></style>
```

组件封装国际化需要 yarn add vue-i18n

新建 locale 文件夹下的 zhCN.js enUS.js

其中 app.dashboard.analysis.timeLabel 是对象的 key

编辑 main.js querystring 用来解析当前 url

编辑 Analysis.vue 和 Header.vue

main.js

```javascript
import Vue from "vue";
import Vuei18n from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import zhCN from "./locale/zhCN";
import enUS from "./locale/enUS";
import queryString from "querystring";

import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Result,
  Form,
  Input,
  Select,
  LocaleProvider,
  Dropdown,
  DatePicker,
} from "ant-design-vue";
import Auth from "./directives/auth";
import Authorized from "./components/authorized.vue";
// eslint-disable-next-line no-unused-vars
import iconFont from "./iconfont";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Result);
Vue.use(Form);
Vue.use(Input);
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.use(Auth);
Vue.use(Select);
Vue.component("Authorized", Authorized);
Vue.use(Vuei18n);

const i18n = new Vuei18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS },
  },
});

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

Analysis.vue

```html
<template>
  <div>
    {{ $t('message'[app.dashboard.analysis.timeLabel]) }}
    <a-date-picker></a-date-picker>
    <Chart :option="chartOption" style="height:400px"></Chart>
  </div>
</template>

<script>
  import Chart from "../../components/Chart";
  import random from "lodash/random";

  export default {
    components: {
      Chart,
    },
    mounted() {
      this.interval = setInterval(() => {
        this.chartOption.series[0].data = this.chartOption.series[0].data.map(
          () => random(100)
        );
        this.chartOption = { ...this.chartOption };
      }, 3000);
    },
    data() {
      return {
        chartOption: {
          title: {
            text: "ECharts 入门示例",
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20],
            },
          ],
        },
      };
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
  };
</script>

<style></style>
```

Header.vue

```html
<template>
  <div class="header">
    <a-dropdown>
      <a-icon type="global" />
      <a-menu
        slot="overlay"
        @click="localeChange"
        :selectedKeys="[$route.query.locale || 'zhCN']"
      >
        <a-menu-item key="zhCN"> 中文 </a-menu-item>
        <a-menu-item key="enUS"> English </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
  export default {
    methods: {
      localeChange({ key }) {
        this.$router.push({ query: { ...this.$route.query, locale: key } });
        this.$i18n.locale = key;
      },
    },
  };
</script>

<style>
  .header {
    float: right;
    margin-right: 30px;
  }
</style>
```

---

## 日后谈

如果目录嵌套太深。可以使用@/来指定 webpack 到 src 目录下

需要更换小图标的话，切到 public 下的 index.html ``<link rel="icon" href="<%= BASE_URL %>logo.png">``注意，不使用绝对路径

打包以后的在线预览

```bash
npm install -g serve
```

```bash
serve -s
```

vue-router 的取值问题。

fullpath = 全路径

path = /fool

params = /fool/12 里面的 12

query = ?name=aza&pw=666 里面的 aza 和 666

meta = 路由配置的原信息

css 引用可以使用``background: url(~@/assets/robot.jpg);``

引入icon.js得时候发现没过esLint。icon.js第一行写上``// eslint-disable-next-line prettier/prettier``
