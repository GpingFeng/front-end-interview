/**
 * 实现一个 indexOf 方法
 */
function myIndexOf(arr, val) {
  if (!Array.isArray(arr)) {
    return ;
  }
  let len = arr.length
  let result = -1
  for (let i = 0; i < len; i++) {
    if (arr[i] === val) {
      result =  i
      break
    }
  }
  return result
}

console.log(myIndexOf([1,2,3,4,5], 4))