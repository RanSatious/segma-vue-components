<template>
    <el-dialog :title="title"
               :visible.sync="visible"
               :width="widthProp"
               :class="className"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="!loading">
        {{message}}
        <template v-slot:footer>
            <div :style="footerStyle">
                <el-button v-for="(item, index) in buttons"
                           :key="index"
                           :type="item.type"
                           :loading="loading"
                           size="small"
                           @click="handler(item)">
                    {{item.text}}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script>
export default {
    name: 'MessageDialog',
    data() {
        return {
            visible: false,
            title: '',
            width: 300,
            message: '',
            confirm: false,
            align: 'right',
            className: '',
            buttons: [],
            loading: false,
            callback: null,
        };
    },
    computed: {
        widthProp() {
            return typeof this.width === 'number' ? `${this.width}px` : this.width;
        },
        footerStyle() {
            return {
                'text-align': this.align,
            };
        },
        actions() {
            return {
                cancel: this.onCancel,
                confirm: this.onConfirm,
            };
        },
    },
    watch: {
        visible(val) {
            if (val) {
                this.$emit('open');
                this.confirm = false;
            } else {
                this.$emit('close', this.confirm);
            }
        },
    },
    methods: {
        async onCancel() {
            let callback = this.callback.cancel || (() => {});
            try {
                this.loading = true;
                await callback();
                this.visible = false;
            } finally {
                this.loading = false;
            }
        },
        async onConfirm() {
            let callback = this.callback.confirm || (() => {});
            try {
                this.loading = true;
                await callback();
                this.confirm = true;
                this.visible = false;
            } finally {
                this.loading = false;
            }
        },
        async handler(item) {
            let action = item.handler || this.actions[item.action];
            if (action) {
                await action(this.onConfirm, this.onCancel);
            }
        },
    },
};
</script>
<style lang="less" scoped>
/deep/ .el-dialog__body {
    padding: 20px;
    padding-bottom: 8px;
    text-align: center;
    word-break: break-word;
}
</style>