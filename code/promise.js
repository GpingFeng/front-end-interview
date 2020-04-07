/**
 * 实现小型 Promise
 */
const PEDDING = 'pedding'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise (fn) {
    const that = this
    // 状态
    that.state = PEDDING
    // 存放 resolve 或者 reject 传入的值
    that.value = ''
    // resolve 后的回调函数
    that.resovedCallback = []
    // reject 后的回调函数
    that.rejectedCallback = []
    function resolve (value) {
        if (that.state === PEDDING) {
            that.state = RESOLVED
            that.value = value
            that.resovedCallback.map(callback => {
                callback(that.value)
            })
        }
    }
    
    function reject (value) {
        if (that.state === PEDDING) {
            that.state = REJECTED
            that.value = value
            that.rejectedCallback.map(callback => callback(that.value))
        }
    }

    try {
        // 传入 resolve 和 reject 的参数
        fn(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

MyPromise.prototype.then = function (onFullfilled, onRejected) {
    const that = this
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : e => {throw e}
    if (that.state === PEDDING) {
        that.resovedCallback.push(onFullfilled)
        that.rejectedCallback.push(onRejected)
    } else if (that.state === RESOLVED) {
        onFullfilled(that.value)
    } else if (that.state === REJECTED) {
        onRejected(that.value)
    }
}


new MyPromise((resolve, reject) => {
    setTimeout(() => {
        // resolve(1)
        reject('111')
    }, 0)
}).then(value => {
    console.log(value)
}, err => {
    console.error('err:', err)
})

console.log(3)