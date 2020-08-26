import hljs from 'highlight.js';
import vue from './vue';

export default {
    install() {
        vue(hljs);
    },
};
