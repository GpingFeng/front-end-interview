
// let entries = [{
//   province: '广东',
//   city: '广州市',
//   region: '番禺'
// }]

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


function changeData(entries, level) {
  let result = {}
  // 将不同级别放入不同 result 的属性中
  for (let key of level) {
    result[key] = []
    entries.forEach(function(item, index) {
      result[key].push({
        value: item[key],
        children: []
      })
    })
  }

  for (let key of level) {
    // 去重
    result[key] = [...new Set(result.key)] 
  }

  let lastResult = []

  let belongMap = {}


  // 构造从属关系
  level.forEach((item, index) => {
    // 第一层的数据
    if (index === 0) {
      lastResult = result[key]
    }

    // 
    entries.forEach()
    
  })
}


function my_print(n)
{
    for (var i = 0; i < n; i++) {
        console.log("-\n");
        my_print(n - 1);
    }
}

my_print(3);
my_print(n);

f(n) = n (1 + f(n-1))
       = n + n *(n-1) + n * (n-1) *(n-1) + ...+ n! = O(n!)




       function changeData(entries, level) {
        let result = {}
        // 将不同级别放入不同 result 的属性中
        for (let key of level) {
          result[key] = []
          entries.forEach(function(item, index) {
              value: item[key],
              children: []
            })
          })
        }
      
        for (let key of level) {
          // 去重
          result[key] = [...new Set(result.key)] 
        }
      
        let lastResult = []
      
        // 构造从属关系
        level.forEach((item, index) => {
          // 第一层的数据
          if (index === 0) {
            lastResult = result[key]
          }
      
          // entries.forEach()
          
        })
      }