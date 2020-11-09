# Javascript

## 大纲

[Class 基础](#tip-1)

[设计原则](#tip-2)

[单列模式](#tip-3)

[观察者模式](#tip-4)

[工厂模式](#tip-5)

[适配器模式](#tip-6)

[装饰器模式](#tip-7)

[状态模式](#tip-8)

---

## <a id="tip-1">Class 基础</a>

```javascript
//类
class People {
  constructor(name, age, aka = "dahl") {
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
//实列
const x = new People("aza", 18);
x.eat();
x.speak();
```

1.继承

1. People 是父类。是公共的，不仅仅服务于 Student
2. 继承可将公共方法抽离出来，提高复用，减少冗余

```javascript
class People {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {
    console.log(`${this.name} is eating`);
  }
  spaek() {
    console.log(`my name is ${this.name},i am ${this.age} year old`);
  }
}

class Student extends People {
  constructor(name, age, number) {
    //把形参交给父类处理
    super(name, age);
    //单独处理number形参
    this.number = number;
  }
  study() {
    console.log(`${this.name} is study`);
  }
}

const a = new Student("aza", 10, "0");
a.eat();
a.study();
console.log(a.number);

const c = new Student("cc", 10, "1");
c.spaek();
c.study();
console.log(c.number);
```

2.封装

0. 私有化属性方法
1. public 完全开放
2. protected 对子类开放
3. private 对自己开放
4. javascript 没有这三个关键字。typescript 可以实现。或者潜规则属性和方法用`_`开头代表私有不要乱访问

私有化属性方法

```javascript
const _radius = Symbol();
const _draw = Symbol();

class Circle {
  constructor(radius) {
    this[_radius] = radius;
  }
  [_draw]() {
    console.log("draw");
  }
}

//这时候默认外部是不显示Circle私有属性方法的
const c = new Circle(1);
//hack掉私有化的值
const key = Object.getOwnPropertySymbols(c)[0];
console.log(c[key]);
```

3.多态

```javascript
//形状
class Shape {
  move() {
    console.log("move");
  }
}
//圆形
class Circle extends Shape {
  move() {
    //调用父类函数
    super.move();
    //多态重写方法
    console.log("cicle move");
  }
}
```

4. 抽象

屏蔽接口的复杂性。对外暴露简单操作的接口

类之间的引用

```javascript
class People {
  constructor(name, hourse) {
    this.name = name;
    this.hourse = hourse;
  }
  speak() {
    console.log(`my name is ${this.name}`);
  }
}

class Hourse {
  constructor(name) {
    this.name = name;
  }
}

const h = new Hourse("jingxi");
const p = new People("aza", h);

console.log(p.hourse.name);
```

静态方法

```javascript
//不需要实列化就可以执行的工具函数
class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  draw() {}
  static parse(str) {
    const radius = JSON.parse(str).radius;
    return new Circle(radius);
  }
}
const circle = Circle.parse('{"radius":1}');
console.log(circle);
```

立即执行静态方法

```javascript
class T {
  constructor(num) {
    this.num = num;
  }
  cut() {
    this.num -= 1;
  }
}

class T1 {
  constructor() {}
}
T1.init = (function () {
  let instance;
  return function () {
    if (!instance) {
      instance = new T(100);
    }
    return instance;
  };
})();

const aza = T1.init();
const dl = T1.init();

aza.cut();
console.log(aza.num);
dl.cut();
console.log(dl.num);
```

---

## <a id="tip-2">设计原则</a>

1. 单一职责原则 (程序只做好一件事)

2. 开放封闭原则 (扩展开放修改封闭)

3. 李氏置换原则 (子类能覆盖父类)

4. 接口独立原则 (保持接口独立，避免"胖接口")

5. 依赖导致原则 (面向接口编程，只关注接口不关注实现)

小原则收集

1. 快速搭建原型。需要什么功能之后再扩展

2. 舍弃高效率取可移植性

3. 充分利用功能的复用性

4. 避免强制性的用户界面

5. 允许用户定制环境

6. 沉默是金

7. 各部位大于整体

8. 寻求 90%的解决方案

---

## <a id="tip-3">单列模式</a>

系统中被唯一使用的

多个实列只能使用同一个类

```javascript
class Single {
  constructor() {
    this.x = 100;
  }
}

Single.init = (() => {
  let instance;
  return () => {
    if (!instance) instance = new Single();
    return instance;
  };
})();

const x = Single.init();
const p = Single.init();

console.log(x === p);
```

---

## <a id="tip-4">观察者模式</a>

```javascript
// 主题与观察者分离。不是主动触发而是被动监听
// 符合开放封闭原则

//主题
class Subject {
  constructor() {
    this.state = 0;
    this.observers = [];
  }
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
    this.notifyAllObservers();
  }
  notifyAllObservers() {
    this.observers.forEach((observer) => {
      observer.update();
    });
  }
  attach(observer) {
    this.observers.push(observer);
  }
}

//观察者
class Observer {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
    // 在观察者类属性初始化结束后，需要把观察者添加到主题里面取
    this.subject.attach(this);
  }
  update() {
    console.log(`${this.name} update , state: ${this.subject.getState()}`);
  }
}

const s = new Subject();
const o1 = new Observer("o1", s);
const o2 = new Observer("o2", s);
const o3 = new Observer("o3", s);

s.setState(1);
```

观察者场景

比如事件添加。一个或多个事件添加之后智慧被动监听，等待被订阅触发

```html
<body>
  <button id="test">click me</button>
  <script>
    const t = document.querySelector("#test");
    t.addEventListener("click", () => {
      console.log(1);
    });
    t.addEventListener("click", () => {
      console.log(2);
    });
    t.addEventListener("click", () => {
      console.log(3);
    });
  </script>
</body>
```

---

## <a id="tip-5">工厂模式</a>

封装 new 关键字。减少 new 关键字

构造函数与创建者分离

符合开放封闭原则

```javascript
class Product {
  constructor(name) {
    this.name = name;
  }
  init() {
    console.log("init");
  }
}

class Creator {
  create(name) {
    return new Product(name);
  }
}

const creator = new Creator();
const c = creator.create("c1");
c.init();
```

## <a id="tip-6">适配器模式</a>

就旧接口和使用者进行分离

符合开放封闭原则

```javascript
class Adaptee {
  specificRequest() {
    return "德国标准插头";
  }
}

class Target {
  constructor() {
    this.Adaptee = new Adaptee();
  }
  request() {
    let info = this.Adaptee.specificRequest();
    return `${info} -> 转换器 -> 中国标准插头`;
  }
}

let target = new Target();
console.log(target.request());
```

---

## <a id="tip-7">装饰器模式</a>

为对象添加新功能

不改变其原有结构和功能

```javascript
class Circle {
  draw() {
    console.log("画个圆形");
  }
}

//油漆匠
class Decorator {
  constructor(circle) {
    this.circle = circle;
  }
  draw() {
    this.circle.draw();
    this.setRedBorder(circle);
  }
  setRedBorder(circle) {
    console.log("设置红色边框");
  }
}

const circle = new Circle();
circle.draw();

const dec = new Decorator(circle);
dec.draw();
```

## <a id="tip-8">状态模式</a>

一个对象有状态变化

每次状态变化都会触发一个逻辑

不能总是使用if...else判断

```javascript
//状态 红灯，绿灯，黄灯
class State {
  constructor(color) {
    this.color = color;
  }
  handle(context) {
    console.log(`turn to ${this.color} light`);
    context.setState(this);
  }
}

//主体
class Context {
  constructor() {
    this.state = null;
  }
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
  }
}

const context = new Context();

const green = new State("green");
const yellow = new State("yellow");
const red = new State("red");

green.handle(context);
console.log(context.getState());
red.handle(context);
console.log(context.getState());
```
