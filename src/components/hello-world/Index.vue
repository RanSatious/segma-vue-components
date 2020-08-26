<template>
    <div class="hello-world"
         @click="test">
        {{ msg }}
    </div>
</template>
<script>
export default {
    // HelloWorld组件
    name: 'SeHelloWorld',
    props: {
        msg: {
            type: String,
            default: 'hello world',
        },
    },
    mounted() {
        this.$emit('test');
    },
    methods: {
        test() {
            console.log('test');
        },
    },
};
</script>
<style lang="less" scoped>
.hello-world {
    color: red;
}
</style>
