- 说说你的项目
- 谈谈杉杉小程序的项目
- 谈谈大转盘抽奖
- 说说 webpack  打包优化
- 从一个数组中拿到前三个最小的值
- 一道编程题

```
[1,2,3,1,2,4,1,3,2,1] [1,2] [3,4,5] =>[3,4,5,3,3,4,5,4,1,3,2,1]

能够使用的api：
1. 数组的长度获取。
2. 数组某个下标对应的数字。
3. 往数组里push元素。

[1,1,1,2]   [1,1,2]
```

```
// 大概思路，但是未调通
/**
 * Bigo 三面算法题 
 * [1,2,3,1,2,4,1,3,2,1] [1,2] [3,4,5] =>[3,4,5,3,3,4,5,4,1,3,2,1]

能够使用的api：
1. 数组的长度获取。
2. 数组某个下标对应的数字。
3. 往数组里push元素。

一个边界场景：
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
```