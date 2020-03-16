
f1('abc', 123, {b:3});  // 10, 1000s
f1('abc', 123, {b:3});  // 10, 1000s

function cache(f) {
  let objCache = {}
  return function () {
    // let curArgs = JSON.stringify(Array.form(arguments))
    let curArgs = ''
    // 这里使用深复制会好点
    for (let i = 0; i < arguments.length; i++) {
      if (Array.isArray(arguments[i])) {
        curArgs += arguments[i].join(',')
      } else if (typeof arguments[i] === 'object') {
        curArgs += JSON.stringify(arguments[i])
      } else {
        curArgs += arguments[i]
      }
    }

    // curArgs
    if (curArgs) {
      return objCache[curArgs]
    } else {
      objCache[curArgs] = f(curArgs)
      return objCache[curArgs]
    }
  }
}

f2 = cache(f1);
f2('abc', 123, {b:3});  // 10, 1000s
f2('abc', 888, {b:3});  // 10, 0s
