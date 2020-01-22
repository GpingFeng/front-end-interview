function myJsonp(url, jsonpCallback, success) {
    let script = document.createElement('script')
    script.url = url
    script.async = true
    script.type = 'text/javascript'
    window[jsonpCallback] = function (data) {
        success && success(data)
    }
    document.body.appendChild(script)
}


myJsonp('http.vip.com', 'callback', function () {
    console.log('JSONP 成功')
})