<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="less">
@import './assets/css/scroll.less';

html,
body {
    padding: 0;
    margin: 0;
    height: 100%;
}

div {
    .scroll-bar();
}

#app {
    height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
