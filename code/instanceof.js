// instanceof 的原理实现
function newInstanceof (leftValue, rightValue) {
    // 取右表达式的 prototype
    let rightProto = rightValue.prototype;  
    // 取左表达式的 __proto__ 值
    let leftProto = leftValue.__proto__
    while(true) {
        // 终止条件
        if (leftProto === null) {
            return false
        }
        if (leftProto === rightProto) {
            return true
        }
        // 遍历原型链
        leftProto = leftProto.__proto__
    }
}