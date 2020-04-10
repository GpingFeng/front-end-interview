

1.传统的面向对象两个重要的概念：类和实例，类是定义了一类事物的公共行为和方法，实例是类的一个具体表现，JavaScript 不是面向对象的语言，而是基于对象的语言。面向对象有三个很重要的概念，继承、封装、多态

2.创建自定义的对象，用到原型（prototype），可以理解为一个模板，新创建的自定义的对象为这个模板的拷贝（其实是一个链接），下面是通过prototype创建自定义对象的一个例子

```js
function Person(name, sex) {     
    this.name = name;
    this.sex = sex;
}
// 定义 Person 的原型，原型中的属性可以被自定义对象引用
Person.prototype = {    
    getName:function() {		           
        return this.name;		       
    },       
    getSex:function() {	           
        return this.sex;
    }
}
```

可以看出，JavaScript 利用构造函数和原型的方式模拟实现了类的功能

3.在上面的自定义的对象的基础上

```js
var zhang = new Person("guangping","man")
```

执行这一句的时候内部做了以下的事情
- 创建一个空白对象
- 烤贝Person.prototypr中的属性到这个空对象上
- 将这个对象通过this关键字传递到构造函数并执行构造函数
- 将这个对象赋值给变量zhang

4.注意一点，就是 prototype 模板并不是被烤贝实例化的对象中的，而是一种链接的方式

5.下面一个例子是简单实现继承

```js
function  Employee(name, sex, employeeID) {
      this.name = name;
      this.sex = sex;   
      this.employeeID = employeeID;
}
// 将 Employee 的原型指向Person的一个实例
// 因为 Person 的实例可以调用 Person 原型中的方法, 所以 Employee 的实例也可以调用 Person 原型中的所有属性。

Employee.prototype =new Person();
Employee.prototype.getEmployeeID =function() {
    return  this.employeeID;
};
var  zhang =newEmployee("ZhangSan","man","1234"
);
console.log(zhang.getName());
// "ZhangSan
```

6.ECMAScript只支持实现继承，继承的方式有以下几种：
- 原型链
- 借用构造函数
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合式继承

7.原型链继承：

构造函数、原型和实例的关系：每个构造函数都会有一个原型对象，原型对象都有一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。确认原型和实例之间的关系使用instance

特点：
-很纯粹的继承关系，实例是子类的实例，也是父类的实例

-父类新增的原型方法/原型属性，子类都能访问到

-简单，易于实现

缺点：字面量重写原型会中断关系，使用引用类型的原型，并且子类型还无法给超类传递参数)]

