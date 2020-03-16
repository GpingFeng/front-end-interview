/**
 * 归并排序
 * 空间复杂度为O(n)
 * 不是本地排序，相等元素是不会交换前后顺序，因而是稳定排序
 * 时间复杂度为O(nlogn)，是比较优秀的算法，在面试题中出现的概率也很高
 * https://www.jianshu.com/p/33cffa1ce613
 */

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr
  }
  let m = Math.floor(arr.length/2)
  let leftArr = mergeSort(arr.slice(0, m))
  let rightArr = mergeSort(arr.slice(m))
  return merge(leftArr, rightArr)
}

function merge(leftArr, rightArr) {
  let result = [], i = 0, j = 0
  while(i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      result.push(leftArr[i])
      i++
    } else {
      result.push(rightArr[j])
      j++
    }
  }
  if (i < leftArr.length) {
    result.push(...leftArr.slice(i))
  } else {
    result.push(...rightArr.slice(j))
  }
  return result
}

  // 测试
  let arrTest  = [1,4,2,6,2,3,6,2,3,7,3]
  let result = mergeSort(arrTest)
  console.log(result)