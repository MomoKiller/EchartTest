let com = {
    httpRequest(paramObj, fun, errFun) {
        let xmlhttp = null;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlhttp == null) {
            console.log('你的浏览器不支持XMLHttp');
            return;
        }
        let httpType = (paramObj.type || 'GET').toUpperCase();
        let dataType = paramObj.dataType || 'json';
        let httpUrl = paramObj.httpUrl || '';
        let async = paramObj.async || true;
        let paramData = paramObj.data || [];
        let requestData = '';
        for (let name in paramData) {
            requestData += name + '=' + paramData[name] + '&';
        }
        requestData = requestData == '' ? '' : requestData.substring(0, requestData.length - 1);
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                fun(xmlhttp.responseText);
            } else {
                errFun;
            }
        }
        if (httpType == 'GET') {
            xmlhttp.open("GET", httpUrl, async);
            xmlhttp.send(null);
        } else if (httpType == 'POST') {
            xmlhttp.open("POST", httpUrl, async);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send(requestData);
        }
    },
    /**
     * 接口post请求
     * url: 接口;  data: 数据参数; call: 回调函数
     */
    postJSON: (url, data, call) => {
        let isLogin = url.indexOf('login') > -1 ? true : false;
        let xmlhttp = null;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlhttp == null) {
            console.log('浏览器不支持XMLHttp');
            return;
        }
        let requestData = '';
        for (let name in data) {
            requestData += name + '=' + data[name] + '&';
        }
        requestData = requestData == '' ? '' : requestData.substring(0, requestData.length - 1);
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                call(JSON.parse(xmlhttp.responseText));
            }
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", isLogin ? "application/x-www-form-urlencoded" : "application/json");
        xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xmlhttp.send(isLogin ? requestData : JSON.stringify(data));
    },
    /**
     * 深拷贝
     */
    deepClone: (obj) => {
        let objClone = Array.isArray(obj) ? [] : {};
        if (obj && typeof obj === "object") {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (obj[key] && typeof obj[key] === "object") {
                        objClone[key] = com.deepClone(obj[key]);
                    } else {
                        objClone[key] = obj[key];
                    }
                }
            }
        }
        return objClone;
    },
    /**
     * 图表配置项
     */

};