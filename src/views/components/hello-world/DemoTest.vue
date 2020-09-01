<!-- 基本用法2 -->
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
