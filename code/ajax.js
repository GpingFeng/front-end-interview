/**
 * 原生 ajax 的实现
 */
function ajax(url, fnSucc, fnFaild) {
  var xhttp;
  // 第一步：创建XMLHttpRequest对象
  if (window.XMLHttpRequest) {
    // 现代浏览器
    xhttp = new XMLHttpRequest();
  } else {
    // IE6等老版本浏览器
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // 第四步：处理响应
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        fnSucc(xhttp.responseText);
      } else {
        if (fnFaild) fnFaild(xhttp.responseText);
      }
    }
  };
  // 第二步：初始化XMLHttpRequest方法，第三个参数是否异步【默认为 true】
  xhttp.open("GET", url);
  // 第三步：XMLHttpRequest向服务器发送请求
  xhttp.send();
}

/**
 * Promise 封装
 */
let ajax = obj => {
  return new Promise((resolve, reject) => {
    let method = obj.method || "GET";
    let xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onReadyStateChange = () => {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.statusText);
        }
      }
    };
    if (method == "POST") {
      xhr.open("POST", obj.url, true);
      xhr.responseType = "json";
      xhr.setRequestHeader("Accept", "application/json");
      // 如果是 POST 的话，就将参数放入到这里
      xhr.send(obj.data);
    } else {
      let query = "";
      for (let key in obj.data) {
        query +=
          "&" +
          encodeURIComponent(key) +
          "=" +
          encodeURIComponent(obj.data[key]);
      }
      query.substring(1);
      // 如果是 Get 方法，则将参数放在链接中
      xhr.open("GET", obj.url + "?" + query, true);
      xhr.send();
    }
  });
};
