/**
 * 快速排序
 * 时间复杂度和空间复杂福均为 O(nlogn)
 * 相等元素是不会交换前后顺序，因而是稳定排序（这与我们选择最后一个元素为分界点有关）
 */
function quickSort(arr) {
  // 当只有一个元素的时候，退出递归
  if (arr.length < 2) {
    return arr
  }
  // 数组分成三部分left、pivot、right，使left<=pivot，right>pivot
  let point = arr[arr.length-1]
  let leftArr = arr.filter((item, index) => item <= point && index !== (arr.length-1))
  let rightArr = arr.filter((item, index) => item > point)
  // 递归处理left
  // 递归处理right
  return [...quickSort(leftArr), point, ...quickSort(rightArr)]
}

// 测试
let arrTest  = [1,4,2,6,2,3,6,2,3,7,3]
let result = quickSort(arrTest)
console.log(result)