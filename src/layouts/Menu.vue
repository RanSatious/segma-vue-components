<template>
    <ul class="layout-menu">
        <li v-for="item in routes"
            :key="item.name">
            <router-link :to="{name: item.name}">
                {{item.meta.title}}
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'LayoutMenu',
    computed: {
        routes() {
            return this.$router.options.routes[0].children;
        },
    },
    mounted() {
        console.log(this.$router);
    },
};
</script>
<style lang="less" scoped>
.layout-menu {
    list-style: none;
    padding: 0;
    margin: 0;

    a {
        display: block;
        margin-bottom: 10px;
        text-decoration: none;
        color: rgba(0, 0, 0, 0.85);
        transition: all 0.3s;

        &.router-link-active,
        &:hover {
            color: #41b883;
        }
    }
}
</style>