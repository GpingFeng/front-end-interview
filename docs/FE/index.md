# 前端

## JS 基础知识点以及常考面试题（1）

### 原始（primitive）类型

- 有哪些

	- null
	- undefined
	- boolean
	- number
	- string
	- symbol
		- 表示独一无二的值

			- 通过 Symbol 函数生成

		- 接收一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示
		- 应用场景

			- 对象中保证不同的属性名

				- 注意：使用 Symbol 值定义属性的时候，必须放在方括号中
				- 读取的时候也是不能使用点运算符

			- 定义一组常量，保证这组常量都是不相等的
			- 使用 Symbol 定义类的私有属性/方法（？？？）
			- Vue 中的 project 和 inject

		- 注意属性名的遍历

			- 遍历对象的时候，该属性不会出现在 for...in...、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回
			- 可以通过 Object. getOwnPropertySymbols()

		- Symbol.hasInstance

			- 指向一个内部方法。当其他对象使用 instanceof 运算符，判断是否为该对象的实例的时候，会调用这个方法
			- 比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance]\(foo\)，有点类似劫持了 instanceof 方法

```js
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}
[1, 2, 3] instanceof new MyClass() // true
```

- 原始类型没有任何的函数方法可以调用
- number

	- 0.1+0.2!==0.3

		- https://juejin.im/post/5b90e00e6fb9a05cf9080dff
		- http://www.runoob.com/w3cnote/decimal-decimals-are-converted-to-binary-fractions.html

- 为什么不使用 var

	- 存在变量提升
	- 语义性更强

参考：
- http://es6.ruanyifeng.com/#docs/symbol

### typeof null 输出 object

- 在 JS 的最初版本中，为了性能考虑，使用低位存储变量的类型信息，000开头表示对象，然而 null 代表全 0，所以将它错误判断为对象

### 函数参数是对象会发生什么问题？

- 引用传递
- 记得如果换了指针地址，其实是不会影响另外一个的

var a = {name: 'Gping'}
var b = a
b = {age: 12}

以上两个对象已经指向了不同的地址

### typeof 和 instanceof

- instanceof 原理

	- 通过原型链来判断的

		- 注意是针对对象

	- 原理实现

		- 参考：https://juejin.im/post/5b0b9b9051882515773ae714

- Object.prototype.toString.call

### 类型转换

- 转 Boolean

	- 除了 undefined， null， false， NaN， ''， 0， -0，其他所有值都转为 true，包括所有对象

- ToPrimitive

	- JS 引擎内部的抽象操作 ToPrimitive

		- ToPrimitive(input, PreferredType?)

			- input 为需要转换的值
			- PreferredType 为可选参数，Number 或者 String 类型
			- PreferredType没有设置时，Date类型的对象，PreferredType默认设置为String，其他类型对象PreferredType默认设置为Number

- valueOf
- 对象转原始类型

	- 原本为原始类型，不再需要转换
	- 需要转换字符串

		- 调用 toString() ，转换为基础类型的话就返回转换的值

	- 需要转换非字符串

		- 调用 x.valueOf()，如果转换为基础类型，就返回转换的值
		- 结果不是基础类型的话再调用 toString

	- 如果都没有返回原始类型，就会报错
	- Symbol.toPrimitive

		- let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  },
  [Symbol.toPrimitive]() {
    return 2
  }
}
1 + a // => 3

- 四则运算符

	- 加法

		- 运算中其中一方为字符串，那么就会把另一方也转换为字符串
		- 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串
		- 4 + [1,2,3] // "41,2,3"
疑问：为什么先调用了 toString() 方法

			- 数组是对象类型 使用valueOf转换后还是数组。 然后使用toString() 转换为字符串 是原始类型 所以停止转换

		- 'a' + + 'b'

			- 因为加 'b' 是 NaN
			- 疑问：为什么先执行的是后面的呢？

				- 如果是字符串拼接的话，则为一元加法，调用顺序是从右往左，如果是普通运算的话，为加法，从左到右

					- 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

			- 你可能也会在一些代码中看到过 + '1' 的形式来快速获取 number 类型

	- 非加法

		- 只要其中一方是数字，那么另一方就会被转为数字

- 比较运算符

	- 对象

		- 调用 toPrimitive 转换对象

	- 字符串

		- Unicode 字符串索引来比较

- 要记得类型转换表格（死记）

	- 参考：https://juejin.im/book/5bdc715fe51d454e755f75ef/section/5bdc715f6fb9a049c15ea4e0

- 参考：
https://juejin.im/post/5a7172d9f265da3e3245cbca

https://juejin.im/post/5bc5c752f265da0a9a399a62

### this

- 如何正确判断 this?
- 箭头函数的 this 指向是什么？

	- 箭头函数中的 this 只取决于包裹箭头函数的第一个普通函数的 this
	- 对于箭头函数使用 bind 是无效的

- 构造函数 new 出来的实例，this 永远指向该实例
- 多次 bind 会是什么？

	- let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // => ?

		- // fn.bind().bind(a) 等于
let fn2 = function fn1() {
  return function() {
    return fn.apply()
  }.apply(a)
}
fn2()

	- 不管我们 bind 多少次，this 的指向都是由第一次 bind 决定的

- 优先级

	- new 的方式优先级最高，接下来是 bind 这些函数，然后是 obj.foo() 这种调用方式，最后是 foo 这种调用方式，同时，箭头函数的 this 一旦被绑定，就不会再被任何方式所改变

## JS 基础知识点及常考面试题（2）

### == VS ===

- ==

	- 判断流程

		- 判断类型是否相同，相同的话就是比较大小了
		- 类型不同，进行类型转换
		- 是否在对比 null 和 undefined

			- 是返回true

		- 是否为 string 和 number 

			- 是的话将 string 转为 number

		- 判断一方是否为 boolean

			- 将 boolean 转换为 number 类型

		- 判断一方是否为 Object ，而且另一方是 string、number 或者 symbol

			- 将 Object 转换成原始类型

		- 隐式类型转换判断神器

			- https://felix-kling.de/js-loose-comparison/

		- 详细的标准

			- https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.1

		- new String("a") == new String("a")

### 闭包

- 概念

	- 该函数可以访问它被创建时候所处的上下文环境《JavaScript 语言精粹》
	- 闭包是指有权访问另一个函数作用域中的变量的函数 ---- 《JavaScript 高级程序设计》
	- 函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包

- 循环中使用闭包解决 var 定义函数的问题

	- 原题：for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}

都是输出6，注意边界
	- 闭包

		- for (var i = 1; i <= 5; i++) {
    (function (j) {
        setTimeout(function timer() {
        console.log(j)
      }, i * 1000)
    })(i)
}


	- setTimeout 第三个参数

		- setTimeout 第三个参数以及之后的参数，会作为timer 的传参

	- let 定义 i

		- for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i)
}

### 深浅拷贝

- 浅拷贝

	- 复制了一层对象的属性，并不包括对象里面的为引用类型的数据
	- Object.assign

		- let a = {
    person: {
        age: 1
    }
}

let b = Object.assign({}, a)
a.person.age = 2

b.person

	- 展开运算符 ...
	- 数组中两个特殊的方法

		- slice
		- concat

	- 浅拷贝只解决了一层的问题

- 深拷贝

	- JSON.parse(JSON.stringify(object))

		- 忽略 undefined
		- 会忽略 symbol
		- 不能序列化函数
		- 不能解决循环引用的对象
		- 例子：let a = {
  age: undefined,
  sex: Symbol('male'),
  jobs: function() {},
  name: 'yck'
}
let b = JSON.parse(JSON.stringify(a))
console.log(b) // {name: "yck"}

	- 自己实现深拷贝
	- lodash 的深拷贝

		- _.cloneDeep

- 浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象
- 参考：
https://juejin.im/post/5b5dcf8351882519790c9a2e

https://juejin.im/post/5b5dcf8351882519790c9a2e
- 浅拷贝和赋值的区别

### 原型

- __proto__

	- 原型对象
	- 浏览器在早期为了让我们访问到内部属性[[prototype]]
	- 每个对象都有的隐式原型属性
	- 指向了创建该对象的构造函数的原型

- prototype

	- 显示原型属性，只有函数才拥有该属性，基本所有的函数都有该属性

		- 例外：let fun = Function.prototype.bind()

			- Function.prototype 是引擎创建出来的，引擎并没有给它添加原型属性

	- 值为一个对象（原型对象）

- 原型对象的 constructor 属性

	- 指向构造函数，然后构造函数又通过 prototype 属性指回原型
	- 不可枚举的属性
	- 作用

		- 让实例知道是什么函数构造了它
		- 想给某些类库中的构造函数增加一些自定义的方法，就可以通过 xx.constructor.method 来扩展

- 对于实例对象来讲，其实都是 new 产生的，无论是 function Foo() 还是 let a = { b : 1 }

	- function Foo() {}
// function 就是个语法糖
// 内部等同于 new Function()
let a = { b: 1 }
// 这个字面量内部也是使用了 new Object()
	- 更加推荐字面量的写法，因为如果使用 new Object 的方式，需要通过作用域链一层层的找到 Object

- Function.__proto__ === Function.prototype

	- Object.prototype 和 Function.prototype 都是引擎创建的，并且通过 __proto__ 将它们联系了起来
	- Function.prototype 并不是一个对象，而是一个函数
	- 所以我们又可以得出一个结论，不是所有函数都是 new Function() 产生的。

- 小结

	- Object 是所有对象的爸爸，所有对象都可以通过 __proto__ 找到它
	- Function 是所有函数的爸爸，所有函数都可以通过 __proto__ 找到它
	- Function.prototype 和 Object.prototype 是两个特殊的对象，他们由引擎来创建
	- 除了以上两个特殊对象，其他对象都是通过构造器 new 出来的
	- 函数的 prototype 是一个对象，也就是原型
	- 对象的 __proto__ 指向原型， __proto__ 将对象和原型连接起来组成了原型链

- 参考：https://github.com/KieSun/Dream/issues/2

## ES6 知识点以及常考面试题

### var、let 和 const 的区别

- 提升

	- 为什么要存在提升？

		- 根本原因是为了解决函数相互调用的问题

- 函数优先提升
- let、const 声明的变量不会挂载在 window 上
- 暂时性死区

### 原型继承和 Class 继承

- class

	- 在 JS 中不存在类，class 只是语法糖，本质还是函数

- 组合继承

	- 原型 .prototype 和 new 构造函数的方式去继承
	- Parent.call(this) 继承父类的属性
	- 改变子类的原型为 new Parent() 来继承父类的函数
	- 缺点：继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，造成内存浪费

- 寄生组合继承

	- 组合继承的缺点在于继承父类函数时候调用了构造函数
	- 核心代码

		- Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

	- 将父类的原型赋值给了子类，并且将构造函数设置为子类

		- 解决了继承无用父类属性，而且还能正确找到子类的构造函数

- Class 继承

	- 核心代码

		- class Child extends Parent {
  constructor(value) {
    super(value)
  }
}
let child = new Child(1)

	- extends

		- 表明继承的是哪个类

	- 子类构造函数中必须调用 super

		- 可以看成 Parent.call(this, value)

### 模块化

- 为什么要使用模块化

	- 解决命名冲突
	- 提供复用性
	- 提高代码可维护性

- 立即执行函数

	- (function(globalVariable){
   globalVariable.test = function() {}
   // ... 声明各种变量、函数都不会污染全局作用域
})(globalVariable)

		- 其实利用的还是函数作用域

- AMD 和 CMD

	- 现在用得较少
	- AMD

		- // AMD
define(['./a', './b'], function(a, b) {
  // 加载模块完毕可以使用
  a.do()
  b.do()
})

	- CMD

		- // CMD
define(function(require, exports, module) {
  // 加载模块
  // 可以把 require 写在函数体的任意地方实现延迟加载
  var a = require('./a')
  a.doSomething()
})

- CommonJS

	- module.exports = {
a:1
}
	- exports a = 1
	- require（这里还是有所疑惑？？？？）
	- 浏览器加载 Common JS 模块的原理与实现

		- https://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html

	- webpack 模块化原理 CommonJS

		- https://segmentfault.com/a/1190000010349749

- UMD

	- 兼容 AMD，CommonJS模块化语法

- webpack(require.ensure)

	- webpack 2.x 版本中的代码分割。

- ES module(ES6 引入的模块化)

	- 与 CommonJS 区别

		- CommonJS支持动态导入

			- 也就是 require(${path}/xx.js)

		- CommonJS是同步导入（用于服务端，文件在本地，同步导入即使卡住主线程影响也不大），ES module 是异步导入的（运用于浏览器，需要下载文件）???
		- CommonJS在导出的时候是值拷贝。而 ES module 采用的是实时绑定的方式，导入导出都指向了同一个内存地址
		- ES Module 会编译成 require/exports 来执行的？？？（ES6 静态编译，CommonJS 运行时加载）

			- ESmodule 是编译时候输出接口，CommonJS 模块是运行时加载
			- https://zhuanlan.zhihu.com/p/33843378

	- export
import

- 参考：
http://es6.ruanyifeng.com/#docs/module-loader

### map,filter,reduce

- reduce

	- 参数分别为回调函数和初始值
	- 回调函数参数

		- 累计值，当前元素，索引值，原数组

- map

	- ['1','2','3'].map(parseInt)

### Proxy

- 参考：http://es6.ruanyifeng.com/#docs/proxy
- 拦截在目标对象之前架设一层”拦截“
- 参数

	- target对象
	- handler 配置对象

		- 一共有十三个
		- get 

			- 拦截对象属性的读取，如proxy.foo和proxy['foo']

				- 参数：目标对象、属性名以及proxy本身
				- 如果访问的目标属性不存在，则会报错，但是如果不做这一层的代理的话，反而只是undefined
				- get 方法是可以继承的
				- get 方法第三个参数

					- 总是指向原始的读操作所在的那个对象，一般情况下是proxy实例

		- set

			- 拦截对象属性的设置

				- 参数

					- 目标对象，属性名，属性值，proxy本身
					- 应用：用于校验

- 简易版本的 Vue 实现

	- Proxy 无需层层递归地为每一层添加代理，一次性即可完成以上的操作，性能上更好
	- 缺：兼容性方面较弱

## JS 异步编程及常考面试题

### 并发（concurrency）和并行（parallelism）的区别

- 并发是宏观概念，我分别有任务 A 和任务 B，在一段时间内通过任务间的切换完成了这两个任务，这种情况就可以称之为并发。
- 并行是微观概念，假设 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。同时完成多个任务的情况就可以称之为并行。

### 回调函数（callback）

- 回调地狱

	- 嵌套函数存在耦合性
	- 嵌套函数越多，处理错误就越难

- try...catch...捕获不了回调函数

	- 回调函数被异步调用时，外层try中的代码其实已经执行完了，栈帧已经从执行栈中弹出。回调函数的栈帧被放入时，执行栈是空的
	- 参考：https://segmentfault.com/a/1190000013635623

### generator

- 迭代器
- 重要语法

	- *
	- yield

### Promise

- 三个状态

	- pending(等待中)
	- 完成（resolved）
	- 拒绝（reject）

- 一旦从等待状态变成为其他状态就永远不能更改状态了
- 当我们在构造 Promise 的时候，构造函数内部的代码是立即执行的
- Promise 实现了链式调用，也就是每次调用 Promise 返回的都是一个 Promise

	- 如果你在 Promise 中使用了 return，结果也会被 Promise.resolve() 包装

- 缺点：

	- 无法取消 Promise
	- 错误需要通过回调函数捕获

### async 和 await

- 一个函数如果加上 async ，那么该函数就会返回一个 Promise
- async 就是将函数返回值使用 Promise.resolve() 包裹了下
- async 和 await 可以说是异步终极解决方案了，相比直接使用 Promise 来说，优势在于处理 then 的调用链，能够更清晰准确的写出代码

	- 更加优雅的解决异步调用的方式

- 一个例子

	- let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
}
b()
a++
console.log('1', a) // -> '1' 1
	- 因为 await 内部实现了 generator ，generator 会保留堆栈中东西，所以这时候 a = 0 被保存了下来

- 缺点：

	- 因为 await 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低

### 常用定时器函数

- setTimeout

	- 因为 JS 是单线程执行的，如果前面的代码影响了性能，就会导致 setTimeout 不会按期执行

- setInterval

	- 第一，它和 setTimeout 一样，不能保证在预期的时间执行任务。第二，它存在执行累积的问题

- requestAnimationFrame

	- 参考：https://javascript.ruanyifeng.com/htmlapi/requestanimationframe.html
	- requestAnimationFrame是浏览器用于定时循环操作的一个接口，类似于setTimeout，主要用途是按帧对网页进行重绘
	- 设置这个API的目的是为了让各种网页动画效果（DOM动画、Canvas动画、SVG动画、WebGL动画）能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果

## 手写 Promise

## Event Loop

### 进程和线程

- 进程

	- 进程描述了 CPU 在运行指令以及加载和保存上下文所需要的时间
	- 放在应用上来讲就是代表了一个程序

- 线程

	- 是进程中更小单位
	- 描述了执行一段指令所需要的时间

### 执行栈

- 什么是执行栈

	- 栈
	- 报错信息
	- 递归，导致栈溢出

### 浏览器中的 Event Loop

- 执行 JS 代码的时候其实就是往执行栈中放入函数
- 一旦执行栈为空，EventLoop 就会从 Task 中拿出需要执行的代码并放入栈中执行
- Task

	- 微任务（microtask）

		- 很多人以为await会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上await是一个让出线程的标志。await后面的函数会先执行一遍，然后就会跳出整个async函数来执行后面js栈（后面会详述）的代码

			- 参考：https://segmentfault.com/a/1190000011296839

		- Promise
		- mutation observer
		- process.nextTick

	- 宏任务（macrotask）

		- setTimeout
		- setInterval
		- xhr
		- script
		- I/O
		- UI rendering

	- 执行顺序

		- 首先执行同步代码，这属于宏任务
		- 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
		- 执行所有微任务
		- 当执行完所有微任务后，如有必要会渲染页面
		- 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数

### Node 中的 Event Loop

- 6个阶段

	- timers

		- 会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。

	- I/O

		- 会处理一些上一轮循环中少数未执行的I/O 回调

	- idle，prepare
	- poll

		- 1.回到 timer 阶段执行回调
		- 2.执行 I/O 回调
		- 并且在进入该阶段时如果没有设定了 timer 的话，会发生以下两件事情

			- 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
			- 如果 poll 队列为空时，会有两件事发生

				- 如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
				- 如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去

	- check

		- 执行 setImmediate

	- close callbacks

- 按照顺序反复执行
- 每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行
- 当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段

## JavaScript进阶知识点以及常考面试题

### 手写 call、apply 及 bind 函数

### new

- 创建过程

	- 创建一个新的对象
	- 链接到原型
	- 绑定this
	- 返回对象

### instanceof 的原理

### 为什么 0.1 + 0.2 != 0.3

- 产生的原因

	- JS 采用的浮点标准会裁掉我们的数字
	- 导致精度缺失的问题

- 小数转成2进制

	- 乘2取整

- 解决方法

	- toFixed
	- 先乘后除
	- 一些库

### 垃圾回收机制

- 新生代算法
- 老生代算法

	- 标记清除算法
	- 标记压缩算法

## JS 思考

### JS 分为哪两大类型？都有什么各自的特点？你该如何判断正确的类型？

- instanceof 不一定是准确的???

	- 比如一个数组，它可以被判定为 Object

### 思考题二：你理解的原型是什么？

### 思考题三：bind、call 和 apply 各自有什么区别？

### 思考题四：ES6 中有使用过什么？

### 思考题五：JS 是如何运行的？

## DevTools Tips

## 浏览器基础知识点以及常考面试题

### 跨域

- 浏览器出于安全考虑，有同源策略。也就是说，如果协议、域名或者端口有一个不同就是跨域
- Ajax 请求会失败
- 为了防止 CSRF 攻击

	- 是利用用户的登录态发起恶意请求

- 解决方法

	- JSONP

		- 利用 <script> 标签没有跨域限制的漏洞，通过 <script> 标签指向一个需要访问的地址并提供一个回调函数来接收数据当需要通讯时
		- 只限于 get 请求
		- 基础实现

	- CORS

		- 需要浏览器和后端同时支持
		- 服务端设置 Access-Control-Allow-Origin 就可以开启 CORS
		- 简单请求

			- 使用 GET、HEAD、POST 方法之一
			- Content-Type

				- text/plain
				- multipart/form-data
				- application/x-www-form-urlencoded

		- 复杂请求

			- 预检请求

				- 通过该请求来知道服务端是否允许跨域
				- option 方法

	- document.domain

		- 该方式只能用于二级域名相同的情况下，比如a.test.com 和 b.test.com
		- 只需要给页面添加 document.domain = 'test.com'

	- postMessage

		- 通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息

### 存储

- cookie、localStorage、sessionStorage、indexDB

	- 数据生命周期	
	- 数据存储大小
	- 与服务器端通信

- cookie 要注意安全

	- 对值进行加密

		- value

	- http-only 不能通过 JS 访问 cookie，减少 XSS 攻击

		- http-only

	- secure

		- 只能在协议为 HTTPS 的请求中携带

	- same-site

		- 规定浏览器不能再跨域的请求中携带cookie，减少 CSRF 攻击

### Service Worker

- SW 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能
- 传输协议必须为 HTTPS
- 三个步骤

	- 首先需要先注册 Service Worker
	- 然后监听到 install 事件以后就可以缓存需要的文件
	- 那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据

### 事件机制

- 事件触发三个阶段

	- 事件捕获
	- 传播到事件触发处触发注册的事件
	- 事件冒泡

- 注册事件：addEventListener 

	- 第三个参数 useCapture 默认为 false ，也就是默认使用冒泡机制

		- 可以使用 stopPropagation 阻止事件冒泡
		- stopImmediatePropagation 同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件

- 事件代理

	- 节省内存
	- 不需要给子节点注销事件

## 浏览器缓存机制

### 缓存位置

- Service  Worker

	- 自由控制缓存哪些文件
	- 缓存是持续性的
	- 不管我们是从 Memory Cache 中还是从网络请求中获取的数据，浏览器都会显示我们是从 Service Worker 中获取的内容

- Memory Cache

	- 内存中的缓存，读取内存中的数据肯定比磁盘中快
	- 但是内存缓存虽然读取高效，可是缓存持续性很短，会随着进程的释放而释放

		- 一旦关闭 tab 页面，内存的缓存就被释放了
		- 计算机中的内存一定比硬盘容量小得多，操作系统需要精打细算内存的使用，所以能让我们使用的内存必然不多

- Disk Cache

	- 存储在硬盘中的缓存，读取速度慢点
	- 容量大
	- 它会根据 HTTP Herder 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求

- push Cache

	- Push Cache 是 HTTP/2 中的内容，当以上三种缓存都没有命中时，它才会被使用
	- 并且缓存时间也很短暂，只在会话（Session）中存在，一旦会话结束就被释放。

- 网络请求

### 缓存策略

- 强缓存

	- Expires

		- Expires: Wed, 22 Oct 2018 08:41:00 GMT
		- 受限于本地时间，如果修改了本地时间，则有可能造成缓存失效

	- Cache-control

		- 多个指令
		- Cache-control: max-age=30
		- 常见指令

			- max-age=30

				- 30s后重新请求

			- public

				- 表示响应可以被客户端和代理服务器缓存

			- private

				- 响应只可以被客户端缓存

			- no-store

				- 不缓存任何响应

			- no-cache

				- 资源被缓存，但是立即失效，下次发起请求验证资源是否过期

- 协商缓存

	- Last-Modified和if-Modified-SInce

		- Last-Modified 表示本地文件最后修改日期，If-Modified-Since 会将 Last-Modified 的值发送给服务器，询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来，否则返回 304 状态码
		- 缺点

			- 不管有没有修改都会认为是修改

	- Etag和If-None-Match

		- HTTP/1.1
		- ETag 类似于文件指纹，If-None-Match 会将当前 ETag 发送给服务器，询问该资源 ETag 是否变动，有变动的话就将新的资源发送回来
		- ETag 优先级比 Last-Modified 高

### 实际场景应用缓存策略

- 频繁变动的资源

	- 对于频繁变动的资源，首先需要使用 Cache-Control: no-cache 使浏览器每次都请求服务器
	- 然后配合 ETag 或者 Last-Modified 来验证资源是否有效

- 代码文件

	- 这里的代码文件特指除HTML以外的文件，因为HTML文件一般不缓存或者缓存时间 比较短
	- 一般我们打包出来的文件都带有hash值
	- 给代码文件设置缓存有效期一年 Cache-Control: max-age=31536000，这样只有当 HTML 文件中引入的文件名发生了改变才会去下载最新的代码文件，否则就一直使用缓存

### https://juejin.im/post/5c22ee806fb9a049fb43b2c5

## 浏览器渲染原理

### 浏览器接收到 HTML 文件并转换为 DOM 树

- 字节数据转换成字符串
- 浏览器会通过词法分析转换为标记（token）

	- 标记还是字符串，是构成代码的最小单位。这一过程会将代码分拆成一块块，并给这些内容打上标记，便于理解这些最小单位的代码是什么意思。

- 标记转换为 node 节点
- node 会根据不同的 node 之间的联系构建为一颗 DOM 树
- 总结

	- 字节数据=>字符串=>标记=>node=>DOM 树

### 将 CSS 文件转换为 CSSOM 树

- 字节数据=>字符串=>标记=>node=>CSSOM
- 浏览器会确定下每一个节点的样式到底是什么，并且这一过程其实是很消耗资源的

### 生成渲染树

- 当我们生成 DOM 树和 CSSOM 树以后，就需要将这两棵树组合为渲染树

	- Render Tree

- 渲染树只会包括需要显示的节点和这些节点的样式信息，如果某个节点是 display: none 的，那么就不会在渲染树中显示
- 生成渲染树之后，就会根据渲染树进行布局（也可以叫做回流），然后调用GPU绘制，合成图层，显示在屏幕上
- 为什么操作 DOM 慢

	- 两个线程
	- 可能导致重排或者重绘
	- 插入几百万个DOM

		- requestAnimationFrame

			- https://blog.csdn.net/LL18781132750/article/details/81156606

		- 参考：https://juejin.im/post/5d04b50d5188256b0b0e6c54

### 什么情况阻塞渲染

- 首先渲染的前提是生成渲染树，所以 HTML 和 CSS 肯定会阻塞渲染
- 当浏览器在解析到 script 标签时，会暂停构建 DOM，完成后才会从暂停的地方重新开始

	- 将 script 标签放在底部
	- 或者加上 defer 或者 async

		- 当 script 标签加上 defer 属性以后，表示该 JS 文件会并行下载，但是会放到 HTML 解析完成后顺序执行，所以对于这种情况你可以把 script 标签放在任意位置
		- 对于没有任何依赖的 JS 文件可以加上 async 属性，表示 JS 文件下载和解析不会阻塞渲染

			- async一旦下载完,渲染引擎就会中断渲染,执行这个脚本以后,再继续渲染。

### 重绘（repaint）和重排（reflow）

- 重绘和回流其实也和 Eventloop 有关

	- 当 Eventloop 执行完 Microtasks 后，会判断 document 是否需要更新，因为浏览器是 60Hz 的刷新率，每 16.6ms 才会更新一次。
	- 然后判断是否有 resize 或者 scroll 事件，有的话会去触发事件，所以 resize 和 scroll 事件也是至少 16ms 才会触发一次，并且自带节流功能。
	- 判断是否触发了 media query
	- 更新动画并且发送事件
	- 判断是否有全屏操作事件
	- 执行 requestAnimationFrame 回调
	- 执行 IntersectionObserver 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
	- 更新界面
	- 以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 requestIdleCallback 回调。

- 减少

	- 使用 transform 替代 top
	- 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局）
	- 不要把节点的属性值放在一个循环里当成循环里的变量
	- 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
	- 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame
	- CSS 选择符从右往左匹配查找，避免节点层级过多
	- 将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点

### 关键渲染路径

- 在不考虑缓存和优化网络协议的前提下，考虑可以通过哪些方式来最快的渲染页面
- 文件大小
- script 标签
- CSS、HTML 书写
- 首屏渲染

## 安全防范知识点

### XSS

- 将可执行的代码注入到网页中

	- 持久型
	- 非持久型

- 例子

	- 评论
	- 修改 URL 参数

- 防御

	- 转义字符

- CSP

	- 本质是建立白名单，开发者明确告诉浏览器哪些外部的资源可以加载和执行
	- 开启 CSP

		- 设置 HTTP header 中的 Content-Security-Policy

			-     只允许加载 HTTPS 协议图片

				- Content-Security-Policy: img-src https://*  

			- 只允许加载本站资源

				- Content-Security-Policy: default-src ‘self’

			- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy

		- 设置meta 标签的方式 <meta http-equiv="Content-Security-Policy">

### CSRF

- 跨站点请求伪造（Cross-site request forgery）

	- 原理

		- 攻击者构造出一个后端的请求地址，诱导用户点击或者通过某些途径自动发起请求

- 例子

	- 在钓鱼网站中加入一个图片，图片的地址就是评论接口

- 防御

	- get 请求不对数据进行修改
	- 不让第三方网站访问到用户 cookie
	- 阻止第三方网站请求接口
	- 请求时附带验证信息，比如验证码或者 token
	- cookie 的samesite
	- 服务端的防御

		-  验证HTTP Referer字段

			- ，在HTTP头中有一个字段叫Referer，它记录了该HTTP请求的来源地址

		- token

			- 服务器下发一个随机 Token，每次发起请求时将 Token 携带上，服务器验证 Token 是否有效。

### 点击劫持

- 例子

	- iframe

- X-FRAME-OPTIONS

	- HTTP 响应头
	- DENY，表示页面不允许通过 iframe 的方式展示
	- SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示
	- ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示

### 中间人攻击

- 同时与服务端和客户端建立起了连接，并让对方认为连接是安全的，但是实际上整个通信过程都被攻击者控制了。攻击者不仅能获得双方的通信信息，还能修改通信信息
- 不建议使用公共的 Wi-Fi
- HTTPS 就可以用来防御中间人攻击

## 从V8中看性能优化

### 测试性能工具

- Audits
- Performance

	- 可以通过 Performance 工具了解网站的性能瓶颈
	- 可以通过 Performance API 具体测量时间

### JS 性能优化

- JS 需要引擎才能运行起来
- V8中引入了TurboFan编译器，在特定的情况下优化，将代码编译成效率更高的 Machine Code

### V8引擎

- JS 代码首先解析成抽象语法树（AST）
- 通过解释器或者编译器转化为 Bytecode 或者 Machine Code
- 优化

	- 为了减少编译时间，我们可以采用减少代码文件的大小或者减少书写嵌套函数的方式
	- 为了让 V8 优化代码，我们应该尽可能保证传入参数的类型一致。这也给我们带来了一个思考，这是不是也是使用 TypeScript 能够带来的好处之一

## 性能优化琐碎事

### 图片优化

- 见另外一篇图片的总结
- 不用图片

	- CSS

- CDN 加载
- 小图使用 base 64 格式

	- 不额外添加请求

- 雪碧图
- 选择正确的图片格式

	- webp（只要安卓机能用）

### DNS 预解析

- <link rel="dns-prefetch" href="//yuchengkai.cn">

	- DNS 解析也是需要时间的

### 节流

- 手动实现节流函数
- 滚动事件中会发起网络请求，但是我们并不希望用户在滚动过程中一直发起请求，而是隔一段时间发起一次，对于这种情况我们就可以使用节流
- 固定隔一段时间执行一次

### 防抖

- 有一个按钮点击会触发网络请求，但是我们并不希望每次点击都发起网络请求，而是当用户点击按钮一段时间后没有再次点击的情况才去发起网络请求，对于这种情况我们就可以使用防抖
- 触发后重置一段时间再去执行

### 预加载

- <link rel="preload" href="http://example.com">

### 预渲染

- 可以通过预渲染将下载好的文件在后台渲染

	- <link rel="prerender" href="http://example.com"> 

### 懒执行

### 懒加载

- 懒加载的原理就是只加载自定义区域（通常是可视区域，但也可以是即将进入可视区域）内需要加载的东西。

### CDN

## webpack 性能优化

### 这部分内容详见《深入浅出 webpack》

### 减少 Webpack 打包时间

- 优化Loader

	- 优化 Loader 的查找路径

- 将 Babel 编译后的文件缓存起来

	- loader: 'babel-loader?cacheDirectory=true'

- Happy Pack

	- HappyPack 可以将 Loader 的同步执行转换为并行的

- DllPlugin

	- DllPlugin 可以将特定的类库提前打包然后引入

- 代码压缩

	- UglifyJS

### 减少 Webpack 打包后的文件体积

- 按需加载
- Scope Hoisting
- Tree Shaking

## 实现小型打包工具

## React 和 Vue

### MVVM

- Vue 和 React 都不是 MVVM 框架
- view 和 model

	- View 即为视图
	- Model 一般是本地数据或者数据库

- MVC

	- 缺点

		- controller 承担的责任太大了，随着项目越来越大，控制器中的代码会越来越臃肿

### Virtual Dom（需要深入理解）

- 通过 JS 来模拟 DOM 并渲染对应的 DOM 
- 难点在于判断新旧两个 JS 的差异，并实现局部刷新
- 实现 O(n) 复杂度的关键就是只对比同层的节点，而不是跨层对比
- 判断差异的算法

	- 首先从上至下，从左往右遍历对象，也就是树的深度遍历，这一步中会给每个节点添加索引，便于最后渲染差异
	- 一旦节点有子元素，就去判断子元素是否有不同

- 为什么 Virtual DOM 比原生 DOM 快

	- key 属性的作用
	- 如果你可以人肉也同样去局部替换 DOM，那么 Virtual DOM 必然没有你直接操作 DOM 来的快
	- Virtual DOM 的优势

		- 将 Virtual DOM 作为一个兼容层，让我们还能对接非 Web 端的系统，实现跨端开发。
		- 同样的，通过 Virtual DOM 我们可以渲染到其他的平台，比如实现 SSR、同构渲染等等。
		- 实现组件的高度抽象化

	- https://www.zhihu.com/question/31809713

### 路由

- 前端路由原理

	- 监听 URL 变化，然后匹配路由规则，显示相应的页面，并且无须刷新页面

- 两种模式

	- hash 模式

		- 通过 hasChange 来监听到 URL 的变化

	- history 模式

		- HTML5 推出的功能
		- 主要是使用 history.pushState 和 history.replaceState 来改变 URL
		- // 新增历史记录
history.pushState(stateObject, title, URL)
		- // 替换当前历史记录
history.replaceState(stateObject, title, URL)

	- 比较

		- History 模式可以通过 API 添加任意类型的数据到历史记录中，Hash 模式只能更改哈希值，也就是字符串
		- Hash 模式无需后端配置，并且兼容性好。History 模式在用户手动输入地址或者刷新页面的时候会发起 URL 请求，后端需要配置 index.html 页面用于匹配不到静态资源的时候

- https://juejin.im/post/5ac61da66fb9a028c71eae1b

### Vue 和 React 的区别

- Vue v-model 支持双向数据绑定，更加方便
- 改变状态不同，Vue 双向数据绑定，React 需要 setState
- React 需要使用 JSX，有一定的上手成本.Vue中的 render 函数

## Vue 常考基础知识点

### 生命周期钩子函数

- 参考 Vue 官网

	- https://cn.vuejs.org/v2/guide/instance.html

- beforeCreate

	- 获取不到 props 和 data 的值，因为这些值的初始过程都是在 initState 中的

- created

	- 可以访问数据，但是看不到页面，因为还没有挂载

- beforeMount

	- 开始构建虚拟 DOM

- mounted

	- 将 VDOM 渲染成正式的 DOM 并渲染数据，如果有子组件的话，会递归挂载子组件，当所有的子组件全部挂载完成的时候才挂载根组件

- beforeUpdate
- updated
- beforeDestroy

	- 用来移除事件、定时器等。否则可能会造成内存泄漏

- destroyed

	- 如果有子组件的话，也会递归销毁子组件，所有子组件都销毁完毕后才会执行根组件的 destroyed 钩子函数

- keep-alive 独有的生命周期

	- activated
	- deactivated
	- keep-alive 包裹的组件在切换的时候不会销毁组件。而是缓存到内存中执行 deactivated 钩子函数
	- 命中缓存之后会执行 activated

### computed 和 watch 区别

- computed 是计算属性，依赖其他属性计算值，并且 computed 的值有缓存，只有当计算值变化才会返回内容

	- get
	- set

- watch 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作

	- deep
	- immediate
	- handler

- 所以一般来说需要依赖别的属性来动态获得值的时候可以使用 computed，对于监听到值的变化需要做一些复杂业务逻辑的情况可以使用 watch
- 两者支持对象的写法

### 组件之间的通信

- 父子组件的通信

	- props 和 emit

		- 子组件不能修改父组件传递的 props

	- 使用语法糖 v-model

		- 因为 v-model 会被解析成名为 value 的 prop 和名为 input 的事件

	- 通过 $parent 和 $children 来访问组件实例的方法和数据
	- Vue 2.3 以及以上的版本

		- $listener 和 .sync
		- $listener

			- 里面包含了作用在这个组件上的所有监听器

		- .sync 只是一个语法糖

	- 如果想在一个组件的根元素上监听一个原生事件

		- 可以使用 v-on 的 .native

- 兄弟组件的通信

	- this.$parent.$children

		- 通过组件 name 查询到需要的组件实例

- 跨多层次组件的通信

	- provide 和 inject
	- 注意它们不是响应式的

- 任意组件

### extend

- 作用是扩展组件生产一个构造器，通常和 $mount 一起使用

### mixin 和 mixins 区别

- mixin 是用于全局混入
- mixins 引入公共逻辑

	- mixins 混入的钩子函数会先于组件内的钩子函执行
	- https://cn.vuejs.org/v2/guide/mixins.html
	- 数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先

### keep-alive 组件有什么作用

- 如果你需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 keep-alive 组件包裹需要保存的组件
- activated 和 deactivated

### v-show 与 v-if 区别

- v-show

	- 只是切换 CSS
	- 更高的初始化成本

- v-if

	- 更高的切换成本

### 组件中 data 什么时候可以使用对象

- 组件复用的时候，所有的组件实例都会共享 data
- 如果 data 是对象的话，就会造成一个组件修改 data 以后影响到其他组件
- 使用 new  Vue 就不会有这个问题，因为 new Vue() 方式是生成一个根组件，不会被复用

## Vue 常考进阶知识点

### 响应式原理

### 编译过程

### NextTick 原理分析

### 参考《Vue技术揭秘》

### Vue 组件精讲

- https://juejin.im/book/5bc844166fb9a05cd676ebca

### 剖析 Vue 内部执行机制

- https://juejin.im/book/5a36661851882538e2259c0f

## React

## 监控

### 页面埋点

- PV / UV
- 停留时长
- 流量来源
- 用户交互
- 方式

	- 手写埋点
	- 无埋点

### 性能监控

- performance.getEntriesByType('navigation')

### 异常监控

- 代码报错

	- 最常用的就是 window.onerror
	- 跨域的代码会报 Script error

		- 给 Script 标签加上 crossorigin

	- 对于一些浏览器可能不显示调用栈信息

		- arguments.callee.caller 来做栈递归

	- 对于异步代码，可以使用catch捕获

		- 比如Promise可以使用 catch 函数

- 接口异常

## UDP

### 概念

- User Data Protocol

	- 用户数据报协议

- 特点

	- 面向无连接

		- 不需要正式传递数据之前连接对方

	- 单纯数据的搬运工
	- 没有控制流量的算法

### 面向无连接

- 不需要进行三次握手
- 只是数据的搬运工，不对数据进行拆分和拼接工作

### 不可靠性

- 体现在无连接上
- 不管网络好坏，会以恒定的速度发送数据，因为 UDP 没有拥塞控制

	- 弊端在于网络不好的时候就会存在丢包
	- 在一些性能要求较高的地方就需要用到 UDP

### 高效

- 头部开销小，8个字节

### 传播方式

- 单播，多播，广播

	- 两个十六位的端口号，分别为源端口（可选字段）和目标端口
	- 整个数据报文的长度
	- 整个数据报文的检验和（IPv4 可选 字段），该字段用于发现头部信息和数据中的错误

### 适合使用的场景

- 直播

## TCP

### 头部

- Sequence number

	- 这个序号保证 TCP 传输的报文是有序的，对端可以通过序号顺序拼接出报文

- Acknowledgement Number

	- 表示数据接收端期望接收的下一个字节的编号是多少，同时也表示上一个数据已经收到

- Window Size

	- 窗口大小，表示还能接收多少字节的数据，用于流量控制

- 标识符

	- URG=1

		- 该字段为一表示本数据报的数据部分包含紧急信息，是一个高优先级数据报文，此时紧急指针有效

	- ACK=1

		- 表示确认号字段有效

	- PSH=1

		- 接收端立即应该将数据 PUSH 给应用层

	- RST=1

		- 表示当前 TCP 连接出现严重问题，可能需要重新建立 TCP 连接

	- SYN=1

		- ACK=0

			- 当前报文段是一个连接请求报文

		- ACK=1

			- 当前报文段是一个同意建立连接的应答报文

	- FIN=1

		- 此报文段为释放连接的请求报文

### 状态机

- 不管是客户端还是服务端，TCP 连接成功后都可以发送和接受数据，所以 TCP 是一个全双工的协议
- 重要的性能指标 RTT。该指标表示发送端发送数据到接收到对端数据所需的往返时间。

### 建立连接三次握手

- 开始大家都是 CLOSE 状态
- 通信开始，双方创建 TCB，服务端创建完 TCB 便进入 LISTEN 状态
- 第一次握手

	- 客户端向服务端发送请求连接报文段，其中包含数据通讯初始序号

		- 完成，客户端进入 SYN-SEND状态

- 第二次握手

	- 发送应答

		- 该应答中也会包含自身的数据通讯初始序号，发送完成后便进入 SYN-RECEIVED 状态

- 第三次握手

	- 客户端收到连接同意的应答后，还得向服务端发送确认报文

		- 客户端发完这个报文段后便进入 ESTABLISHED 状态，服务端收到这个应答后也进入 ESTABLISHED 状态，此时连接建立成功

- 为什么 TCP 建立连接需要三次握手，明明两次就可以建立起连接

	- 为了防止出现失效的连接请求报文段被服务端接收的情况，从而产生错误（资源浪费）

		- 举例说明，超时重传

### 断开连接四次握手

- TCP 是全双工的，在断开连接时两端都需要发送 FIN 和 ACK。
- 第一次握手

	- 若客户端 A 认为数据发送完成，则它需要向服务端 B 发送连接释放请求。FIN

- 第二次握手

	- 发送 ACK 包，并进入 CLOSE_WAIT 状态，此时表明 A 到 B 的连接已经释放，不再接收 A 发的数据了

		- 但是因为 TCP 连接是双向的，所以 B 仍旧可以发送数据给 A

- 第三次握手

	- B 如果此时还有没发完的数据会继续发送，完毕后会向 A 发送连接释放请求，然后 B 便进入 LAST-ACK 状态

- 第四次握手

	- A 收到释放请求后，向 B 发送确认应答，此时 A 进入 TIME-WAIT 状态

		- 该状态会持续2MSL（最大段生存期，指报文段在网络中生存的时间，超时会被抛弃）

			- 为什么？

		- 在以上的时间段中，没有接收到B的重发请求，则进入 Close

	- 当 B 收到确认应答后，也便进入 CLOSED 状态
	- 为什么 A 要进入 TIME-WAIT 状态，等待 2MSL 时间后才进入 CLOSED 状态？

		- 为了保证 B 能收到 A 的确认应答。若 A 发完确认应答后直接进入 CLOSED 状态，如果确认应答因为网络问题一直没有到达，那么会造成 B 不能正常关闭。

### ARQ 协议（超时重传机制）

- 停止等待 ARQ

	- 正常传输过程

		- 定时器

	- 报文丢失或者出错

		- 超过定时器设定的时间就会再次发送丢失的数据直到对端响应，所以需要每次都备份发送的数据
		- 一般定时器设定的时间都会大于一个 RTT 的平均时间

	- ACK 超时或者丢失

		- 对端传输的应答也可能出现丢失或超时的情况。那么超过定时器时间 A 端照样会重传报文
		- B 端收到相同序号的报文会丢弃该报文并重传应答，直到 A 端发送下一个序号的报文

- 连续 ARQ

	- 在连续 ARQ 中，发送端拥有一个发送窗口，可以在没有收到应答的情况下持续发送窗口内的数据

		- 相比停止等待 ARQ 协议来说减少了等待时间，提高了效率

	- 累计确认

		- 报文中的 ACK 标志位可以用来告诉发送端这个序号之前的数据已经全部接收到了，下次请发送这个序号后的数据

### 滑动窗口

- 发送窗口

	- 包含已发送但未收到应答的数据和可以发送但是未发送的数据
	- 发送端窗口是由接收窗口剩余大小决定的。接收方会把当前接收窗口的剩余大小写入应答报文
	- 发送端收到应答后根据该值和当前网络拥塞情况设置发送窗口的大小，所以发送窗口的大小是不断变化的

- 接收窗口
- Zero 窗口

	- 在发送报文的过程中，可能会遇到对端出现零窗口的情况。在该情况下，发送端会停止发送数据，并启动 persistent timer
	- 该定时器会定时发送请求给对端，让对端告知窗口大小。在重试次数超过一定次数后，可能会中断 TCP 链接。

### 拥塞处理

- 作用于网络，防止过多的数据拥塞网络，避免出现网络负载过大的情况
- 慢开始算法

	- 在传输开始时将发送窗口慢慢指数级扩大，从而避免一开始就传输大量数据导致网络拥塞

- 拥塞避免算法

	- 每过一个 RTT 窗口大小只加一，这样能够避免指数级增长导致网络拥塞，慢慢将大小调整到最佳值

- 快速重传

	- 一旦接收端收到的报文出现失序的情况，接收端只会回复最后一个顺序正确的报文序号
	- 如果发送端收到三个重复的 ACK，无需等待定时器超时而是直接启动快速重传算法
	- TCP Taho 实现如下

		- 将阈值设为当前拥塞窗口的一半
		- 将拥塞窗口设为 1 MSS
		- 重新开始慢开始算法

	- TCP Reno 实现如下

		- 拥塞窗口减半
		- 将阈值设为当前拥塞窗口
		- 进入快恢复阶段（重发对端需要的包，一旦收到一个新的 ACK 答复就退出该阶段），这种方式在丢失多个包的情况下就不那么好了
		- 使用拥塞避免算法

- TCP New Ren 改进后的快恢复

## HTTP 以及 TLS

### HTTP 请求中的内容

- 请求行

	- GET /images/logo.gif HTTP/1.1
	- 请求方法/请求URL/请求协议版本

- 请求方法

	- get 和 post 的区别

		- 副作用和幂等的概念

			- 副作用指的是对服务器端资源做修改
			- 幂等指发送 M 和 N 次请求（两者不相同且都大于 1），服务器上资源的状态一致
			- 应用场景上，get是无副作用的，幂等的。post 主要是有副作用的，不幂等的情况

		- 技术上

			- Get 请求能缓存，Post请求不能
			- Get请求没有Post 请求那么安全，因为请求都在 URL 中。且会被浏览器保存历史纪录
			- URL 有长度限制，会干预 Get 请求，这个是浏览器决定的
			- POST 支持更多的编码类型，而且不对数据类型做限制

	- 首部

		- 通用首部
		- 请求首部
		- 响应首部
		- 实体首部

			- 这个有什么用？

### 常见状态码

- 2XX 成功

	- 200 OK，表示从客户端发来的请求在服务器端被正确处理
	- 204 No content，表示请求成功，但响应报文不含实体的主体部分
	- 205 Reset Content，表示请求成功，但响应报文不含实体的主体部分，但是与 204 响应不同在于要求请求方重置内容
	- 206 Partial Content，进行范围请求

- 3** 重定向

	- 301 moved permanently，永久性重定向，表示资源已被分配了新的 URL
	- 302 found，临时性重定向，表示资源临时被分配了新的 URL
	- 303 see other，表示资源存在着另一个 URL，应使用 GET 方法获取资源
	- 304 not modified，表示服务器允许访问资源，但因发生请求未满足条件的情况
	- 307 temporary redirect，临时重定向，和302含义类似，但是期望客户端保持请求方法不变向新的地址发出请求

- 4XX 客户端错误

	- 400 bad request，请求报文存在语法错误
	- 401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息
	- 403 forbidden，表示对请求资源的访问被服务器拒绝
	- 404 not found，表示在服务器上没有找到请求的资源

- 5XX 服务器错误

	- 500 internal sever error，表示服务器端在执行请求时发生了错误
	- 501 Not Implemented，表示服务器不支持当前请求所需要的某个功能
	- 503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求

### TLS

- HTTPS 也是通过 HTTP 协议进行传输信息，但是采用了 TLS 协议进行了加密
- 对称加密

	- 对称加密就是两边拥有相同的【秘钥】，两边都知道如何将密文加密解密。

		- 问题在于如果让对方知道【秘钥】
		- 因为传输数据都是走的网络，如果将【秘钥】通过网络的方式传递的话，一旦秘钥被截获就没有加密的意义的

- 非对称加密

	- 客户端怎么知道如何加密？
	- 有公钥私钥之分

		- 公钥大家都知道，可以用公钥加密数据
		- 但解密数据必须使用【私钥】，【私钥】掌握在颁发公钥的一方
		- 首先服务端将公钥发布出去，那么客户端是知道公钥的
		- 然后客户端创建一个【秘钥】，并使用公钥加密，发送给服务端
		- 服务端接收到密文以后通过【私钥】解密出正确的【秘钥】

- TLS 握手过程

	- 客户端发送一个【随机值】以及需要的协议和加密方式。
	- 服务端收到客户端的随机值，自己也产生一个随机值，并根据客户端需求的【协议和加密方式】来使用对应的方式，并且发送自己的【证书】（如果需要验证客户端证书需要说明）
	- 客户端收到服务端的【证书】并验证是否有效，验证通过会再生成一个【随机值】，通过服务端【证书的公钥】去加密这个随机值并发送给服务端，如果服务端需要验证客户端证书的话会【附带证书】
	- 服务端收到加密过的随机值并使用【私钥】解密获得【第三个随机值】，这时候两端都拥有了三个随机值，可以通过这三个随机值按照之前约定的加密方式生成【密钥】，接下来的通信就可以通过该密钥来加密解密
	- 采用的是非对称加密的方式

## HTTP2以及HTTP3

### HTTP2

- 提高了网页的性能

	- 什么是队头阻塞？（Head of line blocking）

- 多路复用

	- 浏览器对同一个域名下面的请求数量做了限制

		- 队头阻塞会导致达到最大请求数量时，剩余资源需要等到其他资源请求完成之后才能发起请求

	- 只通过一个 TCP 连接就可以传输所有的请求数据
	- 帧（frame）和流（stream）

		- 帧代表着最小的数据单位，每个帧都会标识出属于哪个流，流即使多个帧组成的数据流
		- 多路复用，就是一个 TCP 中包含多个数据流

			- 对端可以通过帧中的标识辨别这个帧属于哪个请求

- 二进制传输

	- 之前是文本的方式

- Header 压缩
- 服务端 Push

	- HTTP2 中，服务端可以在客户端请求一个资源之后，主动的推送其他的资源

### HTTP3

- 在出现丢包的情况下，整个 TCP 都要开始等待重传，也就导致了后面的所有数据都被阻塞了
- QUIC

	- 基于 UDP，优化 UDP
	- 多路复用
	- 0-RTT
	- 纠错机制

## 输入 URL 到页面渲染的整个流程

### DNS 查询

- DNS 的作用就是通过域名查询到具体的 IP
- 操作系统会首先在本地缓存中查询 IP
- 没有的话会去系统配置的 DNS 服务器中查询
- 如果这时候还没得话，会直接去 DNS 根服务器查询，这一步查询会找出负责 com 这个一级域名的服务器
- 然后去该服务器查询 google 这个二级域名
- 接下来三级域名的查询其实是我们配置的，你可以给 www 这个域名配置一个 IP，然后还可以给别的三级域名配置一个 IP
- 以上属于 DNS 迭代查询

### TCP 握手

-  TCP 握手，应用层会下发数据给传输层，这里 TCP 协议会指明两端的端口号，然后下发给网络层。网络层中的 IP 协议会确定 IP 地址，并且指示了数据传输中如何跳转路由器。然后包会再被封装到数据链路层的数据帧结构中，最后就是物理层面的传输了

### TLS 握手

- 详细说下 TLS 的握手情况以及两种加密方式的内容

### 经过负载均衡的机器

### 状态码判断

### 浏览器解析文件，如果 gzip 格式的话，就先压缩一下。（通过文件的编码方式去如何解码文件）

### 先会根据 HTML 构建 DOM 树，有 CSS 的话会去构建 CSSOM 树。如果遇到 script 标签的话，会判断是否存在 async 或者 defer ，前者会并行进行下载并执行 JS，后者会先下载文件，然后等待 HTML 解析完成后顺序执行

### CSSOM 树和 DOM 树构建完成后会开始生成 Render 树，这一步就是确定页面元素的布局、样式等等诸多方面的东西

### 在生成 Render 树的过程中，浏览器就开始调用 GPU 绘制，合成图层，将内容显示在屏幕上了

## 设计模式

### 工厂模式

- 隐藏了创建实例的复杂度，只需要提供一个接口和返回的定义，清晰明了

### 单例模式

- 单例模式的核心在于保证全局只有一个对象可以访问

### 适配器模式

- 用来解决两个接口不兼容的情况，不需要改变已有接口，而是通过包装一层的方式，实现两个接口的正常协调

### 装饰模式

- 不需要改变已有接口，作用是给对象添加功能

### 代理模式

- 为了控制对对象的访问，不让外部直接访问到对象

### 发布-订阅模式

- 也称为观察者模式
- 当对象发生改变的时候，订阅方就会收到通知

### 外观模式

- 提供了一个接口，隐藏了内部的实现逻辑，更加方便外部的调用

## 常见数据结构

### 见《学习JavaScript算法与数据结构》

### 时间复杂度

### 栈

- 先进后出
- 匹配括号

### 队列

- 先进先出
- 单链队列
- 循环队列

### 链表

- 单向链表

### 树

- 二叉树
- 二分搜索树
- AVL 树

### Trie

### 并查集

### 堆

- 实现大根堆

## 常见算法题解析

### 见《学习JavaScript算法与数据结构》

### 位运算

- 左移 <<
- 右移 >>
- 按位操作

### 排序

- 冒泡排序
- 插入排序
- 选择排序
- 归并排序
- 快排
- 堆排序
- 系统自带排序实现

### 链表

- 反转单向链表

### 树

- 二叉树的先序，中序，后序遍历

### 动态规划

- 斐波那契数列
- 0 - 1背包问题
- 最长递增子序列

## CSS 常考面试题资料

*XMind: ZEN - Trial Version*