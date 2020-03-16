/**
 * 判断是否回文
 */

function isPalindrome(str) {
  let newStr = str.split('').reverse().join('')
  return newStr === str
}

console.log(isPalindrome('121'))
console.log(isPalindrome('asdffdsa'))