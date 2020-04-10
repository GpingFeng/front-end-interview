# 前端面试题

## 浏览器

### 为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片？

- 没有跨域（img 支持跨域）
- 相比其他图片，大小最小
- 不会阻塞页面加载，异步不影响
- 图片请求不占用 ajax 的请求限额，性能比 XMLHttpRequest 更好

### 浏览器缓存读取规则

- 见知识点

### 如何实现 token 加密

- JWT 入门教程

	- https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html

- JWT 举例

	- 需要一个secret（随机数）
	- 后端利用secret和加密算法(如：HMAC-SHA256)对payload(如账号密码)生成一个字符串(token)，返回前端
	- 前端每次request在header中带上token
	- 后端用同样的算法解密

### token 是什么？有什么用？

## 工程化

### npm 安装机制以及为什么 npm install 过程

- 发出npm install命令
- npm 向 registry 查询模块压缩包的网址
- 下载压缩包，存放在~/.npm目录
- 解压压缩包到当前项目的node_modules目录
- https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/22

### webpack 热更新原理

- https://zhuanlan.zhihu.com/p/30669007
- 1.当修改了一个或多个文件；
- 2.文件系统接收更改并通知webpack；
- 3.webpack重新编译构建一个或多个模块，并通知HMR server进行更新；
- 4.HMR Server 使用webSocket通知HMR runtime 需要更新，HMR运行时通过HTTP请求更新jsonp；
- 5.HMR运行时替换更新中的模块，如果确定这些模块无法更新，则触发整个页面刷新。
### webpack 打包太慢【重要】

- 使用 webpack-bundle-analyzer 分析包大小
- https://mp.weixin.qq.com/s/Rqp4qV8SyqVxyEcQFS0UbA
- Loader的搜索范围缩小
- happyPack 多进程
- 动态链接库 dll-plugin
- 先设externals选项 把一些能直接走cdn的库拿出去如vue,vue-router的
- cache-loader来进行缓存持久化
- 实在不行升级 webpack

## JS 基础

### ['1', '2', '3'].map(parseInt) what & why ?

- 主要是 parseInt(string,radix)

	- parseInt(string, radix)   将一个字符串 string 转换为 radix 进制的整数
	- 返回值

		- 返回解析后的整数值。 如果被解析参数的第一个字符无法被转化成数值类型，则返回 NaN。

	- radix 一个介于2和36之间的整数(数学系统的基础)
	- ['10','10','10','10','10'].map(Number);

### 介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

- 使用场景

	- 数组去重，数据存储

- set

	- ES6 新增的一种新的数据结构，类似于数组，但成员是唯一且无序的，没有重复的值。

- WeakSet

	- WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以
	- WeakSet 对象中储存的对象值都是被弱引用的??

- Map

	- 本质上是键值对的集合，类似集合
	- 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键

- WeakMap

	- 只接受对象作为键名（null除外），不接受其他类型的值作为键名

- 参考：http://es6.ruanyifeng.com/#docs/set-map

### 什么是防抖和节流？有什么区别？如何实现？

- 有个小疑问，关于如何传参，还有arguments在这里的用法

### ES5/ES6 的继承除了写法以外还有什么区别？

- class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。
- class 声明内部会启用严格模式。
- class 的所有方法（包括静态方法和实例方法）都是不可枚举的。
- class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。
- 必须使用 new 调用 class。
- class 内部无法重写类名。

### 判断数组的方法

- Object.prototype.toString.call()

	- 每一个继承 Object 的对象都有 toString 方法，如果 toString 方法没有重写的话，会返回 [Object type]，其中 type 为对象的类型
	- 但当除了 Object 类型的对象外，其他类型直接使用 toString 方法时，会直接返回都是内容的字符串
	- Object.prototype.toString.call() 常用于判断浏览器内置对象时

- Array.isArray()

	- 当检测Array实例时，Array.isArray 优于 instanceof ，因为 Array.isArray 可以检测出 iframes
	- Array.isArray()是ES5新增的方法，当不存在 Array.isArray() ，可以用 Object.prototype.toString.call() 实现。

- instanceof

### 介绍模块化发展历程

- 见知识详解

### 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？

- 在全局作用域中，用 let 和 const 声明的全局变量并没有在全局对象中，只是一个块级作用域（Script）中
- let a = 10;
const b = 20;
相当于：
(function(){
         var  a = 10;
         var b = 20;
})()

### 输出什么？

- var b = 10;
(function b() {
   // 内部作用域，会先去查找是有已有变量b的声明，有就直接赋值20，确实有了呀。发现了具名函数 function b(){}，拿此b做赋值；
   // IIFE的函数无法进行赋值（内部机制，类似const定义的常量），所以无效。
  // （这里说的“内部机制”，想搞清楚，需要去查阅一些资料，弄明白IIFE在JS引擎的工作方式，堆栈存储IIFE的方式等）
    b = 20;
    console.log(b); // [Function b]
    console.log(window.b); // 10，不是20
})();
- var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();

### 输出什么

- var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
- 在对象中加入splice属性方法，和length属性后。这个对象变成一个类数组。
- 1.使用第一次push，obj对象的push方法设置 obj[2]=1;obj.length+=1
- 2.使用第二次push，obj对象的push方法设置 obj[3]=2;obj.length+=1
- 3.使用console.log输出的时候，因为obj具有 length 属性和 splice 方法，故将其作为数组进行打印
- 4.打印时因为数组未设置下标为 0 1 处的值，故打印为empty，主动 obj[0] 获取为 undefined
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push
### 箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？

- 箭头函数this的指向是定义时候决定的，而不是使用决定的
- 不能使用 arguments 对象，该对象在函数体内不存在
- 不能使用 yield 命令

	- 因为箭头函数不能使用 generate 函数

- 不能使用new

	- 首先没有拥有属于自己的 this
	- 其次没有 prototype 属性

### ES6 代码转换成 ES5 的实现思路是什么？

- 将代码字符串解析成抽象语法树，即 AST
- 对 AST 进行处理，在这个阶段可以对 ES6 代码进行相应转换，即转成 ES5 代码
- 根据处理后的 AST 再生成代码字符串

### 数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少

- JavaScript 没有真正意义上的数组，所有的数组其实是对象，其“索引”看起来是数字，其实会被转换成字符串，作为属性名（对象的 key）来使用。所以无论是取第 1 个还是取第 10 万个元素，都是用 key 精确查找哈希表的过程，其消耗时间大致相同。

### input 如何处理中文输入

- compositionstart 和 compositionend 处理中文输入

	- <input
ref="input"
@compositionstart="handleComposition"
@compositionupdate="handleComposition"
@compositionend="handleComposition"
>
	- 简单来说就是切换中文输入法时在打拼音时(此时input内还没有填入真正的内容)，会首先触发compositionstart，然后每打一个拼音字母，触发compositionupdate，最后将输入好的中文填入input中时触发compositionend。

### 是否写过前端通用组件

- https://juejin.im/post/5c02142fe51d4511be77aad7

### 介绍下前端加密的常见场景

- 密码传输

	- Plan A：使用 Base64 / Unicode+1 等方式加密成非明文，后端解开之后再存它的 MD5/MD6 
	- Plan B：直接使用 MD5/MD6 之类的方式取 Hash ，让后端存 Hash 的 Hash 

- 数据包加密

	- 问题

		- 你的网页数据包被抓取->在数据包到达你手机之前被篡改->你得到了带网页广告的数据包->渲染到你手机屏幕

	- 解决 HTTPS

- 展示成果加密

### 全等和非全等

- String('11') == new String('11');
String('11') === new String('11');
- String('11') == new String('11').toString();
- new String 返回的是一个对象， String() 方法返回的是一个字符串

### 为什么 for 循环嵌套顺序会影响性能？

- 初始化的次数不一样

### 骨架屏实现方案

- [v-cloak] { background: gray; }

### 执行顺序

- var obj = {a:1}
obj.b = obj = {a:2}
- https://www.muyiy.cn/question/js/53.html

### 获取数组最大值

- Math.max(...arr)
- Math.max.apply(null, arr)
- reduce

	- arr.reduce((prev,next) => {
  return Math.max(prex, next)
})

### 函数柯里化

### 解构赋值

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

### 内存泄漏

- 什么是内存泄漏？

	- 申请的内存没有及时回收掉，被泄漏了

- 为什么会有内存泄漏？

	- 虽然有垃圾回收机制，但当某块无用的内存，却无法被垃圾回收机制认为是垃圾时，也就发生内存泄漏了
	- 垃圾回收机制

		- 标记清除法
		- 引用计数法

- 哪些情况会引起内存泄漏

	- 意外的全局变量
	- 遗忘的定时器
	- 使用不当的闭包
	- 遗忘的 DOM 元素
	- 网络回调

### for...in 和 for ... of 的区别

- for...in...可以遍历到原型上的属性

	- hasOwnPropery

- for...of...不能遍历普通对象

	- 数组对象/字符串/map/set等拥有迭代器对象的集合.但是不能遍历对象,因为没有迭代器对象
	- 它可以正确响应break、continue和return语句

## 设计模式

### 观察者模式和发布-订阅者模式

- 观察者模式没中间商赚差价
- 发布订阅模式 有中间商赚差价
- 观察者模式中主体和观察者是互相感知的，发布-订阅模式是借助第三方来实现调度的，发布者和订阅者之间互不感知

## 框架【Vue】

### 写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？【重要】

### Virtual DOM 真的比原生操作 DOM 要快么？

- https://www.zhihu.com/question/31809713/answer/53544875
- 原生 DOM 对比

### diff 算法

### Proxy 相比 defineProperty 的优势

- 可以直接监听对象而非属性
- 可以监听数组的变化
- 多达十三种拦截方法

	- get
	- set
	- apply
	- ownKeys

- 返回一个新的对象，我们可以操作该新对象。而 defineProperty 只能遍历属性进行修改
- 各大浏览器重视，性能会更优
- 缺点：兼容性不好

	- pro IE9

### 参考：

- https://juejin.im/post/5d59f2a451882549be53b170#heading-1

### SPA 单页面的理解

- 概念

	- 仅在页面初始化的时候加载 HTML、CSS、JS 等文件
	- 一旦加载完成，不会因为用户的操作而重新加载和跳转

- 优点

	- 体验好，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染
	- 对服务器的压力小
	- 前后端分离

- 缺点

	- 初次加载耗时大
	- 不能使用浏览器中的前进后退
	- SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势

### 单向数据流

- 这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
- 如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。
- 如何处理？

	- 定义一个 data 值

		- 最好定义一个本地的 data 属性并将这个 prop 用作其初始值

	- prop 以一种原始的值传入且需要进行转换

		- 以这个值去定义一个计算属性

### Vue 变异

- 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue

	- // Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)

- 当你修改数组的长度时，例如：vm.items.length = newLength

	- // Array.prototype.splice
vm.items.splice(newLength)

### Vue 的父组件和子组件生命周期钩子函数执行顺序？

- 加载渲染过程

	- 父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

- 子组件更新过程

	- 父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

- 父组件更新过程

	- 父 beforeUpdate -> 父 updated

- 销毁过程

	- 父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

### 父组件可以监听到子组件的生命周期吗？

- $emit
- @hook

### keep-alive

- 内置的一个组件。用于保存组件的状态，避免重复渲染
- 一般结合路由和动态组件一起使用，用于缓存组件
- include 和 exclude
- activated 和 deactivated

### v-model 的原理？

- text 和 textarea 元素使用 value 属性和 input 事件；
- checkbox 和 radio 使用 checked 属性和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

### 你使用过 Vuex 吗？

- 专门为 Vue 开发的状态管理模式
- 每一个 Vuex 应用的核心就是 store（仓库）

	- 包含应用中大部分的状态

- 特性

	- Vuex 的状态存储是响应式的

		- store 中的状态发生变化，那么组件中的状态也会发生变化

	- 改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation

### vue-router 路由模式有几种？

- hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；

	- 原理

		- location.hash
		- hash 部分是不会发送给服务端的
		- hash 的改变会在浏览器产生记录，所以我们能够通过前进和后退控制 hash 的切换
		- a标签/location.hash 改变
		- 可以使用 hashchange 事件监听

- history : 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；

	- pushState

		- window.history.pushState(null, null, path);
		- 新增一个记录

	- repalceState

		- window.history.replaceState(null, null, path);
		- 替换当前的记录

	- 使用 popstate 来监听页面的变化

		- history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）

- abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

### Vue 是怎样实现双向数据绑定的？

- Vue 数据双向绑定主要是指：数据变化更新视图，视图变化更新数据

	- 实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。
	- 实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将【每个指令对应的节点】【绑定更新函数】，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
	- 实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。
	- 实现一个订阅器 Dep：订阅器采用 【发布-订阅 设计模式】，用来收集订阅者 Watcher，对【监听器 Observer 和 订阅者 Watcher】进行统一管理。
- 其中，View 变化更新 Data ，可以通过事件监听的方式来实现。所以 Vue 的数据双向绑定的工作主要是如何根据 Data 变化更新 View。

### Vue 框架怎么实现对象和数组的监听？

- Object.defineProperty() 只能对属性进行数据劫持，不能对整个对象进行劫持，同理无法对数组进行劫持
- Vue 框架是通过遍历数组 和递归遍历对象，从而达到利用 Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听

### 虚拟 DOM 的优缺点

- 优点

	- 保证性能下限
	- 无需手动操作 DOM
	- 跨平台

- 缺点

	- 无法进行极致优化

### 虚拟 DOM 实现原理？

- 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
- diff 算法 — 比较两棵虚拟 DOM 树的差异；

	- 基本流程

		- oldVnode（老 VNode 节点）不存在的时候

			- addVnodes

		- 在 vnode（新 VNode 节点）不存在的时候，相当于要把老的节点删除

			- removeVnodes

		- 当 oldVNode 与 vnode 都存在的时候，需要判断它们是否属于 sameVnode（相同的节点）。如果是则进行patchVnode（比对 VNode ）操作

			- patchVnode

		- 否则删除老节点，增加新节点

			- removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1);
    addVnodes(parentElm, null, vnode, 0, vnode.length - 1);

	- oldCh 和 newCh 各有两个头尾的变量 oldStartIndex、oldEndIndex 和 newStartIndex、newEndIndex，它们会新节点和旧节点会进行两两对比
	- 即一共有4种比较方式：newStartIndex 和oldStartIndex 、newEndIndex 和 oldEndIndex 、newStartIndex 和 oldEndIndex 、newEndIndex 和 oldStartIndex
	- 如果以上 4 种比较都没匹配，如果设置了key，就会用 key 再进行比较，在比较的过程中，遍历会往中间靠，一旦 StartIdx > EndIdx 表明 oldCh 和 newCh 至少有一个已经遍历完了，就会结束比较

		- 目的是想通过 key 值去判断是否为同一个节点，如果是则 patchNode

	- 两棵树如果完全的比较，时间复杂度是 o(n^3)

		- 但是都是同级的比较的话，时间复杂度就可以降为 o(n)

	- 子主题 6

- pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。
- https://juejin.im/post/5d36cc575188257aea108a74#heading-14

### Vue 中的 key 有什么作用？

- 更准确：因为带 key 就不是就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。
- 更快速：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快，源码如下：

### 对于即将到来的 vue3.0 特性你有什么了解的吗？

- （1）监测机制的改变

	- Proxy

- （2）模板

	-  3.0 把作用域插槽改成了函数的方式，这样只会影响子组件的重新渲染，提升了渲染的性能

- （3）对象式的组件声明方式

	- 3.0 修改了组件的声明方式，改成了类式的写法，这样使得和 TypeScript 的结合变得很容易。
	- 现在 vue3.0 也全面改用 TypeScript 来重写了，更是使得对外暴露的 api 更容易结合 TypeScript。

- （4）其它方面的更改

	- 支持自定义渲染器，从而使得 weex 可以通过自定义渲染器的方式来扩展，而不是直接 fork 源码来改的方式。
	- 支持 Fragment（多个根节点）和 Protal（在 dom 其他部分渲染组建内容）组件，针对一些特殊的场景做了处理。
	- 基于 treeshaking 优化，提供了更多的内置功能。

- 更小、更快、更强大

## 异步

## 网络

### 简单讲下 HTTP2 中的多路复用

- HTTP1 中同一个域名下面的请求数是有限制的

	- 而且多个 TCP 三次握手、四次握手都会浪费时间

- 在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream）
- 帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流
- 多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。
- 可以避免队头阻塞造成的性能问题

### TCP 三次握手和四次握手

### A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态

- https://crystalwindz.com/unp_note_1/#%E9%9D%9E%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5%E7%BB%88%E6%AD%A2
- 服务器和客户建立连接后，若服务器主机崩溃，有两种可能：

	- 服务器不重启，客户继续工作，就会发现对方没有回应(ETIMEOUT)，路由器聪明的话，则是目的地不可达(EHOSTUNREACH)。
	- 服务器重启后，客户继续工作，然而服务器已丢失客户信息，收到客户数据后响应RST。

### 介绍 HTTPS 握手过程

- http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html
- 客户端发出请求【clientHello】

	- 向服务器端发出加密通道的请求

- 服务端回应【ServerHello】

	- web服务器收到客户端请求后, 会将网站的证书(包含公钥)传送一份给客户端

		- 如何保证公钥不被修改？

			- 将公钥放入证书中

- 客户端回应

	- 客户端收到网站证书后会检查证书的颁发机构以及过期时间, 如果没有问题就随机产生一个【会话秘钥】
	- 客户端利用【公钥】将【会话秘钥】加密, 并传送给服务端, 服务端利用自己的【私钥】解密出【会话秘钥】

- 服务器端的最后回应

	- 之后服务器与客户端使用【秘钥】加密传输

### HTTPS 握手过程中，客户端如何校验证书的合法性

- 首先浏览器读取证书中的证书所有者、有效期等信息进行校验，校验证书的网站域名是否与证书颁发的域名一致，校验证书是否在有效期内
- 浏览器开始查找操作系统中已内置的受信任的证书发布机构CA，与服务器发来的证书中的颁发者CA比对，用于校验证书是否为合法机构颁发
- （3）如果找不到，浏览器就会报错，说明服务器发来的证书是不可信任的。
- （4）如果找到，那么浏览器就会从操作系统中取出颁发者CA 的公钥，然后对服务器发来的证书里面的签名进行解密
- （5）浏览器使用相同的hash算法计算出服务器发来的证书的hash值，将这个计算的hash值与证书中签名做对比
- （6）对比结果一致，则证明服务器发来的证书合法，没有被冒充

### 介绍下 HTTPS 中间人攻击

- 服务器向客户端发送公钥。
- 攻击者截获公钥，保留在自己手上。
- 然后攻击者自己生成一个【伪造的】公钥，发给客户端。
- 客户端收到伪造的公钥后，生成加密hash值发给服务器。
- 攻击者获得加密hash值，用自己的私钥解密获得真秘钥。
- 同时生成假的加密hash值，发给服务器。
- 服务器用私钥解密获得假秘钥。
- 服务器用加秘钥加密传输信息
- 防范措施

	- 服务端在发送浏览器的公钥中加入CA证书，浏览器可以验证CA证书的有效性

### 介绍下 HTTP1.0 1.1和 2.0

### 301【永久】和302【临时】对 SEO 有什么影响

### 301 和 302 的应用场景是什么？

### 接口如何防刷

- 源ip请求个数限制。对请求来源的ip请求个数做限制
- http请求头信息校验；（例如host，User-Agent，Referer）
- 对用户唯一身份uid进行限制和校验。例如基本的长度，组合方式，甚至有效性进行判断。或者uid具有一定的时效性
- 前后端协议采用二进制方式进行交互或者协议采用签名机制
- 人机验证，验证码，短信验证码，滑动图片形式，12306形式
- https://blog.csdn.net/timy07/article/details/86467994

### 描述下 DNS 解析的过程

- 递归查询

	- 客户端
	- 本地域名服务器
	- 根域名服务器
	- A顶级域名服务器
	- B顶级域名服务器

- 迭代查询
- 在DNS查询过程中，客户端和服务器也都会加入缓存的机制，这样可以减少查询的次数，加快域名解析过程

	- 操作系统会检查本地host文件是否有这个网址的映射
	- 查询本地 DNS 服务器

		- 本地缓存是否存在映射

	- 走上面的递归查询或者迭代查询

### http2 和 http1.1 keep-alive 有什么区别？

- 简单来讲，多路复用请求资源之间是相互不影响的，可以发送多个请求，不会造成阻塞。但是 Keep-alive 会造成 阻塞，需要等待一个请求结束才能接着另外一个请求！

## 算法

## 数据结构

## CSS(3)

### BFC

- 块级格式化上下文

	- 相当于一个独立的容器，里面的元素和外面的元素相互不影响

- 形成 BFC

	- float 布局
	- 绝对定位
	- overflow 不为 visible
	- display 为表格或者 flex 布局

- 主要作用

	- 清除浮动
	- 防止同一 BFC 容器中的相邻元素间的外边距重叠问题

### 垂直居中

- flex
    display: flex;
    justify-content: center;
    align-items: center;
- grid 布局

	- div.parent {
    display: grid;
}
div.child {
    justify-self: center;
    align-self: center;
}

- position: absolute
position:relative
margin负值
- 不定宽高

	- transform: translate3d(-50%,-50%,0);

- vertical: middle

	- display:table-ceil;
vertical-align: middle;

- line-height = height

### display: hidden;
visibility: hidden;
opacity: 0;

- 重排和重绘的角度
- 结构的角度

	- display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，
	- visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
	- opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

- 继承

	- visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式

### 1px 问题

- 1 伪元素 + transform scaleY(.5)
- 2 border-image
- 3 background-image
- 4 box-shadow
- viewport + rem 实现

###  BFC、IFC、GFC 和 FFC

### 文本溢出

- 单行：
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
- display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3; //行数
overflow: hidden;

### grid 布局

- http://ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

### 左右布局

- float + margin
- float + overflow:hidden

	- 利用overflow:hidden形成BFC，因为BFC不会与float box重叠

- 弹性布局

### CSS(3)有哪些新特性

- border-radius/阴影效果 box-shadow
- transform

	- transform:rotate(9deg) scale(0.85,0.90) translate(0px,-30px) skew(-9deg,0deg);// 旋转,缩放,定位,倾斜

- CSS3选择器

	- last-child
	- nth-child(n)

- @font-face 特性
- CSS3 的渐变效果

	- background-image:-webkit-gradient(linear,0% 0%,100% 0%,from(#2A8BBE),to(#FE280E))

- Transition

	- transition:border-color .5s ease-in .1s, background-color .5s ease-in .1s, color .5s ease-in .1s;

- Animation动画特效

### link 和 @import 的区别

- link 是 HTML 引入 CSS 的方式， @import 是 CSS 独有的方式
- link 是页面加载的时候同步引入 CSS，@import 是页面加载完成才引入，所以会产生页面闪烁一下的问题
- 浏览器 link 的优先级会比 @import 的高

## HTML(5)

### HTML5 新增哪些特性

- 媒体标签

	- video
	- audio

- canvas
- localstorage、sessionstorage、indexDB
- 网络

	- websoket

### div 模拟实现 textarea

- contenteditable="true"
- 高度自适应

	- height: auto
	- max-height 和 overflow-y: auto

- https://www.jianshu.com/p/da2719fcfd72

### DOCTYPE

## HR面

### 目的

- 侧重员工风险的评估与基本的员工素质

### 你对未来3-5年的职业规划

- 从现状出发，有认真考虑过
- 接着从工作本身出发,谈谈自己会如何出色完成本职工作,如何对团队贡献、如何帮助带领团队其他成员创造更多的价值、如何帮助团队扩大影响力.
- 最后从学习出发,谈谈自己会如何精进领域知识、如何通过提升自己专业能力,如何反哺团队.

### 如何看待加班(996)

- 把加班分为紧急加班和长期加班
- 紧急加班

	- 正常

- 长期加班

	- 如何提升个人
	- 提升团队

### 面对大量超过自己承受能力且时间有限的工作时你会怎么办?

- 分优先级处理
- 与上级沟通协调

### 你之前在上海为什么现在来北京发展?

### 为什么从上一家公司离职?

- 工资低
- 个人提升不够、技术含量不够

### 你还有其他公司的Offer吗?

- 有一两个，但不能透露
- 第一意向还是这家公司，如果薪资差距不大,会优先考虑本公司
- 再透露出,有一两个offer催得比较急,希望这边快点出结果

### 谈薪资

- 就我的面试表现，贵公司最高可以给多少薪水？
- 情况而论

	- 如果你觉得你技术面试效果很好，可以报一个高一点的薪资，这样如果HR想要你，会找你商量的。
	- 如果你觉得技术面试效果一般，但是你比较想进这家公司，可以报一个折中的薪资。
	- 如果你觉得面试效果很好，但是你不想进这家公司，你可以适当“漫天要价”一下。
	- 如果你觉得面试效果不好，但是你想进这家公司，你可以开一个稍微低一点的工资。

## 参考

### https://syun0216.github.io/Front-end-notes/interview/

### https://www.muyiy.cn/question/

### https://www.cxymsg.com/

### http://bigerfe.com/

## 解决方法

### 滑动穿透

- @touchmove.stop.prevent
- position: fixed
top: -scrollTop;
清除
position 和 top
并设置其滚动位置scrollTop和top值

## 小程序

### 简述下小程序的文件类型

- 根目录下

	- app.js

		- 监听并处理小程序的生命周期函数、声明全局变量

	- app.json

		- 配置文件入口

			- 是当前小程序的全局配置，包括了小程序的所有页面路径、底部 tab 等

	- project.config.json

		- 小程序工具的个性化配置，例如界面颜色、编译配置等等

- pages 目录

	- WXML 模板
	- WXSS 样式

		- 有很多选择器不能使用

	- JS 逻辑
	- 页面配置 JSON 文件

		- 独立定义每个页面的一些属性，例如顶部颜色、是否允许下拉刷新等等

### 小程序的事件

- 事件分类

	- 冒泡事件
	- 非冒泡事件

- 事件绑定

	- 以 key、value 的形式
	- bindtap
	- catchtouchstart

- 怎么事件传值？

	- data-*

		- e.currentTarget.dataset

			- 不能为对象

	- onload 中的 param 参数中获取

### 下拉刷新的配置

- enablePullDownRefresh
- wx.startPullDownRefresh(Object object)
- wx.stopPullDownRefresh(Object object)

### 小程序更新页面的值

- this.setData(Object data, Function callback)

### 小程序跳转的方式

- 打开新的页面

	- wx.navigateTo()

- 页面重定向

	- wx.redirectTo()

- 页面返回

	- wx.navigateback()

- Tab 切换

	- wx.switchTab

- 重启

	- wx.reLaunch

- navigator 组件

	- 指定 open-type

### 常见的请求接口

- wx.request()
- wx.downloadFile()

	- 下载文件

- wx.uploadFile

	- 上传文件

### 小程序与 Vue 的区别

- 生命周期
- v-if 和 wx:if
- setData 和双向数据绑定

### 小程序原理

- 微信小程序采用  JavaScript、WXML、WXSS 三种技术进行开发,本质就是一个单页面应用，所有的页面渲染和事件处理，都在一个页面内进行，但又可以通过微信客户端调用原生的各种接口
- 微信的架构，是数据驱动的架构模式，它的 UI 和数据是分离的，所有的页面更新，都需要通过对数据的更改来实现
- 小程序分为两个部分 webview和 appService 。其中 webview 主要用来展现UI ，appService 有来处理业务逻辑、数据及接口调用。它们在两个进程中运行，通过系统层 JSBridge 实现通信，实现 UI 的渲染、事件的处理

### 生命周期

- onLoad

	- 获取打开当前页面路径中的参数

- onShow()

	- 页面显示/切入前台时触发

- onReady()

	- 页面初次渲染完成时触发

- onHide()

	- 页面隐藏/切入后台时触发。 如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等

- onUnload()

	- 页面卸载时触发

### 性能优化

- 1、提高页面加载速度
- 2、用户行为预测
- 3、减少默认 data 的大小
- 4、组件化方案

### 数据传递

- 1、使用全局变量实现数据传递。在 app.js 文件中定义全局变量 globalData， 将需要存储的信息存放在里面
- 2、使用  wx.navigateTo与  wx.redirectTo 的时候，可以将部分数据放在 url 里面，并在新页面onLoad的时候初始化
- 3、使用本地缓存Storage 相关

### 小程序对wx:if 和 hidden使用的理解

- wx:if有更高的切换消耗。
- hidden 有更高的初始渲染消耗。
- 因此，如果需要频繁切换的情景下，用 hidden 更好，如果在运行时条件不大可能改变则wx:if 较好。

### 小程序关联微信公众号如何确定用户的唯一性？

- 使用wx.getUserInfo方法withCredentials为 true时 可获取encryptedData，里面有union_id。后端需要进行对称解密。

### 微信小程序的优劣势？

- 优势

	- 1、无需下载，通过搜索和扫一扫就可以打开。
	-       2、良好的用户体验：打开速度快。
	-       3、开发成本要比App要低。
	-       4、安卓上可以添加到桌面，与原生App差不多。
	-       5、为用户提供良好的安全保障。小程序的发布，微信拥有一套严格的审查流程，不能通过审查的小程序是无法发布到线上的。

- 劣势

	-      1、限制较多。页面大小不能超过1M。不能打开超过5个层级的页面。
	-      2、样式单一。小程序的部分组件已经是成型的了，样式不可以修改。例如：幻灯片、导航。
	-      3、推广面窄，不能分享朋友圈，只能通过分享给朋友，附近小程序推广。其中附近小程序也受到微信的限制。
	-      4、依托于微信，无法开发后台管理功能。

### open_id 和 unionId

- https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/union-id.html
- openid 用户的唯一标识，同一个用户的微信开放平台下的不同应用，openid也是不一样的
- 同一个用户，在微信开放平台下的不同应用内，UnionID 是一样的 
- wx.getUserInfo()

	- 从解密数据中获取到 UnionId

### 小程序登录

- https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
- 调用 wx.login() 获取 临时登录凭证code ，并回传到开发者服务器。
- 服务端调用 auth.code2Session 接口，换取 用户唯一标识 【OpenID】 和 会话密钥 【session_key】。
- 之后开发者服务器可以根据用户标识来生成（根据 openid 和 sessionKey）【自定义登录态】，用于后续业务逻辑中前后端交互时识别用户身份。

### 参考：
https://juejin.im/post/5da444ab6fb9a04e054d93d8#heading-8

https://juejin.im/post/5c84d3ed5188257c6703ada8

## mpvue

### https://www.bookstack.cn/read/CS-Interview-Knowledge-Map/spilt.16.MP-mp-ch.md

### mpvue 是什么？

### mpvue 有什么用？

### mpvue 原理？

## electron

## node

*XMind: ZEN - Trial Version*