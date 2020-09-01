<!-- 图标一览 -->
<template>
    <ul class="icon-list">
        <li v-for="name in icons"
            :key="name">
            <i :class="['iconfont', name]"></i>
            <span>{{name}}</span>
        </li>
    </ul>
</template>
<script>
export default {
    computed: {
        icons() {
            return [
                'se-icon-f-copy',
                'se-icon-shijian',
                'se-icon-jichu',
                'se-icon-zidingyi',
                'se-icon-zhuti',
                'se-icon-f-manuallocation',
                'se-icon-f-autolocation',
                'se-icon-f-change',
                'se-icon-analyse',
                'se-icon-f-viewrectangle',
                'se-icon-pause',
                'se-icon-start',
                'se-icon-mark',
                'se-icon-circle-more',
                'se-icon-f-monitor',
                'se-icon-f-enterprise',
                'se-icon-f-productionline',
                'se-icon-circle-f-add',
                'se-icon-add',
                'se-icon-circle-add',
                'se-icon-f-describe',
                'se-icon-f-item',
                'se-icon-f-barchart',
                'se-icon-f-user',
                'se-icon-table',
                'se-icon-f-lock',
                'se-icon-database',
                'se-icon-intel',
                'se-icon-caret-left',
                'se-icon-caret-right',
                'se-icon-caret-bottom',
                'se-icon-caret-top',
                'se-icon-arrow-right',
                'se-icon-arrow-left',
                'se-icon-arrow-up',
                'se-icon-arrow-down',
                'se-icon-before-slice',
                'se-icon-after-slice',
                'se-icon-refresh-left',
                'se-icon-refresh',
                'se-icon-refresh-right',
                'se-icon-time',
                'se-icon-date',
                'se-icon-f-flag',
                'se-icon-f-check',
                'se-icon-f-location',
                'se-icon-f-upload',
                'se-icon-upload',
                'se-icon-upload2',
                'se-icon-download',
                'se-icon-f-menu',
                'se-icon-f-tabulation',
                'se-icon-Import',
                'se-icon-export',
                'se-icon-search',
                'se-icon-paperclip',
                'se-icon-f-file',
                'se-icon-file',
                'se-icon-more',
                'se-icon-more1',
                'se-icon-f-question',
                'se-icon-circle-question',
                'se-icon-f-warning',
                'se-icon-circle-warning',
                'se-icon-success',
                'se-icon-circle-check',
                'se-icon-error',
                'se-icon-circle-close',
                'se-icon-close',
                'se-icon-check',
                'se-icon-f-delete',
                'se-icon-delete',
                'se-icon-f-camera',
                'se-icon-f-camera1',
                'se-icon-f-message',
                'se-icon-message',
                'se-icon-f-comment',
                'se-icon-comment',
                'se-icon-f-datasource',
                'se-icon-datasource',
                'se-icon-circle-pause',
                'se-icon-circle-start',
                'se-icon-circle-restart',
                'se-icon-link',
                'se-icon-f-promotion',
                'se-icon-f-save',
                'se-icon-save',
                'se-icon-folder',
                'se-icon-folder-open',
                'se-icon-folder-add',
                'se-icon-theme-add',
                'se-icon-project-add',
                'se-icon-f-video',
                'se-icon-f-zip',
                'se-icon-f-picture',
                'se-icon-music',
                'se-icon-f-set',
                'se-icon-set',
                'se-icon-f-store',
                'se-icon-store',
                'se-icon-f-application',
                'se-icon-f-portfolio',
                'se-icon-f-portfolio-add',
                'se-icon-f-portfolio-none',
                'se-icon-zoomin',
                'se-icon-zoomout',
                'se-icon-zoomfull',
                'se-icon-restore',
                'se-icon-f-edit',
                'se-icon-edit',
                'se-icon-f-view',
                'se-icon-view',
                'se-icon-hidden',
                'se-icon-f-mail',
                'se-icon-f-time',
                'se-icon-f-tel',
            ];
        },
    },
};
</script>
<style lang="less" scoped>
.icon-list {
    display: table;

    li {
        float: left;
        box-sizing: border-box;
        width: 20%;
        text-align: center;
        padding: 10px;
        transition: all 0.3s;

        i {
            font-size: 32px;
        }

        span {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        &:hover {
            color: #41b883;
        }
    }
}
</style>