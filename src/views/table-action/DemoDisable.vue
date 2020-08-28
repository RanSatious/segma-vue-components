<!-- 禁用状态 -->
<template>
    <el-table :data="tableData">
        <el-table-column prop="name"
                         label="name">
        </el-table-column>
        <el-table-column label="action">
            <template v-slot="scope">
                <table-action :actions="actions"
                              :scope="scope"></table-action>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    data() {
        return {
            disabled: false,
        };
    },
    computed: {
        tableData() {
            return [{ name: 'tom' }];
        },
        actions() {
            return [
                {
                    title: this.disabled ? '恢复' : '禁用',
                    type: 'primary',
                    handler: ({ row, $index }) => {
                        this.disabled = !this.disabled;
                    },
                },
                {
                    title: '删除',
                    type: 'danger',
                    disabled: this.disabled,
                },
                {
                    title: '删除',
                    type: 'danger',
                    disabled: ({ row, $index }) => {
                        return this.disabled;
                    },
                },
            ];
        },
    },
};
</script>