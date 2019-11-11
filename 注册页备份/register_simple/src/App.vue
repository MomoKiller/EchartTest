<template>
  <div id="app">
    <div class="main-wrap">
      <el-form :model="registerform" 
        :rules="rules" 
        label-position="left"
        ref="registerform" label-width="110px" 
        class="commit-form" size="small">
        <el-form-item label="国家代码" prop="countryCode">
          <el-select v-model="registerform.countryCode" placeholder="请选择">
            <el-option label="请选择" value="-1"></el-option>
            <el-option label="中国-大陆" value="CN"></el-option>
            <el-option label="中国-香港" value="HK"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构代码" prop="orgNum">
          <el-input v-model="registerform.orgNum"></el-input>
        </el-form-item>
        <el-form-item label="验证方式" prop="validType">
          <el-select v-model="registerform.validType" placeholder="请选择">
            <el-option label="请选择" value="-1"></el-option>
            <el-option label="手机" value="1" v-show="supportPhone"></el-option>
            <el-option label="邮箱" value="0" v-show="supportEmail"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="validPhone" v-if="showPhone">
          <el-input v-model="registerform.validPhone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="validEmail" v-if="showEmail">
          <el-input v-model="registerform.validEmail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="codeBtnState" class="btn-right" @click="getVerCode()">获取验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="registerform.code"></el-input>
        </el-form-item>
        <el-form-item label="登录用户名" prop="loginName">
          <el-input v-model="registerform.loginName"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="registerform.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="registerform.confirmPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerform')">提交</el-button>
          <el-button @click="resetForm('registerform')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    // 验证码
    let validateCode = (rule, value, callback) => {
      if(value == ''){
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
     // 选择
    let validateCountry = (rule, value, callback) => {
      if(value == '' || value == '-1'){
        callback(new Error("请选择"));
      } else {
        callback();
      }
    };
     // 机构号
    let validateOrgnum = (rule, value, callback) => {
      if(value == ''){
        callback(new Error("请输入机构号"));
      } else {
        callback();
      }
    };
     // 验证类型
    let validateType = (rule, value, callback) => {
      if(value == '' || value == '-1'){
        callback(new Error("请选择"));
      } else {
        callback();
      }
    };
    //手机号 || 邮箱
    let validatePhone = (rule, value, callback) => {
      if (/^1[34578]{1}\d{9}$/.test(value) == false) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
     // 登录用户名
    let validateName = (rule, value, callback) => {
      if(/^[a-zA-Z]\w{0,19}$/.test(value) == false && value != ''){
        callback(new Error("用户名必须以字母开头"));
      } else {
        callback();
      }
    };
     // 确认
    let validateConfirm = (rule, value, callback) => {
      if(this.registerform.password != value){
        callback(new Error("新密码与原密码不一致"));
      } else {
        callback();
      }
    };
    return {
      codeBtnState: false,  // 获取验证码按钮状态
      registerform: {
        code: '', // 验证码
        countryCode: '',
        orgNum: '', // 机构号
        validType: '',
        // validInfo: '',
        validPhone: '', // 手机号
        validEmail: '', // 邮箱
        loginName: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        code: [
          { required: true, message: "请输验证码", trigger: "blur" },
          { validator: validateCode, trigger: "blur" }
        ],
        countryCode: [
          { required: true, message: "请选择", trigger: "blur" },
          { validator: validateCountry, trigger: "blur" }
        ],
        orgNum: [
          { required: true, message: "请输入机构号", trigger: "blur" },
          { validator: validateOrgnum, trigger: "blur" }
        ],
        validType: [
          { required: true, message: "请选择", trigger: "blur" },
          { validator: validateType, trigger: "blur" }
        ],
        validPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        validEmail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        loginName: [
          { required: false, message: "请输入用户名", trigger: "blur" },
          { validator: validateName, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "密码长度在6-20之间", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { min: 6, max: 20, message: "密码长度在6-20之间", trigger: "blur" },
          { validator: validateConfirm, trigger: "blur" }
        ]
      },
      supportEmail: true, // 下拉展示email  
      supportPhone: true  // 下拉展示phone
    };
  },
  mounted(){  // 
    let that = this;
    let params = JSON.parse(that.com.getUrlParam('params'));
    if(params != "" && params != null){
      that.supportEmail = params.supportEmail;
      that.supportPhone = params.supportPhone;
      if(params.needUserName){  // 用户名是否必填
        that.rules.loginName[0].required = params.needUserName;
      }
    }
  },
  methods: {
    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.register();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取验证码
    getVerCode(){
      this.$router.push("/foo");
      // this.$router.push({name: "Success", params: {}});
      return;


      let that = this;
      let validInfo = '';
      if(that.registerform.validType == "1"){ // 手机号
        validInfo = that.registerform.validPhone;
      }else if(that.registerform.validType == "0"){ // 邮箱
        validInfo = that.registerform.validEmail;
      }
      let d = {
        countryCode: that.registerform.countryCode,
        orgNum: that.registerform.orgNum,
        validInfo: validInfo,
        validType: that.registerform.validType
      };
      that.codeBtnState = true;
      that.com.postData(that, that.com.getApi('validcode'), d, (res)=>{
        that.codeBtnState = false;
        if(res){
          if(res.code == '000000'){
            this.$message.success('短信已发送,请去短信查看验证码');
          }else{
            this.$message.error(res.message);
          }
        }else{
          this.$message.error('信息发送失败，请稍后再试');
        }
      });
    },
    // 注册
    register(){
      let that = this;
      let d = {
        code: that.registerform.code,
        createUserSecurityV: {
          countryCode: that.registerform.countryCode,
          email: that.registerform.validEmail,
          phone: that.registerform.validPhone,
          loginName: that.registerform.loginName,
          orgCode: that.registerform.orgNum,
          password: that.registerform.password,
        },
        validType: that.registerform.validType
      };
      that.com.postData(that, that.com.getApi('register'), d, (res) => {
        if(res){
          if(res.code == '000000'){
            this.$message.success('注册成功，请前往登录页登录');
          }else{
            this.$message.error(res.message);
          }
        }else{
          this.$message.error('注册失败，请稍后再试');
        }
      });
    }
  },
  computed: {
    showPhone(){  // 展示手机号
      return this.registerform.validType == "1" ? 1 : 0 ;
    },
    showEmail(){  // 展示邮箱
      return this.registerform.validType == "0" ? 1 : 0 ;
    }
  }
};
</script>

<style>
  html, body{
    height: 100%;
    width: 100%;
    color: #333333;
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* position: relative; */
    height: 100%;
    width: 100%;
  }
  .main-wrap{
    /* 
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    */
    max-width: 820px;
    width: 100%;
    height: 570px;
    border: 1px solid #eee;
    position: relative;
  }
  .main-wrap .commit-form{
    width: 414px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .el-select{
    width: 100%;
  }
  .btn-right{
    float: left;
  }
</style>