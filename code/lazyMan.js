/**
 * 题目描述：
 * 实现一个LazyMan，可以按照以下方式调用:
LazyMan(“Hank”)输出:
Hi! This is Hank!


LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
以此类推。

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~
 */

class _LazyMan {
  constructor (name) {
    this.tasks = []
    
    // 首次的时候解决名字的任务
    const task = () => {
      console.log(`Hi! This is ${name}`)
      this.next() // 每次执行完记得调用 next 方法，执行下个任务
    }

    this.tasks.push(task)

    // 这里其实就是为了开始执行任务，但是因为有可能后面还可能会延迟加载
    // 所以用 setTimeout 放在执行栈清空之后
    setTimeout(() => {
      this.next()
    }, 0)
  }
  next () {
    // 取任务队列中的第一个进行
    const task = this.tasks.shift()
    task && task()
  }
  eat (name) {
    // 多添加一个“吃”的任务
    this.tasks.push(() => {
      console.log(`Eat ${name}~`)
      this.next()
    })
    return this
  }
  sleep (time) {
    this.sleepWrapper(time, false)
    return this
  }
  sleepFirst (time) {
    this.sleepWrapper(time, true)
    return this
  }
  sleepWrapper (time, isFirst) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.next()
      }, time * 1000)
    }
    if (isFirst) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
  }
}

// let LazyMan = new _LazyMan(name)
function LazyMan(name) {
  return new _LazyMan(name);
}
// LazyMan('Gping')
// LazyMan('Hank').sleep(2).eat('dinner')
// LazyMan('Hank').eat('dinner').eat('supper')
LazyMan('Hank').sleepFirst(2).eat('supper')