```
vue create v-router-test
```

```
npm install vue-router
```

component 下新建两个组件

RouterDemo.vue

````html
<template>
  <div>
    <router-link to="/foo">Go to Foo</router-link>
    <br />
    <router-link to="/user/12">Go to /user/12</router-link>
    <br />
    <router-link to="/user/12/profile">Go to /user/12/profile</router-link>
    <br />
    <router-link to="other">Go to 404</router-link>
    <br />
    <router-link to="/a">Go to a 重定向到bar</router-link>
    <br />
    <a href="#/foo">GO to Foo</a>
    <br />
    <button @click="$router.push('foo')">GO to Foo</button>
    <br />
    <p>id:{{ id }}</p>
    <p>{{ routerInfo }}</p>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    props: ["id"],
    computed: {
      routerInfo() {
        const { fullPath, path, name, params, query, meta } = this.$route;
        return { fullPath, path, name, params, query, meta };
      },
    },
  };
</script>

<style></style>
`` RouterChildDemo.vue ```html
<template>
  <div>
    <div>{{ routerInfo }}</div>
  </div>
</template>

<script>
  export default {
    computed: {
      routerInfo() {
        const { fullPath, path, name, params, query, meta } = this.$route;
        return { fullPath, path, name, params, query, meta };
      },
    },
  };
</script>

<style></style>
````

src 下新建 routes.js

```javascript
import RouterDemo from "./components/RouterDemo.vue";
import RouterChildDemo from "./components/RouterChildDemo.vue";

const routes = [
  { path: "/foo", component: RouterDemo, name: "1" },
  { path: "/bar", component: RouterDemo, name: "2" },
  // 当 /user/:id 匹配成功，
  // RouterDemo 会被渲染在 App 的 <router-view /> 中
  {
    path: "/user/:id",
    component: RouterDemo,
    name: "3",
    props: true,
    //动态的id可以作为一份属性保存在组件的props中
    children: [
      // 当 /user/:id/profile 匹配成功，
      // RouterChildrenDemo 会被渲染在 RouterDemo 的 <router-view/> 中
      { path: "profile", component: RouterChildDemo, name: "3-1" },
      { path: "posts", component: RouterChildDemo },
    ],
  },
  { path: "/a", redirect: "/bar" },
  { path: "*", component: RouterDemo, name: "404" },
];

export default routes;
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
```

App.vue

```html
<template>
  <div id="app">
    <h2>router demo</h2>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    components: {},
  };
</script>

<style></style>
```


