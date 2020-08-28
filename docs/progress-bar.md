# SeProgressBar

进度条组件

基于el-progress-bar

## progress-bar-basic [基本用法](#基本用法)

```vue
<template>
    <div class="demo-progress">
        <se-progress-bar :percent="10"></se-progress-bar>
        <se-progress-bar :percent="20"
                         status="success"></se-progress-bar>
        <se-progress-bar :percent="30"
                         status="running"></se-progress-bar>
        <se-progress-bar :percent="40"
                         status="error"></se-progress-bar>
        <se-progress-bar :percent="40"
                         :offset="10"></se-progress-bar>
        <se-progress-bar :percent="40"
                         :stroke-height="10"></se-progress-bar>
        <se-progress-bar :percent="50"
                         :show-text="false"></se-progress-bar>
        <se-progress-bar :percent="20"
                         animation></se-progress-bar>
        <se-progress-bar animation
                         :show-text="false"></se-progress-bar>
        <se-progress-bar :percent="10">
            <i class="iconfont se-icon-zidingyi"></i>
        </se-progress-bar>
    </div>
</template>
<style lang="less" scoped>
.demo-progress {
    width: 400px;

    .progress-bar-wrapper {
        margin-bottom: 10px;
    }
}
</style>
```

## [属性](#属性)

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| percent | 百分比 | Number | 0 |
| offset | 起始位置偏移 | Number | 0 |
| status | 进度条状态<br/>normal/success/error/running | String | normal |
| stroke-height | 进度条宽度 | Number | 6 |
| animation | 是否开启动画<br/>开启动画时，status固定为running | Boolean | false |
| show-text | 是否显示文本 | Boolean | true |

## [插槽](#插槽)

| name | scope | 说明 |
|---|---|---|
| default | - | 自定义进度文本 |
