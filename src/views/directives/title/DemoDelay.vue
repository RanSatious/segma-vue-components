<!-- 延迟显示 -->
<!-- 延迟文字提示的显示，默认为0（毫秒） -->
<!-- positon = mouse 时，最小延迟为500 -->
<template>
    <div>
        <el-button v-title="'delay = 0'">无延迟</el-button>
        <el-button v-title="{text: 'delay = 1000', delay: 1000}">延迟1s</el-button>
        <el-button v-title="{text: 'delay on mouse', position: 'mouse'}"
                   class="mouse">delay >= 500</el-button>
    </div>
</template>
<style lang="less" scoped>
.el-button {
    margin-right: 20px;
}

.mouse {
    height: 100px;
}
</style>