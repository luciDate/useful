# Vue

vueCdn : `<script src="https://cdn.jsdelivr.net/npm/vue"></script>`

## 大纲

[vue 基础](#tip-1)

[响应式数据](#tip-2)

[生命周期](#tip-3)

[计算属性](#tip-4)

[监听属性](#tip-5)

[class 与 style 绑定](#tip-6)

[条件渲染](#tip-7)

[列表渲染](#tip-8)

[事件](#tip-9)

[表单输入](#tip-10)

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
      var app = new Vue({
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
    var app = new Vue({
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
    var app = new Vue({
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

---

## <a id="tip-4">计算属性</a>

```html
<body>
  <div id="app">
    <p>{{message}}</p>
    <p>计算属性是基于它们的响应式依赖进行缓存的</p>
    <p>
      多次访问 reversedMessage
      计算属性会立即返回之前的计算结果，而不必再次执行函数。
    </p>
    <p>如果你不希望有缓存，请用方法来替代。</p>
    <p>computed reversed message : {{reversedMessage}}</p>
  </div>
  <script>
    var app = new Vue({
      el: "#app",
      data() {
        return {
          message: "Hello,Vue",
        };
      },
      computed: {
        reversedMessage: function () {
          return this.message.split("").reverse().join("");
        },
      },
    });
  </script>
</body>
```

---

## <a id="tip-5">监听属性</a>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
  </head>
  <body>
    <div id="app">
      <div id="watch-example">
        <p>
          Ask a yes/no question:
          <input type="text" v-model="question" />
        </p>
        <p>{{answer}}</p>
      </div>
    </div>
    <script>
      var app = new Vue({
        el: "#app",
        data() {
          return {
            question: "",
            answer: "I cannot give you an answer until you ask a question.",
          };
        },
        watch: {
          // 如果 `question` 发生改变，这个函数就会运行
          question: function (newQuestion, oldQuestion) {
            console.log(newQuestion);
            console.log(oldQuestion);
            this.answer = "Waiting for you to stop typing...";
            this.debouncedGetAnswer();
          },
        },
        created: function () {
          // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
          // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
          // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
          // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
          // 请参考：https://lodash.com/docs#debounce
          this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
        },
        methods: {
          getAnswer: function () {
            if (this.question.indexOf("?") === -1) {
              this.answer = "Questions usually contain a question mark. ;-)";
              return;
            }
            this.answer = "Thinking...";
            var vm = this;
            axios
              .get("https://yesno.wtf/api")
              .then((response) => {
                //lodash首字母大写
                vm.answer = _.capitalize(response.data.answer);
              })
              .catch((error) => {
                vm.answer = "Error! Could not reach the API. " + error;
              });
          },
        },
      });
    </script>
  </body>
</html>
```

---

## <a id="tip-6">class 与 style 绑定</a>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <style>
      .active {
        color: blue;
      }
      .text-danger {
        text-decoration: line-through;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <p :class="classObj">666</p>
      <p :class="classObji">computed</p>
      <p :class="[activeClass,errorClass]">array</p>
      <p :class="[active ? activeClass : errorClass]">三元表达式</p>
      <p :class="[{active : active},errorClass]">objArray</p>
      <test :class="{active:active}"></test>
    </div>
    <script>
      Vue.component("test", {
        template: `
        <p class="foo">come get me</p>
        `,
      });
      const app = new Vue({
        el: "#app",
        data() {
          return {
            classObj: {
              active: true,
              "text-danger": true,
            },
            active: true,
            error: null,
            activeClass: "active",
            errorClass: "text-danger",
          };
        },
        computed: {
          classObji: function () {
            return {
              active: this.active && !this.error,
            };
          },
        },
      });
    </script>
  </body>
</html>
```

---

## <a id="tip-7">条件渲染</a>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  </head>
  <body>
    <div id="app">
      <p>v-if 并不会重新渲染。比如在input输入123切换DOM不会重置123</p>
      <p>需要重新渲染 需要定制key</p>
      <p>v-if 与 v-for 不推荐同时使用</p>
      <p v-if="type === 'A'" key="type-a">1</p>
      <p v-else-if="type === 'B'" key="type-b">2</p>
      <p v-else>3</p>
      <p v-show="flag">just a show</p>
    </div>
    <script>
      const app = new Vue({
        el: "#app",
        data() {
          return {
            type: "B",
            flag: true,
          };
        },
      });
    </script>
  </body>
</html>
```

---

## <a id="tip-8">列表渲染</a>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  </head>
  <body>
    <div id="app">
      <ul>
        <li v-for="(value,name,index) in object">
          {{index}}-{{name}}-{{value}}
        </li>
      </ul>
      <hr />
      <!-- 过虑后的数组遍历 -->
      <!-- 在计算属性不适用的情况下 (例如，在嵌套 v-for 循环中) 你可以使用一个方法 -->
      <ul>
        <li v-for="item in evenNum">{{item}}</li>
      </ul>
      <hr />
      <p>
        ul里面限制只能出现li这里我们使用组件，为了避免编译错误。我们使用了is.不过.vue文件可以避免这种问题
      </p>
      <form @submit.prevent="addNewTodo" action="">
        <label for="new-todo">Add to todo</label>
        <input
          type="text"
          v-model="newTodoText"
          id="new-todo"
          placeholder="E.G feed the cat"
        />
        <button>Add</button>
      </form>
      <ul>
        <li
          is="todo-item"
          v-for="(todo,index) in todos"
          :title="todo.title"
          @remove="todos.splice(index,1)"
        ></li>
      </ul>
    </div>
    <script>
      Vue.component("todo-item", {
        template: `
        <li>
        {{title}}
        <button @click="$emit('remove')">Remove</button>
        </li>
        `,
        props: ["title"],
      });
      const app = new Vue({
        el: "#app",
        data() {
          return {
            newTodoText: "",
            todos: [
              {
                id: 1,
                title: "Do the dishes",
              },
              {
                id: 2,
                title: "Take out the trash",
              },
              {
                id: 3,
                title: "Mow the lawn",
              },
            ],
            nextTodoId: 4,
            arr: [1, 2, 3, , 4, 5, 6, 7],
            object: {
              title: "How to do lists in Vue",
              author: "Jane Doe",
              publishedAt: "2016-04-10",
            },
          };
        },
        methods: {
          addNewTodo() {
            this.todos.push({
              id: this.nextTodoId++,
              title: this.newTodoText,
            });
            this.nextTodoId++;
          },
        },
        computed: {
          evenNum() {
            return this.arr.filter((item) => {
              return item % 2 === 0;
            });
          },
        },
      });
    </script>
  </body>
</html>
```

---

## <a id="tip-9">事件</a>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  </head>
  <body>
    <div id="app">
      <button @click="say('hello,vue')">click me</button>
      <!-- 停止冒泡 -->
      <button @click.stop="console.log(100)">click me 100</button>
      <!-- 阻止默认事件 -->
      <button @click.prevent="console.log(200)">click me 200</button>
      <!-- 只会触发一次 -->
      <button @click.once="console.log(300)">click me 300</button>
      <input v-on:keyup.right="onPageDown" />
    </div>
    <script>
      const app = new Vue({
        el: "#app",
        methods: {
          say(msg) {
            console.log(msg);
          },
          onPageDown() {
            console.log("the keyup");
          },
        },
      });
    </script>
  </body>
</html>
```

---

## <a id="tip-10">表单输入</a>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  </head>
  <body>
    <div id="app">
      <input type="text" v-model="msg" />
      <hr />
      <label for="jack">jack</label>
      <input
        type="checkbox"
        name=""
        id="jack"
        value="jack"
        v-model="checkboxs"
      />
      <label for="john">john</label>
      <input
        type="checkbox"
        name=""
        id="john"
        value="john"
        v-model="checkboxs"
      />
      <hr />
      <input type="radio" id="one" value="One" v-model="picked" />
      <label for="one">One</label>
      <br />
      <input type="radio" id="two" value="Two" v-model="picked" />
      <label for="two">Two</label>
      <br />
      <span>Picked: {{ picked }}</span>
      <hr />
      <select name="" id="" v-model="selected">
        <option disabled value="">请选择</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
      <hr />
      <select name="" id="" v-model="selectedi">
        <option v-for="option in options" :value="option.value">
          {{option.text}}
        </option>
      </select>
      <span>selectedi: {{selectedi}}</span>
      <hr />
      <!-- 切换布尔值 -->
      <input type="checkbox" v-model="toggle" />
      <hr />
      <!-- 在“change”时而非“input”时更新 -->
      <input v-model.lazy="msg" />
      <!-- 如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符 -->
      <input v-model.number="age" type="number" />
      <!-- 如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符 -->
      <input v-model.trim="msg" />
      <hr />
    </div>
    <script>
      Vue.component('base-checkbox',{})
      const app = new Vue({
        el: "#app",
        data() {
          return {
            age: null,
            msg: "",
            checkboxs: [],
            picked: "",
            selected: "",
            selectedi: "",
            options: [
              { text: "One", value: "A" },
              { text: "Two", value: "B" },
              { text: "Three", value: "C" },
            ],
            toggle: false,
          };
        },
      });
    </script>
  </body>
</html>
```
