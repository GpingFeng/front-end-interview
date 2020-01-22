var observer = new PerformanceObserver(function (list) {
    var perfEntries = list.getEntries()
    console.log(perfEntries)
    for (let i = 0; i < perfEntries.length; i++) {
        console.log(perfEntries[i])
    }
})

observer.observe({entryTypes: ["paint"]});