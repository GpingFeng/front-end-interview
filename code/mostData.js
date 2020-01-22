/**
 * @description 解决插入百万条数据造成的页面性能问题
 * @param total 渲染数据的总数
 * @param onceCount 一次渲染多少条数据
 */
function refresh (total, onceCount) {
    let count = 0;
    // 要渲染几次
    let loopCount = total/onceCount;
    function loopPaint () {
        /**
         * 在这里渲染数据
         */
        if (count < loopCount) {
            count++
            requestAnimationFrame(loopPaint)
        }
    }
    requestAnimationFrame(loopPaint)
}