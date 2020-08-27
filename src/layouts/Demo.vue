<template>
    <div class="page">
        <component :is="item.component"
                   v-for="item in demos"
                   :key="item.name"
                   :ref="item.name"
                   @hook:mounted="onMounted(item)"></component>
        <div class="md"
             v-html="html"></div>
    </div>
</template>

<script>
import convert from '../../bin/convert';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default {
    name: 'DemoPage',
    data() {
        return {
            doc: '',
            section: [],
            name: '',
            html: '',
        };
    },
    computed: {
        demos() {
            if (!this.name) {
                return [];
            }
            return this.section.map(name => ({
                component: () => import(/* webpackChunkName: "demo" */ `../views/${this.name}/Demo${this.startCase(name)}.vue`),
                name: name,
            }));
        },
    },
    watch: {
        '$route.meta': {
            immediate: true,
            handler(val) {
                const { doc, section, name } = val;
                this.doc = doc;
                this.section = section;
                this.name = name;
                this.init();
            },
        },
    },
    methods: {
        async init() {
            this.html = await convert(this.doc);
            this.$nextTick(() => {
                document.querySelectorAll('pre code').forEach(block => {
                    hljs.highlightBlock(block);
                });
            });
        },
        startCase(value) {
            return value ? value[0].toUpperCase() + value.substring(1) : '';
        },
        onMounted(item) {
            document.querySelector(`#${this.name}-${item.name}`).appendChild(this.$refs[item.name][0].$el);
        },
    },
};
</script>
