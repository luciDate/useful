> 移动端优化

- 如果没有设置浏览器会默认缩放我们的逻辑分辨率 设置 meta 标签让浏览器不缩放 html

- 一般 iphone 的 viewport 为 980px 它之所以能够看到完整的 pc 网页，是先排版，再缩放

> 为什么不用默认的 980px 布局

不同设备宽度不可控制

链接不可点，缩小显示不好交互

缩放可能带来滚动

width=device-width // 宽度等于设备的宽度

minimum-scale=1.0 // 最小缩放比

maximum-scale=1.0 // 最大缩放比

initial-scale // 页面初始缩放

user-scalable=0 // 用户是否能缩放

```html
<meta
  name="viewport"
  content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"
/>
```

- 一般的手机设计稿为 640x1136 和 750x1134

- 手机的 1px 作为逻辑分辨率不等于各个设备的 1px，其中有逻辑分辨率与物理分辨率，物理分辨率可以让图片或者文字更加细腻逼真

- 移动端的适配，可以使用 max-width 和 min-width 搭配进行适配



> rem

- html 默认的字体大小是 16px 一般 1rem 等于 16px;

- 我们可以设置

```css
html {
  /* 相当于100px */
  font-size: 625%;
}

.container {
  /* 相当于宽高各100px */
  width: 0.1rem;
  height: 0.1rem;
  background: gold;
}
```

之后根据 javascript 来兼容各种手机屏幕

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      html {
        /* 因为html字体大小的整体变化 dom里面的字体大小要单独设置 */
        font-size: 625%;
      }
      .container {
        max-width: 6.4rem;
        margin: 0 auto;
      }
      .news {
        display: flex;
      }
      .news .figure {
        flex: 0 0 1.8rem;
        height: 1rem;
        background: gold;
        margin: 0.1rem 0.2rem 0 0;
      }
      .news .intro h2 {
        font-size: 0.2rem;
      }
      .news .intro .badge {
        font-size: 0.16rem;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="news">
        <div class="figure"></div>
        <div class="intro">
          <h2>NBA视频合集 : 字母哥抢断一条龙</h2>
          <div class="badge">专题</div>
        </div>
      </div>
      <div class="news">
        <div class="figure"></div>
        <div class="intro">
          <h2>NBA视频合集 : 字母哥抢断一条龙</h2>
          <div class="badge">专题</div>
        </div>
      </div>
      <div class="news">
        <div class="figure"></div>
        <div class="intro">
          <h2>NBA视频合集 : 字母哥抢断一条龙</h2>
          <div class="badge">专题</div>
        </div>
      </div>
      <div class="news">
        <div class="figure"></div>
        <div class="intro">
          <h2>NBA视频合集 : 字母哥抢断一条龙</h2>
          <div class="badge">专题</div>
        </div>
      </div>
    </div>
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        // 这里是640是设计稿的宽度，750的设计稿就是750
        document.querySelector("html").style.fontSize =
          (window.screen.width / 640) * 100 + "px";
      });
    </script>
  </body>
</html>
```

> touch事件

touchstart: 手指触摸屏幕触发

touchmove: 手指滑动 连续触发

touchend: 手指离开屏幕触发

touches: 跟踪触摸操作的数组

targetTouches: 特定事件目标的touch数组

changeTouches: 上次触摸改变的touch数组

> touches包括

clientX: 触摸目标在视口中的x坐标
clientY: 触摸目标在视口中的y坐标
pageX: 触摸目标在页面中的x坐标
pageyY: 触摸目标在页面中的y坐标
screenX: 触摸目标在屏幕中的x坐标
screenY: 触摸目标在屏幕中的y坐标
target: 触摸的dom节点







