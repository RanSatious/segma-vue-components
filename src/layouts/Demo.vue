<template>
    <div class="page">
        <component :is="item.component"
                   v-for="item in demos"
                   :key="item.name"
                   :ref="item.name"
                   @hook:mounted="onMounted(item)"></component>
        <div ref="md"
             class="md"
             v-html="html"></div>
    </div>
</template>

<script>
import convert from '../../bin/convert';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { RouteType } from '../router/constant';

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
            return this.section.map(({ name, category }) => ({
                component: () => import(/* webpackChunkName: "demo" */ `../views/${category}/${this.name}/Demo${this.startCase(name)}.vue`),
                name: name,
            }));
        },
    },
    watch: {
        '$route.meta': {
            immediate: true,
            handler(val) {
                const { doc, section, name, type } = val;
                const map = {
                    [RouteType.Component]: 'components',
                    [RouteType.Directive]: 'directives',
                    [RouteType.Mixin]: 'mixins',
                    [RouteType.Service]: 'services',
                };
                this.doc = doc;
                this.section = section.map(name => ({
                    name,
                    category: map[type],
                }));
                this.name = name;
                this.init();
            },
        },
    },
    methods: {
        async init() {
            this.html = await convert(this.doc);
            this.$nextTick(() => {
                let fragments = [];
                let fragment = null;

                for (let i = 0; i < this.$refs.md.children.length; i++) {
                    let element = this.$refs.md.children[i];
                    if (element.tagName === 'H2') {
                        if (fragment) {
                            fragments.push(fragment);
                        }
                        fragment = { name: element.dataset.section || element.innerText, value: document.createDocumentFragment() };
                        fragment.value.appendChild(element);
                        i--;
                    } else if (fragment) {
                        fragment.value.appendChild(element);
                        i--;
                    }
                }

                if (fragment) {
                    fragments.push(fragment);
                }

                let { section } = this.$route.meta;
                fragments.sort((a, b) => {
                    let indexA = section.indexOf(a.name);
                    let indexB = section.indexOf(b.name);
                    if (indexA === indexB) {
                        return 0;
                    }
                    if (indexA < 0) {
                        return 1;
                    }
                    if (indexB < 0) {
                        return -1;
                    }

                    return indexA - indexB;
                });

                fragments.forEach(item => {
                    this.$refs.md.appendChild(item.value);
                });

                this.$nextTick(() => {
                    document.querySelectorAll('pre code').forEach(block => {
                        hljs.highlightBlock(block);
                    });
                });
            });
        },
        startCase(value) {
            return value ? value[0].toUpperCase() + value.substring(1) : '';
        },
        onMounted(item) {
            let container = document.querySelector(`#${this.name}-${item.name}`);
            if (container) {
                container.appendChild(this.$refs[item.name][0].$el);
            }
        },
    },
};
</script>
