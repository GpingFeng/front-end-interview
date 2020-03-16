
  /**
   * JS如何实现函数缓存
   * https://blog.csdn.net/weixin_30925411/article/details/100090840
   */
  
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