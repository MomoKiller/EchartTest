<template>
  <div class="over">
    <div class="box-content text-center">
      <i class="el-icon-success"></i>
      <h1>实名验证资料已提交，请等待审核！</h1>
      <h1 v-if="shwoName">新注册登录账号: <span style="color: #ee0000;">{{loginInfo.loginName}}</span></h1>
      <h1 v-if="showMsg">初始<span style="color: #ee0000;">资金密码</span>等于登录密码</h1>
      <p>请关闭页面进行登录！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Success',
  props: ['loginInfo'],
  data() {
    return {
      isMobile: false,
      shwoName: false,
      showMsg: false
    }
  },
  mounted() {
    if (!this.com.isMobile()) {
      this.isMobile = true;
    }
    if(JSON.stringify(this.loginInfo) != '{}' && this.loginInfo.loginName != ''){
      this.shwoName = true;
    }
    if(JSON.stringify(this.loginInfo) != '{}' && this.loginInfo.msg != ''){
      this.showMsg = true;
    }
  }
}
</script>

<style lang="scss" scope>
.over {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-content {
    max-width: 400px;
    margin: auto;
  }
  i.el-icon-success {
    font-size: 70px;
    color: #14b614;
    margin-bottom: 20px;
  }
}
@media screen and (min-width: 320px) and (max-width: 819px) {
  .box-content {
    padding-top: 30%;
  }
  .over {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
}
@media screen and (min-width: 820px) {
  .over {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
</style>