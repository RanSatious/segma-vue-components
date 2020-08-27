# TableAction

表格操作列组件

## table-action-basic [基本用法](#基本用法)

```vue
<template>
    <div>test</div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
// todo
</style>
```

## [属性](#属性)

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| actions | - | Array | [] |
| scope | - | Object | {} |

## [插槽](#插槽)

| name | scope | 说明 |
|---|---|---|
| prefix | - | 头部插槽 |
| [item.slot] `动态` | - | 动态插槽<br/>在**actions**中配置 |
| suffix | - | 尾部插槽 |
