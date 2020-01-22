var lastTime = performance.now()
var frame = 0
var timer = 0
function loop () {
    var now = performance.now()
    frame++
    
    if (now - lastTime > 1000) {
       var fps = Math.round((frame*1000)/(now-lastTime))
       frame = 0
       lastTime = now
       console.log(fps)
       if (fps < 60) {
           console.log('严重卡顿')
       }
    }
    if (!timer) {
        timer = window.requestAnimationFrame(loop)
    }
}

loop()


