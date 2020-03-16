/**
 * 监听页面性能
 * 参考：https://zhuanlan.zhihu.com/p/30389490
 */
var observer = new PerformanceObserver(function (list) {
    var perfEntries = list.getEntries()
    console.log(perfEntries)
    for (let i = 0; i < perfEntries.length; i++) {
        console.log(perfEntries[i])
    }
})

observer.observe({entryTypes: ["paint"]});