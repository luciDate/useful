# Vue

vueCdn : `<script src="https://cdn.jsdelivr.net/npm/vue"></script>`

## 大纲

[vue 基础](#tip-1)

[响应式数据](#tip-2)

[生命周期](#tip-3)

---

## <a id="tip-1">vue 基础</a>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <style></style>
  </head>
  <body>
    <div id="app">
      <!-- 绑定信息 -->
      <p>{{message}}</p>
      <!-- 动态标签属性 -->
      <p :title="time">hover me</p>
      <!-- 条件显示 -->
      <p v-if="seen">if ?</p>
      <!-- 列表渲染 -->
      <ul>
        <!-- 直接循环渲染element -->
        <li v-for="item in list" :key="item.text">
          {{item.text}}
          <!-- v-if 和 v-for 不能同时使用 -->
          <span v-for="itemi in item.children">{{itemi}}</span>
        </li>
      </ul>
      <!-- 处理用户输入 -->
      <p>{{message}}</p>
      <button @click="reverseMessage">reverse message</button>
      <br />
      <br />
      <!-- 双向绑定 -->
      <input type="text" v-model="message" />
      <!-- 双向绑定与单向绑定不冲突 -->
      <input type="text" :value="message" @input="changeMessage" />

      <hr />
      <ul>
        <todo-item
          v-for="item in groceryList"
          :todo="item"
          :key="item.id"
        ></todo-item>
      </ul>
    </div>
    <script>
      Vue.component("todo-item", {
        props: ["todo"],
        template: `
        <li>{{todo.text}}</li>
        `,
      });
      const app = new Vue({
        el: "#app",
        data: {
          message: "hello Vue",
          time: new Date(),
          seen: true,
          list: [
            { text: "1" },
            { text: "2" },
            { text: "3" },
            { text: "4", children: [1, 2, 3] },
          ],
          groceryList: [
            { id: 0, text: "蔬菜" },
            { id: 1, text: "奶酪" },
            { id: 2, text: "随便其它什么人吃的东西" },
          ],
        },
        methods: {
          reverseMessage() {
            this.message = this.message.split("").reverse().join("");
          },
          changeMessage(e) {
            this.message = e.target.value;
          },
        },
      });
    </script>
  </body>
</html>
```

---

## <a id="tip-2">响应式数据</a>

```html
<body>
  <div id="app">
    <p>{{a}}</p>
  </div>
  <script>
    //设置响应式数据
    const app = new Vue({
      el: "#app",
      data: {
        a: 1,
      },
    });
    /*
      data在组件中是一个函数 类似每一份组件都维护自己的一份数据空间

      data(){
        retrun:{
          name:"aza"
        }
      }
      */
    console.log(app.a);
  </script>
</body>
```
## <a id="tip-3">生命周期</a>

```html
<body>
  <div id="app">
    <p>{{a}}</p>
  </div>
  <script>
    // 生命周期不能使用箭头函数，因为箭头函数没有this
    const app = new Vue({
      el: "#app",
      beforeCreate: function () {},
      created: function () {},
      beforeMount: function () {},
      mounted: function () {},
      beforeUpdate: function () {},
      updated: function () {},
      beforeDestroy: function () {},
      destroyed: function () {},
    });
  </script>
</body>
```
