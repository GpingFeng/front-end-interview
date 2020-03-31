
面试官自我介绍

我的自我介绍

提到项目：
- 整个项目是怎样的？
后台表单配置页面，输出一份 JSON 【包括组件的 CSS】到前台。另外这个页面涉及到 JS 和 HTML 也会通过 PHP 吐出给到前台【 render 函数】

前台按需加载1.5屏幕，去执行这个 render 函数即可！

- 三个组件是怎么渲染的？
比如只有一个组件在我们的渲染区域内，那么我们就只执行这个组件的 render函数【包括了 HTML 和 JS】 CSS 提前都已经加载好

- 那前台是前后端分离的么？
【PHP 吐出相关的模板还有数据】所以不算是前后端分离的！
后端知道这个页面包含那些组件，将这些组件的信息输出到模板中，其中包括【JS】遍历这些JS，得到不同的渲染函数【render+组件的ID】
JSON文件中包括 CSS

那什么时候加载 JS，什么时候加载 CSS？以怎样的方式去加载呢？
按需加载，就是判断2屏幕，然后去执行 render 函数!

- HTML/CSS/JS 是打包到一起再加载的么？
JS和HTML 是打到一起的，其中执行 render 的时候就执行了
CSS 也是动态载入的

- 将 JSON 植入页面，那 HTML 页面岂不是会很大？你们是怎么解决这个问题的呢？
其实也还好，几十K还是可以接受的！



性能优化
- webp.你是怎么做的呢？
判断是否兼容，直接修改格式。那是运维那边已经支持了么？上传的时候已经做了处理
- Brotli 代替 Gzip 压缩方式，需要后端出做处理
浏览器会根据自身的支持情况去使用不同的加载方式
- CDN 的优化
webpack 中 hash 值
- 懒加载
- link 的 preload
rel="dns-prefetch"
预加载
- webpack 的打包压缩【比如 Ugrify 压缩】

这些都是一些工程上面的优化，其实自己还可以说说自己平时写组件时候的一些优化
比如 
HTML、CSS、JS 的书写上！
对图片的处理上！


你们怎么统计的这个数据？performance 的那个点？
上传到相应的数据平台！我们通过 SQL 查询即可！

![](https://upload-images.jianshu.io/upload_images/1784460-354773e41ff87ff8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
var perfData = window.performance.timing;  
var renderTime = perfData.domComplete - perfData.domLoading;
```

针对这种情况Google lighthouse提出了FMP的概念，first meaning paint, 也就是主要内容可见时间，那什么是主要内容? 每个人得出的结论可能会不一样，先做一个猜想：主要内容 = 页面渲染过中元素增量最大的点。

- webpack 优化

- webpack plugin 你有做过？当时是为了解决什么问题？

- 前端安全有了解么？
XSS、CSRF、中间人攻击

- 现在为什么不需要合并 JS/CSS，还有使用雪碧图了？
多路复用
[https://yq.aliyun.com/roundtable/65388](https://yq.aliyun.com/roundtable/65388)
http2场景下，浏览器不会有并发加载的上限

另外：服务端推送的场景有如下
聊天室不就是服务端推送场景吗


- 你了解 React 么？
我们 PC 端就是用 React 写的，但是比较低版本。所以我是了解 React 的基础语法。

- 现在的工程中有使用 CL/CI 的工具流么？比如 Jenkins
我们的没有，但是我自己有用 Jenkins 和 GitHub 去做了一些工作流上面的处理！比如在 git push 的时候触发 Jenkins 的钩子，然后在 Jenkins 中完成打包的过程。【这样做的一个好处在于环境是保持一致的】

- 你有了解过 Node 么？
我在之前毕设的时候，用 Node 写的后台。也就是写点普通的接口。现在用得比较多的是在一些工程化中使用，比如 webpack

- 有什么想问我的么？
  - 贵公司希望我前期做什么东西呢？
  - 贵公司的技术栈是什么呢？