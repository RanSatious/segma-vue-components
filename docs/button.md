# ElButton

## button-basic [基础用法](#基础用法)

```vue
<template>
    <div>
        <el-button type="primary"
                   size="small">主按钮normal </el-button>
        <el-button type="primary"
                   size="small"
                   icon="el-icon-search">主按钮带icon </el-button>
        <el-button type="info"
                   size="small">次按钮normal </el-button>
        <el-button type="info"
                   size="small">
            <i class="iconfont se-icon-add el-icon--left"></i>
            次按钮带icon
        </el-button>
        <el-button size="small">普通按钮normal</el-button>
        <el-button size="small">普通按钮带icon
            <i class="iconfont se-icon-f-flag el-icon--right"></i>
        </el-button>
    </div>
</template>

```

## button-disable [禁用状态](#禁用状态)

```vue
<template>
    <div>
        <el-button disabled
                   type="primary"
                   size="small">主按钮disabled
        </el-button>
        <el-button disabled
                   type="info"
                   size="small">次按钮disabled
        </el-button>
        <el-button disabled
                   size="small">普通按钮disable
        </el-button>
    </div>
</template>
```

## button-group [按钮组](#按钮组)

```vue
<template>
    <div>
        <el-button-group>
            <el-button type="primary"
                       size="small"
                       icon="iconfont se-icon-arrow-left">上一页
            </el-button>
            <el-button type="primary"
                       size="small">下一页
                <i class="iconfont se-icon-arrow-right el-icon--right"></i>
            </el-button>
        </el-button-group>
        <br><br>
        <el-button-group>
            <el-button type="primary"
                       size="small"
                       icon="iconfont se-icon-f-edit"></el-button>
            <el-button type="primary"
                       size="small"
                       icon="iconfont se-icon-f-promotion"></el-button>
            <el-button type="primary"
                       size="small"
                       icon="iconfont se-icon-f-delete"></el-button>
        </el-button-group>
    </div>
</template>
```

## button-icon [图标按钮](#图标按钮)

```vue
<template>
    <div>
        <el-button type="primary"
                   size="small"
                   icon="iconfont se-icon-search">
            主按钮带icon
        </el-button>
        <el-button type="info"
                   size="small">
            <i class="iconfont se-icon-add el-icon--left"></i>
            次按钮带icon
        </el-button>
        <el-button size="small">
            普通按钮带icon
            <i class="iconfont se-icon-f-flag  el-icon--right"></i>
        </el-button>
        <br><br>
        <el-button type="primary"
                   size="small"
                   icon="iconfont se-icon-search">
        </el-button>
        <el-button type="info"
                   size="small"
                   icon="iconfont se-icon-search">
        </el-button>
        <el-button size="small"
                   icon="iconfont  se-icon-search">
        </el-button>
    </div>
</template>
```

## button-loading [加载状态](#加载状态)

```vue
<template>
    <div>
        <el-button type="primary"
                   :loading="true"
                   size="small">主按钮loading
        </el-button>
        <el-button type="info"
                   :loading="true"
                   size="small">次按钮loading
        </el-button>
        <el-button :loading="true"
                   size="small">普通按钮loading
        </el-button>
    </div>
</template>
```

## button-text [文字按钮](#文字按钮)

```vue
<template>
    <div>
        <el-button size="small"
                   type="text">下载
            <i class="iconfont se-icon-download"></i>
        </el-button>
        <el-button size="small"
                   type="text"
                   disabled>下载
            <i class="iconfont se-icon-download"></i>
        </el-button>
        <el-button size="small"
                   type="text">展开
            <i class="iconfont se-icon-arrow-up"></i>
        </el-button>
        <el-button size="small"
                   type="text"
                   disabled>收起
            <i class="iconfont se-icon-arrow-down"></i>
        </el-button>
    </div>
</template>
```
