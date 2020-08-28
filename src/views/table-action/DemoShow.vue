<!-- 显示/隐藏 -->
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
            show: false,
        };
    },
    computed: {
        tableData() {
            return [{ name: 'tom' }];
        },
        actions() {
            return [
                {
                    title: this.show ? '隐藏' : '显示',
                    type: 'primary',
                    handler: ({ row, $index }) => {
                        this.show = !this.show;
                    },
                },
                {
                    title: '删除',
                    type: 'danger',
                    show: this.show,
                },
                {
                    title: '删除',
                    type: 'danger',
                    show: ({ row, $index }) => {
                        return this.show;
                    },
                },
            ];
        },
    },
};
</script>