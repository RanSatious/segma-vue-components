<!-- 基本用法 -->
<template>
    <div class="row">
        <el-button v-title="'文字提示'">文字提示</el-button>
        <i v-title="'图标提示'"
           class="iconfont se-icon-file"></i>
    </div>
</template>
<style lang="less" scoped>
.row {
    display: flex;
    align-items: center;
}
.el-button {
    margin-right: 20px;
}

.iconfont {
    font-size: 32px;
}
</style>