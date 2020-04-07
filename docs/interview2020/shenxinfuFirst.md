

- Vue 的生命周期？
- webpack 的工作流程？

答：
  - 首先，构建就是做这件事情，把源代码转换成发布到线上的可执行 JavaScrip、CSS、HTML 代码。
  - 基础：webpack 就是一切皆为模块
  - 基本流程：当 webpack 处理程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
  - Loader。loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。**loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块**。比如 CSS Loader
  - plugin 。**可以处理各种任务，从打包优化和压缩**，一直到重新定义环境中的变量。比如：Ugrify Plugin 等等
  - entry 和 output
  - 功能
    - 打包：将多个文件 打包成 一个文件，减少服务器压力和下载带宽【合并文件】
    - 转换：将预编译语言 转换成 浏览器识别的语言【Loader】
    - 优化：性能优化【压缩代码等】


参考：[https://www.jianshu.com/p/b8d6ac3041e3](https://www.jianshu.com/p/b8d6ac3041e3)


- CSS 的优先级？

!important>行内样式>ID>类选择器 = 属性选择器 = 伪类选择器[:after]>标签选择器 = 伪元素选择器[::before]

- float有哪些值？清除浮动？
none, left, right。float会使元素脱离原文档流，从而破坏原来的布局。
清除浮动：
  - overflow:hidden
  - 高度设置
  - clear: both

- Sass/Less？【重点回顾】
  - Less、Sass/Scss是什么？Less 是一种动态样式语言. 对CSS赋予了动态语言的特性，如变量、继承、运算、函数。Sass  是一种动态样式语言，Sass语法属于缩排语法，比 css 比多出好些功能(如变量、嵌套、运算,混入(Mixin)、继承、颜色处理，函数等)，更容易阅读。
  - less和sass的相同之处
  
1、混入(Mixins)——class中的class；

2、参数混入——可以传递参数的class，就像函数一样；

3、嵌套规则——Class中嵌套class，从而减少重复的代码；

4、运算——CSS中用上数学；

5、颜色功能——可以编辑颜色；

6、名字空间(namespace)——分组样式，从而可以被调用；

7、作用域——局部修改样式；

8、JavaScript 赋值——在CSS中使用
JavaScript表达式赋值

  - less和sass的区别

    Less和Sass的主要不同就是他们的实现方式。
    Less是基于JavaScript，是在客户端处理的。
    Sass是基于Ruby的，是在服务器端处理的。
    关于变量在Less和Sass中的唯一区别就是Less用@，Sass用$。

参考：[https://www.jianshu.com/p/029792f0c97d](https://www.jianshu.com/p/029792f0c97d)


- cookie、localStorage 和 sessionStorage
- 两列布局
  - 方法一：双inline-block
```css
#wrap{
  width: 100%;
  font-size: 0;
}
#left{
  width: 200px;
  height: 100px;
  display: inline-block;
}
#right{
  height: 100px;
  width: calc(100% - 200px);
  display: inline-block;
}
```
缺点：

为消除html中空格的影响需要把父级的font-size设为0
如果两边高度不一样，需要加vertical-align: top
  - 方法二：双float

```css
#left{
  float: left;
  width: 200px;
  height: 100px;
}
#right{
  float: left;
  height: 100px;
  width: calc(100% - 200px);
}
```

本方案和双inline-block方案原理相同，都是通过动态计算宽度来实现自适应。但是，由于浮动的block元素在有空间的情况下会依次紧贴，排列在一行，所以无需设置display: inline-block;，自然也就少了顶端对齐，空格字符占空间等问题。

缺点：
父元素需要清除浮动

方法三： float+margin-left
```css
#left{
  float: left;
  width: 200px;
  height: 100px;
}
#right{
  height:100px;
  margin-left: 200px;
} 
```
缺点：需要清除浮动,需要计算margin-left

方法四：absolute+margin-left
```css
#left{
  position: absolute;
  width: 200px;
  height: 100px;
}
#right{
  height: 100px;
  margin-left: 200px;
}
```
缺点：使用了绝对定位，若是用在某个div中，需要更改父容器的position。

方法五：float+BFC
```css
#wrap{
  overflow:hidden;
}
#left{
  width: 200px;
  height: 100px;
  float: left;
}
#right{
  height: 100px;
  margin-left: 0;
  overflow: auto;
}
```
这种方法同样是利用了左侧浮动，但是右侧盒子通过overflow:auto;形成了BFC，因此右侧的盒子不会被浮动的元素重叠。
缺点：父元素需要清除浮动。

方法六：flex布局
```css
#wrap{
  display: flex;
}
#left{
  width: 200px;
  height: 100px;
}
#right{
  height: 100px;
  flex: 1;
}
```
参考：[https://www.cnblogs.com/LingXiangLi/p/10252873.html](https://www.cnblogs.com/LingXiangLi/p/10252873.html)


- 三列布局
  - float
  - absolute
  - flex 布局

    - 仅需将容器设置为display:flex;，盒内元素两端对其，将中间元素设置为100%宽度即可填充空白，再利用margin值设置边距即可
    - 并且盒内元素的高度撑开容器的高度
```css
<div class="wrap">
    <div class="left">左侧</div>
    <div class="middle">中间</div>
    <div class="right">右侧</div>
</div>

<style type="text/css">
    .wrap {display: flex; justify-content: space-between;}
    .left, .right, .middle {height: 100px;}
    .left {width: 200px; background: coral;}
    .right {width: 120px; background: lightblue;}
    .middle {background: #555; width: 100%; margin: 0 20px;}
</style>
```
   - float和BFC配合圣杯布局
```css
<div class="wrap">
    <div class="middle">
        <div class="main">中间</div>
    </div>
    <div class="left">左侧</div>
    <div class="right">右侧</div>
</div>

<style type="text/css">
    .wrap {overflow: hidden;}
    .left {float: left; width: 200px; height: 100px; background: coral; margin-left: -100%;}
    .middle {float: left; width: 100%; height: 100px; background: lightblue;}
    .right {float: left; width: 120px; height: 100px; background: gray; margin-left: -120px;}
    .main {margin: 0 140px 0 220px; background: lightpink;}
</style>
```

- 垂直居中
- box-sizing
  - border-box
  - content-box
- 拖拽事件？【重点回顾】

| Event | On Event Handler | Fires when… |
|:---------:|:--------:|:--------:|
| `drag` | `ondrag` | 当拖动元素或选中的文本时触发。 |
| `dragend` | `ondragend` | 当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键). (见结束拖拽) |
| `dragenter` | `ondragenter` | 当拖动元素或选中的文本到一个可释放目标时触发（见 指定释放目标）。 |
| `dragexit` | [`ondragexit`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/ondragexit "The GlobalEventHandler.ondragexit property is an event handler for the dragexit event.") | 当元素变得不再是拖动操作的选中目标时触发。 |
| `dragleave` | [`ondragleave`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/ondragleave "A global event handler for the dragleave event.") | 当拖动元素或选中的文本离开一个可释放目标时触发。 |
| `dragover` | `ondragover` | 当元素或选中的文本被拖到一个可释放目标上时触发（每100毫秒触发一次）。 |
| `dragstart` | [`ondragstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/ondragstart "A global event handler for the dragstart event.") | 当用户开始拖动一个元素或选中的文本时触发（见开始拖动操作）。 |
| `drop` | [`ondrop`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/ondrop "下面这个示例演示了 ondrop 属性的用法来指定 drop 事件的处理函数。") | 当元素或选中的文本在可释放目标上被释放时触发（见执行释放）。 |

[https://blog.csdn.net/baidu_31333625/article/details/53811510](https://blog.csdn.net/baidu_31333625/article/details/53811510)

[https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)


- 鼠标右键？【重点回顾】
onContextMenu IE5|N|O 当浏览者按下鼠标右键出现菜单时或者通过键盘的按键触发页面菜单时触发的事件 [试试在页面中的<body>中加入onContentMenu="return false"就可禁止使用鼠标右键了]

集合看这篇文章：[https://blog.csdn.net/fengxinzi_jing/article/details/8773418](https://blog.csdn.net/fengxinzi_jing/article/details/8773418)


[https://www.jianshu.com/p/1c5e9dbfc4e2](https://www.jianshu.com/p/1c5e9dbfc4e2)

- 事件冒泡？
- 事件委托？
- 内存泄漏有哪些场景？
- React 和 Vue 最大的区别？
- 大顶堆和小顶推的区别【重点回顾】
  - 堆顶的数据不同（一个是最大，一个是最小）
- 数组和链表的区别
- Vue 的指令怎么实现？
- 数组去重？
- 性能优化有哪些？
- 字符串中查找出数字？【重点回顾】
  - parseInt() 方法
```js
    var str ="4500元";
    var num = parseInt(str);
```
  - 正则

```js
    var s ="价格4500元";
    var num= s.replace(/[^0-9]/ig,"");
```
- 并集怎么实现？

