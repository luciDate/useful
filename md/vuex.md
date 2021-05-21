# [基本使用](#tip-1)

# [基本概念](#tip-2)

# [购物车实列](#tip-3)


<a id="tip-1">基本使用</a>

```
vue create test-v-x
```

```
npm install vuex
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";

Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state, n) {
      state.count += n;
    },
  },
  // 处理异步操作并不能直接修改state
  actions: {
    increment({ commit }) {
      setTimeout(() => {
        commit("increment", 1);
      }, 3000);
    },
  },
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
```

app.vue

```html
<template>
  <div id="app">
    {{ count }}
    <button @click="$store.commit('increment',2)">count+n</button>
    <button @click="$store.dispatch('increment')">count++</button>
  </div>
</template>

<script>
  export default {
    name: "App",
    components: {},
    computed: {
      count() {
        return this.$store.state.count;
      },
    },
  };
</script>

<style></style>
```

<a id="tip-2">基本概念</a>

state:提供一个全局响应式数据

getter:借助vue计算属性computed来实现缓存

mutations:更改state方法

actions:（异步操作）触发mutation方法

module:模块化

---

<a id="tip-3">vuex购物车实列</a>


