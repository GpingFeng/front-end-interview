// 柯里化的目的是，减少代码冗余，以及增加代码的可读性。
// 参考：https://juejin.im/post/5b8350246fb9a019c372d26d
// https://juejin.im/post/5c677041f265da2de25b7707
function sum (x) {
  if (arguments.length === 2) {
    return arguments[0] + arguments[1]
  }
  return function (y) {
    return x + y
  }
}

function curry (fn, currArgs) {
  return function() {
      let args = [].slice.call(arguments);
      console.log('arg:', args)
      console.log('currArgs:', currArgs)

      // 首次调用时，若未提供最后一个参数currArgs，则不用进行args的拼接
      if (currArgs !== undefined) {
          args = args.concat(currArgs);
      }

      // 递归调用，fn.length 指的是最初函数有多少个参数
      if (args.length < fn.length) {
          return curry(fn, args);
      }

      // 递归出口
      return fn.apply(null, args);
  }
}

function multiFn(a, b, c) {
  console.log(a * b * c)
  return a * b * c;
}

var multi = curry(multiFn);
multi(2)(3)(4)
// multi(2, 3, 4)
// multi(2)(3, 4)
// multi(2, 3)(4)

console.log(sum(2, 3)); // Outputs 5
console.log(sum(2)(3)); // Outputs 5