<template>
    <div class="home-page">
        <img alt="Vue logo"
             src="../assets/logo.png" />
        <h2>Segma Vue Component Library</h2>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    mounted() {
        console.log('hello');
    },
};
</script>
<style lang="less" scoped>
.home-page {
    text-align: center;
}
</style>