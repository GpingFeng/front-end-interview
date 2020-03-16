/**
 * 如何查找一篇英文文章中出现频率最高的单词
 */
 function findMostWord(article) {
  if (!article) return
  // 先将单词全部转换成小写
  article = article.trim().toLowerCase()
  let wordList =  article.match(/[a-z]+/g)
  article = ' ' + wordList.join(' ') + ' '
  // 已收集过的
  let visited = []
  // 出现频率最大的
  let maxNum = 0
  let maxVal = ''

  // 遍历单词
  wordList.forEach((word) => {
    if (visited.indexOf(word) < 0) {
      // 统计出现的个数
      let wordReg = new RegExp(' ' + word + ' ', 'g')
      let num = article.match(wordReg).length

      if (num > maxNum) {
        maxNum = num
        maxVal = word
      }
    }
  })

  console.log(`${maxVal}, numbers: ${maxNum}`)
 }

let testVal = `作者：nguu
链接：https://www.nowcoder.com/discuss/128106?type=0&order=0&pos=44&page=1
来源：牛客网

class Event {
    constructor() {
        this.tasks = {};
    }
    on(name,cb) {
        if(!this.tasks[name]) {
            this.tasks[name] = [];
        }
        this.tasks[name].push(cb);
        return this;
    }
    off(name,cb) {
        let item = this.tasks[name];
        if(item) {
            for(let i=0;i<item.length;i++) {
                if(item[i] == cb) {
                    item.splice(i,1);
                    break;
                }
            }
        }
        return this;
    }
    once(name,cb) {
        if(!this.tasks[name]) {
            this.tasks[name] = [];
        }
        cb.tag = 'once';
        this.tasks[name].push(cb);
        return this;
    }
    trigger(name) {
        let tasklist = this.tasks[name],
            args = [].slice.call(arguments,1);
        if(tasklist) {
            for(let i=0;i<tasklist.length;i++) {
                tasklist[i].apply(this,args);
                if(tasklist[i].tag && tasklist[i].tag == 'once') {
                    tasklist.splice(i,1);
                    i--;
                }
            }
        }
        return this;
    }
}
 
let myEvent = new Event();
myEvent.on('console',() => {
    console.log('on1');
}).once('console',() => {
    console.log('once');
}).on('console',() => {
    console.log('on2');
}).trigger('console').trigger('console');`
 findMostWord(testVal)