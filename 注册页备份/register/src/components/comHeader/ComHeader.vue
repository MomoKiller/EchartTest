<template>
    <div id="top" @click="hisBack">
        <i class="el-icon-arrow-left"></i>
        <p>注册</p>
    </div>
</template>

<script>
export default {
    name: 'ComHeader',
    methods: {
        hisBack(){
            setTimeout(() => {
                window.parent.postMessage("close", "*");
            }, 100);
        }
    },    
}
</script>

<style lang="scss" scope>
    #top {
        display: block;
        height: 50px;
        position: relative;
        background: #f2f2f2;
    }
    
    #top p {
        width: 100% !important;
        text-align: center !important;
        line-height: 50px;
        display: block;
    }
    
    #top i {
        position: absolute !important;
        left: 15px;
        top: 10px;
        font-size: 26px;
        font-weight: bolder;
        display: block;
        z-index: 100;
    }
    
    @media screen and (min-width: 769px) {
        #top {
            display: none;
        }
        #app {
            height: 100vh;
        }
    }
</style>