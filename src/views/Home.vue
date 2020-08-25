<template>
    <div class="home">
        <img alt="Vue logo"
             src="../assets/logo.png" />
        <hello-world></hello-world>
    </div>
</template>

<script>
import HelloWorld from '../components/hello-world/Index.vue';

export default {
    name: 'Home',
    components: {
        HelloWorld,
    },
    mounted() {
        console.log('hello');
    },
};
</script>
