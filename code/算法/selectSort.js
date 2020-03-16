/** 
 * 选择排序
 * 选择排序不需要额外空间，是本地排序，相等元素是不会交换前后顺序，因而也是稳定排序
 * 时间复杂度为O(n^2)，适用于少量数据排序
 * 实际中运用不多
 */
 function selectSort(arr) {
   for (let j = 0; j < arr.length; j++) {
    // 最小的下标
    let minIndex = j
    for (let i = j+1; i < arr.length; i++) {
      // 找到比最小的更小，则交换下标
      if (arr[i] < arr[minIndex]) {
        minIndex = i
      }
    }
    if (minIndex !== j) {
      [arr[j], arr[minIndex]]= [arr[minIndex], arr[j]]
    }
   }
   return arr
 }

  // 测试
  let arrTest  = [1,4,2,6,2,3,6,2,3,7,3]
  let result = selectSort(arrTest)
  console.log(result)