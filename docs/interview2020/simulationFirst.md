## 前言

又到了金三银四的时候，很多朋友想着换工作。我个人认为面试有时候有点像应试教育【虽然不想承认，但现实就是如此】，就类似我们的高考，我们得刷题等。那竟然有《五年高考三年模拟》，那模拟面试我觉得也是一个很好的准备过程。

优点的话，我觉得有以下几点：

- 可以通过模拟面试找到自己的不足之处【建议先复习一段时间再进行模拟面试，要不意义不大】，达到查漏补缺的效果
- 不用浪费面试官和自己的时间，毕竟有时候面试跑来跑去挺累的
- 还有一个优点，就是有别人能够指点你一下，所以建议模拟面试官最好也是一名前端，这样其实遇到一些问题，还能够相互讨论一下。当然牛客网也有相关的 [AI 模拟面试](https://www.nowcoder.com/interview/ai/index "AI 模拟面试") 大家可以了解一下

缺点的话，我觉得没有，硬要说有的话，那就是可能你自己对待模拟面试态度可能没法像真正面试那么认真。

> 注意，以下的模拟面试过程大部分解答可能比较精简，可能只是自己的一个思路，甚至有些没有，仅供大家一个参考。如有更好的建议，咱们也可以一起探讨一下。

废话不多说，我们来看模拟一面

## js技能提问

1. 闭包的理解

该函数可以访问它被创建时候所处的上下文环境——《JavaScript 语言精粹》

闭包是指有权访问另一个函数作用域中的变量的函数 ---- 《JavaScript 高级程序设计》

2. 原型链的理解

从构造函数、原型对象、实例、Object、null 的角度出发去讲

注意一点，就是 Object 上面指向的是 null

附上一张经典的图

![](https://upload-images.jianshu.io/upload_images/1784460-54a6d46a7f8afc08.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


3. 数据类型判断有哪几种方式

typeof 的优缺点

instanceof 的优缺点

引出判断数组:Array.isArray

相对比较万能的：Object.prototype.toString.call()

4. js中的事件队列（js,promise,settimeout 等）是怎样的

Js 是单线程说起、说执行栈、谈到微任务和宏任务。最后讲它们的执行顺序

5. 深克隆和浅克隆

先解释两个概念的区别，在实际项目中的运用。

浅复制：Object.assign、展开运算符 ...、slice 和 concat 方法。浅拷贝只解决了一层的问题

如何实现一个深克隆【递归判断】

JSON.parse(JSON.stringify(object)) 的缺点

6. 内存泄漏，如何阻止

参考：

[https://mp.weixin.qq.com/s/HBs3mF8S2if37vN7JZ-mgw](https://mp.weixin.qq.com/s/HBs3mF8S2if37vN7JZ-mgw)

[https://jinlong.github.io/2016/05/01/4-Types-of-Memory-Leaks-in-JavaScript-and-How-to-Get-Rid-Of-Them/](https://jinlong.github.io/2016/05/01/4-Types-of-Memory-Leaks-in-JavaScript-and-How-to-Get-Rid-Of-Them/ "https://jinlong.github.io/2016/05/01/4-Types-of-Memory-Leaks-in-JavaScript-and-How-to-Get-Rid-Of-Them/")



7. es6使用情况

箭头函数的this指向哪里：定义箭头函数时候的 this 指向

 使用过哪些异步特性：
 
特性：
从回调地狱说起，为什么会出现这些，解释 Promise 和 async、await 的基础语法，然后说它们解决了什么问题。提一下 async/await 相比 promise 的优势

另外提一下 setTimeout 和 setInterval，毕竟两个也算是异步的一种实现方案！

8. 从输入网址到显示的过程，从计算机网络和浏览器渲染方面讲一下？

输入 URL 到页面渲染的整个流程

- DNS 查询。DNS 的作用就是通过域名查询到具体的 IP。操作系统会首先在本地缓存中查询 IP，没有的话会去系统配置的 DNS 服务器中查询，如果这时候还没得话，会直接去 DNS 根服务器查询，这一步查询会找出负责 com 这个一级域名的服务器，然后去该服务器查询 google 这个二级域名，接下来三级域名的查询其实是我们配置的，你可以给 www 这个域名配置一个 IP，然后还可以给别的三级域名配置一个 IP
- TCP 握手
- TLS 握手
  详细说下 TLS 的握手情况以及两种加密方式的内容
- 经过负载均衡的机器
- 状态码判断
- 浏览器解析文件，如果 gzip 格式的话，就先压缩一下。（通过文件的编码方式去如何解码文件）
- 先会根据 HTML 构建 DOM 树，有 CSS 的话会去构建 CSSOM 树。如果遇到 script 标签的话，会判断是否存在 async 或者 defer ，前者会并行进行下载并执行 JS，后者会先下载文件，然后等待 HTML 解析完成后顺序执行
- CSSOM 树和 DOM 树构建完成后会开始生成 Render 树，这一步就是确定页面元素的布局、样式等等诸多方面的东西
- 在生成 Render 树的过程中，浏览器就开始调用 GPU 绘制，合成图层，将内容显示在屏幕上了

9.es6模块与commonjs模块有什么区别

- CommonJS支持动态导入。也就是 require(${path}/xx.js)
- CommonJS是同步导入（用于服务端，文件在本地，同步导入即使卡住主线程影响也不大），ES module 是异步导入的（运用于浏览器，需要下载文件）
- CommonJS在导出的时候是值拷贝。而 ES module 采用的是实时绑定的方式，导入导出都指向了同一个内存地址
- ES Module 会编译成 require/exports 来执行的？？？ESmodule 是编译时候输出接口，CommonJS 模块是运行时加载


## 性能优化

这个问题很大，我觉得需要分点去回答，先从一些常用的技术手段去回答，然后说说自己团队做了哪些优化

以下先分点回答基础的优化手段

**减少HTTP请求**
- 雪碧图（可以说下 HTTP2 之后就有了多路复用和服务器端推送，这里的问题就解决得差不多了）
- 合并 JS 和 CSS 文件【同多路复用】
- 使用缓存（HTTP 缓存【强缓存、协商缓存可以引导一下面试官】、浏览器缓存、应用缓存）
- 减少 HTTP 请求头
- 优化 cookie，比如设置 cookie 的过期时间，减小 cookie 的大小
- 是用 CDN 加速【可以说下 CDN 的概念 内容分发网络】

**HTML**
- 减少 DOM 元素（页面中存在大量 DOM 元素,会导致 javascript 遍历 DOM 的效率变慢。尤其要尽量少用 iframe，它是耗能最大的 dom 元素，而且会阻塞 onload 事件）
- 使用 Div+CSS 布局代替 table 布局（更加容易引起【重排和重绘，可以适当做引导】）
- CSS 和 JS 文件引入的位置

**CSS**
- 使用 link 代替 @import
- 去掉无用的 CSS 【文件大小】
- 不要嵌套层级太深【提一下 CSS 解析是从右到左】
- 避免重排和重绘【特别注意是重排，动画的时候】
- 文件压缩
- 设置 预加载 `rel=preload`

**JS**
- 减少全局变量的查找。因为全局变量在作用域链的最顶端，频繁查找很耗性能
- 尽量少操作 DOM【可能会引起重排和重绘】【可以使用 innerHTML】
- 函数节流和防抖【可以详细说下】
- 减少对象的查找【a.b.c 这种可以赋值给一个中间值】
- 使用数组和对象字面量，避免使用构造函数Array(),Object()
- 慎用 with【尽量不要使用，解释说作用域链变长了】，定时器【要在组件销毁的时候清除掉】

**服务端优化**
- CDN【把网站内容分散到多个、处于不同地域位置的服务器上可以加快下载速度】
- gzip、Br 压缩
- 设置 Etag【协商缓存】

**图片**
- 不用图片，CSS 实现
- 小图使用 base 64 格式，不额外添加请求
- 雪碧图
- 选择正确的图片格式，webp（只要安卓机能用）

**用户体验**
- 预加载
```
<link rel="preload" href="http://example.com">
```
- 预解析。DNS 解析也是需要时间的
```html
<link rel="dns-prefetch" href="//yuchengkai.cn">
```
- 预渲染。可以通过预渲染将下载好的文件在后台渲染
```
<link rel="prerender" href="http://example.com"> 
```
- 懒加载【原理：懒加载的原理就是只加载自定义区域（通常是可视区域，但也可以是即将进入可视区域）内需要加载的东西】

- 节流
	手动实现节流函数
	滚动事件中会发起网络请求，但是我们并不希望用户在滚动过程中一直发起请求，而是隔一段时间发起一次，对于这种情况我们就可以使用节流
	**固定隔一段时间执行一次**
-	防抖
		有一个按钮点击会触发网络请求，但是我们并不希望每次点击都发起网络请求，而是当用户点击按钮一段时间后没有再次点击的情况才去发起网络请求，对于这种情况我们就可以使用防抖
		**触发后重置一段时间再去执行**

## 浏览器
1. 浏览器的同源策略

【概念回答】

2. 如何实现跨域

- JSONP
利用 script 标签没有跨域的限制

- CORS
- document.domain

该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。

只需要给页面添加 document.domain = 'test.com' 表示二级域名都相同就可以实现跨域

参考：[https://www.sojson.com/blog/179.html](https://www.sojson.com/blog/179.html "https://www.sojson.com/blog/179.html")



比如在：aaa.com 的一个网页（a.html）里面 利用iframe引入了一个 bbb.com 里的一个网页（b.html）。这时在a.html里面可以看到b.html里的内容，但是却不能利用 javascript 来操作它。因为这两个页面属于不同的域，在操作之前，js会检测两个页面的域是否相等，如果相等，就允许其操作，如果不相等，就会拒绝操作。


- postMessage ——iframe

```js
// 发送消息端
window.parent.postMessage('message', 'http://test.com')
// 接收消息端
var mc = new MessageChannel()
mc.addEventListener('message', event => {
  var origin = event.origin || event.originalEvent.origin
  if (origin === 'http://test.com') {
    console.log('验证通过')
  }
})
```

3. 浏览器的重排和重绘

重排和重绘的基本概念、重排和重绘的区别【可举例说明，比如改变元素大小引起重排，只是修改元素的颜色等引起重绘】，哪个影响小【重绘】

加分项（自己还不熟的情况下，可以不回答）：

重绘和回流其实也和 Eventloop 有关

- 当 Eventloop 执行完 Microtasks 后，会判断 document 是否需要更新，因为浏览器是 60Hz 的刷新率，每 16.6ms 才会更新一次。
	
- 然后判断是否有 resize 或者 scroll 事件，有的话会去触发事件，所以 resize 和 scroll 事件也是至少 16ms 才会触发一次，并且自带节流功能。

- 判断是否触发了 media query
- 更新动画并且发送事件
- 判断是否有全屏操作事件
- 执行 requestAnimationFrame 回调
- 执行 IntersectionObserver 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
- 更新界面

以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 requestIdleCallback 回调。


4. 如何避免重排和重绘


	1.使用 transform 替代 top【transform 浏览器有相关的优化，针对transform等开启GPU加速】
  
	2.使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局）
  
	3.不要循环的改变节点的位置等会引起重排。比如插入 DOM 可以选择批量插入。CSS 不要一个个的修改，可以使用 CSSText 或者添加类名 class 的方式
  
	4.不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
  
	5.动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame
  
	6.CSS 选择符从右往左匹配查找，避免节点层级过多


## 框架
1. vue 中不同组件中如何通信

（1）vue

父子组件用 Props 通信
非父子组件用 Event Bus 通信
如果项目够复杂,可能需要 Vuex 等全局状态管理库通信
$dispatch(已经废除)和 $broadcast(已经废除)

主要有以下：
- props 和 emit
- provide 和 inject【记得提及一下它们不是响应式的，很容易就踩坑】
- \$parent 和 $children
- Vuex
- eventBus

提分项：
v-model 的语法糖
使用语法糖 v-model，因为 v-model 会被解析成名为 value 的 prop 和名为 input 的事件

2. 对mvvm的理解，分别代表什么

Vue 和 React 都不是 MVVM 框架，只能说是借鉴 MVVM 的思想。只能说是一个库。

从 MVC 说起，说下 C 的缺点，引出 mvvm 的概念，解决了什么问题

3. vue的生命周期

![](https://upload-images.jianshu.io/upload_images/1784460-eb79e1c2256b715f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

其实除了以上的生命周期，还有两个比较特殊的 activated  和 deactivated。【组件级别的】
这两个是跟 keep-alive 相关。能答出这两个的话，应该也是能够加分的。

keep-alive 包裹的组件在切换的时候不会销毁组件。而是缓存到内存中执行 deactivated 钩子函数

命中缓存之后会执行 activated


4. 异步请求适合在哪个生命周期调用

created 和 mounted 其实都是可以的，但是越早越好，所以推荐还是放在 created 中，因为 created 阶段已经可以拿到 data 的值了

但是如果请求拿到数据后还涉及到和 DOM 相关的操作，请放在 mounted 中，因为 mounted 中 DOM 才是真正渲染完成！

5. computed和watch有什么区别

- computed

1)computed 是计算属性，依赖其他属性计算值，并且 computed 的值有缓存，只有当计算值变化才会返回内容

2)computed 的值在 getter 执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取 computed 的值时才会重新调用对应的 getter 来计算。比如 fullname 依赖于 firstName 和 lastName，那么只有当firstName 和 lastName 都有变化的时候才会触发 fullname 有更新

3)get/set 的属性

4)同时说下 computed 解决的问题，模板中太多逻辑是不好的！

5)computed 不支持异步

- watch

1)watch 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。传入 newval 和 oldval 的值

2)有 deep/immediate/handler 属性

- 场景使用

1) 所以一般来说需要依赖别的属性来动态获得值的时候可以使用 computed，对于监听到某个值的变化需要做一些复杂业务逻辑的情况可以使用 watch

2) 多对一，一对一的区别


6. vue是如何实现双向绑定的

Object.defineProperty()

Observer

compile

Watcher

Dep

7. 如何理解vue的响应式系统的


8. 既然Vue通过数据劫持可以精准探测数据变化,为什么还需要虚拟DOM进行diff检测差异?

push: Vue的响应式系统则是push的代表,当Vue程序初始化的时候就会对数据data进⾏依赖的收集,⼀但数据发⽣变化,响应式系统就会⽴刻得知,因此Vue是⼀开始就知道是「在哪发⽣变化了」,但是这⼜会产⽣⼀个问题,如果你熟悉Vue的响应式系统就知道,**通常⼀个绑定⼀个数据就需要⼀个Watcher,⼀但我们的绑定细粒度过⾼就会产⽣⼤量的Watcher,这会带来内存以及依赖追踪的开销,⽽细粒度过低会⽆法精准侦测变化**,因此Vue的设计是选择中等细粒度的⽅案,在组件级别进⾏push侦测的⽅式,也就是那套响应式系统,**通常我们会第⼀时间侦测到发⽣变化的组件,然后在组件内部进⾏VirtualDom Diff获取更加具体的差异**,⽽Virtual Dom Diff则是pull操作,Vue是push+pull结合的⽅式进⾏变化侦测的.

9. vue中key有什么用

key是为Vue中的vnode标记的唯一id,通过这个key,我们的diff操作可以更准确、更快速

10. electron【项目中提到了】

快速回顾：
英文：https://github.com/electron/electron-api-demos
中文：https://github.com/demopark/electron-api-demos-Zh_CN

这里之前做过一个 PPT 的分享。

是什么？

使用 JavaScript, HTML 和 CSS 构建跨平台的桌面应用。
Electron是由Github开发，用HTML，CSS和JavaScript来构建跨平台桌面应用程序的一个开源库。 Electron通过将Chromium和Node.js合并到同一个运行时环境中，并将其打包为Mac，Windows和Linux系统下的应用来实现这一目的。

特点：

- 跨平台。Electron 兼容 Mac, Windows 和 Linux， 它构建的应用可在这三个操作系统上面运行。
- 技术。使用 HTML, CSS 和 JavaScript 构建应用。
- 社区。开源（GitHub以及众多的贡献者）很多相关的应用都是使用Electron开发，我们熟知的Vscode、Atom等等
- 与其他技术结合。Electron-Vue [https://github.com/SimulatedGREG/electron-vue](https://github.com/SimulatedGREG/electron-vue "https://github.com/SimulatedGREG/electron-vue")  。一个使用vue-cli脚手架结合Electron搭建的开发模板 React：https://github.com/electron-react-boilerplate/electron-react-boilerplate

重要概念：

主进程和渲染进程
- Electron 运行 package.json 的 main 脚本的进程被称为主进程。一个 Electron 应用总是有且只有一个主进程。在主进程中使用BrowserWindow 模块可以创建并管理 Web 页面
- 在主进程中可以创建多个Web页面，它们管理着属于自己的进程，即渲染进程。可以想象成浏览器的一个个Tab

进程之间的通信

为什么需要进程通信？

在页面（渲染进程）中调用与 GUI 相关的API（如dialog）是不安全的。那么如果渲染进程需要进行原生的GUI操作，就必须与主进程通讯，由主进程进行与GUI的操作

怎么通信？

- ipc 模块通信。使用ipcMain模块和ipcRenderer模块可以进行异步和同步的通信PS:不要传递大量的数据，应用可能会卡住
- Remote模块可以直接获取主进程中的模块

集成了 node.js
Node.js中常用的Path、fs等模块可以直接在Electron中使用


## 小程序

1. 生命周期

整个小程序：

![](https://upload-images.jianshu.io/upload_images/1784460-f24264f6ede89b24.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


页面：
```
onLoad
onShow()
onReady()
onHide()
onUnload()
在小程序，会在onLoad或者onShow中请求数据
```

组件：
```
created
attached
ready
moved
detached
```
![](https://upload-images.jianshu.io/upload_images/1784460-a022781603815cc9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


2. 与vue的区别
- 生命周期不同
- 数据绑定，setData
- 列表渲染和隐藏指令
- 事件处理不同
- 绑定事件传参不同


3. 有没有用vue代码转换为小程序或。。。的项目【同2】

主要是看有没有总结过这两种代码有什么不同，有没有遇到某些坑


4. 在小程序开发中有没有碰到一些问题，如何解决？

setTimeout的休眠，也就是上面提到的内存泄漏
应该在 onHide 的时候清除掉定时器，onShow 的时候重新触发



## 打包工具
1. webpack

webpack与gulp的区别

[https://www.cnblogs.com/lovesong/p/6413546.html](https://www.cnblogs.com/lovesong/p/6413546.html "https://www.cnblogs.com/lovesong/p/6413546.html")


gulp 强调的是前端开发的工作流程，我们可以通过配置一系列的 task，定义 task 处理的事务（例如文件压缩合并、雪碧图、启动 server、版本控制等），然后定义执行顺序，来让 gulp 执行这些 task，从而构建项目的整个前端开发流程。

webpack 是一个前端模块化方案，更侧重模块打包，我们可以把开发中的所有资源（图片、js文件、css文件等）都看成模块，通过loader（加载器）和 plugins（插件）对资源进行处理，打包成符合生产环境部署的前端资源。

webpack 一切皆为模块，构建流程从 entry 入口开始，根据文件的引用关系，处理一个个模块，构造依赖关系图

2.如何用webpack来优化前端性能(减少 Webpack 打包后的文件体积)

- 按需加载
- Scope Hoisting
- Tree Shaking
- UglifyJS

3.如何提高webpack的打包速度

- 优化Loader
	优化 Loader 的查找路径
- 将 Babel 编译后的文件缓存起来
	loader: 'babel-loader?cacheDirectory=true'
- Happy Pack
	HappyPack 可以将 Loader 的同步执行转换为并行的
- DllPlugin
	DllPlugin 可以将特定的类库提前打包然后引入

4.如何配置webpack多页面应用
我觉得主要是 entry 入门多配置即可
```
entry: {
  home: resolve(__dirname, "src/home/index.js"),
  about: resolve(__dirname, "src/about/index.js")
}
```

## 算法
1. 快速排序

```js
/**
 * 快速排序
 * 时间复杂度和空间复杂福均为 O(nlogn)
 * 相等元素是不会交换前后顺序，因而是稳定排序（这与我们选择最后一个元素为分界点有关）
 */
function quickSort(arr) {
  // 当只有一个元素的时候，退出递归
  if (arr.length < 2) {
    return arr
  }
  // 数组分成三部分left、pivot、right，使left<=pivot，right>pivot
  let point = arr[arr.length-1]
  let leftArr = arr.filter((item, index) => item <= point && index !== (arr.length-1))
  let rightArr = arr.filter((item, index) => item > point)
  // 递归处理left
  // 递归处理right
  return [...quickSort(leftArr), point, ...quickSort(rightArr)]
}

// 测试
let arrTest  = [1,4,2,6,2,3,6,2,3,7,3]
let result = quickSort(arrTest)
console.log(result)
```

## 网络
1. http和http2有什么区别，http2相比http有什么优点
- 多路复用
- 二进制传输
- Hpack 打包请求头
- 服务端推送

2.http与https有什么区别，详细说一下httpS是如何保证安全通信的

- HTTPS 也是通过 HTTP 协议进行传输信息，但是采用了 TLS 协议进行了加密

- 先从对称加密和非对称加密开始说起，然后说 TLS 的握手过程

对称加密

	对称加密就是两边拥有相同的【秘钥】，两边都知道如何将密文加密解密。
		问题在于如果让对方知道【秘钥】
		因为传输数据都是走的网络，如果将【秘钥】通过网络的方式传递的话，一旦秘钥被截获就没有加密的意义的

非对称加密

	有公钥私钥之分
		公钥大家都知道，可以用公钥加密数据
		但解密数据必须使用【私钥】，【私钥】掌握在颁发公钥的一方
		首先服务端将公钥发布出去，那么客户端是知道公钥的
		然后客户端创建一个【秘钥】，并使用公钥加密，发送给服务端
		服务端接收到密文以后通过【私钥】解密出正确的【秘钥】

3. TLS 握手过程

	客户端发送一个【随机值】以及需要的协议和加密方式。
	服务端收到客户端的随机值，自己也产生一个随机值，并根据客户端需求的【协议和加密方式】来使用对应的方式，并且发送自己的【证书】（如果需要验证客户端证书需要说明）
	客户端收到服务端的【证书】并验证是否有效，验证通过会再生成一个【随机值】，通过服务端【证书的公钥】去加密这个随机值并发送给服务端，如果服务端需要验证客户端证书的话会【附带证书】
	服务端收到加密过的随机值并使用【私钥】解密获得【第三个随机值】，这时候两端都拥有了三个随机值，可以通过这三个随机值按照之前约定的加密方式生成【密钥】，接下来的通信就可以通过该密钥来加密解密
	采用的是非对称加密的方式

4. http缓存

强缓存：

expires,cache-control

expires 是本地时间，可能有误

协商缓存：

last-modified/if-modified-since

 Last-Modified 只能以秒计时，如果在不可感知的时间内修改完成文件，那么服务端会认为资源还是命中了，不会返回正确的资源

如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成 Last-Modified 被修改，服务端不能命中缓存导致发送相同的资源

etag/if-none-match


## 安全问题

1. 对前端安全方面有了解吗，解释下xss，csrf。还有别的安全问题吗（iframe的滥用，恶意的第三方库）

XSS ——跨站脚本攻击（Cross Site Scripting）
注入恶意指定代码脚本【一般指的就是 JavaScript】。比如评论

csrf
跨站点请求伪造。比如一些网站的吸引人去点击的图片，可能你点击之后就是去请求了什么接口（利用你浏览器上的一些登录态什么的）



2. 如何预防xss和csrf

XSS

  - cookie【http-only】
	- 转义字符

csrf

- get 请求不对数据进行修改
- 不让第三方网站访问到用户 cookie【cookie 的samesite】
- 阻止第三方网站请求接口
- 请求时附带验证信息，比如验证码或者 token
- 服务端的防御
	- 验证HTTP Referer字段
		，在HTTP头中有一个字段叫Referer，它记录了该HTTP请求的来源地址
	- token
		服务器下发一个随机 Token，每次发起请求时将 Token 携带上，服务器验证 Token 是否有效。


## git使用
1. 版本回退

`git reset HEAD^`

HEAD\^表示上一个版本，HEAD^^表示上上个版本。HEAD~100表示往上100个版本

```
git reset –hard commit_id

git reset --mixed commit_id （默认）

git reset --soft commit_id
索引（暂存区）和工作目录的内容是不变的

```
参考：

[https://blog.csdn.net/ezhchai/article/details/79387369](https://blog.csdn.net/ezhchai/article/details/79387369 "https://blog.csdn.net/ezhchai/article/details/79387369")

[https://www.jianshu.com/p/cbd5cd504f14](https://www.jianshu.com/p/cbd5cd504f14 "https://www.jianshu.com/p/cbd5cd504f14")


![](https://upload-images.jianshu.io/upload_images/1784460-85386b8755a99a02.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## HR
1. 在上个公司的收获，评价下上个公司

2. 你的优缺点

3. 职业规划 

4. 你有什么想问的吗

5. 自我介绍

6. 为什么想跳槽，你对新公司的期待是什么，为什么选择我们公司

一般会在 HR 面中提到这个问题，主要是看你个人对该公司的态度【体现出个人的忠诚度】

## 项目考察

1. 挑一个最拿手的项目讲一下


## 零散知识点

- 面向对象和面向过程有什么区别？

由原型链引入： 有没有用js写过面向对象的代码

`Person.prototype.eat = function () {}`

面向对象和面向过程是两种很重要的编程思想

世界上有很多人和事物，每一个都可以看做一个对象，而每个对象都有自己的属性和行为，对象与对象之间通过方法来交互。

个人理解：
面向过程
面向过程是一种以事件为中心的编程思想，编程的时候把解决问题的步骤分析出来，然后用函数把这些步骤实现，在一步一步的具体步骤中再按顺序调用函数。

面向对象：
面向对象是一种以“对象”为中心的编程思想，把要解决的问题分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描叙某个对象在整个解决问题的步骤中的属性和行为。




[https://zhuanlan.zhihu.com/p/28427324](https://zhuanlan.zhihu.com/p/28427324 "https://zhuanlan.zhihu.com/p/28427324")

- [iphoneX 的适配](https://kangzubin.com/wxapp-iphonex/ "iphoneX 的适配")

wx.getSystemInfo(OBJECT)，返回的手机型号字段 model 是否包含 iPhone X 字符串来判断设备是否为 iPhone X

globalData  ——  isIPX

吸底按钮适配，margin-bottom

- setTimeout 休眠问题
- 重新梳理微信小程序的登录流程

![](https://upload-images.jianshu.io/upload_images/1784460-90f9b080a9ab5711.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 微信小程序常考知识点（比如生命周期梳理）

- 关于 rpx 和 rem 等单位问题
rpx 和 rem 
1rpx = 0.5px。px
em 问题。相对于父元素的字体大小单位

遇到的问题描述：
小程序使用的是rpx，H5页面使用的是px，需要统一使用单位。需要工具进行转换。

解决方法：
使用 `px2rem-loader` 解决

相对于根元素的字体大小的单位
默认根节点的是 16px 
记住一个转换 0.625 转换成 10px 
rem 能等比例适配所有屏幕

这里可以谈到响应式的回答

1  简单一点的页面，一般高度直接设置成固定值，宽度一般撑满整个屏幕。

2  稍复杂一些的是利用百分比设置元素的大小来进行适配，或者利用 flex 等 css 去设置一些需要定制的宽度。

3  再复杂一些的响应式页面，需要利用 css3 的 media query 属性来进行适配，大致思路是根据屏幕不同大小，来设置对应的 css 样式。
最后就是我们的rem了，不同机器设置的根 HTML 的 font-size 值也不一样的
一般有两种方式

- 利用 css 的 media query 来设置即
```css
@media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){
      html{font-size: 37.5px;}
}
```

- 利用 javascript 来动态设置 根据我们之前算出的基准值，我们可以利用 js 动态算出当前屏幕所适配的 font-size 即：

```js
document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';
```

参考：[http://www.alloyteam.com/2016/03/mobile-web-adaptation-tool-rem/](http://www.alloyteam.com/2016/03/mobile-web-adaptation-tool-rem/ "http://www.alloyteam.com/2016/03/mobile-web-adaptation-tool-rem/")


- 关于 mpvue 知识【项目中提到】
mpvue 是什么？

mpvue 有什么用？

mpvue 原理？

- 通过 mpvue 提供 mp 的 runtime 适配小程序（虚拟DOM层去做适配）
- 通过 mpvue-loader 产出微信小程序所需要的文件结构和模块内容。（AST树上去转换文件结构）

## 结束语
以上是模拟一面的全部内容，覆盖的知识点还是比较多。希望对大家有所帮助。最后，打个小广告，欢迎大家关注我的公众号，期待和大家多多交流

![](https://upload-images.jianshu.io/upload_images/1784460-483083f0a9fd3c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
