/**
 * 手动实现 apply
 */
Function.prototype.myApply = function(context) {
    // 这个时候this的指向就是一个函数
    if (typeof this !== 'function') {
        throw new Error('error')
    }
    // 第一个参数就是上下文环境，假如没有传值，则默认为 window
    context = context || window
    // 指定一个 fn 属性，指向当前函数
    context.fn = this
    let result
    // 处理参数，假如有传入参数，传入的是一个数组
    if (arguments[1]) {
        result = context.fn(arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}