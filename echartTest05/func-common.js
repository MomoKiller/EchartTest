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
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xmlhttp.send(JSON.stringify(data));
    },
    /**
     * 接口post请求
     * url: 接口;  data: 数据参数; call: 回调函数
     */
    loginJSON: (url, data, call) => {
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
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xmlhttp.send(requestData);
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
     * 数据拆分
     */
    splitData: (arr) => {
        let categoryData = [];
        let values = [];
        let volumns = [];
        for (let i = 0; i < arr.length; i++) {
            categoryData.push(arr[i].splice(0, 1)[0]);
            values.push(arr[i]);
            volumns.push(arr[i][4]);
        }
        return {
            categoryData: categoryData,
            values: values,
            volumns: volumns,
            volumns2: volumns
        };
    },
    /**
     * 增删主附图
     */
    getGrid: (dom, num) => {
        num = parseInt(num);
        let tempJson = [];
        let domH = dom.clientHeight || dom.offsetHeight;
        tempJson.push({ 'gridH': (0.8 - 0.1 * num) * domH - 50, 'gridT': 25 });
        for (let i = 0; i < (num - 1); i++) {
            tempJson.push({
                'gridH': (0.2 + 0.1 * num) * domH / (num - 1) - 50,
                'gridT': domH * (0.8 - 0.1 * num + i * (0.2 + 0.1 * num) / (num - 1)) + 25
            });
        }
        return tempJson;
    }
};