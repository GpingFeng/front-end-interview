
- 判断数据类型？

- 事件循环，以及事件循环题目

- 事件委托

- 深复制和浅复制

- 深复制有哪些方法

- let、var、const 的区别

- 以下的存储【重点回顾】面试官提示堆和栈

```js
let a = 1  // 栈
let b = {}  
```

解析：[https://juejin.im/post/5dcdf84d6fb9a01ff600fe0b](https://juejin.im/post/5dcdf84d6fb9a01ff600fe0b)


内存中栈区的数据，在函数调用结束后，就会自动的出栈，不需要程序进行操作，操作系统会自动执行，换句话说：栈中的变量在函数调用结束后，就会消失。

那么在栈中存储不了的数据（比如一个对象），就会被存储在堆中，栈中就仅仅保留一个对该数据的引用（也就是该块数据的首地址）


对于原始类型，数据本身是存在栈内，对于对象类型，在栈中存的只是一个堆内地址的引用。



- this 的指向，箭头函数中 this 的指向(出了一道题目)

- 可以使用 new 一个箭头函数么？

- 箭头函数和普通函数有什么区别【次要回顾】
参考：[https://juejin.im/post/5c979300e51d456f49110bf0](https://juejin.im/post/5c979300e51d456f49110bf0)
  - 语法更加简洁、清晰
  - 箭头函数不会创建自己的this（重要！！深入理解！！）
  - 箭头函数继承而来的this指向永远不变（重要！！深入理解！！）
  - .call()/.apply()/.bind()无法改变箭头函数中this的指向
  -  箭头函数没有原型prototype，所以不能用new
  - 箭头函数不能作为构造函数使用
  - 箭头函数没有自己的arguments


- new 的实现【重点回顾，面试官说最重要的一点没有体现，手写代码的能力，手写一个 new】
```js
function create (ctr) {
    // 创建一个空对象
    let obj = new Object()
    // 获取构造函数
    let Con = [].shift.call(arguments)
    obj.__proto__ = Con.prototype
    // 绑定this
    let result = Con.apply(obj, arguments);
    // 确保返回的是对象
    return typeof result === 'object'? result : obj;
}
```

- instanceof 的原理
- cookie、localStorage 和 sessionStorage 的区别

- HTTP 缓存

- HTTPS 的握手、TLS 握手、对称加密和非对称加密

- CSRF【重点回顾场景】
跨站点请求伪造
参考：[https://zhuanlan.zhihu.com/p/22521378](https://zhuanlan.zhihu.com/p/22521378)

其原理是攻击者构造网站后台某个功能接口的请求地址，诱导用户去点击或者用特殊方法让该请求地址自动加载。用户在登录状态下这个请求被服务端接收后会被误以为是用户合法的操作。对于 GET 形式的接口地址可轻易被攻击，对于 POST 形式的接口地址也不是百分百安全，攻击者可诱导用户进入带 Form 表单可用POST方式提交参数的页面。

- XMLHTTPRequest 设置哪个值自动带上 cookie 【重点回顾】
xhr.withCredentials = true;


- 同源策略、跨域解决方案

- 强缓存下的返回的状态码是？协商缓存呢？
200 OK (from memory/disk cache) 
200 和 304

- 输入 URL 之后发生了什么

- script 标题中的 defer 和 async

- cookie HTTP-only 、secure

如果一个 cookie 被设置了 Secure=true ，那么这个 cookie 只能用 https 协议发送给服务器，用http协议是不发送的。

- e.target 和 e.currentTarget 的区别【重点回顾】
参考：[https://www.jianshu.com/p/1dd668ccc97a](https://www.jianshu.com/p/1dd668ccc97a)

MDN中对target的解释为，一个触发事件的对象的引用， 当事件处理程序在事件的冒泡或捕获阶段被调用时。
而对于currentTarget，它指的是当事件遍历DOM时，标识事件的当前目标。它总是引用事件处理程序附加到的元素，而不是event.target，它标识事件发生的元素。

- Watch 和 computed 【重点回顾，异步？？】
[https://juejin.im/post/5da7d371f265da5b7d691e3a](https://juejin.im/post/5da7d371f265da5b7d691e3a)
  - computed 不支持异步操作

- Vue 的生命周期，以及哪个生命周期可以拿到 DOM

- Vue 的 Mixin【重点回顾】created 和 data 中的值
[https://cn.vuejs.org/v2/guide/mixins.html](https://cn.vuejs.org/v2/guide/mixins.html)
当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。
  -  比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
  - 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。

- \$attr 和 $props【重点回顾】

当前组件接收到的 props 对象。Vue 实例代理了对其 props 对象属性的访问。

包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。

v-bind="$attrs"

[https://www.cnblogs.com/mengfangui/p/9686199.html](https://www.cnblogs.com/mengfangui/p/9686199.html)


- Vue 的双向数据绑定是怎样实现的？

- Vue 的 key 值有什么用？

- Vue 数组的方法你知道是怎么实现的么？

- Vue 的通信方式

- CSS 居中

- display:none; 和 visibility: hidden 的区别

- 有哪些可以常见的性能优化的点

- HTTP2  相比于 HTTP1 多了哪些东西【重点回顾二进制流方式】
  - 多路复用
  - 二进制传输
HTTP/2 中所有加强性能的核心点在于此。在之前的 HTTP 版本中，我们是通过文本的方式传输数据。在 HTTP/2 中引入了新的**编码机制**，所有传输的数据都会被分割，并采用**二进制格式编码**。
![](https://upload-images.jianshu.io/upload_images/1784460-34bec33a80008fb1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
  - 服务端 Push
  - Header 压缩
在 HTTP/1 中，我们使用文本的形式传输 header，在 header 携带 cookie 的情况下，可能每次都需要重复传输几百到几千的字节。
在 HTTP /2 中，**使用了 HPACK 压缩格式对传输的 header 进行编码，减少了 header 的大小。**并在两端维护了索引表，用于记录出现过的 header ，后面在传输过程中就可以传输已经记录过的 header 的键名，对端收到数据后就可以通过键名找到对应的值。 

- 复杂请求和简单请求【重要回顾】
参考：[https://www.ruanyifeng.com/blog/2016/04/cors.html](https://www.ruanyifeng.com/blog/2016/04/cors.html)

只要同时满足以下两大条件，就属于简单请求。
（1) 请求方法是以下三种方法之一：
- HEAD
- GET
- POST
（2）HTTP的头信息不超出以下几种字段：
- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值
  - application/x-www-form-urlencoded
  - multipart/form-data
  - text/plain




- 编程题
  - 拍平数组
  - 深复制【重点回顾】

```js
/**
 * 深复制实现
 */
function clone(data) {
  let result = {};
  function isObject(data) {
    if (
      (typeof data === "object" || typeof data === "function") &&
      data !== null
    ) {
      return true
    } else {
      return false
    }
  }

  if (Array.isArray(data)) {
    result = [...data];
  }

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (isObject(data[key])) {
        result[key] = clone(data[key]);
      } else {
        result[key] = data[key];
      }
    }
  }
  return result;
}
```

- 有什么想问我的么？