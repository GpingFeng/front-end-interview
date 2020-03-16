/**
 * @description new 的原理实现
 * 1.新生成一个对象
 * 2.链接到构造函数的原型对象上
 * 3.绑定this值
 * 4.返回对象
 * 
 * 入参说明：第一个是构造函数，之后的是构造函数的参数
 * 
 * 参考：https://github.com/KieSun/Dream/issues/2
 * https://github.com/mqyqingfeng/Blog/issues/13
 */
function create (ctr) {
    // 创建一个空对象
    let obj = new Object()
    // 链接到构造函数的原型对象中
    let Con = [].shift.call(arguments)
    obj.__proto__ = Con.prototype
    // 绑定this
    let result = Con.apply(obj, arguments);
    // 确保返回的是对象
    return typeof result === 'object'? result : obj;
}


function createNew(Con, ...args) {
    // 创建一个新对象
    let obj = {}
    // 将这个对象的原型指向这个构造函数的原型对象
    obj.__proto__ == Con.prototype
    // 将构造函数中的 this 指向到这个对象，并传递参数
    let result = Con.apply(obj, args)
    return result instanceof Object ? result : obj
}



/**
 * @description 验证信息
 */
function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

function objectFactory() {
    var obj = new Object(),
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    Constructor.apply(obj, arguments);
    return obj;
};

var person = objectFactory(Otaku, 'Kevin', '18')

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin