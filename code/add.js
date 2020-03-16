// (5).add(3).minus(2) 的实现方案
// 注意：this的指向始终指向最后谁调用了this所在的函数，this就指向谁！
function add(number) {
  if (typeof number !== 'number' || Number.isNaN(number)) {
    throw new Error('请输入数字～');
  }
  console.log('this:', this)
  return this + number
}
console.log('this:', this)
function minus(number) {
  if (typeof number !== 'number' || Number.isNaN(number)) {
    throw new Error('请输入数字～');
  }
  return this - number
}
Number.prototype.add = add
Number.prototype.minus = minus

console.log((5).add(3).minus(2)) // 6



/**
 * 实现一个累加函数的功能比如 sum(1,2,3)(2).valueOf()
 * 考察闭包，链式调用，原型链
 */
function sum(...arg) {
  // 先累加 sum 中的参数
  let result = 0
  arg.reduce((pre, cur) => {
    result += cur
  }, result)

  let addOther = function(...argAdd) {
    // 计算 add 中的参数
    argAdd.reduce((pre, cur) => {
      result += cur
    }, result)
    return addOther
  }

  addOther.valueOf = function() {
    console.log(result)
  }

  return addOther
}

sum(1,2,3)(2)(4).valueOf()