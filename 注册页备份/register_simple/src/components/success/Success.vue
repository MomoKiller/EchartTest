<template>
    <div>
        <el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
            <el-step title="注册成功" ></el-step>
            <el-step title="前往登录" ></el-step>
        </el-steps>
    </div>
</template>

<script>
export default {
    name: 'Success',
    data() {
        return {
            
        }
    },
}
</script>

<style scope>

</style>