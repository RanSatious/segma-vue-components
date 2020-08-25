<template>
    <div class="default-layout">
        <div class="header">
            <router-link :to="{name: 'home'}">Segma Vue Component</router-link>
        </div>
        <div class="body">
            <div class="aside">
                <layout-menu></layout-menu>
            </div>
            <div class="content">
                <div class="content-wrapper">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LayoutMenu from './Menu.vue';
export default {
    name: 'DefaultLayout',
    components: {
        LayoutMenu,
    },
};
</script>
<style lang="less" scoped>
.default-layout {
    height: 100%;
    overflow: hidden;

    > .header {
        box-sizing: border-box;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        border-bottom: 1px solid #f7f7f7;

        a {
            color: rgba(0, 0, 0, 0.85);
            font-weight: bold;
            text-decoration: none;
            transition: all 0.3s;

            &:hover {
                color: #41b883;
            }
        }
    }

    > .body {
        box-sizing: border-box;
        height: calc(100% - 40px);
        display: flex;

        > .aside {
            box-sizing: border-box;
            padding: 10px;
            width: 200px;
            flex-shrink: 0;
            border-right: 1px solid #f7f7f7;
        }

        > .content {
            flex-grow: 1;
            overflow: auto;
            box-sizing: border-box;
            padding: 10px 10px 0 10px;
            background-color: #f7f7f7;

            .content-wrapper {
                background-color: white;
                height: 100%;
            }
        }
    }
}
</style>