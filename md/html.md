# Html 备忘录

## 大纲

[html 结构](#tip-1)

[html 注释](#tip-2)

[html 常用标签](#tip-3)

[css 简绍](#tip-4)

[css 注释](#tip-5)

[css 引入](#tip-6)

[css 选择器](#tip-7)

[css 样式的继承](#tip-8)

[css 优先级](#tip-9)

[css 字体样式](#tip-10)

[css 文本样式](#tip-11`)

[css 盒模型](#tip-12`)

[css 布局模型](#tip-13`)

[css flex 布局](#tip-14`)

[css 几种居中](#tip-15`)

---

## <a id="tip-1">html 结构</a>

`<!DOCTYPE html> </ html>`标签声明 html5 文档

`<head></head>`标签包含一些辅助属性`<title></title>`,`<link />`,`<meta />`,`<style></style>`等。但是浏览器除了会在标题栏显示`<title>`元素的内容外，不会向用户显示 head 元素内的其他任何内容。`<body></body>`标签对：它是 HTML 文档的主体部分，在此标签中可以包含`<p>`,`<h1>`,`<br>`等众多标签，`<body>`标签出现在`</head>`标签之后，且必须在闭标签`</html>`之前闭合。`<script></script>`最佳位置是放在`<body>`
里面`</body>`。能在 Dom 渲染完成之后立即加载。

---

## <a id="tip-2">html 注释</a>

html 可以使用`<!--><-->`来注释

---

## <a id="tip-3">html 常用标签</a>

```html
<div></div>
<span></span>
<p></p>
<h1></h1>
<header></header>
<footer></footer>
<section></section>
<br />
<hr />
<img />
<ul></ul>
<li></li>
<a target="_blank"
  >a标签有的target属性，代表打开网页的方式。可选值为”_self和_blank”，默认值为_self，代表在当前页面打开链接，_blank代表在新窗口打开链接。</a
>
<table></table>
<tr></tr>
<th></th>
<td></td>
-----------------form包裹-----------------------
<form method="传送方式" action="服务器地址"></form>
<label for="name"></label>

<input id="name" type="text" placeholder="请输入" />
<input type="password" />
<input type="number" />
<input type="email" />
<textarea>文本域</textarea>
<select>
  <option value=""></option>
  <option value="">下拉选择框</option>
  <option value="book">book</option>
  <option value="food">food</option>
</select>
<label for="">
  <input type="readio" value="单选框" />
  <input type="checkbox" value="复选框" />
</label>
<input type="submit" value="提交" />
<input type="reset" value="重置" />
<button>click me</button>

------------------------------------------------
```

---

## <a id="tip-4">css 简绍</a>

CSS 全称为“层叠样式表 (Cascading Style Sheets)”，它主要是用于定义 HTML 内容在浏览器内的显示样式，如文字大小、颜色、字体加粗等

css 样式由选择符和声明组成，而声明又由属性和值组成 比如 `p{color : #ff0000}`

---

## <a id="tip-5">css 注释</a>

就像在 Html 的注释一样，在 CSS 中也有注释语句 `/* 注释 */`

---

## <a id="tip-6">css 引入</a>

内联式 css 样式 :css 样式表就是把 css 代码直接写在现有的 HTML 标签中，如`<p style="color:#ff0000;"></p>`

嵌入式 css 样式 :嵌入式 css 样式，就是可以把 css 样式代码写在`<head></head>`里面的,`<style type="text/css"></style>`标签之间

外部式 css 样式(也可称为外联式)就是把 css 代码写一个单独的外部文件中，这个 css 样式文件以“.css”为扩展名，在`<head></head>`中，用`<link href="index.css" rel="stylesheet" type="text/css" />`

因为这三种样式是有优先级的,是可以覆盖的。内联式 > 嵌入式 > 外部式

---

## <a id="tip-7">css 选择器</a>

每一条 css 样式声明（定义）由两部分组成，如 选择器{ 样式; }

标签选择器 `p{font-size:12px;line-height:1.6em;}`

类选择器 `.test-1{color:#ff0000;}`

ID 选择器 `#test{color:d9d9d9}`

子选择器 `.container > .item {width:100px}`

后代选择器 `.wrapper .item{height:300px}`

伪类选择器 `div:hover`, `div:disabled`,`div:focus`,`div::after`,`div::before`,`div:first-child(odd)`,`div:last-child(even)`,`div:nth-child()`,`div:not()`

通用选择器 `* {color:red;}`

同时选择器 `div,p{color:red}`

单个兄弟选择器 `li + li{color:blue}`

所有兄弟选择器 `li ~ li{color:blue}`

等于选择器 `a[href="https://www.baidu.com"]`

包含选择器 `a[href*="https://www.baidu.com"]`

---

## <a id="tip-8">css 样式的继承</a>

CSS 的某些样式是具有继承性的 如:container{color:red} 子元素会继承红色字体

---

## <a id="tip-9">css 优先级</a>

!import> 内联样式 > id 选择器 > 类选择器 > 标签选择器 > 通配选择器

---

## <a id="tip-10">css 字体样式</a>

使用 font-family 设置字体 如:body{font-family:"宋体";}

font-size 设置字体大小 如:body{font-size:12px;}

font-weight 设置字体粗细 如:p span{font-weight:900;}

color 设置字体颜色 p{color:#ff0000}

---

## <a id="tip-11">css 文本样式</a>

文本中间有一条删除线 p{text-decoration:line-through;}

使用 text-indent 为文本添加首行缩进 p{text-indent:2em;}

使用 line-height 为文字设置行间间距 p{line-height:50px}

中文字间隔、字母间隔设置 p {letter-spacing: 50px} 这个样式使用在英文单词时，是设置字母与字母之间的间距。

英文单词之间的间距 p {word-spacing:50px}

设置文本对齐方式 p {text-align:center/left/right}

长度单位 px 指的是显示器上的小点 em 指的是如果元素的 font-size 为 14px ，那么 1em = 14px;

---

## <a id="tip-11">css 盒模型</a>

元素分类 :tml 中的标签元素大体被分为三种不同的类型：块状元素、行内元素和内联块状元素。

常用的块状元素有:`<div>、<p>、<h1>...<h6>、<ol>、<ul>、<dl>、<table>、<address>、<blockquote> 、<form>`

常用的内联元素有:`<a>、<span>、<br>、<i>、<em>、<strong>、<label>、<q>、<var>、<cite>、<code>`

常用的内联块状元素有:`<img>、<input>`

块级元素 : 每个块级元素都从新的一行开始，并且其后的元素也另起一行。元素的高度、宽度、行高以及顶和底边距都可设置。元素宽度在不设置的情况下，是它本身父容器的 100%（和父元素的宽度一致），除非设定一个宽度。

行内元素 : 和其他元素都在一行上，元素的高度、宽度及顶部和底部边距不可设置，元素的宽度就是它包含的文字或图片的宽度，不可改变

内联块状元素 : 和其他元素都在一行上 元素的高度、宽度、行高以及顶和底边距都可设置

none 不占位隐藏 : div{display:none}

visibility 占位隐藏 : div{}

一个盒子模型的实际宽高。等于它的宽高加上 padding 和 boorder

背景色 div {background:red}

边框设置 `border: soid/dashed 1px #ff0000`, `border-width(盒子左右厚度这个有点意思):50px`,
`div{border-bottom:1px solid red;}`

设置圆角 : `div{border-radius: 20px 10px 15px 30px;}`

盒子设置内边距 : `div{padding:20px 10px 15px 30px;}`

置外边距 `div{margin:20px 10px 15px 30px;}`

---

## <a id="tip-13">css 布局模型</a>

流动模型 : 流动（Flow）是默认的网页布局模式。也就是说网页在默认状态下的 HTML 网页元素都是根据流动模型来分布网页内容的。

浮动模型 : 块状元素独占一行,我们想让两个块状元素并排显示,设置元素浮动就可以实现这一愿望。`<div style="float:left"></div>`,`<div style="float:left"></div>`

层模型 : 绝对定位(position: absolute),相对定位(position: relative),固定定位(position: fixed)

层模型之绝对定位 : position:absolute(表示绝对定位)，这条语句的作用将元素从文档流中拖出来，然后使用 left、right、top、bottom 属性相对于其最接近的一个具有定位属性的父包含块进行绝对定位。如果不存在这样的包含块，则相对于 body 元素，即相对于浏览器窗口。对了，如果有父元素，父元素要设置 position:relative

层模型之相对定位 : 如果想为元素设置层模型中的相对定位，需要设置 position:relative（表示相对定位），它通过 left、right、top、bottom 属性确定元素在正常文档流中的偏移位置。相对定位完成的过程是首先按 static(float)方式生成一个元素(并且元素像层一样浮动了起来)，然后相对于以前的位置移动，移动的方向和幅度由 left、right、top、bottom 属性确定，偏移前的位置保留不动。

层模型之固定定位 : fixed：表示固定定位，与 absolute 定位类型类似，但它的相对移动的坐标是视图（屏幕内的网页窗口）本身。由于视图本身是固定的，它不会随浏览器窗口的滚动条滚动而变化，除非你在屏幕中移动浏览器窗口的屏幕位置，或改变浏览器窗口的显示大小，因此固定定位的元素会始终位于浏览器窗口内视图的某个位置，不会受文档流动影响，这与 background-attachment:fixed;属性功能相同。以下代码可以实现相对于浏览器视图向右移动 100px，向下移动 50px。并且拖动滚动条时位置固定不变。

---

## <a id="tip-14">css flex 布局</a>

flex 的特点 : 设置 display: flex 属性可以把块级元素在一排显示。flex 需要添加在父元素上，改变子元素的排列顺序。默认为从左往右依次排列,且和父元素左边没有间隙。哦。默认不换行

x 轴对齐 : `justify-content: flex-start | flex-end | center | space-between | space-around;`

y 轴对齐 ： `align-items: flex-start | flex-end | center | baseline | stretch;`

子元素是否伸缩 ``flex : 0 0 100px`,其中前两个参数 0 代表不伸长，不缩小，1 则反过来。100px 表示固定宽度

---

## <a id="tip-15">css 几种居中</a>

行内元素 : `span{text-align:center}`

定宽块状元素 : 当被设置元素为 块状元素 时用 text-align：center 就不起作用了，这时也分两种情况：定宽块状元素和不定宽块状元素。这时候使用 `div{margin:0 auto}`

面试常考题之已知宽高实现盒子水平垂直居中:

```css
.box {
  border: solid 1px #ff0000;
  height: 300px;
  position: relative;
}
.box1 {
  position: absolute;
  top: 50%;
  left: 50%;
  /* margin--top的值为负的高度的一半 , margin-left的值为负的宽度的一半 */
  margin: -100px 0 0 -100px;
  width: 200px;
  height: 200px;
  border: solid 1px #000000;
}
```

面试常考题之宽高不定实现盒子水平垂直居中

```css
.box {
  border: 1px solid #00ee00;
  height: 300px;
  position: relative;
}

.box1 {
  border: 1px solid red;
  position: absolute;
  top: 50%;
  left: 50%;
  /* 第一个参数是x轴 之后y轴 */
  transform: translate(-50%, -50%);
}
```
