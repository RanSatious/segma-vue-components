<!-- 基本用法 -->
<!-- 包含`alert`/`confirm`2个方法 -->
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
            Message.alert('Message.alert');
        },
        confirm() {
            Message.confirm('Message.confirm');
        },
    },
};
</script>
<style lang="less" scoped>
.el-button {
    margin-right: 10px;
}
</style>