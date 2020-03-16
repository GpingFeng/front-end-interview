/**
 * 继承的实现
 * 组合继承和寄生组合继承
 */
function Parent (value) {
    this.val = value
}

Parent.prototype.getValue = function () {
    console.log(this.val)
}

function Child (value) {
    // 继承父类的属性
    Parent.call(this, value)
}

// 继承父类的方法
// Child.prototype = new Parent();

// 寄生组合继承
Child.prototype = Object.create(Parent.prototype, {
    constructor: {
        value: Child,
        enumerable: false,
        writable: true,
        configurable: true
    }
})

const child = new Child(1);
child.getValue();
child instanceof Parent


