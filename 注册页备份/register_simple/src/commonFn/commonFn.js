const apis = {
    'validcode': 'http://sunx.hnrotor.cn:33601/riskcontrol/client/user/online/get/validcode',
    'register': 'http://sunx.hnrotor.cn:33601/riskcontrol/client/user/online/register/user' 
}
export default{

    // 获取api 接口
    getApi: function (key) {
        let apiUrl = apis[key];
        return apiUrl;
    },
    // 获取数据--GET
    getData: function (that, url, d, call) {
        that.$http.jsonp(url, { params: d })
            .then(res => {
                call(res.body);
            }).catch(error => {
                console.log(error);
            })
    },
    // 获取数据--POST
    postData: function(that, url, d, call) {
        that.$http.post(url, d)
            .then(res => {
                call(res.body);
            }).catch(error => {
                console.log(error);
            })
    },
    // 获取浏览器参数
    getUrlParam: function(name) {	  
        var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
        var result = window.location.search.substr(1).match(reg);
        return result?decodeURIComponent(result[2]):null;
    }
}