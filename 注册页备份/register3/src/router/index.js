import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/Index.vue'
import Register from '@/components/register/Register.vue'
import Disclaimer from '@/components/disclaimer/Disclaimer.vue'
import Success from '@/components/success/Success.vue'
import OpenAccount from '@/components/openAccount/OpenAccount.vue'
import Rejected from '@/components/rejected/Rejected.vue'
import RealName from '@/components/realName/RealName.vue'

Vue.use(Router)

export default new Router({
  // mode: (location.href.indexOf('realName') > -1) ? 'history' : null, 
  routes: [
    {
      path: '/',
      component: Index
    },{
      path: '/index',
      name: 'Index',
      component: Index
    },{ // 
      path: '/index.html',
      redirect: 'Index'
    },{ // 注册
      path: '/register',
      name: 'Register',
      component: Register
    },{ // 成功
      path: '/success',
      name: 'Success',
      component: Success
    },{ // 免责
      path: '/disclaimer',
      name: 'Disclaimer',
      component: Disclaimer
    },{ // 实名
      path: '/openAccount',
      name: 'OpenAccount',
      component: OpenAccount
    },{ // 待审核
      path: '/rejected',
      name: 'Rejected',
      component: Rejected
    },{ // 实名信息
      path: '/realName',
      name: 'RealName',
      component: RealName
    },{ // 实名信息
      path: '/realNameInfo',
      redirect: '/realName'
    }
  ]
})
