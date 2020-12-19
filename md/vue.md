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

[组件基础](#tip-11)

[组件深入](#tip-12)

[插槽](#tip-13)

[边界情况](#tip-14)

[动画](#tip-15)

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
      <hr />
      <!-- 子组件传值给父组件 -->
      {{test}}
      <base-button :test="test" @sign="handleNewTest"></base-button>
    </div>
    <script>
      Vue.component("base-button", {
        props: {
          test: String,
        },
        template: `
        <button @click="handleTest">click me</button>
        `,
        methods: {
          handleTest() {
            this.$emit("sign", this.test + "i");
          },
        },
      });
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
          test: "test",
        },
        methods: {
          reverseMessage() {
            this.message = this.message.split("").reverse().join("");
          },
          changeMessage(e) {
            this.message = e.target.value;
          },
          handleNewTest(newTest) {
            this.test = newTest;
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
    /*
    beforeCreate（创建前）: 在数据观测和初始化事件还未开始,data、watcher、methods都还不存在，但是$route已存在，可以根据路由信息进行重定向等操作。

created(创建后)：在实例创建之后被调用，该阶段可以访问data，使用watcher、events、methods，也就是说 数据观测(data observer) 和event/watcher 事件配置 已完成。但是此时dom还没有被挂载。该阶段允许执行http请求操作。

beforeMount （挂载前）：将HTML解析生成AST节点，再根据AST节点动态生成渲染函数。相关render函数首次被调用(划重点)。

mounted (挂载后)：在挂载完成之后被调用，执行render函数生成虚拟dom，创建真实dom替换虚拟dom，并挂载到实例。可以操作dom，比如事件监听

beforeUpdate：vm.data更新之后，虚拟dom重新渲染之前被调用。在这个钩子可以修改vm.data更新之后，虚拟dom重新渲染之前被调用。在这个钩子可以修改vm.data更新之后，虚拟dom重新渲染之前被调用。在这个钩子可以修改vm.data，并不会触发附加的冲渲染过程。

updated：虚拟dom重新渲染后调用，若再次修改$vm.data，会再次触发beforeUpdate、updated，进入死循环。

beforeDestroy：实例被销毁前调用，也就是说在这个阶段还是可以调用实例的。

destroyed：实例被销毁后调用，所有的事件监听器已被移除，子实例被销毁
    */
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
      <!-- 子组件定制数据lovingVue会替代子组件的checked，其值会随着checked改变 -->
      <base-checkbox v-model="lovingVue"></base-checkbox>
      <hr />
      <!-- 子组件需要双向绑定的时候,使用v-bind.sync="doc"把对象传进去。通过消费事件把newTitle传出来 -->
      <!-- $event 访问到子组件被抛出的这个值在htmldom -->
      <base-input v-bind.sync="doc" @update="doc.title = $event"></base-input>
    </div>
    <script>
      Vue.component("base-input", {
        template: `
        <input type="text" @input="test" :value="title">
        `,
        props: ["title"],
        methods: {
          test(e) {
            let newTitle = e.target.value;
            this.$emit("update", newTitle);
          },
        },
      });
      Vue.component("base-checkbox", {
        model: {
          //定制属性
          props: "checked",
          //定制model事件
          event: "change",
        },
        props: {
          checked: Boolean,
        },
        template: `
        <input type="checkbox" :checked="checked" @change="$emit('change',$event.target.checked)" />
        `,
      });
      const app = new Vue({
        el: "#app",
        data() {
          return {
            doc: { title: "i am aza" },
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
            lovingVue: false,
          };
        },
      });
    </script>
  </body>
</html>
```

---

## <a id="tip-11">组件基础</a>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <style>
      .tab-button {
        padding: 6px 10px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 1px solid #ccc;
        cursor: pointer;
        background: #f0f0f0;
        margin-bottom: -1px;
        margin-right: -1px;
      }
      .tab-button:hover {
        background: #e0e0e0;
      }
      .tab-button.active {
        background: #e0e0e0;
      }
      .tab {
        border: 1px solid #ccc;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <div :style="{fontSize:postFontSize + 'em'}">
        <blog-post
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @enlarge-text="onEnlargeText"
        ></blog-post>
      </div>
      <hr />
      <base-input :vlaue="searchText" @input="searchText = $event"></base-input>
      <hr />
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-button',{active:currentTab === tab}]"
        @click="currentTab = tab"
      >
        {{tab}}
      </button>
      <component :is="currentTabComponent" class="tab"></component>
    </div>
    <script>
      Vue.component("tab-home", {
        template: "<div>Home component</div>",
      });
      Vue.component("tab-posts", {
        template: "<div>Posts component</div>",
      });
      Vue.component("tab-archive", {
        template: "<div>Archive component</div>",
      });
      Vue.component("base-input", {
        props: ["value"],
        template: `
        <input type="text" :value="value" @input="$emit('input',$event.target.value)">
        `,
      });
      Vue.component("blog-post", {
        props: ["post"],
        template: `
        <div class="blog-post">
        <h3>{{post.title}}</h3>
        <button @click="$emit('enlarge-text',0.1)">
        Enlarge text
        </button>
        <div v-html="post.content"></div>
        </div>
        `,
      });
      const app = new Vue({
        el: "#app",
        data() {
          return {
            posts: [
              { id: 1, title: "My journey with Vue" },
              { id: 2, title: "Blogging with Vue" },
              { id: 3, title: "Why Vue is so fun" },
            ],
            postFontSize: 1,
            searchText: "",
            currentTab: "Home",
            tabs: ["Home", "Posts", "Archive"],
          };
        },
        methods: {
          onEnlargeText(size) {
            this.postFontSize += size;
          },
        },
        computed: {
          currentTabComponent() {
            return "tab-" + this.currentTab.toLowerCase();
          },
        },
      });
    </script>
  </body>
</html>
```

---

## <a id="tip-12">组件深入</a>

父组件 prototype 深拷贝

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
    <!-- JavaScript 中对象和数组是通过引用传入的，
      所以对于一个数组或对象类型的 prop 来说，
      在子组件中改变变更这个对象或数组本身将会影响到父组件的状态。 -->
    <div id="app">
      <base-button :obj="obj"></base-button>
    </div>
    <script>
      Vue.component("base-button", {
        props: {
          obj: Object,
        },
        //深拷贝父组件的prototype
        data() {
          return {
            name: this.obj.name,
          };
        },
        template: `
        <button @click="foo">{{name}}</button>
        `,
        methods: {
          foo() {
            this.name = "dahl";
          },
        },
        //计算转换父组件的prototype
        computed: {
          fixObj() {
            return this.obj.name + " :p";
          },
        },
      });
      const app = new Vue({
        el: "#app",
        data: {
          obj: {
            name: "aza",
            num: 0,
          },
        },
      });
    </script>
  </body>
</html>
```

组件标签属性按需继承

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
      <base-input
        v-model="username"
        required
        placeholder="Enter your username"
      ></base-input>
    </div>
    <script>
      //inheritAttrs: false 否认继承
      //$attrs包含标签的原生属性attribute{required: true,placeholder: 'Enter your username'}
      Vue.component("base-input", {
        inheritAttrs: false,
        props: ["label", "value"],
        template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs.required"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `,
      });
      const app = new Vue({
        el: "#app",
        data: {
          aza: "aza",
          username: "",
        },
      });
    </script>
  </body>
</html>
```

动态组件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  </head>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .tab-button {
      margin-right: 5px;
    }
    .tab-button.active {
      background: rgb(190, 190, 190);
    }
    .tab {
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px 0 0 0;
    }
    .posts-tab {
      display: flex;
    }
    .posts-sidebar {
      width: 60px;
      list-style-type: none;
      border-right: 1px solid #ccc;
    }
    .posts-sidebar li {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .posts-sidebar li:hover {
      background: #eee;
    }
    .posts-sidebar li.selected {
      background: lightblue;
    }
  </style>
  <body>
    <div id="app">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="currentTab = tab"
        :class="['tab-button',{active:currentTab === tab}]"
      >
        {{tab}}
      </button>
      <keep-alive>
        <component :is="currentTabComponent" class="tab"></component>
      </keep-alive>
    </div>
    <script>
      Vue.component("tab-posts", {
        data() {
          return {
            posts: [
              { id: 1, title: "100", content: "100" },
              { id: 2, title: "200", content: "200" },
              { id: 3, title: "300", content: "300" },
            ],
            selectedPost: null,
          };
        },
        template: `
        <div class="posts-tab">
          <ul class="posts-sidebar">
            <li v-for="post in posts" :key="post.id" :class="{selected:post === selectedPost}" @click="selectedPost = post">{{post.title}}</li>
          </ul>
          <div class="select-post-container">
            <div v-if="selectedPost" class="selected-post">
              <h3>{{selectedPost.title}}<h3>
              <div v-html="selectedPost.content"></div>
            </div>
            <div v-else>
              Click on a blog title to the left to view it.
            <div>
          </div>
        </div>
        `,
      });
      Vue.component("tab-archive", {
        template: `
        <div>Archive component</div>
        `,
      });
      const app = new Vue({
        el: "#app",
        data: {
          currentTab: "Posts",
          tabs: ["Posts", "Archive"],
        },
        computed: {
          currentTabComponent() {
            return "tab-" + this.currentTab.toLowerCase();
          },
        },
      });
    </script>
  </body>
</html>
```

---

## <a id="tip-13">插槽</a>

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
      <!-- 插槽：分发内容 -->
      <base-layout>
        <template v-slot:header>
          <h1>here might be a page title</h1>
        </template>
        <template v-slot:default>
          <p>a paragraph for the main content</p>
          <p>and another one</p>
        </template>
        <template v-slot:footer>
          <p>heres some contact info</p>
        </template>
      </base-layout>
      <hr />
      <!-- 作用域插槽：父组件调用子组件props -->
      <current-user>
        <template v-slot:default="slotProps">
          {{slotProps.user.firstname}}
        </template>
      </current-user>
    </div>
    <script>
      Vue.component("current-user", {
        template: `
        <span>
        <slot :user="user">
        {{user.lastname}}
        </slot>
        </span>
        `,
        data() {
          return {
            user: { firstname: "aza", lastname: "zaz" },
          };
        },
      });
      Vue.component("base-layout", {
        template: `
      <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
      </div>
      `,
      });
      const app = new Vue({
        el: "#app",
      });
    </script>
  </body>
</html>
```

---

## <a id="tip-14">边界情况</a>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <style>
      .test {
        width: 300px;
        height: 100px;
        background: blue;
        transition: all 0.3s;
      }
    </style>
  </head>
  <body>
    <!-- 操作dom只能通过html模板 -->
    <div id="app">
      <div class="test" ref="testDom"></div>
      <br />
      <button @click="callTest">call dom</button>
      <hr />
      <base-input ref="input"></base-input>
      <br />
      <!-- 父组件调用子组件实列 -->
      <button @click="callRef">click me</button>
      <hr />
      <!-- 这个组件包含了大量静态内容。在这种情况下，
      你可以在根元素上添加 v-once 
      attribute 以确保这些内容只计算一次然后缓存起来 -->
      <static-content></static-content>
    </div>
    <script>
      Vue.component("static-content", {
        template: `
        <div v-once>
      <h1>Terms of Service</h1>
      ... a lot of static content ...
      </div>
        `,
      });
      Vue.component("base-input", {
        template: `
        <input />
        `,
        methods: {
          focus() {
            console.log("azaRef");
          },
        },
      });
      const app = new Vue({
        el: "#app",
        methods: {
          callTest() {
            this.$refs.testDom.style.width = "600px";
          },
          callRef() {
            this.$refs.input.focus();
          },
        },
      });
    </script>
  </body>
</html>
```

---

## <a id="tip-15">动画</a>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <link
      href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
      rel="stylesheet"
      type="text/css"
    />
    <style>
      .fade-enter-active,
      .fade-leave-active {
        transition: opacity 0.5s;
      }
      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }
      /* show为true激活enter过渡 */
      .slide-fade-enter-active {
        transition: all 0.3s ease;
      }
      /* show为false激活leave过渡 */
      .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
      }
      .slide-fade-enter,
      .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
      }
      .bounce-enter-active {
        animation: bounce-in 0.5s;
      }
      .bounce-leave-active {
        animation: bounce-in 0.5s reverse;
      }
      @keyframes bounce-in {
        0% {
          transform: scale(0);
        }
        50% {
          transform: scale(1.5);
        }
        100% {
          transform: scale(1);
        }
      }
    </style>
  </head>
  <body>
    <div id="app">
      <button @click="show = !show">Toggle show</button>
      <transition name="fade">
        <p v-if="show">hello</p>
      </transition>
      <hr />
      <button @click="flag = !flag">Toggle flag</button>
      <transition name="slide-fade">
        <p v-if="flag">hello</p>
      </transition>
      <hr />
      <button @click="show = !show">Toggle show</button>
      <transition name="bounce">
        <p v-if="show">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          facilisis enim libero, at lacinia diam fermentum id. Pellentesque
          habitant morbi tristique senectus et netus.
        </p>
      </transition>
      <hr />
      <!-- 自定义类名，配合动画库使用 -->
      <button @click="show = !show">Toggle render</button>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated tada"
        leave-active-class="animated bounceOutRight"
      >
        <p v-if="show">hello</p>
      </transition>
    </div>
    <script>
      const app = new Vue({
        el: "#app",
        data: {
          show: true,
          flag: true,
        },
      });
    </script>
  </body>
</html>
```
