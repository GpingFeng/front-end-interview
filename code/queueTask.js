/**
 * 设计一个简单的任务队列，要求分别在 1,3,4 秒后打印出 "1", "2", "3"
 */
class queueTask {
  constructor () {
    this.queue = []
    this.time = 0
  }
  // 添加任务以及时间
  addTask (task, time) {
    this.time += time
    this.queue.push({
      task: task,
      time: this.time
    })
    return this
  }
  start() {
    this.queue.forEach((item, index) => {
      setTimeout(() => {
        console.log(item)
        item.task()
      }, item.time)
    })
  }
}

new queueTask()
    .addTask(() => {
      console.log(1)
  }, 1000)
    .addTask(() => {
      console.log(2)
  }, 2000)
    .addTask(() => {
      console.log(3)
  }, 3000)
    .start() 