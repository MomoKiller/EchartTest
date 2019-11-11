<template>
    <div class="content_box">
        <div class="open-account" @click="closeBank">
            <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-form">
                <el-col :span="24">
                <h3 class="grid-content bg-purple-dark">实名信息</h3>
                </el-col>
                <el-row>
                <el-col :span="24" :sm="12">
                    <el-form-item label="客户姓名(中文)" prop="nameCn">
                    <el-input v-model.trim="form.nameCn" placeholder="请输入客户姓名(中文)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" v-if="supportPhone">
                    <el-form-item label="联系方式" prop="mobile">
                    <el-input v-model.trim="form.mobile" placeholder="请输入联系方式" maxlength="11" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" v-if="supportEmail">
                    <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model.trim="form.email" placeholder="请输入电子邮箱" maxlength="200"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                    <el-form-item label="证件类型" prop="idType">
                    <el-select v-model.trim="form.idType" disabled>
                        <el-option v-for="item in certificateList" :label="item.name" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                    <el-form-item label="证件号码" prop="idNo">
                    <el-input v-model.trim="form.idNo" placeholder="请输入证件号码" maxlength="200"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="phono1 || phono2 || phono3 || phono4">
                    <el-form-item label="证件照">
                    <el-row>
                        <el-col :xs="24" :sm="8" v-if="phono1">
                          <div class="upload">
                              <!--
                              <p class="posi1" v-if="pho1">图片正在上传...</p>
                              <p class="posi1" v-if="pho2">图片上传失败，请重新上传</p>
                              -->
                              <div class="cha"><img :src="form.imgUrl"></div>
                              <div class="load" :class="backg1?'load1':'none'">
                              <!--<input type="file" name="" @change="uploadIMG" action="https://jsonplaceholder.typicode.com/posts/">-->
                              <input type="file" @change="uploadIMG">
                              </div>
                          </div>
                          <p class="text-center">身份证正面</p>
                        </el-col>
                        <el-col :xs="24" :sm="8" v-if="phono2">
                          <div class="upload">
                              <!--
                              <p class="posi1" v-if="pho3">图片正在上传...</p>
                              <p class="posi1" v-if="pho4">图片上传失败，请重新上传</p>
                              -->
                              <div class="cha"><img :src="form.imgUrl1"></div>
                              <div class="load" :class="backg2?'load2':'none'" :loading="loading">
                              <!--<input type="file" name="" @change="uploadIMG1" action="https://jsonplaceholder.typicode.com/posts/">-->
                              <input type="file" @change="uploadIMG1">
                              </div>

                          </div>
                          <p class="text-center">身份证背面</p>
                        </el-col>
                        <el-col :xs="24" :sm="8" v-if="phono3">
                          <div class="upload">
                              <!--
                              <p class="posi1" v-if="pho5">图片正在上传...</p>
                              <p class="posi1" v-if="pho6">图片上传失败，请重新上传</p>
                              -->
                              <div class="cha"><img :src="form.imgUrl2"></div>
                              <div class="load" :class="backg3?'load3':'none'">
                              <!--<input type="file" name="" @change="uploadIMG2" action="https://jsonplaceholder.typicode.com/posts/">-->
                              <input type="file" @change="uploadIMG2">
                              </div>
                          </div>
                          <p class="text-center">手持身份证</p>
                        </el-col>
                        <el-col :xs="24" :sm="8" v-if="phono4">
                          <div class="upload">
                              <!--
                              <p class="posi1" v-if="pho7">图片正在上传...</p>
                              <p class="posi1" v-if="pho8">图片上传失败，请重新上传</p>
                              -->
                              <div class="cha"><img :src="form.imgUrl3"></div>
                              <div class="load" :class="backg4?'load4':'none'">
                              <!--input type="file" name="" @change="uploadIMG3" action="https://jsonplaceholder.typicode.com/posts/">-->
                              <input type="file" @change="uploadIMG3">
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
                    <el-form-item label="银行属地" prop="bankCardType">
                    <el-select v-model.trim="form.bankCardType" @change="getbankCardType" disabled>
                        <el-option v-for="item in bankCardTypeList" :label="item.name" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==2">
                    <el-form-item label="银行名称" prop="bankName">
                    <el-select v-model.trim="form.bankName" @change="getBank">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="item in bankList" :key="item.id" :label="item.bankName" :value="item.bankName"></el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==2">
                    <el-form-item label="银行卡号" prop="bankCardNo">
                    <el-input v-model.trim="form.bankCardNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==2">
                    <el-form-item label="支行名称" prop="bankBranchName" ><!-- v-clickoutside="handleClose" -->
                    <el-input placeholder="支行名称" 
                      v-model.trim="form.bankBranchName" 
                      icon="el-icon-caret-bottom"
                      @keyup.native="changeBank()" 
                      @click.native="showBank"
                    >
                      <template slot="append">
                        <el-button icon="el-icon-search" v-if="allowShowBank"></el-button>
                        <el-button slot="append" icon="el-icon-edit" v-if="!allowShowBank"></el-button>
                        <el-button slot="append" icon="el-icon-set-up" @click.native="switchWay"></el-button>
                      </template>
                    </el-input>
                    <el-card class="box-card" v-if="isShowSelect">
                        <div class="bank" v-for="(item,index) of bankData" :key="index" @click="setBank(item)">{{item.bankName}}---{{item.bankNo}}</div>
                        <div>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageParams.page" :page-size="5" layout="total, prev, pager, next" :total="pageParams.total">
                        </el-pagination>
                        </div>
                    </el-card>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==2">
                    <el-form-item label="支行行号" prop="bankBranchCode">
                    <el-input v-model.trim="form.bankBranchCode" :disabled="allowShowBank"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==1">
                    <el-form-item label="银行名称" prop="bankName">
                    <el-input v-model.trim="form.bankName" placeholder="请输入银行名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==1">
                    <el-form-item label="SWIFT编码" prop="bankCode">
                    <el-input v-model.trim="form.bankCode" placeholder="请输入SWIFT编码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==1">
                    <el-form-item label="CNY人民币" prop="bankCardNo">
                    <el-input v-model.trim="form.bankCardNo" placeholder="请输入CNY人民币"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==1">
                    <el-form-item label="HKD港元" prop="bankCardNo1">
                    <el-input v-model.trim="form.bankCardNo1" placeholder="请输入HKD港元"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form.bankCardType==1">
                    <el-form-item label="USD美元" prop="bankCardNo2">
                    <el-input v-model.trim="form.bankCardNo2" placeholder="请输入USD美元"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <!-- 
                <div class="flex-center">
                  <el-button type="primary" @click="submitForm('form')" :loading="loading" size="small" class="btn-left">提交</el-button>
                  <el-button @click="resetForm('form')" size="small">重置</el-button>
                </div>
                -->
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
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};
export default {
  props: ['registData', 'gtStatus'],  // 注册信息
  data() {
    return {
      isShowSelect: false,            // 是否显示
      isOpenSelect: false,            // 打开测试
      allowShowBank: true,            // 允许支行下拉
      supportEmail: true,
      supportPhone: true,
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
      rules: {
        nameCn: [
          { required: true, message: "请输入客户姓名(中文)", trigger: "blur" }
        ],
        idNo: [
          { required: true, message: "请输入证件号码", trigger: "blur" },
          {
            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
            message: "证件号码格式不正确"
          }
        ],
        issuedOrgan: [
          { required: true, message: "请输入通讯地址", trigger: "blur" }
        ],
        bankCardNo: [
          { required: true, message: "请输入银行卡号", trigger: "blur" }
        ],
        bankBranchName: [
          { required: false, message: "请选择支行名称", trigger: "change" }
        ],
        bankName: [
          { required: true, message: "请选择所属银行", trigger: "change" }
        ]
      },
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.loadAll();
    },
    // 去掉浏览器自带密码提示
    focusType() {
      this.$refs.input.type = "password";
    },
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
    setBank(row) {
      this.form.bankBranchCode = row.bankNo;
      this.form.bankBranchName = row.bankName;
      this.isShowSelect = false;
    },
    // 展示银行信息
    showBank(){
      if(this.pageParams.total == 0 && this.allowShowBank){
        this.$message.warning('请先选择银行');
        return;
      }
      if(this.allowShowBank){
        this.isOpenSelect = true;
        this.isShowSelect = !this.isShowSelect;
      } 
    },
    // 关闭支行信息
    closeBank(){
      if(!this.isOpenSelect && this.isShowSelect){
        this.isShowSelect = false;
      }
      this.isOpenSelect = false;
    },
    // 切换输入方式
    switchWay() {
      let that = this;
      setTimeout(() => {
        that.allowShowBank = !this.allowShowBank;
        that.isShowSelect = false;
        that.form.bankBranchCode = '';
        that.form.bankBranchName = '';
      });
    },
    changeBank(id) {
      if(this.allowShowBank)
      setTimeout(this.loadAll(id), 500);
    },
    loadAll(id) {
        let that = this;
        this.bankList.map(v => {
            if (this.bankId === v.id) {
            this.codeType = v.bankCode;
            }
        });
        let params = {
            page: this.pageParams.page,
            rows: this.pageParams.rows,
            group_A: "OR",
            search_A_LIKE_bankNo: this.form.bankBranchName,
            search_A_LIKE_bankName: this.form.bankBranchName,
            search_B_LLIKE_bankNo: this.codeType,
            search_B_LIKE_bankName: this.form.bankName
        };
        that.$emit('loading', true);
        that.com.postForm(that, that.com.getApi('bankPage'), params, res => {
          that.$emit('loading', false);
          if (res.code === "000000") {
            that.bankData = JSON.parse(res.content).content;
            that.pageParams.total = JSON.parse(res.content).totalElements;
          }else{
            that.$message.error(res.message);
          }
        });
    },
    //   part1
    uploadIMG(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.$message.closeAll();
      if (!files.length) return;
      this.picavalue = files[0];
      this.form.files[0].fileName = this.picavalue.name;
      if (this.picavalue.type == "image/jpeg" || this.picavalue.type == "image/jpg" || this.picavalue.type == "image/png") {
        this.imgPreview(this.picavalue);
      } else {
        this.$message.error("请上传格式正确的图片");
        return;
      }
    },
    //获取图片
    imgPreview(file, callback) {
      this.backg1 = false;
      let that = this;
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          img.onload = function() {
            that.pho1 = true;
            let data = that.compress(img);
            that.form.imgUrl = data;
            that.form.files[0].file = data.replace('data:image/jpeg;base64,', '');
          };
        };
      }
    },
    //     part2
    uploadIMG1(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.$message.closeAll();
      if (!files.length) return;
      this.picavalue = files[0];
      this.form.files[1].fileName = this.picavalue.name;
      if (this.picavalue.type == "image/jpeg" || this.picavalue.type == "image/jpg" || this.picavalue.type == "image/png" ) {
        this.imgPreview1(this.picavalue);
      } else {
        this.$message.error("请上传格式正确的图片");
        return;
      }
    },
    //获取图片
    imgPreview1(file, callback) {
      this.backg2 = false;
      let that = this;
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          img.onload = function() {
            that.pho3 = true;
            let data = that.compress(img);
            that.form.imgUrl1 = data;
            that.form.files[1].file = data.replace('data:image/jpeg;base64,', '');
          };
        };
      }
    },
    //     part3
    uploadIMG2(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.$message.closeAll();
      if (!files.length) return;
      this.picavalue = files[0];
      // this.form.imgName2 = this.picavalue.name;
      this.form.files[2].fileName = this.picavalue.name;
      if (this.picavalue.type == "image/jpeg" || this.picavalue.type == "image/jpg" || this.picavalue.type == "image/png") {
        this.imgPreview2(this.picavalue);
      } else {
        this.$message.error("请上传格式正确的图片");
        return;
      }
    },
    //获取图片
    imgPreview2(file, callback) {
      this.backg3 = false;
      let that = this;
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          img.onload = function() {
            that.pho5 = true;
            let data = that.compress(img);
            that.form.imgUrl2 = data;
            that.form.files[2].file = data.replace('data:image/jpeg;base64,', '');
          };
        };
      }
    },
    //     part4
    uploadIMG3(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.$message.closeAll();
      if (!files.length) return;
      this.picavalue = files[0];
      // this.form.imgName3 = this.picavalue.name;
      this.form.files[3].fileName = this.picavalue.name;
      if (this.picavalue.type == "image/jpeg" || this.picavalue.type == "image/jpg" || this.picavalue.type == "image/png") {
        this.imgPreview3(this.picavalue);
      } else {
        this.$message.error("请上传格式正确的图片");
        return;
      }
    },
    //获取图片
    imgPreview3(file, callback) {
      this.backg4 = false;
      let that = this;
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          img.onload = function() {
            that.pho7 = true;
            let data = that.compress(img);
            that.form.imgUrl3 = data;
            that.form.files[3].file = data.replace('data:image/jpeg;base64,', '');
          };
        };
      }
    },
    // 压缩图片
    compress(img) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);
      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);
      return ndata;
    },
    // base64转成bolb对象
    dataURItoBlob(base64Data) {
      let byteString;
      if (base64Data.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(base64Data.split(",")[1]);
      else byteString = unescape(base64Data.split(",")[1]);
      let mimeString = base64Data
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      let ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },
    getbankCardType() {
      if (this.form.bankCardType == 2) {
        this.form.bankName = "";
        this.form.bankCode = "";
        this.form.bankBranchName = "";
        this.form.bankBranchCode = "";
        this.form.bankCardNo = "";
      } else if (this.form.bankCardType == 1) {
        this.form.bankName = "";
        this.form.bankCode = "";
        this.form.bankCardNo = "";
        this.form.bankCardNo1 = "";
        this.form.bankCardNo2 = "";
      }
    },

    // 手机邮箱验证
    getCodes() {
      let that = this;
      if (that.isShowSelect === true) {
        that.$message.error("请选择正确的支行名称！");
        return false;
      }
      // 图片验证-不做校验
      // if((that.phono1 && that.form.files[0].fileName == '') || 
      //   (that.phono2 && that.form.files[1].fileName == '') || 
      //   (that.phono3 && that.form.files[2].fileName == '') || 
      //   (that.phono4 && that.form.files[3].fileName == '')
      //   ){
      //   that.$message.error("请选择上传所有有效证件照！");
      //   return false;
      // }
      let valid;
      that.$refs.form.validate(v => (valid = v));
      let params = {};
      params = JSON.parse(JSON.stringify(that.form));
      params['imgUrl']  = (that.form.files[0].fileName != '') ? that.form.imgUrl : '';
      params['imgUrl1'] = (that.form.files[1].fileName != '') ? that.form.imgUrl1 : '';
      params['imgUrl2'] = (that.form.files[2].fileName != '') ? that.form.imgUrl2 : '';
      params['imgUrl3'] = (that.form.files[3].fileName != '') ? that.form.imgUrl3 : '';
      params['bankCardName'] = that.form.nameCn;
      if(valid){
        that.$emit('accountData', params);
      }
    },
    // 实名验证
    submitForm() {
      this.loading = true;
      if (this.form.email != "") {
        let reg = new RegExp(/^[a-zA-Z0-9]+([\.\-\_]?[a-zA-Z0-9]+)*@[a-zA-Z0-9%][a-zA-Z0-9%\-]*(.[a-zA-Z0-9%\/\-]+)+$/);
        if (!reg.test(this.form.email)) {
          this.$message.error("请输入正确的邮箱格式！");
          return;
        }
      }
      if (this.form.mobile != "") {
        let reg1 = new RegExp(/^1\d{6,10}$/);
        if (!reg1.test(this.form.mobile)) {
          this.$message.error("请输入正确的手机格式！");
          return;
        }
      }
      this.getCodes();
      this.loading = false;
    },
    // 清空表单
    resetForm(form) {
      this.$refs.form.resetFields();
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
        } else {
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
          // 手机邮箱配置项
          this.supportPhone = urlParams.supportPhone ? true : false;
          this.supportEmail = urlParams.supportEmail ? true : false;
        }
        if(gtNexConfig){  // 配置文件
          this.phono1 = gtNexConfig.config.certificateA ? true : false;
          this.phono2 = gtNexConfig.config.certificateB ? true : false;
          this.phono3 = gtNexConfig.config.certificateC ? true : false;
          this.phono4 = gtNexConfig.config.certificateD ? true : false;
          // 手机邮箱配置项
          this.supportPhone = gtNexConfig.config.supportPhone ? true : false;
          this.supportEmail = gtNexConfig.config.supportEmail ? true : false;
        }
      }, 500);
    },
    handleClose(e) {
      this.isShowSelect = false;
    },
    // 上一步
    preStep(){
      sessionStorage.setItem('accountInfo', JSON.stringify(this.form));
    },
    // 实名信息参数
    getAccountInfo(){ 
      let registInfo = JSON.parse(sessionStorage.getItem('registerInfo'));
      let accoInfo = JSON.parse(sessionStorage.getItem('accountInfo'));
      if(accoInfo){
        this.form = {
          nameUs: accoInfo.nameUs,
          nameCn: accoInfo.nameCn,
          sex: accoInfo.sex,
          birthDay: accoInfo.birthDay,
          nationality: accoInfo.nationality,
          birthPlace: accoInfo.birthPlace,
          mobile: registInfo.phone || accoInfo.mobile,
          telNo: accoInfo.telNo,
          email: registInfo.email || accoInfo.email,
          address: accoInfo.address,
          correspondingAddress: accoInfo.correspondingAddress,
          idNo: accoInfo.idNo,
          idPlace: accoInfo.idPlace,
          idType: accoInfo.idType,
          chFId: accoInfo.chFId,
          cpFId: accoInfo.cpFId,
          cbFId: accoInfo.cbFId,
          issuedOrgan: accoInfo.issuedOrgan,
          startProcess: accoInfo.startProcess,
          validityEndTime: accoInfo.validityEndTime,
          validityStartTime: accoInfo.validityStartTime,
          certificateType: accoInfo.certificateType,
          bankCardType: accoInfo.bankCardType,
          bankCardName: accoInfo.bankCardName,
          bankBranchName: accoInfo.bankBranchName,
          bankCode: accoInfo.bankCode,
          bankName: accoInfo.bankName,
          bankId: accoInfo.bankId,
          bankBranchCode: accoInfo.bankBranchCode,
          bankCardNo: accoInfo.bankCardNo,
          bankCardNo1: accoInfo.bankCardNo1,
          bankCardNo2: accoInfo.bankCardNo2,
          imgUrl: accoInfo.imgUrl,
          imgUrl1: accoInfo.imgUrl1,
          imgUrl2: accoInfo.imgUrl2,
          imgUrl3: accoInfo.imgUrl3,
          files: accoInfo.files
        };
      }else if(registInfo){
        this.form.mobile = registInfo.phone;
        this.form.email = registInfo.email;
      }
    }
  },
  mounted() {
    // 待审|驳回|完成状态--获取信息
    if(this.gtStatus == this.com.accountStatus.regist_finash || 
      this.gtStatus == this.com.accountStatus.regist_audit ||
      this.gtStatus == this.com.accountStatus.regist_reject){
      this.getMsg();
    }
    this.getPhoto();
    // 获取银行
    this.getBank();
    window.addEventListener("message", function(event) {
      var input = document.getElementsByTagName("input");
      for (var i = 0, r = input.length; i < r; i++) {
        input[i].blur();
      }
    });
    // 获取用户信息
    this.getAccountInfo();
  },
  destroyed() {
    if (this.$refs.form != undefined) {
      this.$refs.form.resetFields();
    }
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
.open-account {
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
    // 图片展示
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

    //点击上传
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
    padding: 0 4% 20px;
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
  .open-account {
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
  .open-account {
    // display: flex;
    // flex-wrap: wrap;
    // width: 820px;
    // height: 520px;
    // overflow-y: auto;
    // position: fixed;
    // top: calc(50% - 25px);
    // left: 50%;
    // transform: translate(-50%, -50%);
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