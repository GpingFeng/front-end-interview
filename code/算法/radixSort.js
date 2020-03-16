/**
 * @description 基数排序
 * 基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。
 * 最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。
 * 动画：https://www.cnblogs.com/onepixel/p/7674659.html
 * 基数排序的平均时间复杂度为 O(nk)，k 为最大元素的长度，最坏时间复杂度为 O(nk)，空间复杂度为 O(n) ，是稳定 排序。
 */
function radixSort(array) {

  let length = array.length;

  // 如果不是数组或者数组长度小于等于1，直接返回，不需要排序 
  if (!Array.isArray(array) || length <= 1) return;

  let bucket = [],
    max = array[0],
    loop;

  // 确定排序数组中的最大值
  for (let i = 1; i < length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }

  // 确定最大值的位数
  loop = (max + '').length;


  // 初始化桶
  for (let i = 0; i < 10; i++) {
    bucket[i] = [];
  }

  for (let i = 0; i < loop; i++) {
    for (let j = 0; j < length; j++) {
      let str = array[j] + '';

      if (str.length >= i + 1) {
        let k = parseInt(str[str.length - 1 - i]); // 获取当前位的值，作为插入的索引
        bucket[k].push(array[j]);
      } else {
        // 处理位数不够的情况，高位默认为 0
        bucket[0].push(array[j]);
      }
    }

    array.splice(0, length); // 清空旧的数组

    // 使用桶重新初始化数组
    for (let i = 0; i < 10; i++) {
      let t = bucket[i].length;

      for (let j = 0; j < t; j++) {
        array.push(bucket[i][j]);
      }

      bucket[i] = [];
    }
  }

  return array;

}