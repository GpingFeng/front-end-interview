function deepClone(obj) {
    function isObject(o) {
      return (typeof o === 'object' || typeof o === 'function') && o !== null
    }
  
    if (!isObject(obj)) {
      throw new Error('非对象')
    }
  
    let isArray = Array.isArray(obj)
    let newObj = isArray ? [...obj] : { ...obj }
    Reflect.ownKeys(newObj).forEach(key => {
      newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    })
  
    return newObj
  }
  
  let obj = {
    a: [1, 2, 3],
    b: {
      c: 2,
      d: 3
    }
  }
  let newObj = deepClone(obj)
  newObj.b.c = 1
  console.log(obj.b.c) // 2