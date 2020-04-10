# 项目总结

## Nova 性能优化

### 关于首屏的标准

- 手动打点

	- new Date()
	- setTimeout(function, 0)

- W3C 标准

	- window.performance.timing

- 标准失效

	- SPA 的盛行

		- 路由的切换，页面并没有重新加载， performance 并没有生效

	- 页面可能已经load 完，但是内容有可能还没有出来

		- 异步数据

- FMP

	- first meaningful paint

		- 主要内容可见时间

### 新的计算方式

- FP

	- first paint

		- 标记浏览器渲染任何在视觉上不同于导航前屏幕内容的时间点

- FCP

	- first contentful paint

		- 标记的是浏览器渲染来自 DOM 第一位内容的时间点

- FMP

	- first meaning paint

		- 淘宝除了比较通用的算法

- LCP

	- largest contentfule paint

- DCL

	- DOMContentLoaded Event

- FP  和 FCP 的计算方式

### Nova 的计算方式

- window.performance.timing.loadEventEnd - window.performance.timing.navigationStart

### 优化过程

- Service Worker

	- 启动耗时

		- 在 PC 端 50 ms
		- 在移动端 250 ms

- Gzip -- BR  压缩

	- https://segmentfault.com/a/1190000009374437
	- 由后端处理，设置响应头，前端浏览器只要支持即可

- JSONP 转 AJAX

	- window.onload 会受图片、脚本、链接以及子框（iframe）影响，但ajax 不会

- 图片优化

	- 质量设置为 90
	- webp

		- 仅 安卓

- LAZY LOAD

### 其他措施

## Nova 单元测试

## Nova 重试机制

### http://wiki.corp.vipshop.com/pages/viewpage.action?pageId=852168388

### http://www.wewyy.com/archives/269

## Nova 监控

### http://wiki.corp.vipshop.com/pages/viewpage.action?pageId=852168388

### 前端脚本异常汇总

- http://wiki.corp.vipshop.com/pages/viewpage.action?pageId=852165927

## webpack 性能优化

### webpack 打包速度优化

- 使用 webpack-bundle-analyzer 分析包大小
- Loader 的搜索范围缩小

	- 比如 babel-loader 可以通过 include 和 exclude 来减少搜索的范围

- happyPack 多进程

	- 使用 HappyPack

		- 原理

			- 将任务分解给多个子进程去并发执行，子进程处理后再将结果发送给主进程
			- 由于 JavaScript 是单线程模型，所以要想发挥多核 CPU 的功能，就只能通过多进程实现

		- 使用

			- loader 配置 querystring?id=myid
			- plugin 添加 HappyPack 实例，id 对应 loader 配置中的 id
			- 其它参数

				- threadPool 共享进程池

- 动态链接库 dll-plugin

	- 使用 DLLPlugin

		- .dll 文件

			- 动态链接库：在一个动态链接库中，可以包含被其它模块调用的函数和数据

		- 原理

			- 将模块抽离，打包到动态链接库，一个动态链接库可以包含多个模块
			- 当需要导入的模块存在于动态链接库中，不需要编译，直接从动态链接库中获取

		- 接入 webpack

			- DLLPlugin 插件：用于打包出一个个不相互依赖的动态链接库
			- DllReferencePlugin 插件：用于将一个个动态链接库引入我们的 webpack配置
			- .manifest.json

				- 描述了与其相对应的 .dll.js 包含哪些模块和以及每个模块的路径和 Id

- cache-loader来进行缓存持久化

	- 比如 babel -loader 可以通过 cacheDirectory: true 设置缓存

- https://mp.weixin.qq.com/s/Rqp4qV8SyqVxyEcQFS0UbA
- 压缩代码

	- 压缩文本作用：减小代码体积，提高网页加载速度，混淆代码
	- 压缩 JavaScript

		- UglifyJSPlugin
		- ParallelUglifyJSPlugin

			- 使用 ParallelUglifyPlugin 多进程压缩

				- 原理

					- 将多个文件的压缩工作分配给多个子进程去完成，每个子进程还是通过 UglifyJS 去压缩代码，但是变成了并行执行

				- 使用：参考官网

	- 压缩 ES6

		- UglifyES

	- 压缩 CSS

		- cssnano

- 使用 TreeShaking

	- 剔除无用代码
	- 无效原因

		- 采用了 CommonJS 语法
		- 解决：mainFields

- 提取公共代码

	- 好处

		- 服务器：减小网络传输流量，减小成本
		- 客户端：提升访问速度

	- 如何提取

		- base

			- 缓存

		- common

	- CommonsChunkPlugin

		- chunks
		- name
		- minChunks

- 分割代码以按需加载

	- webpack 内置支持 import (*) 

		- import 返回一个 promise，可以通过 .then 访问加载成功的内容

	- vue-router

		- 路由懒加载

- 开启 Scope Hoisting

	- 作用域提升
	- 原理：分析各个模块的依赖关系，尽可能将被打散的模块合并到一个函数中，但前提不能造成代码冗余，因此只有那些被引用一次的代码才有可能被合并

- CDN 加速

	- 概念：内容分发网络
	- 接入 CDN

		- 要为网站接入  CDN，就需要将网页的静态资源上传到 CDN 服务上，在访问这些静态资源的时候，需要使用 CDN 提供的 URL 地址去访问
		- 缓存问题

			- 针对 HTML 文件，不放到 CDN，放在自己的服务器，不开启缓存
			- JavaScript、CSS、图片等文件，上传到服务器，采取 hash 值方法

		- 请求数量限制问题

			- 同一个时刻同一个域名下资源的并行数量有限

				- 放置不同的域（rel="prefetch"）预解析域名

	- 用 webpack 实现 CDN 接入

		- hash 值解决缓存
		- publicPath:静态资源的导入 URL 变成指向 CDN 服务的绝对路径的URL，该配置设置存放静态资源 CDN 目录 URL

### webpack 3 和 webpack4 的一些区别

- webpack升级调研

	- 相关依赖升级

		- npm i webpack --save-dev
npm i webpack-cli --save-dev
		- html-webpack-plugin需要升级到3.0.6以上

	- 不再支持的依赖

		- extract-text-webpack-plugin

			- mini-css-extract-plugin 替换

		- CommonsChunkPlugin

			- 改用 optimization.splitChunks 进行模块划分

		- file-loader

			- 替换成 url-loader

		- AggressiveMergingPlugin

	- mode 配置

		- development 和 production(必须配置)

			- 1.生产环境默认开启了很多代码优化（minify，splite 等）
2.开发时开启注视和验证，并且自动加上了 eval devtool
3.生产环境不支持 watching，开发环境优化了重新打包的速度
4.生产环境开启模块串联（原ModuleConcatenationPlugin），没用过不多说
5.自动设置 process.env.NODE_ENV 到不同环境，也就是不需要 DefinePlugin 来做这个了
6.如果你给 mode 设置为 none，所有默认配置都去掉了

	- 内置功能 

		- UglifyJsPlugin1.0

			- 可以自定义功能

		- NoEmitOnErrorsPlugin，ModuleConcatenationPlugin，NamedModulesPlugin，CommonsChunkPlugin等插件

	- babel 系列

		- yarn add -D @babel/core @babel/preset-env @babel/preset-react

## webpack plugin 开发

### 原理

- 编写 Plugin

	- 插件执行顺序

		- 初始化获得实例
		- 初始化 compiler 对象
		- 调用插件 apply 方法，传入 compiler 对象
		- compiler.plugin(事件名称, 回调函数) 监听 webpack 暴露出来的事件

	- compiler 对象

		- 包含当前 webpack 所有的配置信息，包括 loader、plugin等等，在webpack 启动的时候初始化，它是全局唯一的，可以认为它是当前 webpack 的一个实例

			- 整个webpack从启动到关闭的生命周期

	- compilation 对象

		- 当前的模块资源、编译生成资源、变化的文件等

			- 代表一次新的编译

	- 事件流
	- 常用的 API

		- 读取输出资源、代码块、模块及其依赖
		- 监听文件变化
		- 修改输出资源
		- 判断 Webpack 使用了哪些插件

	- webpack 调试

### 问题

- 各个组件之间的引用关系是怎样的
- 因为我们打包是按照一个个组件去打包的，但是很多样式都是公用一个基类或者不同的样式之间有引用关系。比如商品组件和筛选条
- 那么我们想知道他们之间有哪些引用关系？在打包的时候告诉开发者他们依赖于哪些样式，让他们去打包

### 怎么解决的？

- constructor
- apply (compiler)
- compiler.plugin('emit', function (compilation, callback) {})
- compilation

	- compilation.chunks 存放所有代码块，是一个数组
	- // 代码块由多个模块组成，通过 chunk.forEachModule 能读取组成代码块的每个模块
	- chunk.forEachModule(function (module) {})
	- module.fileDependencies 存放当前模块的所有依赖的文件路径，是一个数组
	- 再将得到的路径去重

		- [...arr]
		- 就可以得到依赖的

### webpack自定义插件

- https://mp.weixin.qq.com/s/GV1LL-oNDPBsfBqcAdo5bA
- https://mp.weixin.qq.com/s/mB_Gff-nFT_zAVH7usHKlA
- https://mp.weixin.qq.com/s/mXrUXBTTwpc732tMgvL0sw
- •entry 帮忙确认入口
- •loader 帮忙将模块 module 加工
- •最后输出资源的时候，根据入口（entry）和模块 （module） 的关系，组装成包含多个模块的 chunk，每个 chunk 实际上对应输出的一个文件
- 开始编译的时候，webpack 会用上一步初始化得到的参数用来初始化 Compiler 对象（这是一个很重要的概念，我们稍后会讲），同时会加载所有配置的插件，并执行对象中的 run 方法开始执行编译
- 官网文档称之为 Compiler Hooks 和 Compilation Hooks，翻译过来就是 compilation 钩子和 Compilation 钩子
- 在输出资源到输出完成是修改资源的绝佳时机，这个时候 webpack 会广播一个 emit 事件，代表确定好要输出哪些文件后，执行文件输出，可以在这里获取和修改输出内容
-   // 在构造函数中获取用户给该插件传入的配置
-   // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
- // 导出 Plugin
- 在初始化 compiler 对象之后，会调用 basicPlugin .apply(compiler) 方法将 compiler 传入，插件获得 compiler 对象后，就可以通过 compiler.plugin('事件名', 回调函数) 的方式进行监听 webpack 广播出来的事件了
- compiler 对象包含 webpack 所有的配置信息，包括 options 、plugins和 loader等等，这个对象在 webpack 启动的时候被初始化，是全局唯一的，我们可以理解成它是 webpack 实例
- compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等等。当 webpack 以开发模式运行时，每一个文件变化，一个新的 compilation 就会被创建
- 两者的区别在于：Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一次新的编译

## Vue key 值导致顺序不正确的问题

### https://mp.weixin.qq.com/s/LYQ_xhnNQryluJcpbuSg3w

### https://mp.weixin.qq.com/s/GV1LL-oNDPBsfBqcAdo5bA

### 原先的数组是 [1,2,3,4]，拖拽之后，变成了 [4,1,2,3]，但在视图上并没有显现，这不经让我疑惑不解，开始了以下问题的探索，在此记录一下

### Vue 的数组更新问题

### Vue 强制刷新——$forceUpdate()

- // 在控制变量改变的时候进行 强制渲染更新
let childrenRefs = this.$refs.elTabs.$children
this.$nextTick(() => {
  childrenRefs.forEach(child => child.$forceUpdate())
})

### 先用一个数据深拷贝数据，这里使用了 slice 方法，然后置空，最后在 $nextTick 中赋值深拷贝出来的数组值。最后可以了

- 我猜测有两个，数组的长度不变，只是数组的长度变化， Vue检测不到，对于这个猜想，很容易就被自己推翻了，毕竟试了一下，并不会这样的。

### key 的一个错误使用——使用 index 作为 key

- 并不是唯一的，所以会导致错误

### 有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。

- 之所以会造成上面渲染错误的情况，是因为我们的 key 值不是独特的，比如上面的 key 值，在调整数组顺序后就每一项原来的 key 值都变了，所以导致了渲染错误。

### key 值到底有什么用

- warning

### 不使用 key 可以提高性能么

- 如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
- 就地更新策略

	- 没有key

### 竟然不带 key 性能更优，为何还要带 key

- 这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。
- 使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
- 它也可以用于强制替换元素/组件而不是重复使用它
- 场景

	- 完整地触发组件的生命周期钩子
	- 触发过渡

### key 在diff 算法中

- 创建的 map 对象中根据我们的 key 值，直接找到相应的值
- 没有 key 值，则需要遍历才能拿到
- key 值是每一个 vnode 的唯一标识，依靠 key，我们可以更快的拿到 oldVnode 中相对应的节点。

## blog 总结

### webpack 相关

- webpack3 升级到 webpack4 小记

	- 在 webpack4 中不再支持 CommonsChunkPlugin，而是使用 splitChunks 替代，那么这两者有什么区别？为什么要废弃之前的，使用 splitChunks 的呢？
	- CommonsChunkPlugin

		- CommonsChunkPlugin 会提取一些我们不需要的代码
		- 它在异步模块上效率低下
		- 很难使用，配置也很难理解

	- splitChunks

		- 它不会打包不需要的模块
		- 对异步模块有效（默认情况下是打开的）
		- 更加容易使用和更加自动化

	- 这是一个 warnning， webpack 4 一些默认的配置需要通过 mode 配置启用，这个配置项有三个配置值， development、 production 和 none，默认为 none，借用官网的一张图了解下它们的区别：
	-    "dev": "webpack --mode development",
	-     "build": "webpack --mode production"
	- 这样我们就可以不用使用 cross-env 和 DefinePlugin 去做生产环境和开发环境的判别，我们可以直接使用 process.env. NODE_ENV 的值进行判别，开发环境值下为 development，生产环境下值为 production

- 读书笔记——《深入浅出 Webpack》

	- 官方的 DevServer 是怎么运作的？

		- Devserver 会启动一个 HTTP 服务器用于服务网页请求，同时会帮忙启动 webpack，并接收 webpack 发出的文件变更信号，通过 webSocket 协议自动刷新网页做到实时预览

	- 为什么直接修改 index.html 不会更新

		- 因为 webpack 监听的文件包括，从 entry 的文件开始，编译它（们）所依赖的文件，但是 index.html 是不属于这个系统中的（相对独立的文件）

	- crossOriginLoading 配置什么内容？

		- 通过 crossOriginLoading 可以配置异步插入标签的 crossOrigin 值，具体 crossOrigin 值有什么用，可以看 [html] script的crossorigin属性[3]，其中有一项最近刚好遇到过，就是配置成 anonymous 之后，可以获取到详细的报错信息。

### 前端踩坑系列《一》

- transition 在 IOS 8.1下 transition 动画卡顿

	- 在使用 transition 的时候，在 iphone6、 IOS8.1 下面动画的过渡效果没有了，动画卡顿，在 Chrome 或者其他机型下面均是可以的

		- transition

	- 解决过程

		- 给它们加了相关的前缀

			- Vue 在行内样式的时候，会自动帮类似 transform的属性加上浏览器前缀，类似 -webkit- 等

		- transform: translateZ(0)
		- transform-style: preserve-3d;
		- 没错，就只需要将 -webkit-transition: transform 替换成 -webkit-transition: -webkit-transform 即可。

			- 旧版本的iOS仅支持有前缀的属性和值进行过渡和转换

- webpack 打包后文件路径有误 assetsPublicPath 配置

	- 问题

		- 打包后的文件，部署到线上的时候，报 404 问题，如下图所示：

	- 解决

		-  assetsPublicPath: '/web/dist/'

- webpack 打包将 ES6 转 ES5 问题
- 异步操作问题 async/await 解决

### 前端踩坑系列《二》

- webpack 按需加载问题

	- 在打包过程中，我们所希望的肯定都是按需打包，要不然我们最终出来的目录将会很大。
	- 其实在 web 端打包的时候，看process.env.IS_WX_MINI 值为 undefined，这是因为我们在web中webpack 的 DefinePlugin 配置中没有配 IS_WX_MINI 这个参数
	- config = merge(config, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        IS_WX_MINI: 'false'
      }
    })
  ]
})
	- 但实际上还是有一个问题，就是不仅 undefined 这个条件没有办法识别并按需加载，我们的试验中，就算手动赋值条件为false 也是没有做到按需加载。

- git 追踪文件

	- 方法一

		- .gitignore

	- 方法二

		- git rm -r --cached .

	- 方法三

		- 一般的路径在 /Users/用户名 下面，文件名为 gitignore_global.（这是一个隐藏文件）。

- IOS8闪退

	- 在 APP 中，执行了一定的操作后， APP 闪退
	- 机型：IOS8
	- alert(JSON.stringify(this.resultFeedback.success)); // 执行这一句 crash
	- 可能异步操作了这个数据，毕竟是偶现的，我怀疑是不是异步哪里会修改到这个数据导致闪退。结果并没有发现相关的异步操作。
	- 嵌套层级太深的 JSON 在 IOS8 下面可能会导致 crash
	- JSON的数据量过大会导致 IOS8 crash
	- JSON 死循环

### 前端踩坑系列《三》

- 访问地址中的 #

	- 这种方式我们在平时页面之间传参用得很多，但实际上会存在一个隐患，就是页面超级长的时候（这里具体我也不是很清楚），访问地址就会报 5** 或者 404 的错误。

		- 414

			-  Request-URI Too Large

	- 其实可以通过改成其他的传参方式进行解决，比如我们这个需求打开的这个实际上是一个 iframe，那么我们可以通过 postMessage 的方式进行。
	- 通过 # 的方式，我们经常在页面中看到 ? 和 &，但是 #却不算常见，见得多的使用场景就是 hash 地址

		- # 代表网页中的一个位置， # 号右边的字符，就是该位置的标志符
		- 单纯改变 # 后面的字符，网页不会发生重载
		- HTTP 请求中不包括 # 后面的字符串

- 数组浅复制
- input 标签的 accept 属性

	- <input type="file" accept="image/*" />

		- 这里主要的原因在于 accept 属性，这里的意思接受一切的图片，相当于一层过滤，但也正是因为这一层过滤，导致的很慢。我的猜想是它会一个个的去比较，所以导致性能下降

	- <input type="file" accept="image/gif, image/jpeg"/>

### 前端踩坑系列《四》

- 页面重排

	- 尽量不要改变页面中占位元素的宽高等会导致页面重排的属性。
	- transition 最好配合 transform 使用，而不要改变 height、margin-top 等属性，这个值得好好深究，这里不展开。

-  webpack importLoaders

	- 背景：使用 mpvue 将同一份代码打包成 H5 端和小程序端代码，为了解决字体大小设置统一的问题，我们在webpack 中使用了 px2rpx-loader（这个的使用有点类似于 px2rem-loader）
	- 在使用的时候，发现使用 import css 文件的时候不支持，打包到小程序端有问题。
	- 在 CSS-loader 后面加上参数?importLoaders=10，这个参数的作用官方的解释如下：
	- 可以看到， importLoaders 定义的是使用多少个后面的 loader 去处理 @import 进来的资源。

- 0.1 + 02 不等于 0.3

	- 十进制小数转二进制方法：乘2除整
	- 解决一：先乘后除

		- 这个的原理利用在 javascript 中整型没有这种精度问题的原理，但是这样就会有个精度的要求，看了一个运营人员的配置，后面好多个 0 的都有，也就是我也要相应的乘以好大的值，我选择 go die

	- toFixed 方法

		- numObj.toFixed(digits)
		- digits 指的是小数点后数字的个数，比如：
		- 1.0043.toFixed(2); // 1.00
		- 1.0053.toFixed(2); // 1.01

	-  toPrecision 方法

		- numObj.toPrecision(precision)
		- precision 指的是有效数个数的整数，也就是从第一个非 0 数值开始数的个数。举个例子:
		- 0.041234123.toPrecision(2); // 0.041
		- 值得注意的点是上面两个方法返回值都是字符串，也就是我们还需要转换成小数

	- Math.js、BigDecimal.js ...

### 前端性能优化《一》——Chrome Performance 页面性能调试

- 认识 Chrome Performance

	- screenshots
	- 模拟 CPU 速度，更加方便你重现问题，如果 4x slowdown 不行，你可以选择 6x slowdown
	- 录制结果

		- controls
		- 重要参数，这一部分我们称之为 Overview 窗格，我们可以看到 FPS， CPU， NET在页面加载时候的变化。

			- FPS：每秒帧数，绿色竖线越高， FPS 越高，我们应该关注红色部分，这说明我们的页面很可能出现卡顿现象，另外 60 是一个比较理想的值
			- CPU: CPU 资源
			- NET: 每条彩色横杆代表一种资源，横杆越长，检索资源所需要的事件越长

		- 火焰图

			- 横轴表示加载的时间
			- 纵轴表示事件（线程）的执行顺序，先是上面的执行再到下面的，我们要特别注意红色的三角行部分

		- Summary 部分，可以看到 CPU 中中的资源分配

	- 使用 Performance 定位性能问题

### 前端踩坑系列《五》

- 横向滚动，硬件加速

	-  overflow-x: scroll
	- 有意思的是，我百度到的这类问题都是 IOS 上会出现，但我们反馈的是在 android 上的问题。百度提出的解决方法是：

		- -webkit-overflow-scrolling: touch;

	- transform: translate3d(0, 0, 0);

		- 加上这个就可以了，但是有得就有失，如果你选择了开启硬件加速，那么也要损耗更多的内存，所以也是一件要慎重的事情。

- 清除setTimeout/setInterval/sroll事件

	- 比如你在一个单页面中，实际上你离开了"当前的页面"，但是你在上一个页面中创建的 setTimeout 并没有销毁，然后它里面代码执行就会有一些意想不到的问题出现。
	- 另外就是现在组件化的概念，一个页面可能由很多个组件拼凑而成，当你在某个组件中使用了 scroll 事件，然后使用了在某个节点你这个组件从这个页面清除掉了，但是你并没有清除掉 scroll 事件，这也会导致一些问题。
	- 在页面/组件离开的时候，养成一个将上面提到的一些清除掉，比如在 Vue 中：

		-  beforeDestroy () {
    // 移除事件监听
    window.removeEventListener('scroll', this.handleScroll)
  }


- setTimeout和setInterval的程序休眠

	- 在我们使用到 setTimeoutout 或者 setInterval 的时候，我们将浏览器最小化，过了一段时间后再打开，发现 setTimeou/setInterval 会暂时进入休眠状态，但并不是不执行程序，它会把 setInterval/setTimeout 的回调函数放在队列中,等浏览器再次打开的时候，一瞬间全部执行。
	- 如果页面是不可见的时候，那么我们就清除定时器，如果页面可见的时候，那么我们重新开启定时器

		- document.onvisibilitychange 只要页面中发生变化，不管是切换到其他页面还是把浏览器缩小，都会触发这个事件。
		- document.hidden 这个是指前页面不是当前页面的时候，否则为false
		- document.visibilityState
		- document.onvisibilitychange = function () {
    if (document.visibilityState == "visible") { 
        timer = setInterval(slidemove, 1000); 
    }
    else {
        clearInterval(timer);
    }
}

### 前端踩坑系列《六》——让人又爱又恨的npm包

- 关于 npm install

	- 1.发出 npm install 指令
	- 2. npm 向 registry 查询压缩包的地址
	- 3.下载压缩包后，存放到 ~/.npm 目录
	- 4.解压压缩包到当前项目中的 node_module 目录

- nrm 换源

	- nrm

- npm 包版本问题

	- x 是主版本。大改动。
	- y 是次版本号。增加新特性
	- z 是补丁号。修复问题
	- 然后注意一点就是上面截图中的 ^ 符号，它代表的是在依赖版本兼容下，最新的次版本。有时候我们遇到一些问题，需要改成 ~，代表的是在依赖版本兼容下，最新的补丁版。

- 关于 package.lock.json
- 比特币事件

	- 一开始认为是这个包不存在，但是奇怪的是在 package.json 中没有找到这个依赖。但是自己忽略了一种情况，就是有可能是依赖的依赖。
	- 目前 npm 已经删除了带有恶意版本的 event-stream，如果你想继续使用 event-stream，可更新到最新版本的 event-stream 4.0.1。
	- npm i event-stream@4.0.1

### 前端须知的 Cookie 知识小结

### 不靠谱的 console

- 在使用 console 打印一个 JavaScript 对象的时候，由于对象是引用类型，那么它会一直引用内存中的值，当你输出的时候，对象中的值已经发生了改变，所以才会出现这种打印结果不正确的情况
- 从上面可以看出，在浏览器环境中,console.log() 实际上也是一种异步的方法
- 并没有什么规范或一组需求指定 console.* 方法族如何工作——它们并不是 JavaScript 正式的一部分，而是由宿主环境（请参考本书的“类型和语法”部分）添加到 JavaScript 中的。因此，不同的浏览器和 JavaScript 环境可以按照自己的意愿来实现，有时候这会引起混淆。
- （从页面/ UI 的角度来说）浏览器在后台异步处理控制台 I/O 能够提高性能，这时用户甚至可能根本意识不到其发生。
- 从上面可以看出， node 环境中是不存在情况的
- 解决方法

	- JSON.stringify
	- 打断点

### 前端杂货铺上新

- 如何手动触发滚动事件

	- var myEvent = new Event('scroll')
window.dispatchEvent(myEvent)

- 将一个数组拍平
- 使 a == 1 && a == 2 && a == 3 的值为 true

	- var a = {
    value: 1,
    toString: function () {
        return this.value++
    }
}

- git 小技巧

	- git cherry-pick 将某个分支的某个提交，复制到自己的分支上
	- MR（merge request） 想让人看，但不想对方合并，标题前缀写上：[WIP] ，注意逗号前面有空格，或 WIP: ，注意逗号前面有空格

### 杂谈小程序

- open-data

	- 用于展示微信开放的数据，比如头像、昵称等，注意只符合展示的场景

- navigateToMiniProgramAppIdLis

	- 如果我们的需求需要跳转到其他的小程序的 APPID，则需要配置该选项。

- 可以在开发者工具的console面板输入 showRequestInfo() 查看相关信息
- •wx.login获取的code凭证的有效时间是5分钟
- parseInt 问题

	- parseInt(string, radix) 将一个字符串 string 转换为 radix 进制的整数， radix 为介于2-36之间的数

- 精灵图的使用

	- 原理：background-image 设置图片，background-repeated 设置不重复，background-position （重点）设置图片的位置以显示哪张图片

### 前端大杂货铺系列《七》

- Object.assign 

	- 问题就是出在这个位置，我们在使用 Object.assign 的时候，要留意两个对象是否有相同的属性，有相同的属性它们是否有相同的含义，是否可以使用源对象替代目标对象

- lodash 的一个小坑

	- 同事分享的一个小坑，在使用 lodash 的 get 方法的时候，如果是空值 '' ，而不是 undefined 的话，就不会取第三个值

- 前端全面使用vue，不应该使用zepto或jQuery，更不应该直接操作DOM

### React 学习笔记（基础篇）

- https://mp.weixin.qq.com/s/FsJr_kpSALglR-VPUnumgQ

### Jenkins 入门实战：GitHub Push触发Jenkins自动构建

- https://mp.weixin.qq.com/s/DnPBjIdsvLcc9KSfov1Acg

### 【LeetCode】三数之和

- https://mp.weixin.qq.com/s/XsPG7fOyGe4Cy9E2Zv2ftA

### JavaScript 对象赋值和浅拷贝的区别

- https://mp.weixin.qq.com/s/fxLcTcaXhuNIlSXGfP3nHw

### 前端异常捕获和定位

- https://mp.weixin.qq.com/s/L2DmUSzBtYiEA2lL4c8xXA

## 项目介绍

### 统一页面制作管理系统

- 项目原理和流程

	- 分为后台管理部分和前台展示部分，后台管理部分主要提供给运营人员搭建和预览页面，前台部分主要提供专题页面展示给用户给【一般用于大促引流，当然一些日常的页面都会有】
	- 首先，我们有个前台页面的组件仓库，这里我们会书写一个个的页面组件。每个组件我们会打包出成一份 CSS 和 JS 的代码还有包含后台表单配置的 JSON。然后开发会负责将这份代码上传到我们的组件管理平台。
	- 运营人员搭建完成页面，就到我们的专题渲染。这里是后台读取我们定义好的前端的模板，输出一份大JSON【其中包括页面组件的JS等信息，我们会根据这些信息拼接成一个个的渲染函数】。另外还有一份 JSON 包括表单配置的结果等信息【组件中可以通过不同的结果展示不同UI和交互等，比如控制 tab 的个数等】
	- 【当然这个分成测试环境、预发布和线上环境】这个组件测试通过没有问题，我们会将其发到线上。
	- 后台管理部分，运营人员就可以看待相关的组件。他们可以拖进页面编辑区，进行页面组件的编辑【这里每个组件都会有属于自己的表单配置项，这个也是放在前台代码中的，实现的话，就是一份 JSON 然后转换成表单，有点类似 JSON-Editor，但是是我们自己实现的，我负责其中的一部分的表单书写】
	- 前台展示的时候，会拿到这个页面组件相关的信息。包括组件的代码，HTML、CSS 和 JavaScript 等。以及表单配置的结果，然后去展示页面。
	- 会有首屏渲染和页面按需加载，或者如果优先级比较高的，我们会让它提前渲染，比如一些全局的导航组件等

### 杉杉小程序的开发

- 登录流程是怎样的？
- 以29亿元人民币收购杉杉商业集团有限公司100%股份

### 活动项目的开发

### 问题

- 为什么打包出来的没有了 HTML？

	- render函数中就已经有了？那render函数跟我们普通的有什么区别？虚拟 DOM？

- 后台直接读取我们的模板，那应该不算是前后端分离了吧？

	- 算是前后端分离
	- 前后端分离的概念前端的发版不依赖于后端。我们这边模板基本是固定的。数据如果不通过 PHP 直出，也可以通过 Ajax 请求拿回相关的数据

- CSS 是如何加载的呢？

	- 遍历组件的 CSS 代码，通过 style 标签插入，目前是所有的样式一次性全部插入

- 前台页面是如何展示的？

	- 跟问题一是一致的，我认为就是执行渲染函数

- 这份 JS 这么大，会不会影响到我们页面的性能？

	- 还好，几十K

### 需要知道的场景

- 前台按需加载的实现

	- windowScrollTop + loadRange > itemOffsetTop
	- loadRange

		- 通过这个值来优化首屏的加载速度

- 容器tab的实现方案

	- 先渲染父组件，其中父组件留有一些坑位，setTimeout 后面再将子组件插入到父组件中

- 后台Tab的表单设计以及富文本的表单设计原理

	- 配置代替开发思想
	- key 值问题

- 小程序的登录流程以及需要注意点
- blog 解决方法的回顾
- 性能优化点要知道

	- webpack 打包的优化
	- rel="dns-prefetch"
	- webp 

		- 正则匹配然后替换成webp

	- 如何计算首屏

		- domComplete - domStartLoading

	- SW
	- Brotli
	- domContentLoaded、onLoad 事件 的区别

		- DOMContentLoaded顾名思义，就是dom内容加载完毕
		- 页面上所有的资源（图片，音频，视频等）被加载以后才会触发load事件，简单来说，页面的load事件会在DOMContentLoaded被触发之后才触发

	- 一些性能上的优化

		- HTTP请求数量
		- HTML 结构
		- CSS
		- JS
		- 图片

- webpack 性能优化
- mpvue 大致实现原理

### 技术终面

- 项目难点

	- key 的解决
	- 精度缺失问题
	- 字符串受限制问题

		- postMessage
		- 还有#值后面的不限制，访问地址中的 #

	- setTimeout 和 setInterval 的程序休眠
	- setTimeout 内存泄漏
	- input 标签的 accept 属性

		- window下的上传图片很慢

	- IOS 8 下的 crash【最诡异】

		- JSON.stringify()

	- transition 在 IOS 8.1下 transition 动画卡顿【搜索能力】
	- npm i event-stream@4.0.1【撞在枪口上】

- 项目开发流程

	- 需求评审，测试和产品对方案以及评估工时
	- 开发阶段，尽量在测试环境
	- 提测阶段
	- 测试阶段

		- 开发改 bug

	- 合master
	- 回归阶段
	- 预发布阶段
	- 发布

		- 进行灰度

	- 页面监控
	- 假如有问题，评估影响，是否需要紧急回滚

- 项目技术选型

	- tinymce

- 前端项目自动化发布方式

	- Jenkins 结合 GitHub

- 团队情况，团队沟通中遇到最大的困难，个人在团队中的角色

	- 前端开发以及分享自己看到的新的知识以及踩过的坑
	- 需求评审中能够给出自己建议，参与其中
	- 开发阶段设计方案讨论和确认
	- 配合测试完成测试和验收
	- 后续的跟进，比如监控等

- 团队内部的贡献（技术分享、维护工具）

	- eletron 的分享
	- 提出自己的一些想法，比如一些优化建议
	- 前端工具以及运营人员的用户体验提升

- 个人职业规划

	- 我自己一般都会做年计划、月计划和周计划
	- 能够在团队中发挥自己的所有的价值，能为团队贡献的同时，不断提升自己。达到双赢
	- 在学习方面，打算在专业领域做进一步学习和研究，将实践经验与专业知识相结合，为自己的职业成长做好铺垫，打好基础

		- 前端和后台，以及管理方面的知识

	- 近期我会总结面试相关的所有准备过程以及后台的学习。我觉得我目前的阶段还是要多加沉淀，更加稳固自己的专业技能

- 你还有什么问题要问我吗

	- 团队当前的技术栈和业务方向
	- 团队在公司内外维护的公共组件 or 开源产品，和在社区的活跃度
	- 未来加入这个团队后，我的角色、职责和 leader 对我的期望

*XMind: ZEN - Trial Version*