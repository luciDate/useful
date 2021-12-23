## 片段引入

> 如果你有一个 SCSS 或 Sass 文件需要引入， 但是你又不希望它被编译为一个 CSS 文件， 这时，你就可以在文件名前面加一个下划线，就能避免被编译。 这将告诉 Sass 不要把它编译成 CSS 文件。 然后，你就可以像往常一样引入这个文件了，而且还可以省略掉文件名前面的下划线。比如文件夹中的\_reset.scss

> 注意，在同一个目录不能同时存在带下划线和不带下划线的同名文件。 例如， \_colors.scss 不能与 colors.scss 并存。

## 变量

> 可参考 \_variables.scss

```sass
$bgColor:#ff00;
```

```sass
.container{
  width:100px;
  height:100px;
  backgournd:$bgColor;
}
```

## 嵌套

```sass
.container{
    position: relative;
    .item{
        background: #ddd;
        a{
            color:#ff0000;
        }
    }
}
```

被编译为

```css
.container {
  position: relative;
}

.container .item {
  background: #ddd;
}

.container .item a {
  color: #ff0000;
}
```

父级选择器

```sass
.container{
    width: 100px;
    height: 100px;
    background: #ff0000;
    &:hover{
        background: #0000ff;
    }
}
```

被编译为

```
.container {
  width: 100px;
  height: 100px;
  background: #ff0000;
}

.container:hover {
  background: #0000ff;
}
```

## mixin

```sass
triangle
```
