<template>
    <se-hello-world></se-hello-world>
</template>

<script>
import doc from '../../../docs/hello-world.md';
import remark from 'remark';
export default {
    name: 'HelloWorldPage',
    async mounted() {
        let result = await remark().process(doc);
        console.log(result);
    },
};
</script>
<style lang="less" scoped></style>
