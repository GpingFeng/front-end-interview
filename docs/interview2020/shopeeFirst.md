一面
- ES6 你用了哪些
- 箭头函数和普通函数的区别
- 说下事件循环，微任务总是在宏任务之前执行么？
- 说下浏览器的渲染机制
- 对 React 了解，Vue 和 React 的最大区别， Vue 的双向数据绑定的实现
- 对现在哪些技术有了解【比如 server Worker】
  - install
  - 是否命中，命中则直接从缓存中获取
  - 说说缺点【兼容性和移动端的启动耗时】
- cookie 的 samesite 最新的默认值是 Lau
- CDN 了解过么【内容分发网络】
  - webpack HtmlWebpackPlugin
  - 参考：[https://www.jianshu.com/p/9248db0349fb](https://www.jianshu.com/p/9248db0349fb)


![](https://upload-images.jianshu.io/upload_images/1784460-1800a61c2de9b2c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


做题
- Promise 【resolve完成之后】
参考：[https://blog.csdn.net/funkstill/article/details/103521985](https://blog.csdn.net/funkstill/article/details/103521985)

```
new Promise((resolve,reject) => {
    console.log(1)
    resolve()
    console.log(2)
}).then(() => {
    console.log(3)
})
```
- const a = b = 0
A1 = A2 = A3 = A4

A1 = (A2 = (A3 = A4))
```
(function () {
    const a = b =1;
    // 这里我理解相当于
    // b = 1,const a = b
})()

console.log(typeof a)  // undefined
console.log(typeof b)  // number
```
参考：[https://segmentfault.com/a/1190000004224719](https://segmentfault.com/a/1190000004224719)


编程题【做得不是很好】
对数据结构的处理，这是一篇解释的文章：[https://github.com/LeuisKen/leuisken.github.io/issues/2](https://github.com/LeuisKen/leuisken.github.io/issues/2)

```
var transObject = function(tableData, keys) {
  let hashTable = {}, res = []
  for (let i = 0; i < tableData.length; i++) {
    let arr = res, cur = hashTable
    for (let j = 0; j < keys.length; j++) {
      let key = keys[j], filed = tableData[i][key]
      if (!cur[filed]) {
        let pusher = {
          value: filed
        }, tmp
        if (j !== (keys.length - 1)) {
          tmp = []
          pusher.children = tmp
        }
        cur[filed] = { $$pos: arr.push(pusher) - 1 }
        cur = cur[filed]
        arr = tmp
      } else {
        cur = cur[filed]
        arr = arr[cur.$$pos].children
      }
    }
  }
  return res
}
```


二面

- 说下你的项目流程
- 有哪些技术难点【后台表单部分、性能优化部分、webpack 工程化这块】
- 平时是怎么去学习的？【书籍、写博客、关注前沿技术【server worker】【cookie 的 samesite】】
- Vue 和 React 有哪些不同？【数据更新这一块】
- 关于按需加载【scrollTop 和 offsetTop】
- 关于后台表单配置思想相关【类似 JSON Editor】
- 看一道题，最后的输出是多少，时间复杂度是多少？
- 前端安全这一块你有了解多少？【XSS 和 CSRF】
- 跨域【解释跨域、如何解决】

看一道编程题【时间复杂度是多少？】
```
function my_print(n)
{
    for (var i = 0; i < n; i++) {
        console.log("-\n");
        my_print(n - 1);
    }
}

my_print(3);
my_print(n);

f(n) = n (1 + f(n-1))
       = n + n *(n-1) + n * (n-1) *(n-2) + ...+ n! = O(n!)
```

![](https://upload-images.jianshu.io/upload_images/1784460-9112ef04c7e125c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


HR 面
- 工作平台、工作内容、钱、城市等因素，你会怎么考虑呢？【优先级】，这是一个送命题，不同的公司应该要有不同的答案