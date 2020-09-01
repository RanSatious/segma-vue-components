<!-- 基本用法 -->
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
    computed: {
        tableData() {
            return [{ name: 'tom' }];
        },
        actions() {
            return [
                {
                    title: '查看',
                    type: 'primary',
                    handler({ row, $index }) {
                        console.log(row, $index);
                    },
                },
                {
                    title: '编辑',
                    type: 'primary',
                    handler({ row, $index }) {
                        console.log(row, $index);
                    },
                },
                {
                    title: '删除',
                    type: 'danger',
                    handler({ row, $index }) {
                        console.log(row, $index);
                    },
                },
            ];
        },
    },
};
</script>