# IconFont

SVG图标

## icon-font-basic [基本用法](#基本用法)

```vue
<template>
    <div>
        <icon-font name="se-icon-shijian"></icon-font>
        <icon-font name="se-icon-jichu"></icon-font>
        <icon-font name="se-icon-zidingyi"></icon-font>
        <icon-font name="se-icon-zhuti"></icon-font>
    </div>
</template>
<style lang="less" scoped>
/deep/.icon {
    margin-right: 10px;
}
</style>
```

## [属性](#属性)

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| name | 图标名称 | String | - |
