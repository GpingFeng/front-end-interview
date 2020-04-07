/**
 * 两个大整数相加
 */
function longNumAdd (num1, num2) {
  let numArr1 = num1.toString().split('').reverse()
  let numArr2 = num2.toString().split('').reverse()
  let maxLen = Math.max(numArr1.length, numArr2.length)
  console.log(numArr1, numArr2, maxLen)
  // 创建结果数组
  let resultArr = new Array(maxLen).fill(0)
  for (let i = 0; i < maxLen; i++) {
    numArr1[i] = Number(numArr1[i])
    numArr2[i] = Number(numArr2[i])
    numArr2[i] = Number(numArr2[i])
    let sum = numArr1[i] + numArr2[i] + resultArr[i]
    resultArr[i] = sum % 10
    // 如果需要进位
    if ((sum / 10) > 1) {
      resultArr[i+1] = 1
    }
  }
  // console.log(resultArr)
  console.log(resultArr.reverse().join(''))
}

longNumAdd(1234, 5678)