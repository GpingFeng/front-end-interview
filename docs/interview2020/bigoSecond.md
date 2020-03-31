
HTTP 中的 content-encoding

Content-Encoding 是一个实体消息首部，用于对特定媒体类型的数据进行压缩。当这个首部出现的时候，它的值表示消息主体进行了何种方式的内容编码转换。这个消息首部用来告知客户端应该怎样解码才能获取在 Content-Type 中标示的媒体类型内容。

```
Content-Encoding: gzip
Content-Encoding: compress
Content-Encoding: deflate
Content-Encoding: identity
Content-Encoding: br
```

参考：[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Encoding](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Encoding)

HTTP 中的长连接

HTTP协议采用“请求-应答”模式，当使用普通模式，即非KeepAlive模式时，每个请求/应答客户和服务器都要新建一个连接，完成 之后立即断开连接（HTTP协议为无连接的协议）；当使用Keep-Alive模式（又称持久连接、连接重用）时，Keep-Alive功能使客户端到服 务器端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive功能避免了建立或者重新建立连接。

http 1.0中默认是关闭的，需要在http头加入"Connection: Keep-Alive"，才能启用Keep-Alive；http 1.1中默认启用Keep-Alive，如果加入"Connection: close "，才关闭。目前大部分浏览器都是用http1.1协议，也就是说默认都会发起Keep-Alive的连接请求了，所以是否能完成一个完整的Keep- Alive连接就看服务器设置情况。

参考：[https://blog.csdn.net/gt11799/article/details/41147933](https://blog.csdn.net/gt11799/article/details/41147933)
[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Keep-Alive](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Keep-Alive)


JS 中的事件循环

强缓存和协商缓存

启发缓存【重点回顾】
- 没有任何关于缓存的字段 —— 不设置任何缓存策略
- 常会取响应头中的 Date 减去 Last-Modified 值的 10% 作为缓存时间
[https://juejin.im/post/5be4e76f5188250e8601b4a6](https://juejin.im/post/5be4e76f5188250e8601b4a6)
[https://youyingjie114.github.io/2019/11/08/FE-basic/knowledge-network/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%9C%89Etag](https://youyingjie114.github.io/2019/11/08/FE-basic/knowledge-network/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%9C%89Etag)



V8中的垃圾回收机制【重点回顾】
- 标记清除法
- 引用计数法

node 的全局变量
JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即全局变量。
在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。

在 Node.js 我们可以直接访问到 global 的属性，而不需要在应用中包含它。
global，process，__filename，__dirname
[https://www.runoob.com/nodejs/nodejs-global-object.html](https://www.runoob.com/nodejs/nodejs-global-object.html)

node 了解程度

ES6 有了解么？

set 和 map 有了解么？

map 的实现原理是什么？【重点回顾】
[https://www.php.cn/js-tutorial-436743.html](https://www.php.cn/js-tutorial-436743.html)
[https://www.cnblogs.com/jiaobaba/p/11918975.html](https://www.cnblogs.com/jiaobaba/p/11918975.html)
Map利用链表，hash的思想来实现。

首先，Map可以实现删除，而且删除的数据可以是中间的值。而链表的优势就是在中间的任意位置添加，删除元素都非常快，不需要移动其他元素，直接改变指针的指向就可以。而在存储数据很多的情况下，会导致链条过长，导致查找效率慢，所以我们可以创建一个桶（存储对象的容器），根据hash（把散列的值通过算法变成固定的某值）来平局分配数据，防止链条过长。



为什么要想着离职呢？

算法题：
输入[1,3,1,3,2]，输出数组中唯一一个只存在一项的值，比如如上就是 2
![](https://upload-images.jianshu.io/upload_images/1784460-610c45f0a933b328.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/1784460-08c3276e03feab8c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/1784460-72dba5ea34a09ea1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


