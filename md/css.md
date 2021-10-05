- 通用选择器

>

```html
<style>
  .box > * {
    width: 100px;
    height: 100px;
    background: blue;
  }
</style>

<div class="box">
  <div class="item"></div>
  <div class="item"></div>
</div>
```

- 兄弟选择器

```html
<style>
  li {
    list-style: none;
  }
  /* 子dom的下一个dom */
  .list-1 .item + .item {
    color: red;
  }
  /* 子dom的下一个所有dom */
  .list-2 .item ~ .item {
    color: blue;
  }
</style>

<!-- 遇到不同的dom会被打断 -->

<ul class="list-1">
  <li class="item">1</li>
  <li class="item">2</li>
  <li class="item">3</li>
  <div>666</div>
  <li class="item">4</li>
</ul>

<!-- 遇到不同的dom不会被打断 -->

<ul class="list-2">
  <li class="item">1</li>
  <li class="item">2</li>
  <li class="item">3</li>
  <div>666</div>
  <li class="item">4</li>
</ul>
```

- 等于选择器

```html
<style>
  a[href="https://www.baidu.com"]
  {
    color: red;
  }
  a[href*="https://www.bilibili.com"]
  {
    color: green;
  }
</style>

<a href="https://www.baidu.com">百度</a>
<a href="https://www.bilibili.com">哔哩哔哩</a>
```

- 伪元素选择器

```html
<style>
  li {
    list-style: none;
  }
  .box-1 {
    width: 100px;
    height: 100px;
    background: blue;
  }
  .box-1:hover {
    background: red;
  }
  .box-2:focus {
    background: greenyellow;
  }
  .box-3:disabled {
    border-color: red;
  }
  .box-4 > li:first-child {
    color: blue;
  }
  .box-4 > li:last-child {
    color: red;
  }
  .box-4 > li:nth-child(3) {
    color: darkturquoise;
  }
  .family > p::first-letter {
    color: blue;
  }
  .box-5::before {
    content: "0";
    color: blue;
  }
  .box-6::after {
    content: "6";
    color: red;
  }
  /* first-child必须在同一个父元素下的所有子元素 */
  .box-7 > .item:not(:first-child) {
    color: blue;
  }
  .box-8 > .item:nth-child(odd) {
    color: blue;
  }
  .box-9 > .item:nth-child(even) {
    color: red;
  }
</style>

<div class="box-1"></div>
<br />
<input type="text" class="box-2" />
<br />
<br />
<input type="text" class="box-3" disabled />
<br />
<ul class="box-4">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
<span class="family"><p>我爱我家</p></span>
<div class="box-5">12345</div>
<div class="box-6">12345</div>
<ul class="box-7">
  <li class="item">1</li>
  <li class="item">2</li>
  <li class="item">3</li>
  <li class="item">4</li>
  <li class="item">5</li>
</ul>
<ul class="box-8">
  <li class="item">1</li>
  <li class="item">2</li>
  <li class="item">3</li>
</ul>
<ul class="box-9">
  <li class="item">1</li>
  <li class="item">2</li>
  <li class="item">3</li>
</ul>
```

- 特殊选择器

```html
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  /* 子选择器，不包含同级子孙dom */
  .box-1 > li {
    background: blue;
  }
  /* 子选择器，包含同级子孙dom */
  .box-2 li {
    color: red;
  }

  /* 半圆 */
  .box-3 {
    width: 100px;
    height: 50px;
    background: gold;
    margin: 50px 0 0 50px;
    border-radius: 50% / 100% 100% 0 0;
  }

  /* 半三角 */
  .box-4 {
    width: 0px;
    height: 0px;
    border: 20px solid;
    border-color: transparent transparent transparent blue;
  }

  /* input placeholder */
  .box-5 {
    position: relative;
    width: 150px;
    height: 30px;
    background: red;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box-5 > .my-input {
    width: 150px;
    height: 30px;
  }
  .box-5 > .info {
    position: absolute;
    pointer-events: none;
    color: blue;
  }

  /* 选择器优先级 !import > dom内联 > id > class */

  /* container item-dom 自动换行 */

  /*
      默认不换行
      flex-wrap:wrap;

      等距外边距，并且最左右没有边距:

      justify-content:space-between;

      等距外边距，并且最左右有一半的边距:

      justify-content:space-around;

      等距外边距，并且最左右等距:

      justify-content: space-evenly;
      */

  .box-6 {
    margin: 0 0 0 100px;
    width: 600px;
    height: 400px;
    background: red;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .box-6 > .item {
    flex: 0 0 190px;
    height: 190px;
    background: blue;
  }

  /* calc计算函数 整块屏幕的100%减去100px 配合fixed-menu 使用 */
  /* body下的dom 必须脱离文档流也就是position:absolute才能height:100% */
  .box-7 {
    width: calc(100% - 100px);
    height: 300px;
    background: blue;
  }
</style>
<ul class="box-1">
  <li>1</li>
  <li>2</li>
  <ul>
    <li>2.5</li>
  </ul>
  <li>3</li>
</ul>

<ul class="box-2">
  <li>1</li>
  <li>2</li>
  <ul>
    <li>2.5</li>
  </ul>
  <li>3</li>
</ul>

<br />

<div class="box-3"></div>
<br />
<div class="box-4"></div>

<br />

<div class="box-5">
  <input type="text" class="my-input" />
  <div class="info">i'm placeholder</div>
</div>

<br />

<div class="box-6">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">3</div>
  <div class="item">3</div>
  <div class="item">3</div>
</div>

<br />

<div class="box-7"></div>

<br />
<script>
  const myInput = document.querySelector(".my-input");
  const myInfo = document.querySelector(".info");
  let flagI = false;

  myInput.addEventListener("input", () => {
    if (myInput.value.length > 0 && flagI === false) {
      myInfo.style.display = "none";
      flagI = !flagI;
    }
    if (myInput.value.length === 0 && flagI === true) {
      myInfo.style.display = "block";
      flagI = !flagI;
    }
  });
</script>
```
