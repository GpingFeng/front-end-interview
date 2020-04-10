### 函数节流
**概念**

在 n 秒中只执行一次

**实现原理**

通过 setTimeout 执行

**代码实现**

```js
// 初步实现
const throttle = function (fn, time) {
  let canRun = true
  // 闭包
  return () => {
    if (canRun) {
      canRun = false
      setTimeout(() => {
        canRun = true
        fn()
      }, time)
    }
  }
}

function sayThrottle() {
  console.log('我是节流，我在固定的时间内执行一次')
}
window.onscroll = throttle(sayThrottle, 1000)
```




### 函数防抖
**概念**

在 n 秒内重新触发，会重新开始计算时间

**实现原理**

通过 setTimeout 和 clearTimeout 实现

**代码实现**

```js
function debounce (fn, time) {
  let timer = null
  // 闭包
  return () => {
    // 每次都会重新开始计算时间
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, time)
  }
}

function sayDebounce() {
  console.log('我是防抖，每次触发我都会重新计算一次时间')
}

btn.onclick = debounce(sayDebounce, 1000);
```