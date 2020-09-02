<!-- 主题效果 -->
<!-- 可使用 `dark`/`light` 2种主题，默认为`dark` -->
<template>
    <div>
        <el-button v-title="'dark'">默认主题</el-button>
        <el-button v-title="{text: 'light', effect: 'light'}">light主题</el-button>
    </div>
</template>
<style lang="less" scoped>
.el-button {
    margin-right: 20px;
}
</style>