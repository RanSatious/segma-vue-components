<template>
    <div class="page">
        <demo-basic ref="basic"></demo-basic>
        <div class="md" v-html="doc"></div>
    </div>
</template>

<script>
import doc from '../../../docs/hello-world.md';
import convert from '../../../build/convert';
import DemoBasic from './DemoBasic.vue';

export default {
    name: 'HelloWorldPage',
    components: {
        DemoBasic,
    },
    data() {
        return {
            doc: '',
        };
    },
    async mounted() {
        this.doc = await convert(doc);
        this.$nextTick(() => {
            document.querySelector('#hello-world-Basic').appendChild(this.$refs.basic.$el);
        });
    },
};
</script>
<style lang="less" scoped>
.md {
    white-space: pre-wrap;
}
</style>
<style lang="less">
table {
    border-collapse: collapse;
    th,
    td {
        padding: 10px;
        border: 1px solid gray;
    }
}
</style>
