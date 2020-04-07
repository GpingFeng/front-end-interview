function observe (value, vm) {
  if (!value || typeof value !== 'object') {
    return
  }

  let dep = new Dep()
  return new Proxy(value, {
    get: function (target, key, receiver) {
      if (Dep.target) {
        dep.depend()
      }
      return Reflect.get(target, key, receiver)
    },
    set: function (target, key, value, receiver) {
      dep.notify()
      return Reflect.set(target, key, value, receiver)
    }
  })
}

// 作者：小牧_QAQ
// 链接：https://juejin.im/post/5bffb361e51d451d4c1d3bb1
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。