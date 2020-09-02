<!-- 自定义按钮 -->
<template>
    <div>
        <el-button @click="alert">alert</el-button>
        <el-button @click="confirm">confirm</el-button>
        <el-button @click="custom">custom</el-button>
    </div>
</template>
<script>
import Message from '../../../services/message';
export default {
    methods: {
        alert() {
            Message.alert('alert default button', {
                buttons: [
                    {
                        type: 'primary',
                        text: 'OK',
                        action: 'confirm',
                    },
                ],
            });
        },
        confirm() {
            Message.confirm('confirm default button', {
                buttons: [
                    {
                        type: 'info',
                        text: '取消',
                        action: 'cancel',
                    },
                    {
                        type: 'primary',
                        text: '确定',
                        action: 'confirm',
                    },
                ],
            });
        },
        custom() {
            Message.alert('custom button, see console for detail', {
                buttons: [
                    {
                        type: 'success',
                        text: '自定义',
                        handler(confirm, cancel) {
                            console.log('custom');
                            confirm();
                        },
                    },
                    {
                        type: 'warning',
                        text: '自定义2',
                        action: 'cancel',
                    },
                ],
                callback: {
                    confirm() {
                        console.log('custom confirm');
                    },
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