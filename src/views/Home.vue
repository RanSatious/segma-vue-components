<template>
    <div ref="md"
         class="home-page md"
         v-html="html">

    </div>
</template>

<script>
import doc from '../../README.md';
import convert from '../../bin/convert';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default {
    name: 'HomePage',
    data() {
        return {
            html: '',
        };
    },
    async mounted() {
        this.html = await convert(doc);
        this.$nextTick(() => {
            document.querySelectorAll('pre code').forEach(block => {
                hljs.highlightBlock(block);
            });
        });
    },
};
</script>
<style lang="less">
.home-page {
    p {
        margin-bottom: 20px;

        .inline-code {
            color: #41b883;
            background-color: transparent;
        }
    }

    pre {
        margin-bottom: 20px;
    }
}
</style>