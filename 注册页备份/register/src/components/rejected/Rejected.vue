<template>
  <div class="over">
    <div class="box-content text-center" v-if="auditResult1">
      <i class="el-icon-error"></i>
      <h1>资料驳回</h1>
      <p class="htmlDetail">{{state[status] || status}}</p>
      <el-button type="primary" size="small" @click="submit">重新提交</el-button>
    </div>
    <div class="box-content text-center" v-if="auditResult2">
      <i class="el-icon-error"></i>
      <h1>禁止开户</h1>
      <p class="htmlDetail"></p>
    </div>
    <div class="box-content text-center" v-if="auditResult3">
      <i class="el-icon-error"></i>
      <h1>当前账号正在审核，请耐心等待！</h1>
      <p class="htmlDetail"></p>
    </div>
    <div class="box-content text-center" v-if="auditResult4">
      <i class="el-icon-error"></i>
      <h1>登录过期，请重新登录</h1>
      <p class="htmlDetail"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['gtStatus'],  // 接口状态
  data() {
    return {
      isMobile: false,
      auditResult1: false,
      auditResult2: false,
      auditResult3: false,
      auditResult4: false,
      status: null,
      state: {
        "0": "无状态",
        "1": "正常",
        "8000": "冻结",
        "-1": "注销",
        "-3": "开户驳回",
        "-2": "无状态正常待审核",
        "-4": "无状态注销待审核",
        "2": "正常冻结待审核",
        "3": "正常注销待审核",
        "8001": "冻结正常待审核",
        "8002": "冻结注销待审核",
        "-5": "注销正常待审核",
        "-6": "注销冻结待审核",
        "-7": "注销无状态待审核"
      }
    };
  },
  methods: {
    submit() {
      this.$emit('currentStep', 2);
    },
    statusControl(){
      let that = this;
      let status = that.gtStatus || sessionStorage.getItem("gtStatus");
      if (status != undefined && status != "" && status != null) {
          if(status == that.com.accountStatus.regist_reject){
              that.auditResult1 = true;
              // that.status = gtStatus.auditRemark;
          }else if(status == that.com.accountStatus.regist_forbid){
              that.auditResult2 = true;
          }else if(status == that.com.accountStatus.regist_audit){
              that.auditResult3 = true;
          }else if(status == that.com.accountStatus.regist_outTime){
              that.auditResult4 = true;
          }
      }
    }
  },
  mounted() {
    let that = this;
    if (!that.com.isMobile()) {
      that.isMobile = true;
    }
    this.statusControl();
  }
};
</script>

<style lang="scss" scoped>
.over {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-content {
    width: 100%;
    margin: auto;
  }
  i.el-icon-error {
    font-size: 70px;
    color: #b6a956;
    margin-bottom: 20px;
  }
  .el-button {
    width: 84px !important;
  }
}
@media screen and (min-width: 320px) and (max-width: 819px) {
  .box-content {
    padding-top: 30%;
  }
  .over {
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
  }
}
@media screen and (min-width: 820px) {
  .over {
    box-shadow: 0 5px 17px 2px rgba(0, 0, 0, 0.28);
  }
}
</style>
