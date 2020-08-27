# SeHelloWorld

HelloWorld组件

## hello-world-basic [基本用法](#基本用法)

```vue
<template>
    <se-hello-world></se-hello-world>
</template>

```

## hello-world-test [基本用法2](#基本用法2)

```vue
<template>
    <se-hello-world @click="test">123</se-hello-world>
</template>
<script>
export default {
    methods: {
        test() {
            console.log(test);
        },
    },
};
</script>

```

## [属性](#属性)

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| msg | - | String | hello world |

## [事件](#事件)

| 参数 | 说明 |
|---|---|
| test | - |
