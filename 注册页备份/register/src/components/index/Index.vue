<template>
    <div class="main-wrap" v-loading="loading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="content-wrap">
            <!--  免责声明  -->
            <disclaimer v-if="currentStep == 0" 
                @claimerConfirm="getClaimer" 
                @loading="getLoading"
            ></disclaimer>
            <!--  注册页面  -->
            <register v-if="currentStep == 1" ref="registComp" @register="getRegister" @loading="getLoading"></register>
            <!--  实名信息  --> 
            <open-account v-if="currentStep == 2" ref="accountComp" 
                v-bind:registData="registData" 
                v-bind:gtStatus="gtStatus" 
                @accountData="submitFormCall"
                @loading="getLoading"
            ></open-account>
            <!--  实名提交成功/失败  -->
            <success v-if="currentStep == 3" v-bind:loginInfo="loginInfo" @loading="getLoading"></success>
            <!--  驳回|重提|禁止开户  -->
            <rejected v-if="currentStep == 4" v-bind:gtStatus="gtStatus" @currentStep="getStep" @loading="getLoading"></rejected>
        </div>
        <!--  上下步骤  -->
        <div class="btn-wrap" v-bind:class="{'text-center': closeBtnShow}"> 
            <el-button class="pre-btn btn" @click="hisBack" size="small" v-if="hisBtnShow" type="primary">返回</el-button>
            <el-button class="pre-btn btn" @click="hisBack" size="small" v-if="closeBtnShow" type="primary">关闭</el-button>
            <el-button class="pre-btn btn" @click="preClick" size="small" v-if="preBtnShow" :disabled="preBtnAble">上一步</el-button>
            <el-button class="next-btn btn" @click="nextClick" size="small" v-if="nextBtnShow" :disabled="nextBtnAble">下一步</el-button>
            <el-button class="submit-btn btn" @click="submitForm" size="small" v-if="submitShow" type="primary">提交</el-button>
        </div>
    </div>
</template>

<script>
import Register from "@/components/register/Register.vue";
import Disclaimer from '@/components/disclaimer/Disclaimer.vue';
import OpenAccount from '@/components/openAccount/OpenAccount.vue';
import Success from '@/components/success/Success.vue';
import Rejected from '@/components/rejected/Rejected.vue';
export default {
    components: {
        Register,       // 注册组件
        Disclaimer,     // 免责声明
        OpenAccount,    // 实名信息
        Success,        // 成功页
        Rejected        // 驳回|重提
    },
    data() {
        return {
            currentStep: 0,
            isClaimerSure: Boolean(sessionStorage.getItem("claimerConfirm")) | false,    // 是否同意免责
            registData: {},     // 注册页数据
            accountData: {},    // 实名信息数据
            gtStatus: this.com.accountStatus.regist_normal,  // 用户接口状态
            loginInfo: {},      // 当前登录名称
            loading: false,     // 加载状态
            isQRCodeIn: false   // 是否扫二维码进入
        }
    },
    methods: {
        // 获取 loading 状态
        getLoading(data){
            this.loading = data;
        },
        // 驳回-获取当前步骤
        getStep(data){
            let that = this;
            that.currentStep = data;
            that.gtStatus = that.com.accountStatus.regist_reject;
        },
        // 上一步
        preClick() {
            let that = this;
            that.loading = true;
            if(that.currentStep == 1){   //
                that.$refs.registComp.preStep();
            }else if(that.currentStep == 2){
                that.$refs.accountComp.preStep();
            }
            if (this.currentStep-- < 1) this.currentStep = 0;
            
            setTimeout(()=>{
                that.loading = false;
            });
        },
        // 下一步
        nextClick(){
            let that = this;
            this.loading = true;
            if(this.currentStep == 1){   // 注册
                this.$refs.registComp.nextStep();
            }else{
                if (this.currentStep++ > 1) this.currentStep = 2;
            }
            setTimeout(() => {
                that.loading = false;
            });
        },
        // 同意免责
        getClaimer(data){
            this.isClaimerSure = data;
        },
        // 注册填写信息
        getRegister(data){
            if(data.direction == 'next' && data.validStatus){   // 下一步
                this.currentStep++;
                this.registData = data; // 注册数据
            }else if(data.direction == 'pre'){
                this.currentStep--;
            }
        },
        // 提交
        submitForm(){
            this.$refs.accountComp.submitForm();
        },
        /**
         * '实名填写' submitForm()事件回调，返回实名信息
         * accountData: 实名注册信息; registData: 注册信息
         */
        submitFormCall(data){
            let that = this;
            let isRegisting = false;                                                // 注册中状态(防重点击)
            that.accountData = data;
            let d = {
                accountType: {accountTypes: []},
                files: [{
                    file: that.accountData.imgUrl.replace('data:image/jpeg;base64,', ''),
                    fileName: that.accountData.imgName,
                    fileType: 1,
                    tonken: ''
                },{
                    file: that.accountData.imgUrl1.replace('data:image/jpeg;base64,', ''),
                    fileName: that.accountData.imgName1,
                    fileType: 2,
                    tonken: ''
                },{
                    file: that.accountData.imgUrl2.replace('data:image/jpeg;base64,', ''),
                    fileName: that.accountData.imgName2,
                    fileType: 3,
                    tonken: ''
                },{
                    file: that.accountData.imgUrl3.replace('data:image/jpeg;base64,', ''),
                    fileName: that.accountData.imgName3,
                    fileType: 5,
                    tonken: ''
                }],
                persionInfo: {
                    address: that.accountData.address,
                    bankBranchCode: that.accountData.bankBranchCode,
                    bankBranchName: that.accountData.bankBranchName,
                    bankCardName: that.accountData.bankCardName,
                    bankCardNo: that.accountData.bankCardNo,
                    bankCardNo1: that.accountData.bankCardNo1,
                    bankCardNo2: that.accountData.bankCardNo2,
                    bankCardType: that.accountData.bankCardType,
                    bankCode: that.accountData.bankCode,
                    bankName: that.accountData.bankName,
                    birthDay: that.accountData.birthDay,
                    birthPlace: that.accountData.birthPlace,
                    correspondingAddress: that.accountData.correspondingAddress,
                    email: that.accountData.email,
                    idNo: that.accountData.idNo,
                    idPlace: that.accountData.idPlace,
                    idType: that.accountData.idType,
                    mobile: that.accountData.mobile,
                    nameCn: that.accountData.nameCn,
                    nameUs: that.accountData.nameUs,
                    nationality: that.accountData.nationality,
                    sex: that.accountData.sex,
                    telNo: that.accountData.telNo,
                },
                register: {
                    countryCode: that.registData.countryCode,
                    email: that.registData.email,
                    loginName: that.registData.loginName,
                    orgCode: that.registData.orgCode,
                    password: that.registData.password,
                    phone: that.registData.phone,
                    registerIp: that.registData.registerIp,
                    validCode: that.registData.validCode,
                    validType: that.registData.validType,
                    // 资金密码:无资金密码使用密码
                    accountPassword: that.registData.accountPassword ? that.registData.accountPassword : that.registData.password    
                }
            };
            // 调用新注册接口
            if(!isRegisting){                                                       // 防重点击
                isRegisting = true;                                                 // 注册中状态
                if(that.gtStatus != that.com.accountStatus.regist_audit &&
                    that.gtStatus != that.com.accountStatus.regist_reject &&
                    that.gtStatus != that.com.accountStatus.regist_forbid &&
                    that.gtStatus != that.com.accountStatus.regist_outTime){        // 正常流程提交
                    that.loading = true;
                    that.com.postData(that, that.com.getApi('crmRegister'), d, res => {
                        that.loading = false;
                        isRegisting = false;
                        if(res && res.code == '000000'){
                            // 跳转到成功页面
                            that.currentStep = 3;
                            // 传递注册完成信息
                            that.loginInfo = { 
                                loginName: JSON.parse(res.content).user.user.loginName,
                                msg: that.registData.accountPassword ? '' : '资金密码为登录密码' 
                            }; 
                        }else{
                            that.$message.error(res.message);
                        }
                    });
                }else{                                                              // 驳回调用开启流程接口    
                    that.loading = true;                                                       
                    that.com.postData(that, that.com.getApi('personalInfo'), that.accountData, res => {
                        that.loading = false;   
                        // isRegisting = false;
                        if(res.code == '000000'){
                            that.loading = true;
                            that.com.postData(that, that.com.getApi('process'), {}, rles => {
                                that.loading = false; 
                                isRegisting = false;
                                if(rles.code == '000000'){
                                    that.currentStep = 3;
                                    that.$message.success("实名验证已成功,开启流程！");
                                    that.loginInfo = {
                                        loginName: JSON.parse(that.com.getUrlParam('params'))['j_username'] ? JSON.parse(that.com.getUrlParam('params'))['j_username'] : '',
                                        msg: that.registData.accountPassword ? '' : '资金密码为登录密码' 
                                    };
                                }
                            });
                        }else{
                            that.$message.error(res.message);
                        } 
                    });
                }
                setTimeout(()=>{
                    that.loading = false;
                    if(isRegisting){                                                // 5s 后还是注册中状态
                        isRegisting = false;
                        that.$message.warning("网速较慢，请稍后再试!");
                    }
                }, 5000);
            }
        },
        // 返回
        hisBack(){
            setTimeout(() => {
                window.parent.postMessage("close", "*");
            }, 100);
        },
        // 判断驳回|审核|禁止|超时 状态
        ifRejected(){
            let that = this;
            let urlP = JSON.parse(that.com.getUrlParam('params'));
            if(urlP && urlP['j_orgcode'] != undefined && urlP['j_username'] != undefined && urlP['j_password'] != undefined){
                that.loading = true;
                that.com.getData(that, that.com.getApi('openaccount'), {}, rels => {
                    that.loading = false;
                    if(rels.code == '000000'){
                        let status = JSON.parse(rels.content).status;
                        if(status == that.com.accountStatus.regist_audit || 
                            status == that.com.accountStatus.regist_reject || 
                            status == that.com.accountStatus.regist_forbid || 
                            status == that.com.accountStatus.regist_outTime){
                            that.currentStep = 4;
                            that.gtStatus = status;
                            sessionStorage.setItem('gtStatus', status);
                        }
                    }else if(rels.code == that.com.accountStatus.regist_outTime){   // 登录超时
                        that.currentStep = 4;
                        that.gtStatus = rels.code;
                        sessionStorage.setItem('gtStatus', rels.code);
                    }else{
                        that.$message.error(res.message);
                    }  
                });
            }
        },
        // 判断二维码
        ifQRCode(){
            let that = this;
            let urlOm = that.com.getUrlParam('om');
            let urlOn = that.com.getUrlParam('on');
            if(urlOm){  
                sessionStorage.setItem("orgNames", urlOm);
                that.currentStep = 0;   
                that.isQRCodeIn = true;
                if(urlOn){ 
                    let resUrl = that.com.getApi('config') + urlOn.toLowerCase() + '/config.json?time=' + Date.parse(new Date());
                    that.com.getData(that, resUrl, {}, res => {
                        let gtNexConfig = {
                            config: {
                                supportEmail: res.config.supportEmail,
                                supportPhone: res.config.supportPhone,
                                certificateA: res.config.certificateA,
                                certificateB: res.config.certificateB,
                                certificateC: res.config.certificateC,
                                certificateD: res.config.certificateD,
                                needUserName: res.config.needUserName
                            }
                        };
                        sessionStorage.setItem("gtNexConfig", JSON.stringify(gtNexConfig));
                    });
                }
            }
        }
    },
    computed: {
        hisBtnShow: function() {
            return this.currentStep == 0 && this.com.isMobile() && !this.isQRCodeIn;
        },
        preBtnShow: function(){
            return this.currentStep != 0 && this.currentStep < 3;
        },
        nextBtnShow: function(){
            return this.currentStep < 2;
        },
        submitShow: function(){
            return this.currentStep == 2;
        },
        closeBtnShow: function(){
            let that = this;
            let res = false;
            if(that.com.isMobile() && (that.currentStep == 4 || that.currentStep == 3) && !that.isQRCodeIn){    
                res = true
            }else{
                res = false;
            }
            return res; 
        },
        preBtnAble: function(){
            let that = this;
            let res = false;
            if(that.gtStatus != that.com.accountStatus.regist_audit &&
                that.gtStatus != that.com.accountStatus.regist_reject &&
                that.gtStatus != that.com.accountStatus.regist_forbid &&
                that.gtStatus != that.com.accountStatus.regist_outTime){   
                res = false;
            }else{
                res = true;
            }
            return res;
        },
        nextBtnAble: function(){
            let res = false;
            if(this.currentStep == 0){
                res = !this.isClaimerSure;
            }
            return res;
        }
    },
    mounted() {
        this.ifRejected();
        this.ifQRCode();
    }
}
</script>

<style lang="scss" scope>
.main-wrap{
    width: 100%;
    height: 100%;
    .content-wrap{
        height: calc(100% - 50px);
        overflow: hidden;
    }
    .btn-wrap{
        height: 48px;
        .btn{
            margin-top: 5px;
        }
        .pre-btn{
            margin-left: 2%;
        }
        .next-btn{
            float: right;
            margin-right: 2%;
        }
        .submit-btn{
            float: right;
            margin-right: 2%;
        }
    }
}
/* PC */
@media screen and (min-width: 820px) {
    .main-wrap{
        max-width: 820px;
        height: 535px;
        border: 1px solid #eee;
        .content-wrap{
            height: calc(100% - 50px);
            overflow: hidden;
        }
    }
}
</style>