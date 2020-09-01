export default {
    // 创建Dialog组件时使用
    name: 'DialogMixin',
    props: {
        // 标题
        title: {
            type: String,
            default: '',
        },
        // 是否可见
        visible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        /**
         * 是否可见，等同于visible，可在组件内使用
         * @type {boolean}
         * @default false
         */
        localVisible: {
            get() {
                return this.visible;
            },
            set(val) {
                this.$emit('update:visible', val);
            },
        },
    },
};
