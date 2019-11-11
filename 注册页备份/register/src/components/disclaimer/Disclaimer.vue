<template>
    <div class="disclaimer">
        <!--<com-header></com-header>-->
        <div class="text">
            <h2 class="text-center">免责声明</h2>
            <div class="iframe-wrap">
                <div class="iframe">
                    <p>1. 郑重提醒用户：市场有风险，投资需谨慎！平台作为市场交易居间平台，仅为投资者提供居间服务，交易结果由投资者自行承担（盈利100%全归用户，亏损也全由用户自行承担）。</p>
                    <p>2. 请用户注意：在交易过程中，信息传输有可能出现中断、停顿、延迟、数据错误等情况，平台将尽全力提供优质的服务，但不能保证所提供的信息及交易指令在传输过程中避免可能出现的中断、停顿、延迟、数据错误等情况，由此造成的损失平台将不负责。</p>
                    <p>3. 为了用户能顺利进行市场投资，平台将提供多种委托买卖方式，请务必详细了解各种委托买卖方式的具体操作步骤和规则，在使用一种委托方式无法顺利发送交易指令时，请使用其它方式进行交易。因未及时更换交易方式以致延误交易时机所产生的损失与平台无关。如遇突发情况无法正常交易，请联系客服人员或销售人员进行人工下单。</p>
                    <p>4. 在行情交易软件的使用过程中，有可能出现互联网网络异常、用户本地电脑或其他终端设备（手机、平板电脑等）异常、软件功能异常等情况，由此所导致的损失与平台无关。</p>
                    <p>5. 交易软件服务器止盈止损的设置如因网络和硬件问题软件重启导致服务器端止损止盈失效，由此造成的损失平台将不负责，平台不承担由此出现的任何责任和风险。</p>
                    <p>6. 不可抗力因素导致的损失：诸如地震、火灾、水灾、战争等不可抗力因素可能导致交易系统的瘫痪；与交易系统连接的市场营业部、服务器托管机房和网络运营商，他们无法控制和不可预测的系统故障、设备故障、通讯故障、电力故障等也可能导致交易系统非正常运行甚至瘫痪，这些都会使用户的交易委托无法成交或者无法全部成交，用户将不得不自行承担由此导致的损失，平台将不负责。</p>
                    <p>7. 其他损失：用户密码保管不当、操作不当、投资决策失误等原因都可能会发生亏损，由此所导致的损失由用户自行承担，平台将不负责。</p>
                </div>
            </div>
            <h2 class="text-center">以上《免责声明》的各项内容，务请认真阅读并完全理解。</h2>
            </div>
            <div class="foot" v-show="shows">
            <div class="foot-option">
                <el-checkbox v-model.trim="checked" @change="confirm">确认并同意</el-checkbox>
            </div>
            <!--
            <div class="flex-center">
                <el-button type="primary" size="small" @click="submit" :loading="loading">提交</el-button>
            </div>
            -->
        </div>
    </div>
</template>

<script>
// import ComHeader from "@/components/comHeader/ComHeader.vue";
export default {
    // components: { ComHeader },
    // props: ['claimerConfirm'],
    data() {
        return {
            checked: false,
            loading: false,
            shows: true
        }
    },
    mounted() {
      let isClaimerConfirm = Boolean(sessionStorage.getItem("claimerConfirm"));
      this.checked = isClaimerConfirm;
    },
    methods: {
        confirm(){
          this.$emit('claimerConfirm', this.checked);
          sessionStorage.setItem("claimerConfirm", this.checked);
        }
    },
}
</script> 
<style lang="scss" scope>
.disclaimer {
  margin: auto;
  .text{
    margin-top: 10px;
  }
  .iframe-wrap{
    height: 345px;
    overflow-y: auto;
    width: 98%;
    margin: 10px auto 0;
    padding: 0 2%;
    .iframe {
        p {
            margin: 16px 0;
        }
    }
  }
  .foot {
    border-top: 1px solid #eee;
    background-color: #f8f8f8;
    text-align: center;
    .foot-option {
      height: 40px;
      line-height: 40px;
    }
    .flex-center {
      display: flex;
      justify-content: center;
      height: 60px;
      align-items: center;
    }
  }
}
@media screen and (min-width: 320px) and (max-width: 820px) {
  .disclaimer {
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 500px;
    .text{
      margin: 20px 10px 0;
      height: calc(100% - 70px);
    }
    .iframe-wrap{
      height: calc(100% - 120px);
    }
  }
}
@media screen and (min-width: 820px) {
  .disclaimer {
    .text {
      width: 100%;
    }
  }
}
</style>