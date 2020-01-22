class Vue {
  // Vue 构造类
  constructor (option) {
    this._data = option.data

  }
}

function viewCallBack() {
  console.log('视图更新啦')
}


// 使用 Object.defineProperty 对对象的各个属性进行监听
function defineObjProperty(obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: true,   // 可枚举
    configurable: true, // 可以配置的
    getter: () => {
      return value
    },
    setter: (newVal) => {
      if (newVal === value) return
      viewCallBack()
    }
  })
}

// 进行依赖收集
function observer (data) {
  if (!data || typeof(data) !== 'object') {
    return
  }
  // 这里只遍历一层，实际上要递归遍历
  Object.keys(data).forEach(key => {
    defineObjProperty(data, key)
  })
}

// 测试用例
let testVue = new Vue({
  data: {
    name: '前端大杂货铺'
  }
})


testVue._data.name = 'GpingFeng'
console.loog(testVue._data.name)