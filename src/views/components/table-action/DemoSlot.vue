<!-- 使用插槽 -->
<template>
    <el-table :data="tableData">
        <el-table-column prop="name"
                         label="name">
        </el-table-column>
        <el-table-column label="action">
            <template v-slot="scope">
                <table-action :actions="actions"
                              :scope="scope">
                    <template v-slot:detail>
                        {{scope.row.name}}
                    </template>
                </table-action>
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
                    slot: 'detail',
                },
            ];
        },
    },
};
</script>