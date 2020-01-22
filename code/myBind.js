Function.prototype.myApply = function(context) {
    // 这个时候this的指向就是一个函数
    if (typeof this !== 'function') {
        throw new Error('error')
    }
    // 第一个参数就是上下文环境，假如没有传值，则默认为 window
    context = context || window
    // 下面返回的是一个函数，所以 this 的指向可能会改变
    const _this = this
    // 取到相关的参数
    const args = [...arguments].slice(1)

    return function F() {
        // 中间可能有一些操作会改变 this 的指向
        if (this instanceof F) {
            // 注意这里的 arguments 跟上面的 arguments不一样
            return new _this(...args, ...arguments)
        }
        // 普通的方式
        return _this.apply(context, args.concat(...arguments))
    }
}