- 说说项目
  - 放在前端编译，没有做 SSR
- webpack 优化
- webpack Loader 和 webpack plugin 的区别
loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。
plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务
- 前端性能优化，做了哪些工作？
- 重排和重绘
- HTTP2.o 有哪些特性
- XSS 的了解
    - 设置白名单的方式
  设置 HTTP Header 中的 Content-Security-Policy
  设置 meta 标签的方式 <meta http-equiv="Content-Security-Policy">
  - 有哪些字符需要转义？。最普遍的做法就是转义输入输出的内容，对于引号、尖括号、斜杠进行转义。【重点回顾】
```
function escape(str) {
  str = str.replace(/&/g, '&amp;')
  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  str = str.replace(/"/g, '&quto;')
  str = str.replace(/'/g, '&#39;')
  str = str.replace(/`/g, '&#96;')
  str = str.replace(/\//g, '&#x2F;')
  return str
}
```

- CSRF
  - token 的机制是什么【重点回顾】

- 前端缓存这一块
  - 协商缓存
  - 强缓存
  - server Worker

- 跨域
  - CORF【重点回顾】【通过 option 的方式先预检是否允许跨域】
  - 怎么不用 options 的方式去预检请求？【复杂请求和简单请求】
  参考：[https://cloud.tencent.com/developer/article/1046663](https://cloud.tencent.com/developer/article/1046663)


- 事件委托
  - 可以对没有渲染出来的 DOM 进行绑定事件

- domReady 和 DomComplete 的区别【重点回顾】
  - 这一点，难道是我听错了？查资料，这两个是一样的？
  参考：[https://www.jianshu.com/p/6b0a95cdbc7a](https://www.jianshu.com/p/6b0a95cdbc7a)


- 事件的处理，捕获和冒泡

- 你有什么需要问我的么？

