
- 数据类型
- Symbol 类型的使用场景
- null 和 undefined 的区别【重要回顾】
  - null 类型代表着空值，代表着一个空指针对象，typeof null 会是得到 'object' 所以可以认为它是一个特殊的对象值。undefined 当你声明一个变量未初始化的时候，得到的就是 undefined
   - typeof 的值不一样
  ```js
  console.log(typeof undefined); //undefined
  console.log(typeof null); //object
  ```
  - 转为数值时，值不一样
  ```js
  console.log(Number(undefined)); //NaN
  console.log(undefined + 10);//NaN
  console.log(Number(null)); //0
  console.log(null + 10); //10
  ```
  - ===运算符可区分null和undefined
  - null 使用的场景

    - 作为对象原型链的终点
 `
 Object.getPrototypeOf(Object.prototype)
  // null
`
     - undefined的典型用法 【变量，函数参数，函数返回，对象属性】
- 常见的页面性能优化
- HTTP 上有哪些优化手段
- 重排和重绘，如何避免
- TCP 三次握手和 TCP 四次握手的区别【重点回顾】
关于TCP的握手机制，一定不要死记硬背，要理解为什么这么设计，也就很容易记住了。
三次握手：
在客户端和服务器之间建立正常的TCP网络连接时，客户端首先会发出一个SYN消息，服务器使用SYN+ACK应答表示已经接收到这个消息，最后客户端再以ACK消息响应。这样在客户端和服务器之间才能建立起可靠的TCP连接，数据才可以在客户端和服务器之间传递。

建立连接时，客户端发送SYN包到服务器，等待服务器响应。（SYN 同步序列编号，是建立连接时使用的握手信号）。
服务器收到SYN包，使用ACK包进行确认应答，同时自己也会发送一个SYN包，即发送SYN+ACK包。
客户端收到服务器的SYN包，向服务器发送确认包ACK。此包发送完毕，代表TCP连接完成，完成了三次握手。

四次挥手：
四次挥手是释放TCP连接的握手过程。

客户端向服务端发送释放连接报文FIN，等待服务端确认，并停止发送数据。
服务器收到连接释放请求后，发送ACK包表示确认。（此状态下，表示客户端到服务器的连接已经释放，不再接受客户端发的数据了，但是服务器要是还发送数据，客户端依然接收）
服务器将最后的数据发送完毕后，就向客户端发送连接释放报文FIN，等待客户端确认。
客户端收到服务器连接释放报文后，发出ACK包表示确认。此时客户端会进入TIME_WAIT状态，该状态将持续2MSL（最大报文段生存时间，指报文段在网络中生存的时间，超时将被抛弃）时间，若该时间段内没有服务器重发请求的话，就进入关闭状态，当服务端接收到ACK应答后，立即进入关闭状态。

![](https://upload-images.jianshu.io/upload_images/1784460-13cd71872df2b81b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


链接：https://juejin.im/post/5e44e17a518825491b11bd63

- webpack 性能优化上
- 小程序的数据更新是怎样的？
- 小程序有哪些线程？【重要回顾】
  - View 线程和 appServer 线程
  - View 线程负责解析渲染页面（wxml和wxss文件）
  - appServer 线程负责运行 js。appServer 线程运行在 jsCore（安卓下运行在X5 中，开发工具运行在 nwjs 中）。由于 js 不跑在 WebView 里，就不能直接操纵 DOM 和 BOM，这就是小程序没有 window   全局变量的原因
  - 参考：
  https://www.cnblogs.com/idreamo/p/10853965.html
![](https://upload-images.jianshu.io/upload_images/1784460-2dd070d35a08c2e5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
     - 小程序的渲染层和逻辑层分别由 2 个线程管理：渲染层的界面使用了 WebView 进行渲染，逻辑层采用 JsCore 线程运行 JS 脚本
    - 逻辑层：创建一个单独的线程去执行 JavaScript，在这个环境下执行的都是有关小程序业务逻辑的代码
    - 渲染层：界面渲染相关的任务全都在 WebView 线程里执行，通过逻辑层代码去控制渲染哪些界面。一个小程序存在多个界面，所以渲染层存在多个 WebView 线程
     - 双线程通信【Virtual DOM 相信大家都已有了解，大概是这么个过程：用JS对象模拟DOM树 -> 比较两棵虚拟DOM树的差异 -> 把差异应用到真正的DOM树上。】
![](https://upload-images.jianshu.io/upload_images/1784460-dc6c95ed0afadd1f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
  
    1、在渲染层把 WXML 转化成对应的 JS 对象。
2、在逻辑层发生数据变更的时候，通过宿主环境提供的 setData 方法把数据从逻辑层传递到 Native，再转发到渲染层。
3、经过对比前后差异，把差异应用在原来的 DOM 树上，更新界面。
  参考：https://www.jianshu.com/p/fb331438e223


  
- 小程序原理【重要回顾，大致参考如上】
- 小程序多次设置很多数据的时候会对性能产生很大的影响么？
- Vue 的实现原理

- Vue 的 diff 算法【重点回顾】

- Vue 的 compile 过程【重点回顾】
  - parse，optimize，generate
  - compile 的作用是解析模板，生成渲染模板的 render。而 render 的作用，也是为了生成跟模板节点一一对应的 Vnode
  - parse: 接收 template 原始模板，按照模板的节点 和数据 生成对应的 ast【通过大量的正则匹配去实现对字符串的解析】
  - Optimize:遍历递归每一个ast节点，标记静态的节点（没有绑定任何动态数据），这样就知道那部分不会变化，于是在页面需要更新时，减少去比对这部分DOM。从而达到性能优化的目的。【为什么要有优化过程，因为我们知道 Vue 是数据驱动，是响应式的，但是我们的模板并不是所有数据都是响应式的，也有很多数据是首次渲染后就永远不会变化的，那么这部分数据生成的 DOM 也不会变化，我们可以在 patch 的过程跳过对他们的比对。】
  - Generate：把前两步生成完善的 ast 组装成 render 字符串（这个 render 变成函数后是可执行的函数，不过现在是字符串的形态，后面会转成函数）
  参考：https://blog.csdn.net/qq_27460969/article/details/98947331
    [https://ustbhuangyi.github.io/vue-analysis/v2/compile/optimize.html#%E6%A0%87%E8%AE%B0%E9%9D%99%E6%80%81%E8%8A%82%E7%82%B9](https://ustbhuangyi.github.io/vue-analysis/v2/compile/optimize.html#%E6%A0%87%E8%AE%B0%E9%9D%99%E6%80%81%E8%8A%82%E7%82%B9)


- Vuex简单的原理实现【发布订阅的模式，重点回顾】
  - 参考：https://www.cnblogs.com/LittleStar-/p/9982606.html

- 移动端有哪些兼容的场景【重点回顾】
  - [移动端页面兼容性问题解决方案整理（一）](https://www.cnblogs.com/changningios/p/6486610.html)
  - 参考：https://juejin.im/post/5cddf289f265da038f77696c#heading-10
  - 参考：https://blog.csdn.net/quanyuejie/article/details/53422081
  - 1px 问题解决：https://www.jianshu.com/p/3a262758abcf
  - 防止手机中页面放大和缩小
  `<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />`
  - 上下拉动滚动条时卡顿、慢。Android3+和iOSi5+支持CSS3的新属性为overflow-scrolling
  ```
    body
  {
      -webkit-overflow-scrolling:touch;
      overflow-scrolling:touch;
  }
  ```
     - ios和android下触摸元素时出现半透明灰色遮罩
  `-webkit-tap-highlight-color:rgba(255,255,255,0);`
    - 1px 问题
  - click的300ms延迟问题
  问题：在移动端中，click事件是生效的，但是，点击之后会有300ms的延迟响应
原因：safari是最早做出这个机制的，因为在移动端里，浏览器需要等待一段时间来判断此次用户操作是单击还是双击，所以就有click 300ms 的延迟机制
引入fastclick库来解决
FastClick的实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后的click事件阻止掉。
```
方案一：禁用缩放
当HTML文档头部包含如下meta标签时：表明这个页面是不可缩放的，那双击缩放的功能就没有意义了，此时浏览器可以禁用默认的双击缩放行为并且去掉300ms的点击延迟。
<meta name="viewport" content="user-scalable=no">
<meta name="viewport" content="initial-scale=1,maximum-scale=1">

方案二：更改默认的视口宽度
<meta name="viewport" content="width=device-width">
如果设置了上述meta标签，那浏览器就可以认为该网站已经对移动端做过了适配和优化，就无需双击缩放操作了。
  这个方案相比方案一的好处在于，它没有完全禁用缩放，而只是禁用了浏览器默认的双击缩放行为，但用户仍然可以通过双指缩放操作来缩放页面。

// [https://www.jianshu.com/p/9f2f72c5f272](https://www.jianshu.com/p/9f2f72c5f272)



参考：[https://www.jianshu.com/p/b5c103a9bed0](https://www.jianshu.com/p/b5c103a9bed0)


- flex 布局对于所有的场景都适用么【重点回顾 button】

- 水平居中和垂直居中

- node有使用过么【重点回顾】



