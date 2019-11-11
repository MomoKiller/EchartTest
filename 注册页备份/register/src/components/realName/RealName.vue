<template>
    <div class="content_box">
        <div class="real-name">
            <el-form :model="form" ref="form" label-width="120px" class="demo-form">
                <el-col :span="24">
                <h3 class="grid-content bg-purple-dark">实名信息</h3>
                </el-col>
                <el-row>
                <el-col :span="24" :sm="12">
                    <el-form-item label="客户姓名(中文)">
                        <el-input v-model.trim="form.nameCn" placeholder="请输入客户姓名(中文)" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                    <el-form-item label="联系方式">
                        <el-input v-model.trim="form.mobile" placeholder="请输入联系方式" maxlength="11" auto-complete="off" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                    <el-form-item label="电子邮箱">
                        <el-input v-model.trim="form.email" placeholder="请输入电子邮箱" maxlength="200" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                    <el-form-item label="证件类型">
                    <el-select v-model.trim="form.idType" disabled>
                        <el-option v-for="item in certificateList" :label="item.name" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                    <el-form-item label="证件号码">
                        <el-input v-model.trim="form.idNo" placeholder="请输入证件号码" maxlength="200" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="phono1 || phono2 || phono3 || phono4">
                    <el-form-item label="证件照">
                    <el-row>
                        <el-col :xs="24" :sm="8" v-if="phono1">
                          <div class="upload">
                              <div class="cha"><img :src="form.imgUrl"></div>
                              <div class="load" :class="backg1?'load1':'none'">
                              </div>
                          </div>
                          <p class="text-center">身份证正面</p>
                        </el-col>
                        <el-col :xs="24" :sm="8" v-if="phono2">
                          <div class="upload">
                              <div class="cha"><img :src="form.imgUrl1"></div>
                              <div class="load" :class="backg2?'load2':'none'" :loading="loading">
                              </div>
                          </div>
                          <p class="text-center">身份证背面</p>
                        </el-col>
                        <el-col :xs="24" :sm="8" v-if="phono3">
                          <div class="upload">
                              <div class="cha"><img :src="form.imgUrl2"></div>
                              <div class="load" :class="backg3?'load3':'none'">
                              </div>
                          </div>
                          <p class="text-center">手持身份证</p>
                        </el-col>
                        <el-col :xs="24" :sm="8" v-if="phono4">
                          <div class="upload">
                              <div class="cha"><img :src="form.imgUrl3"></div>
                              <div class="load" :class="backg4?'load4':'none'">
                              </div>
                          </div>
                          <p class="text-center">银行卡照片</p>
                        </el-col>
                    </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <h3 class="grid-content bg-purple-dark">银行信息</h3>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="银行属地">
                    <el-select v-model.trim="form.bankCardType" disabled>
                        <el-option v-for="item in bankCardTypeList" :label="item.name" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==2">
                    <el-form-item label="银行名称">
                    <el-select v-model.trim="form.bankName" disabled>
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="item in bankList" :key="item.id" :label="item.bankName" :value="item.bankName"></el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==2">
                    <el-form-item label="银行卡号">
                    <el-input v-model.trim="form.bankCardNo" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==2">
                    <el-form-item label="支行名称">
                    <el-input placeholder="支行名称" v-model.trim="form.bankBranchName" icon="el-icon-caret-bottom" disabled></el-input>
                    <el-card class="box-card" v-if="isShowSelect">
                        <div class="bank" v-for="(item,index) of bankData" :key="index">{{item.bankName}}---{{item.bankNo}}</div>
                        <div>
                        <el-pagination :current-page.sync="pageParams.page" :page-size="5" layout="total, prev, pager, next" :total="pageParams.total">
                        </el-pagination>
                        </div>
                    </el-card>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==2">
                    <el-form-item label="支行行号">
                    <el-input v-model.trim="form.bankBranchCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==1">
                    <el-form-item label="银行名称">
                        <el-input v-model.trim="form.bankName" placeholder="请输入银行名称" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==1">
                    <el-form-item label="SWIFT编码">
                        <el-input v-model.trim="form.bankCode" placeholder="请输入SWIFT编码" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==1">
                    <el-form-item label="CNY人民币">
                        <el-input v-model.trim="form.bankCardNo" placeholder="请输入CNY人民币" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==1">
                    <el-form-item label="HKD港元">
                        <el-input v-model.trim="form.bankCardNo1" placeholder="请输入HKD港元" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==1">
                    <el-form-item label="USD美元">
                        <el-input v-model.trim="form.bankCardNo2" placeholder="请输入USD美元" disabled></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
            </el-form>

            <div class="foot">
                <p>
                注意<br>
                1. 实名信息一旦审核通过将无法修改<br>
                2. 签约时的“开户姓名”需要和实名信息中的“真实姓名”一致，否则无法提现。<br>
                3. 签约时的“证件号码”需要和实名信息中的“证件号码”一致，否则无法提现。
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['registData', 'gtStatus'],  // 注册信息
  data() {
    return {
      isShowSelect: false,            // 展示支行下拉
      isOpenSelect: false,            // 打开测试
      allowShowBank: true,           // 允许展示下拉
      form: {
        nameUs: "",
        nameCn: "",
        sex: 0,
        birthDay: null,
        nationality: "",
        birthPlace: "",
        mobile: "",
        telNo: "",
        email: "",
        address: "",
        correspondingAddress: "",
        idNo: "",
        idPlace: "",
        idType: 44,
        chFId: "", // 手持
        cpFId: "", // 正面
        cbFId: "", // 反面
        issuedOrgan: "",
        startProcess: true,
        validityEndTime: null,
        validityStartTime: null,
        certificateType: 44,
        bankCardType: 2,
        bankCardName: "",
        bankBranchName: "",
        bankCode: "", // 银行代码(SWIFT编码)
        bankName: "", // 银行名称
        bankId: "",
        bankBranchCode: "", // 支行代码
        bankCardNo: "", // 银行卡卡号(CNY人民币)
        bankCardNo1: "", // 银行卡卡号1(HKD港元)
        bankCardNo2: "", // 银行卡卡号2(USD美元)
        imgUrl: require("@/assets/imgs/ccpFId.jpg"),
        imgUrl1: require("@/assets/imgs/ccbFId.jpg"),
        imgUrl2: require("@/assets/imgs/cchFId.jpg"),
        imgUrl3: require("@/assets/imgs/bank.jpg"),
        // 上传文件
        files: [{
            file: '',
            fileName: '',
            fileType: 1,
            tonken: ''
        },{
            file: '',
            fileName: '',
            fileType: 2,
            tonken: ''
        },{
            file: '',
            fileName: '',
            fileType: 3,
            tonken: ''
        },{
            file: '',
            fileName: '',
            fileType: 5,
            tonken: ''
        }]
      },
      dialogImageUrl: "",
      dialogVisible: false,
      loading: true,
      imgsrc: this.com.getUrl(),
      certificateList: [
        { value: 44, name: "身份证" }
      ],
      bankCardTypeList: [
        { value: 2, name: "国内" }
      ],
      picavalue: "",
      isEnlargeImage: false,
      backg1: true,
      backg2: true,
      backg3: true,
      backg4: true,
      flag: false, //下一步判断
      bankList: [], // 银行
      bankData: [], // 支行名称
      restaurants: [],
      newBankData: [],
      codeType: "",
      pageParams: {
        page: 1,
        rows: 5,
        total: 0
      },
      phono1: false,
      phono2: false,
      phono3: false,
      phono4: false,
      pho1: false,
      pho2: false,
      pho3: false,
      pho4: false,
      pho5: false,
      pho6: false,
      pho7: false,
      pho8: false,
      bankDataMsg: [] // 支行信息
    };
  },
  methods: {
    // 获取银行
    getBank() {
        let that = this;
        that.form.bankBranchName = "";
        that.form.bankBranchCode = "";
        that.$emit('loading', true);
        that.com.postStringfy(that, that.com.getApi('mainbank'), {}, res =>{
          that.$emit('loading', false);
          if( res && res.code == '000000'){
              that.bankList = JSON.parse(res.content);
              that.bankList.map(v => {
                if (that.form.bankName === v.bankName) {
                  that.form.bankCode = v.id;
                  that.bankId = v.id;
                  that.changeBank(that.bankId);
                }
              });
          }else{
            that.$message.error(res.message);
          }
        });
    },
    // 如果驳回跳转过来
    getMsg() {
      let that = this;
      that.$emit('loading', true);
      that.com.getData(that, that.com.getApi('openaccount'), {}, res =>{
        that.$emit('loading', false);
        if (res.code === "000000") {
          let userlist = JSON.parse(res.content);
          if (userlist.personal != "" && userlist.personal != undefined && userlist.personal != null) {
              that.form.email = userlist.personal.email //|| userlist.user.user.email;
              that.form.mobile = userlist.personal.phone //|| userlist.user.user.phone;
              that.form.address = userlist.personal.address;
              that.form.bankBranchCode = userlist.personal.bankBranchCode;
              that.form.bankBranchName = userlist.personal.bankBranchName;
              that.form.bankCardNo = userlist.personal.bankCardNo;
              that.form.bankCardNo1 = userlist.personal.bankCardNo1;
              that.form.bankCardNo2 = userlist.personal.bankCardNo2;
              that.form.bankCardType = (userlist.personal.bankCardType == 0) ? "请选择" : userlist.personal.bankCardType;
              that.form.bankCode = userlist.personal.bankCode;
              that.form.bankName = userlist.personal.bankName;
              that.form.birthDay = userlist.personal.birthDay;
              that.form.birthPlace = userlist.personal.birthPlace;
              that.form.correspondingAddress = userlist.personal.correspondingAddress;
              that.form.createTime = userlist.personal.createTime;
              that.form.id = userlist.personal.id;
              that.form.idNo = userlist.personal.idNo;
              that.form.idPlace = userlist.personal.idPlace;
              that.form.idType = 44;
              that.form.mobile = userlist.personal.mobile;
              that.form.nameCn = userlist.personal.nameCn;
              that.form.nameUs = userlist.personal.nameUs;
              that.form.nationality = userlist.personal.nationality;
              that.form.sex = ~~userlist.personal.sex;
              that.form.telNo = userlist.personal.telNo;
              that.form.updateTime = userlist.personal.updateTime;
              that.$emit('loading', true);
              let finashedImg = 0;
              that.com.getData(that, that.com.getApi('download1'), {}, res => {
                finashedImg ++;
                if(finashedImg >=4){
                  that.$emit('loading', false);
                }
                that.form.files[0].fileName = 'pic1';
                that.form.files[0].file = res.content;
                that.form.imgUrl = "data:image/png;base64," + res.content;
              });
              that.com.getData(that, that.com.getApi('download2'), {}, res => {
                finashedImg ++;
                if(finashedImg >=4){
                  that.$emit('loading', false);
                }
                that.form.files[1].fileName = 'pic2';
                that.form.files[1].file = res.content;
                that.form.imgUrl1 = "data:image/png;base64," + res.content;
              });
              that.com.getData(that, that.com.getApi('download3'), {}, res => {
                finashedImg ++;
                if(finashedImg >=4){
                  that.$emit('loading', false);
                }
                that.form.files[2].fileName = 'pic3';
                that.form.files[2].file = res.content;
                that.form.imgUrl2 = "data:image/png;base64," + res.content;
              });
              that.com.getData(that, that.com.getApi('download5'), {}, res => {
                finashedImg ++;
                if(finashedImg >=4){
                  that.$emit('loading', false);
                }
                that.form.files[3].fileName = 'pic4';
                that.form.files[3].file = res.content;
                that.form.imgUrl3 = "data:image/png;base64," + res.content;
              });
          }
        } else{
          that.$message.error(res.message);
        }
      });
    },
    // 图片是否加载
    getPhoto() {
      let that = this;
      let urlParams = JSON.parse(that.com.getUrlParam('params'));  // 获取浏览器参数
      let gtNexConfig = JSON.parse(sessionStorage.getItem("gtNexConfig"));
      setTimeout(() => {
        if(urlParams){  // 参数
          this.phono1 = urlParams.certificateA ? true : false;
          this.phono2 = urlParams.certificateB ? true : false;
          this.phono3 = urlParams.certificateC ? true : false;
          this.phono4 = urlParams.certificateD ? true : false;
        }
        if(gtNexConfig){  // 配置文件
          this.phono1 = gtNexConfig.config.certificateA ? true : false;
          this.phono2 = gtNexConfig.config.certificateB ? true : false;
          this.phono3 = gtNexConfig.config.certificateC ? true : false;
          this.phono4 = gtNexConfig.config.certificateD ? true : false;
        }
      }, 500);
    },
  },
  mounted() {
    this.getPhoto();
    this.getBank();
    this.getMsg();
  }
};
</script>

<style lang="scss" scope>
.content_box {
  height: 100%;
  position: relative;
}
.danger {
  color: #f56c6c;
  margin-bottom: 10px;
}
p.text-center {
  width: 180px;
}
p.danger.text-center {
  width: 100%;
}
.real-name {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .upload {
    position: relative;
    width: 180px;
    height: 123px;
    border: 1px dashed #ccc;
    border-radius: 8px;
    p.posi1 {
      position: absolute;
      z-index: 100;
      background: red;
      width: 190px;
      text-align: center;
      color: #fff;
      bottom: -4px;
      left: -6px;
    }
    .cha {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      overflow: hidden;
      box-sizing: border-box;
      display: flex; 
      justify-content: center; 
      align-items: center; 
      img {
        border: none;
        max-width: 180px;
        max-height: 123px;
      }
    }
    .load {
      position: absolute;
      top: 0;
      left: 0;
      width: 178px;
      height: 121px;
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .none {
      background: none;
    }
  }

  .flex-center {
    display: flex;
    justify-content: center;
    margin-bottom: 20%;
    button.btn-left {
      width: 30%;
    }
  }

  .el-form-item__content {
    line-height: 30px;
    height: 30px;
  }
  .el-card.is-always-shadow{
    z-index: 100;
    position: absolute;
    width: 100%;
  }

  .el-form-item__label {
    line-height: 30px;
  }

  .el-input__icon {
    line-height: 30px;
  }

  .el-input__inner {
    height: 30px;
    line-height: 30px;
  }

  .flex-center,
  .foot {
    width: 100%;
  }

  .foot {
    padding: 0 2% 20px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 121px;
    display: block;
  }

  form.el-form.demo-form {
    padding: 20px;
  }
}

@media screen and (min-width: 320px) and (max-width: 414px) {
  .real-name {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    label.el-form-item__label {
      width: 100% !important;
      margin: auto;
      display: block;
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
      width: 100%;
      margin: 0 auto 15px;
    }

    .el-form-item__label {
      text-align: left !important;
      float: inherit;
    }
  }
}

@media screen and (min-width: 820px) {
  .real-name {
    display: flex;
    flex-wrap: wrap;
    width: 820px;
    max-height: 535px;
    overflow-y: auto;
    border-bottom: 1px solid #eee;
    .el-row .el-col.el-col-24:nth-child(2) {
      .el-input__inner {
        max-width: inherit;
        width: 100%;
      }
    }

    .flex-center {
      margin-bottom: 5%;
    }
  }
}
</style>