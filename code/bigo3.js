/**
 * Bigo 三面算法题
 * [1,2,3,1,2,4,1,3,2,1] [1,2] [3,4,5] =>[3,4,5,3,3,4,5,4,1,3,2,1]

能够使用的api：
1. 数组的长度获取。
2. 数组某个下标对应的数字。
3. 往数组里push元素。

边界场景1：
[1,1,1,2]   [1,1,2]
 */

 function replace(arr1, arr2, arr3) {
  let result = []
  let arr1Len = arr1.length
  let arr2Len = arr2.length
  let arr3Len = arr3.length
  let tempResult = []
  let j = 0
  for(let i = 0; i < arr1Len; i++) {
    if (arr1[i] === arr2[j] && j < arr2Len) {
      j++
      tempResult.push(arr1[i])
    } else if (j === arr2Len) {
      j = 0
      for (let k = 0; k < arr3Len; k++) {
        result.push(arr3[k])
      }
      tempResult = []
    } else if (tempResult.length !== 0) {
      result.push(tempResult[0])
      j = 0;
      // 重置 i 的值，兼容边界场景边界场景1：
      i = i - tempResult.length + 1
      tempResult = []
    } else {
      result.push(arr1[i])
      j = 0
    }
  }
  return result
}

console.log(replace([1,2,3,1,2,4,1,3,2,1], [1,2], [3,4,5]))



