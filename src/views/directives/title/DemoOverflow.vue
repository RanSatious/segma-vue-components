<!-- 溢出提示 -->
<!-- 有`always`/`overflow` 2种模式，`always`模式会始终显示提示，`overflow`模式只会在目标元素内容溢出时才显示提示，默认为`always` -->
<!-- 根据目标元素的`scrollWidth`/`scrollHeight`是否大于`offsetWidth`/`offsetHeight`来判断是否溢出 -->
<template>
    <div class="row">
        <el-button v-title="{text: '文字溢出', mode: 'overflow'}">超长的文字提示</el-button>
        <el-button v-title="{text: '文字溢出', mode: 'overflow'}">文字提示</el-button>
    </div>
</template>
<style lang="less" scoped>
.el-button {
    margin-right: 20px;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>