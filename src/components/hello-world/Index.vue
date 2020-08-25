<template>
    <div class="hello-world">{{msg}}</div>
</template>
<script>
export default {
    name: 'SeHelloWorld',
    props: {
        msg: {
            type: String,
            default: 'hello world',
        },
    },
};
</script>
<style lang="less" scoped>
.hello-world {
    color: red;
}
</style>
