import dialogMixin from '../dialog';

const dialogFormMixin = {
    // 创建带表单的Dialog组件时使用
    name: 'DialogFormMixin',
    props: {
        // 传入组件的数据，通常在执行编辑某个项目，打开对话框时使用
        data: {
            type: Object,
            default: () => ({}),
        },
    },
    mixins: [/** @type {dialog} */ dialogMixin],
    data() {
        return {
            // 表单数据
            form: {},
            // 加载状态
            loading: false,
        };
    },
    methods: {
        /**
         * 提交表单，默认会触发`save`事件，如果组件定义了save方法，会覆盖默认行为
         * @returns {Promise}
         */
        async submit() {
            if (this.loading) {
                return;
            }
            try {
                this.loading = true;

                if (this.$refs.form) {
                    let valid = await new Promise((resolve, reject) => {
                        this.$refs.form.validate(valid => resolve(valid));
                    });
                    if (!valid) return;
                }

                if (typeof this.save === 'function') {
                    await this.save();
                } else {
                    await new Promise((resolve, reject) => {
                        /**
                         * 提交表单时触发
                         * @param {object} form 表单数据
                         * @param {() => void} resolve 回调函数，回调操作成功时调用
                         * @param {() => void} reject 回调函数，回调操作失败时调用
                         */
                        this.$emit('save', { ...this.form }, resolve, reject);
                    });
                }
            } catch (error) {
                // todo
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
    },
};

export default dialogFormMixin;
