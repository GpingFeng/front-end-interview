/**
 * 深复制实现
 */
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === "object" || typeof o === "function") && o !== null;
  }

  if (!isObject(obj)) {
    throw new Error("非对象");
  }

  let isArray = Array.isArray(obj);
  let newObj = isArray ? [...obj] : { ...obj };
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
  });

  return newObj;
}

let obj = {
  a: [1, 2, 3],
  b: {
    c: 2,
    d: 3
  }
};
let newObj = deepClone(obj);
newObj.b.c = 1;
console.log(obj.b.c); // 2

let newObj1 = clone(obj);
newObj1.b.c = 1;
console.log(obj.b.c); // 2

// todo: 实现一个深度克隆方法。需要支持 对象、数组、数字、字符串、布尔值  null
function clone(data) {
  // let result = {};
  function isObject(data) {
    if (
      (typeof data === "object" || typeof data === "function") &&
      data !== null
    ) {
      return true
    } else {
      return false
    }
  }

  // if (Array.isArray(data)) {
  //   result = [...data];
  // }
  let isArray = Array.isArray(obj);
  let result = isArray ? [...obj] : { ...obj };

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (isObject(data[key])) {
        result[key] = clone(data[key]);
      } else {
        result[key] = data[key];
      }
    }
  }

  return result;
}
