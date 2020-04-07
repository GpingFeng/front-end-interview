'use strict'

/**
 * 将一个没有层级的扁平对象,转换为树形结构({value, children})结构的对象
 * @param {array} tableData - 一个由对象构成的数组,里面的对象都是扁平的
 * @param {array} route - 一个由字符串构成的数组,字符串为前一数组中对象的key,最终
 * 输出的对象层级顺序为keys中字符串key的顺序
 * @return {array} 保存具有树形结构的对象
 */

var transObject = function(tableData, keys) {
  let hashTable = {}, res = []
  for( let i = 0; i < tableData.length; i++ ) {
    if(!hashTable[tableData[i][keys[0]]]) {
      let len = res.push({
        value: tableData[i][keys[0]],
        children: []
      })
      // 在这里要保存key对应的数组序号,不然还要涉及到查找
      hashTable[tableData[i][keys[0]]] = { $$pos: len - 1 }
    }
    if(!hashTable[tableData[i][keys[0]]][tableData[i][keys[1]]]) {
      let len = res[hashTable[tableData[i][keys[0]]].$$pos].children.push({
        value: tableData[i][keys[1]],
        children: []
      })
      hashTable[tableData[i][keys[0]]][tableData[i][keys[1]]] = { $$pos: len - 1 }
    }
    res[hashTable[tableData[i][keys[0]]].$$pos].children[hashTable[tableData[i][keys[0]]][tableData[i][keys[1]]].$$pos].children.push({
      value: tableData[i][keys[2]]
    })
  }
  return res
}

var data = [{
  "province": "浙江",
  "city": "杭州",
  "name": "西湖"
}, {
  "province": "四川",
  "city": "成都",
  "name": "锦里"
}, {
  "province": "四川",
  "city": "成都",
  "name": "方所"
}, {
  "province": "四川",
  "city": "阿坝",
  "name": "九寨沟"
}]

var keys = ['province', 'city', 'name']

console.log(transObject(data, keys))