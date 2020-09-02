<!-- 按钮对齐 -->
<!-- 可选值：`left`/`center`/`right` -->
<!-- `alert`方法默认`center`对齐 -->
<!-- `confirm`方法默认`right`对齐 -->
<template>
    <div>
        <el-button @click="alert">right</el-button>
        <el-button @click="confirm">center</el-button>
    </div>
</template>
<script>
import Message from '../../../services/message';
export default {
    methods: {
        alert() {
            Message.alert('align = right', {
                align: 'right',
            });
        },
        confirm() {
            Message.confirm('align = center', {
                align: 'center',
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