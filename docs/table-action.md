# TableAction

表格操作列组件

## table-action-basic [基本用法](#基本用法)

```vue
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
```

## table-action-disable [禁用状态](#禁用状态)

```vue
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
```

## table-action-icon [使用图标](#使用图标)

```vue
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
```

## table-action-show [显示/隐藏](#显示/隐藏)

```vue
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
```

## table-action-slot [使用插槽](#使用插槽)

```vue
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
```

## [属性](#属性)

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| actions | 定义操作<br/>`type?: 'primary'/'danger'` 操作类型，分普通和危险2种<br/>`title?: string` 名称<br/>`icon?: string` 图标<br/>`show?: boolean/scope => boolean` 是否显示该操作<br/>`disabled?: boolean/scope => boolean` 是否禁用该操作<br/>`slot?: string` 自定义插槽，使用之后其他属性无效 | Array | [] |
| scope | 传递父组件层级的数据到组件 | Object | {} |

## [插槽](#插槽)

| name | scope | 说明 |
|---|---|---|
| prefix | - | 头部插槽 |
| [item.slot] **动态** | - | 动态插槽<br/>在`actions`中配置 |
| suffix | - | 尾部插槽 |
