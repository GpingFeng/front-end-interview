## 题目
给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]

## 题目分析

算法流程图分析：

![](https://upload-images.jianshu.io/upload_images/1784460-509f77efd6aa1402.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 代码实现

```
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  nums.sort((a,b) => a - b);
  let len = nums.length;
  let result = []
  let L, R
  for (let i = 0; i < len; i++) {
    numsFirst = nums[i];
    //  如果排序后的第一个数大于0 则结束
    if (numsFirst > 0) {
      break;
    }
    if (i > 0 && nums[i] === nums[i-1]) continue; //  去重
    L = i + 1;
    R = len -1;
    while(L < R) {
      numsL = nums[L];
      numsR = nums[R];
      sum = numsFirst + numsL + numsR;
      if (sum === 0) {
        result.push([numsFirst, numsL, numsR]);
        while (numsL === nums[L+1]) {
          L++;
        }
        while (numsR === nums[R-1]) {
          R--;
        }
        L++;
        R--;
      // 当sum小于0的时候，则是L++
      } else if (sum < 0) {
        L++;
      } else {
        R--;
      }
    }
  }
  return result
};
```

## 知识点分析

**数组排序**

正序排序如下
```
nums.sort((a,b) => a - b);
```

**while 语句**

在某个条件表达式为真的前提下，循环执行指定的一段代码，直到那个表达式不为真结束循环

```
var n = 0;

while (n < 3) {
  n++;
}

console.log(n);
// expected output: 3
```

**for循环中的break和continue**
