<!-- 提示位置 -->
<!-- 可选值： `top-start`/`top`/`top-end`/`left-start`/`left`/`left-end`/`bottom-start`/`bottom`/`bottom-end`/`right-start`/`right`/`right-end`/`mouse` -->
<template>
    <div>
        <div class="row top">
            <el-button v-title="{text: 'top-start', position: 'top-start'}"
                       size="small">上左</el-button>
            <el-button v-title="{text: 'top', position: 'top'}"
                       size="small">上中</el-button>
            <el-button v-title="{text: 'top-end', position: 'top-end'}"
                       size="small">上右</el-button>
        </div>
        <div class="row center">
            <div class="left">
                <el-button v-title="{text: 'left-start', position: 'left-start'}"
                           size="small">左上</el-button>
                <el-button v-title="{text: 'left', position: 'left'}"
                           size="small">左中</el-button>
                <el-button v-title="{text: 'left-end', position: 'left-end'}"
                           size="small">左下</el-button>
            </div>
            <div class="middle">
                <el-button v-title="{text: 'mouse', position: 'mouse'}"
                           size="small">跟随鼠标</el-button>
            </div>
            <div class="right">
                <el-button v-title="{text: 'right-start', position: 'right-start'}"
                           size="small">右上</el-button>
                <el-button v-title="{text: 'right', position: 'right'}"
                           size="small">右中</el-button>
                <el-button v-title="{text: 'right-end', position: 'right-end'}"
                           size="small">右下</el-button>
            </div>
        </div>
        <div class="row bottom">
            <el-button v-title="{text: 'bottom-start', position: 'bottom-start'}"
                       size="small">下左</el-button>
            <el-button v-title="{text: 'bottom', position: 'bottom'}"
                       size="small">下中</el-button>
            <el-button v-title="{text: 'bottom-end', position: 'bottom-end'}"
                       size="small">下右</el-button>
        </div>
    </div>
</template>
<style lang="less" scoped>
.row {
    width: 400px;
    margin-bottom: 20px;

    /deep/.el-button {
        height: 60px;
        width: 60px;
        margin: 0;
    }

    &.top,
    &.bottom {
        text-align: center;
        /deep/.el-button:not(:last-child) {
            margin-right: 20px;
        }
    }

    &.center {
        display: flex;
        height: 200px;

        .middle {
            flex-grow: 1;
            padding: 20px;

            /deep/.el-button {
                width: 100%;
                height: 100%;
            }
        }
    }

    .left,
    .right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
}
</style>