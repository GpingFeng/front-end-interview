/**
 * Vue 简单实现
 */
class Vue {
  // Vue 构造类
  constructor (options) {
    this._data = options.data
    observer(this._data)
    // 新建一个 Watcher 观察者对象，这个时候 Dep.target 会指向这个 Watcher 对象
    new Watcher()
    // 模拟 render 的过程，触发 get 函数
    console.log('render~', this._data.name)
  }
}

// 订阅者 Dep，每个属性用一个 Dep 进行订阅
class Dep {
  constructor () {
    // 用来存放 Watcher 对象的数组
    this.subs = []
  }

  // 在 subs 中添加一个 Watcher 对象
  addSub (sub) {
    this.subs.push(sub)
  }

  // 通知所有的 Watcher 对象更新
  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

let uid = 0
// 观察者 Watcher，每一个属性可能会有多个 watcher
class Watcher {
  constructor () {
    // 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到
    Dep.target = this
    this.id = ++uid
  }

  update () {
    console.log('watch' + this.id + ' update')
    queueWatcher(this)
  }

  run () {
    console.log('watch' + this.id + '视图更新啦～')
  }
}

let has = {}
let queue = []
let waiting = false

function queueWatcher(watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    queue.push(watcher)

    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}

function flushSchedulerQueue () {
  let watcher, id

  for (let index = 0; index < queue.length; index++) {
    watcher = queue[index]
    id = watcher.id
    has[id] = null
    watcher.run()
  }

  waiting = false
}

// function viewCallBack() {
//   console.log('视图更新啦')
// }

// 使用 Object.defineProperty 对对象的各个属性进行监听
function defineReactive(obj, key, value) {
  // 每一个属性对应一个订阅者
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,   // 可枚举
    configurable: true, // 可以配置的
    get: function receiver () {
      // 将 Dep.target(也就是当前的 Watcher 对象存入 dep 的 subs)
      dep.addSub(Dep.target)
      return value
    },
    set: function setValue (newVal) {
      if (newVal === value) return
      // viewCallBack(newVal)
      // set 对象的时候，触发 dep 的 notify 方法更新所有的视图
      dep.notify()
    }
  })
}

// 进行依赖收集
function observer (data) {
  if (!data || (typeof data !== 'object')) {
    return
  }
  // 这里只遍历一层，实际上要递归遍历
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}

// 测试用例
let testVue = new Vue({
  data: {
    name: '前端大杂货铺'
  }
})

testVue._data.name = 'GpingFeng'
// console.log(testVue._data.name)
