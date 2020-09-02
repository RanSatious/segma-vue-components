<!-- 指定标题 -->
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
            Message.alert('Message.alert', 'alert title');
        },
        confirm() {
            Message.confirm('Message.confirm', 'confirm title');
        },
    },
};
</script>
<style lang="less" scoped>
.el-button {
    margin-right: 10px;
}
</style>