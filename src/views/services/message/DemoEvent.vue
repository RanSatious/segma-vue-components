<!-- 回调 -->
<!-- 对话框打开/关闭时分别触发`onOpen`/`onClose`回调 -->
<!-- `onClose`回调接收`confirm`参数，以表示对话框是点击了确定还是取消按钮 -->
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
            Message.alert('see console for detail', {
                onOpen() {
                    console.log('open');
                },
            });
        },
        confirm() {
            Message.confirm('see console for detail', {
                onClose(confirm) {
                    console.log(confirm ? 'confirm' : 'cancel');
                },
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