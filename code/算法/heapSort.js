/**
 * 堆排序
 * 　a.将无需序列构建成一个堆，根据升序降序需求选择大顶堆或小顶堆;[大顶堆是升序，小顶堆是降序]
 *　 b.将堆顶元素与末尾元素交换，将最大元素"沉"到数组末端;
 *　 c.重新调整结构，使其满足堆定义，然后继续交换堆顶元素与当前末尾元素，反复执行调整+交换步骤，直到整个序列有序。
 *  大顶堆：arr[i] >= arr[2i+1] && arr[i] >= arr[2i+2]  
 *  小顶堆：arr[i] <= arr[2i+1] && arr[i] <= arr[2i+2]  
 * 参考：https://www.cnblogs.com/chengxiao/p/6129630.html
 * 时间复杂度：最好：O(nlog2n)，最坏：O(nlog2n)，平均：O(nlog2n)。
 */
function heap(array) {
  if (!checkArray(array)) return
  // 将最大值交换到首位
  for (let i = 0; i < array.length; i++) {
    heapInsert(array, i);
  }
  let size = array.length;
  // 交换首位和末尾
  swap(array, 0, --size);
  while (size > 0) {
    heapify(array, 0, size);
    swap(array, 0, --size);
  }
  return array;
}

function heapInsert(array, index) {
  // 如果当前节点比父节点大，就交换
  while (array[index] > array[parseInt((index - 1) / 2)]) {
    swap(array, index, parseInt((index - 1) / 2));
    // 将索引变成父节点
    index = parseInt((index - 1) / 2);
  }
}
function heapify(array, index, size) {
  let left = index * 2 + 1;
  while (left < size) {
    // 判断左右节点大小
    let largest =
      left + 1 < size && array[left] < array[left + 1] ? left + 1 : left;
    // 判断子节点和父节点大小
    largest = array[index] < array[largest] ? largest : index;
    if (largest === index) break;
    swap(array, index, largest);
    index = largest;
    left = index * 2 + 1;
  }
}