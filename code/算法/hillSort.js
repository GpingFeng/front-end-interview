/**
 * 希尔排序是把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；
 * 随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰被分成一组，算法便终止
 * 希尔排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(n^s) ，空间复杂度为 O(1) ，不是稳定排序。
 * 参考：https://www.cnblogs.com/chengxiao/p/6104371.html
 */
function hillSort(array) {

  let length = array.length;

  // 如果不是数组或者数组长度小于等于1，直接返回，不需要排序 
  if (!Array.isArray(array) || length <= 1) return;

  // 第一层确定增量的大小，每次增量的大小减半
  for (let gap = parseInt(length >> 1); gap >= 1; gap = parseInt(gap >> 1)) {

    // 对每个分组使用插入排序，相当于将插入排序的1换成了 n
    for (let i = gap; i < length; i++) {
      let temp = array[i];
      let j = i;

      while (j - gap >= 0 && array[j - gap] > temp) {
        array[j] = array[j - gap];
        j -= gap;
      }
      array[j] = temp;
    }
  }

  return array;
}