function one (arr) {
  let result = 0
  for(let i = 0; i < arr.length; i++) {
    result = result^arr[i]
  }
  return result
}

console.log(one([1,3,1,3,2]))



function two (arr) {
  let result = {}
  for(let i = 0; i < arr.length; i++) {
    if (!result[arr[i]]) {
      result[arr[i]] = 1
    } else {
      // result[arr[i]]++
      delete result[[arr[i]]]
    }
  }
  return Object.keys(result)[0]
}

console.log(two([1,3,1,3,2]))


function three (array) {
  return array.filter(item => array.indexOf(item) === array.lastIndexOf(item))[0]
}

console.log(three([1,3,1,3,2]))