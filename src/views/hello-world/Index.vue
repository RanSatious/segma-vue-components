<template>
    <div class="page">
        <demo-basic></demo-basic>
        <div class="md" v-html="doc"></div>
    </div>
</template>

<script>
import doc from '../../../docs/hello-world.md';
import remark from 'remark';
import html from 'remark-html';
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
        let root = remark().parse(doc);
        console.log(remark().use(html).parse(doc));
        let result = await remark().use(html).process(remark().stringify(root));
        console.log(result);
        this.doc = result.contents;
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
