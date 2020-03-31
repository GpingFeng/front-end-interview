- 自我介绍一下
- 假如现在用户反馈白屏了，你怎么处理？
 可能原因如下
  - 在弱网络下(2G网路或者GPRS网络) ,网络延迟，JS加载延迟 ,会阻塞页面
  - JS 报错
  - 接口超时

  如何统计白屏数量
  - 监听某个主DIV的变化（因为是单页面的应用，所以总会有个入口DIV来监听），白屏即是该DIV没有在规定时间内被放入东西，所以只要在规定时间内该DIV没有变化，那就可以进行白屏统计了

  解决问题
  - 是否严重【决定是否需要回滚操作】
  - 复现问题
  - 快速定位【sourcemap+whiltle 代理工具】
  - 接口超时的话，要抓包查看原因
  - debug 紧急的话，走紧急需求上线

  题外话
  - 对于一些功能性比较大的需求，需要通过一些开关控制，出问题可以及时止损

- 兼容性问题，你要怎么处理。比如说在不同机器上面图片拉伸很严重，你怎么处理这类情况【往响应式方面靠】
  - meta 的设置
  - rem 设置
  - 百分比设置
- 系统不兼容，ES6 代码，怎么办？
  - 多种语法解析转换工具。比如 babel。【大概说下它的原理，将其转换成 AST 】
- 解释下 HTTP
  - HTTP 请求首部【get uri http2】， 请求头说起。【谈谈状态码，常用的请求首部】
- webpack 工程化相关和 webpack 优化
- 多线程为什么会慢？【深度去解释一下】【面试的时候尽量不要说这个点】
  - 线程之前的通信耗时
  - 线程启动也是要耗时


- 两道编程题
```
function gen () {
    // 生成一个 8*8 棋盘
    let arr = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (Math.random() < 0.5) {
                arr[i][j] = 0
            } else {
                arr[i][j] = 1
            }
        }
    }
    // 判断是否有攻击的情况
    // 横向有没有
    for (let k = 0; k < arr.length; k++) {
        if (arr[k].indexOf(1) !== arr[k].lastIndexOf(1)) {
            return true
        }

        // 纵向有没有 
        let hor = []
        for (let n = 0; n < 8; k++)  {
            hor.push(arr[n][k])
        }
              
        if (hor.indexOf(1) !== hor.lastIndexOf(1)) {
            return true
        }
    }

    return false

}
```

```
// arr 为 8*8
// n 代表输入多少个
function inputNum (arr, n) {
    let tempObj = {
        xArr: [],
        yArr: []
    }
    // 输入 N 个
    for (let i = 0; i < n; i++) {
        if (arr[x][y] === 0) {
            let x = Math.floor(Math.random()*8)
            let y = Math.floor(Math.random()*8)
            arr[x][y] = 1
            temp.push([x, y])
        } else {
            i--
        }
    }

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {

        }
    }
    
}
```

类似问题：
[https://www.w3ctech.com/topic/1786](https://www.w3ctech.com/topic/1786)


第一面试腾讯这么大的公司，结果很惨，心里确实也挺难受的。
