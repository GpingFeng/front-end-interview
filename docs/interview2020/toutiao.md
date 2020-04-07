- 简单聊了一下项目

```js
console.log('begin'); 
setTimeout(() => {
    console.log('setTimeout 1'); 
    Promise.resolve().then(() => {
        console.log('promise 1'); 
        setTimeout(() => {
            console.log('setTimeout2 between promise1&2'); 
        })
    }).then(() => {
        console.log('promise 2'); 
    });
}, 0);
console.log('end'); 
```

![](https://upload-images.jianshu.io/upload_images/1784460-0674d056fb974aaf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


```js
var result = [];
var a = 3;
var total = 0;
function foo(a) {
  var i = 0;
  for (; i < 3; i++) {
    result[i] = function() {
    total += i * a;
    console.log(total);
    }
  }
}
foo(1);
result[0]();
result[1]();
result[2]();
```

改变 var 为 let 还是 369，why

```js
- 写代码使 sum 函数使得以下表达式的值正确
- sum(1, 2, 3).sumOf(); //6
- sum(2, 3)(2).sumOf(); //7
- sum(1)(2)(3)(4).sumOf(); //10
- sum(2)(4, 1)(2).sumOf(); //9

function curry(fn, cur = []) {
  console.log(fn)
  if (fn.length > cur.length) {
    return function (...args) {
      cur = cur.concat(args)
      curry(fn, cur)
    }
  } else {
    return fn.apply(null, cur)
  }
}

let result = 0
function sum(...args) {
  for (let i = 0; i < args.length; i++) {
    result += args[i]
  }
  return result
}

curry(sum(3)(4))

sum.prototype.sumOf = function () {
  return result
}
```



```js
// 10000 => 10,000
function to(num) {
  let numArr = Number(num).toString().split('').reverse()
  let result = []
 //  console.log(numArr)
  for (let i = 0; i < numArr.length; i++) {
    if ((i+1) >= 3 && (i+1)%3 === 0) {
      result.push(numArr[i])
      result.push(',')
    } else {
      result.push(numArr[i])
    }
  }
   console.log(result.reverse().join(''))
  return result.reverse().join('')
}

to(10000)
```

跨域你了解到有哪些方式呢？

什么时候会发送 options 的请求