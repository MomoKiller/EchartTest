<template>
    <div class="register">
      <div class="flex">
        <div class="right-text">
          <!-- <gt-num></gt-num> -->
          <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">
            <el-form-item label="国家代码" prop="countryCode">
              <el-select v-model.trim="form.countryCode" placeholder="请选择国家代码">
                <el-option v-for="item in countryList" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="机构代码" prop="orgCode">
              <el-input v-model.trim="form.orgCode" placeholder="请输入机构代码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证方式" prop="validateType" v-if="typeShow">
              <el-select v-model.trim="form.validateType" @change="changeType">
                <el-option v-for="item in validateList" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email" v-if="form.validateType == 0">
              <el-input v-model.trim="form.email" placeholder="请输入电子邮箱" maxlength="200" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone" v-if="form.validateType == 1">
              <el-input v-model.trim="form.phone" placeholder="请输入手机号码" maxlength="11" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button plain @click="getValidateCode" :disabled="getCode" :loading="codeLoad" size="small">{{getValidateCodeText}}</el-button>
            </el-form-item>
            <el-form-item label="验证码" prop="validateCode">
              <el-input v-model.trim="form.validateCode" placeholder="请输入验证码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="登录用户名" prop="username" label-width="100px" v-if="showUser">
              <el-input v-model.trim="form.username" placeholder="请输入4-32位以字母开头的字符" maxlength="200" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
              <el-input type="password" v-model.trim="form.password" placeholder="请输入8-16位数字和字母" maxlength="16" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repeatPassword">
              <el-input type="password" v-model.trim="form.repeatPassword" placeholder="请输入确认密码" maxlength="16" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="but_submit">
                <!--<el-button type="primary" @click="submitForm('form')" size="small" :loading="loading">提交</el-button>-->
                <!--<el-button type="primary" @click="resetForm('form')" size="small">重置</el-button>-->
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateAccount = (rule, value, callback) => {
      if(this.form.accountPassword != "" && value == ""){
        callback(new Error("请输入确认密码"));
      }else if(this.form.accountPassword != value){
        callback(new Error("两次输入密码不一致!"));
      }else {
        callback();
      }
    };
    return {
      // 国家
      countryList: [
        { value: "-1", name: "请选择" },
        { value: "86", name: "中国-大陆" },
        { value: "852", name: "中国-香港" },
        // { value: "63", name: "菲律宾" },
        // { value: "1", name: "美国" },
        // { value: "41", name: "瑞士" },
        // { value: "65", name: "新加坡" },
        // { value: "44", name: "英国" }
      ],
      // 验证方式
      validateList: [
        { value: "-1", name: "请选择验证方式" },
        { value: "0", name: "邮箱" },
        { value: "1", name: "手机" }
      ],
      getValidateCodeText: "获取验证码",
      loading: false, // loading
      form: {
        countryCode: null,
        orgCode: "",
        validateType: null,
        email: "",
        phone: "",
        validateCode: "",
        username: "",
        password: "",
        repeatPassword: "",
        accountPassword: "",
        repeatAccountPassword: ""
      },
      countTime: 30, // 验证码倒计时
      getCode: false, // 按钮禁用
      typeShow: true, // 验证方式显示
      // 验证
      rules: {
        countryCode: [
          { required: true, message: "请选择国家代码", trigger: "change" }
        ],
        orgCode: [
          { required: true, message: "请输入机构代码", trigger: "change" }
        ],
        validateType: [
          { required: true, message: "请选择验证方式", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入电子邮箱", trigger: "change" },
          {
            pattern: /^[a-zA-Z0-9]+([\.\-\_]?[a-zA-Z0-9]+)*@[a-zA-Z0-9%][a-zA-Z0-9%\-]*(.[a-zA-Z0-9%\/\-]+)+$/,
            message: "邮箱格式不正确"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "change" },
          { pattern: /^1\d{6,10}$/, message: "手机号码格式错误" }
        ],
        validateCode: [
          { required: true, message: "请输入验证码", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 8, max: 16, message: "长度在 8 到 16 个字符" },
          { pattern: /^[0-9a-zA-Z]+$/, message: "新密码必须包含数字和字母" },
          {
            pattern: /^[A-Za-z0-9]*[A-Za-z]+[A-Za-z0-9]*$/,
            message: "新密码必须包含字母"
          },
          // {
          //   pattern: /^[A-Za-z0-9]*[0-9]+[A-Za-z0-9]*$/,
          //   message: "新密码必须包含数字"
          // },
          // {
          //   pattern: /^[A-Za-z0-9]*[A-Z]+[A-Za-z0-9]*$/,
          //   message: "新密码必须包含大写字母和小写字母"
          // },
          // {
          //   pattern: /^[A-Za-z0-9]*[a-z]+[A-Za-z0-9]*$/,
          //   message: "新密码必须包含大写字母和小写字母"
          // }
        ],
        repeatPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        accountPassword: [
          { required: false, message: "请输入资金密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符" },
          { pattern: /^[0-9a-zA-Z]+$/, message: "资金密码必须包含数字和字母" },
        ],
        // 确认资金密码
        repeatAccountPassword: [
          { required: false, message: "请输入确认密码", trigger: "blur" },
          { validator: validateAccount, trigger: "blur" }
        ],
        username: [
          { required: false, message: "请输入用户登录名", trigger: "blur" },
        ]
      },
      codeLoad: false,
      showUser: false
    };
  },
  methods: {
    getValidateCode() {
      let that = this;
      let params = {
        countryCode: this.form.countryCode,
        orgNum: this.form.orgCode,
        validType: this.form.validateType,
        validInfo:
          this.form.validateType == "0" ? this.form.email : this.form.phone
      };
      this.codeLoad = true;
      this.getCode = true;
      that.$emit('loading', true);
      that.com.postData(that, that.com.getApi('validcode'), params, res =>{
        that.$emit('loading', false);
        that.getCode = true;
        if (res.code === "000000") {
          if (that.form.validateType == 0) {
            that.$message.success("邮件已发送,请去邮箱查看验证码");
          } else {
            that.$message.success("短信已发送,请去短信查看验证码");
          }
          that.countDown();
        } else {
          that.$message.error(res.message);
          clearInterval(that.interval);
          that.getValidateCodeText = "获取验证码";
          that.codeLoad = false;
        }
        this.getCode = false;
      }); 
    },
    // 验证码倒计时
    countDown() {
      this.countTime = 30;
      this.interval = setInterval(() => {
        this.codeLoad = true;
        this.getCode = true;
        this.countTime--;
        if (this.countTime > 0) {
          this.getValidateCodeText = this.countTime + "  秒后可重新获取";
          return;
        }
        clearInterval(this.interval);
        this.getValidateCodeText = "重新获取验证码";
        this.codeLoad = false;
        this.getCode = false;
      }, 1000);
    },
    changeType() {
      console.log(this.form.validateType);
      if (this.form.validateType == "0") {
        this.form.email = "";
      } else if (this.form.validateType == "1") {
        this.form.phone = "";
      }
    },
    // 上一步
    preStep(){
      let data = {    // 注册参数
        countryCode: this.form.countryCode,
        email: this.form.validateType == "0" ? this.form.email : "",
        loginName: this.form.username,
        orgCode: this.form.orgCode,
        password: this.form.password,
        repeatPassword: this.form.repeatPassword,
        phone: this.form.validateType == "1" ? this.form.phone : "",
        registerIp: '',
        validCode: this.form.validateCode,
        validType: this.form.validateType,
        accountPassword: this.form.accountPassword,   // 资金密码
        repeatAccountPassword: this.form.repeatAccountPassword,
        direction: 'pre'       // 操作方向
      }

      sessionStorage.setItem('registerInfo', JSON.stringify(data));
      this.$emit('register', data);
    },
    // 提交并跳到下一步
    nextStep(form) {
      let that = this;
      that.$refs.form.validate(v => {
        let data = {  // 注册参数
          countryCode: that.form.countryCode,
          email: that.form.validateType == "0" ? that.form.email : "",
          loginName: that.form.username,
          orgCode: that.form.orgCode,
          password: that.form.password,
          repeatPassword: this.form.repeatPassword,
          phone: that.form.validateType == "1" ? that.form.phone : "",
          registerIp: '',
          validCode: that.form.validateCode,
          validType: that.form.validateType,
          validStatus: v,         // 审核状态
          accountPassword: that.form.accountPassword, // 资金密码
          repeatAccountPassword: that.form.repeatAccountPassword,
          direction: 'next'       // 操作方向
        }

        sessionStorage.setItem('registerInfo', JSON.stringify(data));
        if(v){
          that.$emit('register', data);
        }
      });
    },
    // 清空表单
    resetForm(form) {
      this.$refs.form.resetFields();
    },
    // 返回登录
    goLogin() {
      this.$router.push();
    },
    // 获取配置文件设置验证方式
    getConfig() {
      setTimeout(() => {
        let settings = JSON.parse(sessionStorage.getItem("gtSetting"));
        let gtNexConfig = JSON.parse(sessionStorage.getItem("gtNexConfig"));
        if (settings != undefined && settings != "" && settings != null) {
          if (settings.supportEmail === false &&
            settings.supportPhone === true
          ) {
            this.typeShow = false;
            this.form.validateType = 1;
          } else if (
            settings.supportPhone === false &&
            settings.supportEmail === true
          ) {
            this.typeShow = false;
            this.form.validateType = 0;
          } else if (
            settings.supportPhone === false &&
            settings.supportEmail === false
          ) {
            this.typeShow = false;
            return;
          } else {
            this.typeShow = true;
            return;
          }
        } else if (
          gtNexConfig != undefined &&
          gtNexConfig != "" &&
          gtNexConfig != null
        ) {
          if (
            gtNexConfig.config.supportEmail === false &&
            gtNexConfig.config.supportPhone === true
          ) {
            this.typeShow = false;
            this.form.validateType = 1;
          } else if (
            gtNexConfig.config.supportPhone === false &&
            gtNexConfig.config.supportEmail === true
          ) {
            this.typeShow = false;
            this.form.validateType = 0;
          } else if (
            gtNexConfig.config.supportPhone === false &&
            gtNexConfig.config.supportEmail === false
          ) {
            this.typeShow = false;
            return;
          } else {
            this.typeShow = true;
            return;
          }
        }
      }, 1000);
    },
    // 是否显示用户名
    getDiv() {
      let that = this;
      let urlParams = JSON.parse(that.com.getUrlParam('params'));  // 获取浏览器参数
      if(JSON.stringify(urlParams) != '{}'){  // 存在参数
        if(urlParams && urlParams.supportEmail != undefined && urlParams.supportPhone != undefined){
          if(urlParams.supportEmail === false && urlParams.supportPhone === true){
            that.typeShow = false;
            that.form.validateType = 1;
          }else if(urlParams.supportPhone === false && urlParams.supportEmail === true){
            that.typeShow = false;
            that.form.validateType = 0;
          }else if(urlParams.supportPhone === false && urlParams.supportEmail === false){
            that.typeShow = false;
          }else {
            that.typeShow = true;
          }
        }
        if(urlParams && urlParams.needUserName != undefined && urlParams.needUserName === true){
          that.showUser = true;
        }else{
          that.showUser = false;
        }
      }
    },
    // 扫描二维码的带来的机构参数
    getOrg() {
      let that = this;
      let orgNames = that.com.getUrlParam('om');
      if (orgNames != "" && orgNames != undefined && orgNames != null) {
        that.form.orgCode = orgNames;
      }
    },
    // 获取registerInfo
    getRegisterInfo(){
      let regInfo = JSON.parse(sessionStorage.getItem('registerInfo'));
      if(regInfo){
        this.form.validateType = regInfo.validType;
        this.form.validateCode = regInfo.validCode;
        this.form.orgCode = regInfo.orgCode;
        this.form.countryCode = regInfo.countryCode;
        this.form.email = regInfo.email;
        this.form.phone = regInfo.phone;
        this.form.username = regInfo.loginName;
        this.form.password = regInfo.password;
        this.form.repeatPassword = regInfo.repeatPassword;
        this.form.accountPassword = regInfo.accountPassword;
        this.form.repeatAccountPassword = regInfo.repeatAccountPassword;
      }
    }
  },
  mounted() {
    this.getConfig();
    this.getDiv();
    this.getOrg();
    this.getRegisterInfo();
  },
  destroyed() {
    // this.removeBlur();
  }
};
</script>

<style lang="scss" scope>
.register {
  font-size: 12px;
  .left-img {
    display: none;
  }
  .el-select {
    width: 100% !important;
  }
  .el-form-item__content {
    line-height: 30px;
  }
  .el-form-item__label {
    line-height: 30px;
    text-align: left;
  }
  .el-input__icon {
    line-height: 30px;
  }
  .el-input__inner {
    height: 30px;
    line-height: 30px;
    //width: 294px;
    width: 100%;
  }
}
.but_submit {
  display: flex;
  justify-content: center;
  align-items: center;
  button{
    width: 45%;
  }
}
@media screen and (min-width: 320px) and (max-width: 450px) {
  .register {
    form.el-form.demo-form {
      padding: 20px;
    }
    .el-form-item__content {
      float: inherit;
      margin: auto !important;
      width: 100%;
    }
    .el-input__inner {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 14px;
    }
    button.el-button {
      margin-top: 10px;
    }
    label.el-form-item__label {
      width: 100% !important;
      margin: auto;
      display: block;
      float: inherit;
    }
  }
}
@media screen and (max-width: 450px) and (min-width: 320px) {
  .open-account .el-form-item {
    width: 100% !important;
    margin: 0 auto 15px;
  }
}
@media screen and (min-width: 451px) {
  .register {
    form.el-form.demo-form {
      padding: 24px 0px;
      width: 414px;
      margin: auto;
    }
    label.el-form-item__label {
      width: 294px;
    }
    .el-form-item {
      margin-bottom: 20px !important;
    }
  }
}
@media screen and (min-width: 320px) and (max-width: 820px) {
  .register {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
}
@media screen and (min-width: 820px) {
  .register {
    .flex {
      display: flex;
      flex-wrap: wrap;
      max-width: 820px;
      height: 535px;
      width: 100%;
      // position: fixed;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%, -50%);
      // border: 1px solid #eeeeee;
    }
    .right-text {
      width: 520px;
      margin: auto;
    }
  }
}
</style>