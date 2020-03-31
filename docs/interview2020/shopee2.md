
Vue-router 原理
- hash
- html5

怎么去捕获 await、async 中的错误
- try...catch

常见的异步方案，以及 Promise 的一道题
答案是2，自己回答了 1和2
```
new Promise(function(resolve,reject){
    resolve(Promise.reject())
}).then(function () {
    console.log(1)
}).catch(function() {
    console.log(2)
})
```

![](https://upload-images.jianshu.io/upload_images/1784460-c45928fd95d2f098.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)


HTTP 请求的方面进行优化
- 减少 HTTP的请求数等

HTTP2

cookie 有哪些属性？
  - HTTP-only
HttpOnly 属性指定该 Cookie 无法通过JavaScript 脚本拿到
主要是 Document.cookie 属性、 XMLHttpRequest 对象和 Request API都拿不到该属性。这样就防止了该 Cookie 被脚本读到，只有浏览器发出 HTTP 请求时，才会带上该 Cookie。
  - Secure
Secure 属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器。另一方面，如果当前协议是 HTTP，浏览器会自动忽略服务器发来的 Secure 属性。该属性只是一个开关，不需要指定值。如果通信是 HTTPS 协议，该开关自动打开
- Expires 属性指定一个具体的到期时间，到了这个指定的时间之后，浏览器就不再保留这个 cookie ,它的值是 UTC 格式，可以使用 Date.prototype.toUTCString() 格式进行转换

`Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;`

- Max-Age 属性制定了从现在开始 cookie 存在的秒数，比如 60 * 60 * 24 * 365（即一年）。过了这个时间以后，浏览器就不再保留这个 Cookie
Max-Age 的优先级会比 Expires 的高，主要的原因 Max-Age 所受的外界因素（比如客户端的时间可能有误）比较小。

关于cookie：https://mp.weixin.qq.com/s/OowjxV-34xXUQ9oix3bpOA

Domain 和 path
这两个属性决定了， HTTP 请求的时候，哪些请求会带上哪些 Cookie，具体下面会做讲解。
cookie 域名访问：
```
a.com
.a.com
```

在你访问[a.com](http://a.com)的时候，会把[a.com](http://a.com)关联的cookie带给服务器

在你访问 [b.a.com](http://b.a.com)但是会后，会把.[a.com](http://a.com)关联的cookie带给服务器



HTTP 的options 请求方法【重点回顾】
- HTTP 的 OPTIONS 方法 用于获取目的资源所支持的通信选项。客户端可以对特定的 URL 使用 OPTIONS 方法，也可以对整站（通过将 URL 设置为“*”）使用该方法。
  - 检测服务器所支持的请求方法。可以使用 OPTIONS 方法对服务器发起请求，以检测服务器支持哪些 HTTP 方法：
  `curl -X OPTIONS http://example.org -i`
   - CORS 中的预检请求。在 CORS 中，可以使用 OPTIONS 方法发起一个预检请求，以检测实际请求是否可以被服务器所接受。预检请求报文中的 [`Access-Control-Request-Method`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Method "The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.") 首部字段告知服务器实际请求所使用的 HTTP 方法；[`Access-Control-Request-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Headers "请求头  Access-Control-Request-Headers 出现于 preflight request （预检请求）中，用于通知服务器在真正的请求中会采用哪些请求头。") 首部字段告知服务器实际请求所携带的自定义首部字段。服务器基于从预检请求获得的信息来判断，是否接受接下来的实际请求。

参考：[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS)


50 个SVG图片你怎么进行优化

webpack 的性能优化

HTTP 请求怎么缓存
- 使用 server Worker

如果不用 server Worker，你会采用什么方案？因为 SW 本身就是有兼容性问题的？
- 使用 localStorage

如果不用 localStorage（因为容量有所限制），那你会用什么去实现呢？
- indexDB

实现以下的 cache 方案（编程题）

实际上就是利用闭包和高阶函数实现函数的缓存：
参考：[https://blog.csdn.net/weixin_30925411/article/details/100090840](https://blog.csdn.net/weixin_30925411/article/details/100090840)

以下是我的实现

```

f1('abc', 123, {b:3});  // 10, 1000s
f1('abc', 123, {b:3});  // 10, 1000s

function cache(f) {
  let objCache = {}
  return function () {
    // let curArgs = JSON.stringify(Array.form(arguments))
    let curArgs = ''
    // 这里使用深复制会好点
    for (let i = 0; i < arguments.length; i++) {
      if (Array.isArray(arguments[i])) {
        curArgs += arguments[i].join(',')
      } else if (typeof arguments[i] === 'object') {
        curArgs += JSON.stringify(arguments[i])
      } else {
        curArgs += arguments[i]
      }
    }
    // 
    if (argument.length === 0) {
      
    }

    // curArgs
    if (curArgs) {
      return objCache[curArgs]
    } else {
      objCache[curArgs] = f(curArgs)
      return objCache[curArgs]
    }
  }
}

f2 = cache(f1);
f2('abc', 123, {b:3});  // 10, 1000s
f2('abc', 888, {b:3});  // 10, 0s
```

```
  const memorize = function(fn) {
    const cache = {}       // 存储缓存数据的对象
    return function(...args) {        // 这里用到数组的扩展运算符
      const _args = JSON.stringify(args)    // 将参数作为cache的key
      return cache[_args] || (cache[_args] = fn.apply(fn, args))  // 如果已经缓存过，直接取值。否则重新计算并且缓存
    }
  }
  const add = function(a, b) {
    console.log('开始缓存')
    return a + b
  }
 
  const adder = memorize(add)
```

有用过 Vuex 么

你为什么会想到离职呢？

描述一下你自己的优缺点，一两个词

你有什么需要问我的么？