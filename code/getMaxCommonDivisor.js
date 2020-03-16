/**
 * 求最小公约数
 * 使用辗转相除法
 */
function getMaxCommonDivisor (a, b) {
  if (b === 0) {
    return a
  }
  return getMaxCommonDivisor(b, a%b)
}

console.log(getMaxCommonDivisor(10, 4))

/**
 * 求最小公倍数
 */

function getMinCommonMultiple(a, b) {
  return a*b/getMaxCommonDivisor(a,b)
}

console.log(getMinCommonMultiple(10, 4))