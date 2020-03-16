/**
 * 冒泡排序
 * 冒泡排序不需要额外空间，是本地排序
 * 相等元素是不会交换前后顺序，因而也是稳定排序
 * 时间复杂度 O(n^2)
 * 空间复杂度 O(n^2)
 * 适用于少量数据排序，但实际中用得不多
 */
 function bubbleSort(arr) {
   let len = arr.length
   for (let i = 0; i < len; i++) {
      for (let j = 0; j < len-i; j++) {
        if (arr[j] > arr[j+1]) {
          [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
        }
      }
   }
   return arr
 }

 // 测试
let arrTest  = [1,4,2,6,2,3,6,2,3,7,3]
let result = bubbleSort(arrTest)
console.log(result)