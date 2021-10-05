> transform

```html
<style>
  .container {
    height: 600px;
    background: yellow;
  }
  .container > .box-1 {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: wheat;
    /* 偏移 */
    transform: translate(30px, 30px);
  }
  .container > .box-2 {
    width: 0px;
    height: 0px;
    border: 20px solid;
    border-color: transparent transparent red transparent;
    /*x轴拉伸 y轴拉伸 */
    transform: translate(30px, 20px) scale(2, 1.5);
  }
  .box-3 {
    width: 50px;
    height: 25px;
    background: gray;
    border-radius: 50px 50px 0 0;
    /* 顺时针旋转 */
    transform: rotate(180deg);
  }
</style>

<div class="container">
  <div class="box-1"></div>
  <div class="box-2"></div>
  <br />
  <br />
  <div class="box-3"></div>
</div>
```

- transition

```html
<style>
  .box-1 {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: khaki;
    display: flex;
    justify-content: center;
    align-items: center;
    /* 渐变 分为两段一段改变背景，第二段渐变旋转 1s渐变时间 0.5s延迟 均速 */

    /*

        linear - 均速
        ease-in - 越来越快
        ease-out 越来越慢
        ease-in-out - 先加速后减速

        */
    transition: background 1s, transform 1s 0.5s linear;
  }
  .box-1:hover {
    background: darkblue;
    color: white;
    transform: rotate(180deg);
  }
</style>
<div class="box-1">hover me</div>
```

animation

```html
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: skyblue;
    overflow: hidden;
  }
  .container > .cloud {
    width: 50px;
    height: 50px;
    background: coral;
    position: absolute;
    top: 200px;
    opacity: 0.8;
    /* 动画分为两段，第一个动画名，动画完成时间，动画执行次数，动画反转，动画执行过程的速度  */
    animation: wind 10s linear infinite reverse, jump 0.3s 3 2s ease;
  }
  @keyframes wind {
    0% {
      left: -300px;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes jump {
    0% {
      top: 200px;
    }
    50% {
      top: 150px;
    }
    100% {
      top: 200px;
    }
  }
</style>

<div class="container">
  <div class="cloud"></div>
</div>
```
