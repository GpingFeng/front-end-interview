## 概念
各个资料对闭包的说法不一。下面是来自《JavaScript 语言精粹》中的定义

**该函数可以访问它被创建时候所处的上下文环境，这被称之为闭包**

**闭包是指有权访问另一个函数作用域中的变量的函数**
                                                ---- 《JavaScript 高级程序设计》
                                                
高级程序设计会更加偏向于它是怎么形成闭包，语言精粹对闭包的形成的原因做了解释。

## 举个例子

```js
let Quo = function(status) {
    return {
        get_status: function() {
            reueturn status;
        }
    }
}

let myQuo = new Quo(100);
console.log(myQuo.get_status());    // 100
```

上面先创建了一个 Quo 的函数，传入值 status，这个函数中返回一个名叫 get_status 的函数，这个函数返回 status 值。

一般而言，我们的函数执行，完成之后。即执行了下面这行代码的时候。
```
let myQuo = new Quo(100);
```
一般就认为，函数执行完毕，销毁局部变量（这里指 status），但是很神奇的是，我们执行 myQuo.get_status() 的时候，打印出了 100（也就是status的值），说明status并没有被销毁。那是为什么呢？

那就是闭包的力量！！

当我们new 一个 Quo 的时候，这个时候就创建了一个 myQuo 的执行上下文环境，在这个上下文环境中，status 就是100，然后我们通过 myQuo 去调用的时候就可以访问到我们需要到值了。

## 执行上下文的理解

参考：
https://www.cnblogs.com/wangfupeng1988/p/3986420.html
