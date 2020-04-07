// 作者：白日梦201712091734936
// 链接：https://www.nowcoder.com/discuss/177482
// 来源：牛客网
// 发布订阅模式的实现
class EventEmitter {
    constructor () {
        this._eventpool = {};
    }
    on (event, callback) {
        this._eventpool[event] ? this._eventpool[event].push(callback) : this._eventpool[event] = [callback]
    }
    emit (event, ...args) {
        this._eventpool[event] && this._eventpool[event].forEach(cb => cb(...args))
    }
    off (event) {
        if (this._eventpool[event]) {
            delete this._eventpool[event]
        }
    }
    once (event, callback) {
        this.on(event, (...args) => {
            callback(...args)
            this.off(event)
        })
    }
}