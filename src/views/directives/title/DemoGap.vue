<!-- 间距 -->
<!-- 文字提示与目标元素的间距，默认为10 -->
<template>
    <div>
        <el-button v-title="{text: 'gap = 0', gap: 0}">gap = 0</el-button>
        <el-button v-title="{text: 'gap = 20', gap: 20, position: 'right'}">gap = 20</el-button>
    </div>
</template>
<style lang="less" scoped>
.el-button {
    margin-right: 20px;
}
</style>