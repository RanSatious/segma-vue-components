<!-- 使用图标 -->
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
                    icon: 'se-icon-zidingyi',
                    type: 'primary',
                    handler({ row, $index }) {
                        console.log(row, $index);
                    },
                },
                {
                    icon: 'se-icon-f-delete',
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