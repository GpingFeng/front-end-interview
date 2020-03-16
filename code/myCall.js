/**
 * 手动实现 call
 */
Function.prototype.myCall = function(context) {
    // 这个时候this的指向就是一个函数
    if (typeof this !== 'function') {
        throw new Error('error')
    }
    // 第一个参数就是上下文环境，假如没有传值，则默认为 window
    context = context || window
    // 指定一个 fn 属性，指向当前函数
    context.fn = this
    // 将参数剥离
    const args = [...arguments].slice(1)
    // 调用结果
    const result = context.fn(...args)
    delete context.fn
    return result
}