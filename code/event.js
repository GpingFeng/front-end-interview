/**
 *  实现一个Event类，具有on\off\once\trigger方法
 */
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
                    item.splice(i, 1);
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
}).trigger('console').trigger('console');
//on1 once on2 on1 on2