> 移动端优化

- 设置 meta 标签让浏览器不缩放 html

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
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

之后根据javascript来兼容各种手机屏幕

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