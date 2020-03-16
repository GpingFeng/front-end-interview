/**
 * 插入排序
 * 插入排序不需要额外空间，是本地排序
 * 相等元素是不会交换前后顺序，因而也是稳定排序
 * 时间复杂度为O(n^2)，适用于少量数据排序
 */
function insertSort(arr) {
  for (let j = 1; j < arr.length; j++) {
    let i = j
    let target = arr[i]
    // 将所选项目往后移动。只有在下标大于0，而且大于目标的时候才将项目往后移动
    while(i > 0 && target < arr[i-1]) {
      arr[i] = arr[i-1]
      i--
    }
    arr[i] = target
  }
  return arr
}

 // 测试
 let arrTest  = [1,4,2,6,2,3,6,2,3,7,3]
 let result = insertSort(arrTest)
 console.log(result)