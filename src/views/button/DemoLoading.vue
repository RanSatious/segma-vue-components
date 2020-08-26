<!-- 加载状态 -->
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