let quo = function(status) {
    let statusSecond = 200;
    return {
        get_status: function() {
            return statusSecond;
        }
    }
}

let myQuo = new quo(100);
console.log(myQuo.get_status());    // 100