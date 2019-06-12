function ajax(opt) {
    var json = opt || {};
    var url = json.url;
    if (!url) {
        return;
    }
    var type = json.type || 'get';
    var data = json.data || {};
    var async = json.async === false ? json.async : true;
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    data = formatData(data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || XMLDocument.status === 304) {
                if (json.dataType === 'json') {
                    typeof json.success === 'function' && json.success(JSON.parse(xhr.responseText))
                } else {
                    typeof json.success === 'function' && json.success(xhr.responseText)
                }
            } else {
                typeof json.error === 'function' && json.error('请求异常，状态码：' + xhr.status)
            }
        }
    }
    switch (type.toUpperCase()) {
        case 'GET':
            url = data ? url + '?' + data : url;
            xhr.open(type, url, async);
            xhr.send();
            break;
        case 'POST':
            xhr.open(type, url, async);
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send(data);
    }
}

function formatData(obj) {
    var arr = [];
    for (var i in obj) {
        arr.push(i + '=' + obj[i]);
    }
    return arr.join('&');
}