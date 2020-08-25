import Vue from 'vue';

declare class SegmaVueComponent extends Vue {
    static install(vue: typeof Vue): void;
}

export { SegmaVueComponent };
