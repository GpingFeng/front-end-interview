const numbers = [1, [2, 3, [4, [5, 6]]], 7, [[8, [9]], 10]];

// 展平数组，去掉嵌套
function flatten(array) {
  return array.flat(Infinity)
  // let result = array.reduce((pre, curItem, arr) => {
  //   if (Array.isArray(curItem)) {
  //     return pre.concat(flatten(curItem))
  //   } else {
  //     return pre.concat(curItem)
  //   }
  // }, [])
  // return result
}

const result = flatten(numbers);
console.log(result); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]