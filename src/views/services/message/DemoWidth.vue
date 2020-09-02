<!-- 自定义宽度 -->
<!-- 默认值：300 -->
<template>
    <div>
        <el-button @click="alert">alert</el-button>
        <el-button @click="confirm">confirm</el-button>
    </div>
</template>
<script>
import Message from '../../../services/message';
export default {
    methods: {
        alert() {
            Message.alert('width = 400', {
                width: 400,
            });
        },
        confirm() {
            Message.confirm('width = 400', {
                width: 400,
            });
        },
    },
};
</script>
<style lang="less" scoped>
.el-button {
    margin-right: 10px;
}
</style>