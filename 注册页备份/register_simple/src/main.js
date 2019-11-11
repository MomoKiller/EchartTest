import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import com from './commonFn/commonFn.js'
import routerConfig from './router.config';
Vue.prototype.com = com

Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter(routerConfig);

new Vue({
    router,
    el: '#app',
    render: h => h(App)
})