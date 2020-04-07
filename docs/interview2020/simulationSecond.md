
前端基础

框架解读

工程化

性能优化

计算机基础

typeScript

## html

1\. 有哪些常用的<meta>标签

meta 标签由 name 和 content 属性来定义，来描述一个 HTML 文件的原信息，比如作者等

（1）charset,html文档的编码形式

```

 <meta charset="UTF-8" >

```

（2）http-equiv,设置http缓存过期日期

```

＜meta http-equiv="expires" content="Wed, 20 Jun 2019 22:33:00 GMT"＞

```

（3）vieport，移动端控制视口的大小和比例。

```

name="viewport"

content="width=device-width,initial-scale=1.0,maxmum-scale=1.0,minimum-scale=1.0,user-scalable=no"

```

## CSS

1\. 有哪些居中的方法

```
line-height=height
 
justify-content: center  // 水平居中
align-item:center;// 垂直居中

position: relative;
position:absolute;
transform: translateX(-50%, -50%)

margin负值

水平居中 margin:0 auto;

display: table;
vertical-align: middle;
```
2\. 响应式布局有哪些方法，详细说说rem布局法

3\. 有没有使用过css的扩展语法，比如less，sass

  - 嵌套
  - 变量


4\. BFC（ 块级格式上下文）

（1）定义：是一个独立的渲染区域，只有块级的box参与，它规定了内部的元素如何布局，并不影响这个区域外的元素

（2）特性：

 * box垂直方向上的距离由margin决定，属于同一个bfc的两个相邻的box的margin会重叠【内部的元素】

 * bfc的区域不会与float box重叠【两列布局原理】

 *  bfc就是页面上一个隔离的容器，容器内的元素不会影响容器外的元素。反之如此。【本身概念】

 * 计算 bfc 的高度时，float元素也会参与计算【清除浮动】

（3）哪些情况会生成BFC

 * 根元素

 * float不为none的

 * position为absolute和fixed的

 * overflow不为visible的

（4）应用
- margin 重叠问题解决
- 两列布局
- 清除浮动

5\. 前端的布局单位有哪些，有什么区别

em

rem

px

pt
pt(point)是印刷行业常用的单位，等于1/72英寸，表示绝对长度

5\. flex布局

6\. 盒模型（标准盒模型，怪异盒模型）

box-sizing： border-box 怪异盒模型

box-sizing： content-box 标准盒模型

区别：怪异盒模型的width包括padding，标准盒模型不包括

7\. 浏览器是如何解析css选择器的: 从右到左

8\. 浮动

（1）浮动带来的问题：

 * 父元素的高度无法被撑开，影响与父元素同级的元素。

 * 与浮动元素同级的元素的非浮动元素（内联元素）会跟随其后

（2）如何清除浮动

 * 父级div设置高度

 * 最后一个浮动元素添加样式clear：both。或给父级元素设置伪元素并添加该样式

 * 父级div设置overflow： hidden/auto

9.伪类和伪元素的区别

伪类：

- 格式化DOM树以外的信息。比如： \<a> 标签的:link、:visited 等。这些信息不存在于DOM树中。

- 不能被常规CSS选择器获取到的信息。比如：要获取第一个子元素，我们无法用常规的CSS选择器获取，但可以通过 :first-child 来获取到。


伪类其实是弥补了CSS选择器的不足，用来更方便地获取信息。



伪元素：：

伪元素可以创建一些文档语言无法创建的虚拟元素。
- 比如：文档语言没有一种机制可以描述元素内容的第一个字母或第一行，但伪元素可以做到(::first-letter、::first-line)。
- 伪元素还可以创建源文档不存在的内容，比如使用 ::before 或 ::after。


而伪元素本质上是创建了一个虚拟容器(元素)，我们可以在其中添加内容或样式。


10\. 什么情况下会触发重排重绘

11\. 如何避免重排重绘

12\. 如何实现即时通讯 websocket

## JS

1\. dom事件流

捕获型事件： document->当前元素

冒泡型事件：当前元素->document

2\. 事件代理

3\. cookie，sessionStorage,localStorage的区别和特性

4\. 闭包。

（1）定义： 闭包是有权访问一个函数作用域变量的函数，创建闭包的常见方式就是在一个函数内部创建另一个函数。

（2）特点： 如果内部函数引用了外部函数中的变量，相当于授权该变量能被延迟使用。因此，当外部函数调用完成后，这些变量的内存不会被释放（值会被保存），闭包仍然可以使用这个值。

（3）缺点：会导致内存泄漏

5\. settimeout(0)

 创建一个异步线程，放到调用栈，当主线程空闲时立即执行。最小的settimeout时间间隔是4ms。

6\. iframe

(1)缺点

 * iframe 会阻塞主页面的 onload 事件

 * 搜索引擎检索程序无法解读这种页面，不利于seo

 * 会影响页面的并行加载：同一时间同一域名下的请求。一般情况下，iframe和所有页面在同一个域下面，而浏览器的并行加载的数量是有限的。

解决： xxx.src="xxx.html"。讲iframe的src设置为主页面的html

7\. 内存泄漏

（1）定义： 当一块内存不再被应用程序使用的时候，由于某种原因，这块内存没有返还给操作系统。即存在不必要的引用只想一块本可以被释放的内存

（2）会导致的问题： 运行缓慢，崩溃，高延迟等。

（3）常见的内存泄漏及解决方式：

* 意外的全局变量

一个未申明的变量会在全局对象中创建一个新的变量。即window对象下。（windows对象是一直存在的，不会被销毁，除非页面卸载）

指向window对象的this下绑定的变量

-----解决：use strict. 使用严格模式，能避免创建意外的全局变量。

* 被遗漏的定时器和回调函数

* dom之外的引用：如果某时刻需要移除某元素，需要将它所有的引用清除比如事件绑定等。

* 闭包：闭包是可以获取到父级作用域的匿名函数。

8\. requestAnimation与settimeout，setInterval

注意： 动画若每秒达到60帧，用户就无法感知画面的间隔感。requestAnimation就是这个频率。除此之外，还有下列优点

（1）会把每一帧的所有dom集中起来，在一次重绘或重排中就完成。

（2）在隐藏或不可见的元素中，req...将不会进行重排重绘，意味着减少cpu,gpu和内存使用量

（3）req...优于set...的地方在于它是浏览器专门为动画提供的api，在运行的浏览器会自动化方法的调用，并且如果页面不是激活状态，动画会自动停止，有效节省了cpu的开销。

9\. get请求和post请求的区别

（1）传送方式：get(地址栏) post（报文）

最直观的区别就是 GET 把参数包含在 URL 中，POST 通过 【request body】 传递参数。

（2）传送长度。GET请求在URL中传送的参数是有长度限制的，而POST么有。

（3）get发送一个tcp包，post发送2个【加分项】

对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；

而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。

header 和 body 分开发送是部分浏览器或框架的请求方法，不属于 post 必然行为。

（4）get请求会被浏览器主动缓存，而post不会，除非手动设置。

（5）get只能用url编码，post支持多种编码方式【见下文】

（6）GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息

（7）GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。


10\. 原生ajax请求

（1）创建ajax对象

```js

var xhr = null;

if(window.XMLHttpRequest){

 xhr = new XMLHttpRequest;

}else {

 xhr = new ActiveObject('Microsoft.XMLHttp');

}

```

(2)连接服务器

```js

xhr.open('GET'，url,true)

```

(3)向服务器发送请求

```js
xhr.send();
```

(4)接收服务器的返回

```js

xhr.onReadyStatechange = function(){}

xhr.responseText: 字符串形式的响应数据

xhr.responseXML: xml格式的响应数据

xhr.status/xhr.statusText： 一数字和文本形式返回的http状态吗

xhr.getAllResponseHeader()： 获取所有的相应头

getResponseHeader()： 获取相应肉中的第一个字段的值

readyState 属性

 0： 未初始化，还没调用 open() 方法

 1: 载入，已经调用send(),正在发送请求

 2：载入完成，send()已完成，已收到响应

 3: 解析，正在解析响应内容

 4: 完成，响应内容解析完毕，可在客户端使用

```


```js
function ajax(url, fnSucc, fnFaild) {
  var xhttp;
 
  // 第一步：创建XMLHttpRequest对象
  if (window.XMLHttpRequest) {
      // 现代浏览器
      xhttp = new XMLHttpRequest();
   } else {
      // IE6等老版本浏览器
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // 第四步：处理响应
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        fnSucc(xhttp.responseText)
      } else {
      	if (fnFaild) fnFaild(xhttp.responseText)
      }
    } 
  };


  // 第二步：初始化XMLHttpRequest方法
  xhttp.open('GET', url);
  // 第三步：XMLHttpRequest向服务器发送请求
  xhttp.send();

}
```

11\. ajax的post方法中content-type有哪些类型

content-type是指http/https发送信息至服务器的内容编码类型。服务器根据编码类型使用特定的解析方式。

（1）application/json

（2）application/x-www-form-urlencoded

（3）application/xml

（4）multipart/form-data

12\. 原型链

利用原型让一个引用类型继承另一个引用类型的属性和方法。让原型对象等于另一个类型的实例，此时的原型对象将包含一个指向另一个原型的指针，相应的，另一个原型中也包含着指向另一个构造函数的指针。假如另一个原型又是另一个类型的指针，上述关系依然成立，如此层层递进，就构成了实例与原型的链条。

13\. 微和宏任务分别包括哪些

14\. 正则

## es6

1\. es6中新增的数据类型symbol,set,map

## 综合

1\. pc端与h5的区别

（1）事件

（2）兼容性

（3）布局

2\. 哪些时候会引起页面的重排重绘。怎么避免

3\. 了解w3c标准吗，说说

[https://75.team/post/first-impression-of-w3c.html](https://75.team/post/first-impression-of-w3c.html)


## 框架

1\. vue中不同组件中如何通信

2\. vue的生命周期

3\. 如何理解vue的响应式系统

4\. 既然Vue通过数据劫持可以精准探测数据变化,为什么还需要虚拟DOM进行diff检测差异?

5\. vue中key有什么用

## 小程序

1\. 小程序生命周期  [https://www.cnblogs.com/lilicat/p/10456481.html](https://www.cnblogs.com/lilicat/p/10456481.html)

应用，页面，组件

应用：【onLaunch】【onShow】【onHide】
用户首次打开小程序，触发 onLaunch 方法（全局只触发一次）。
小程序初始化完成后，触发 onShow 方法，监听小程序显示。
小程序从前台进入后台，触发 onHide 方法。
小程序从后台进入前台显示，触发 onShow 方法。
小程序后台运行一定时间，或系统资源占用过高，会被销毁。

页面：【onLoad】【onShow】【onReady】【onHide】【onUnload】

组件:

- 【created】 组件实例化，但节点树还未导入，因此这时不能用setData
- 【attached】 组件初始化完毕，节点树完成，可以用setData渲染节点，但无法操作节点
- 【ready】 组件布局完成，这时可以获取节点信息，也可以操作节点
- 【moved】 组件实例被移动到树的另一个位置
- 【detached】 组件实例从节点树中移

## 打包工具


webpack与gulp的区别

webpack的构建流程

如何用webpack来优化前端性能

如何提高webpack的打包速度

如何提高webpack的 构建速度

如何配置webpack多页面应用

## 算法

1\. 快速排序

## 网络



## git

1\. 版本回退

## 安全问题

1\. xss，csrf

## 最后 

1\. 在上个公司的收获，评价下上个公司



2\. 你的优缺点


3\. 你的爱好


4\. 职业规划


5\.  你有什么想问的吗

## 其他
- link 和 @import
1.link除了加载 CSS 还有其他功能

2.@import 是在页面加载完之后加载，页面闪烁
加载页面时，link标签引入的 CSS 被同时加载；@import引入的 CSS 将在页面加载完毕后被加载。

3.兼容性 link 比 @import 好

4.DOM可控性区别
可以通过 JS 操作 DOM ，插入link标签来改变样式；由于DOM方法是基于文档的，无法使用@import的方式插入样式。

- TCP 三次和四次握手
- 小程序登录流程
- fetch 和 ajax
[https://juejin.im/entry/599cfac56fb9a0249b4841b8](https://juejin.im/entry/599cfac56fb9a0249b4841b8)

- 快排
