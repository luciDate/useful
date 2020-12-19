# flexLayout

父类

默认:

display:flex

方向:

flex-direction:row

flex-direction:row-reverse

flex-direction:column

flex-direction:column-reverse

换行:

flex-wrap: wrap;

flex-wrap: nowrap;

x轴

justify-content: start;

justify-content: center;

justify-content: end;

等距外边距，并且最左右没有边距:

justify-content:space-between;

等距外边距，并且最左右有一半的边距:

justify-content:space-around;

等距外边距，并且最左右等距:

justify-content: space-evenly;



y轴

align-items: flex-start;

align-items: center;

align-items: flex-end;

子类

第一个参数放大比例，默认auto

第二个参数缩小比例，默认1

以上两个参数，设置为0时不放大也不缩小

第三个参数。固定宽度

flex: 0 0 60px;


排序:

默认0，越小值越靠前

.order-1{
    order:1
}




