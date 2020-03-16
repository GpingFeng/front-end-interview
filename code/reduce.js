/**
 * 使用 reduce 方法实现 forEach、map、filter
 */
// forEach
function forEachUseReduce(arr, handler) {
  arr.reduce((pre, cur, index) => {
    handler(cur, index)
  })
}

// map
function mapUseReduce(arr, handler) {
  let result = []
  arr.reduce((pre, cur, index) => {
    result.push(handler(cur, index))
  })
  return result
}

// filter
function filterUseReduce(arr, handler) {
  let result = []
  arr.reduce((pre, cur, index) => {
    if (handler(cur, index)) {
      result.push(cur)
    }
  })
  return result
}