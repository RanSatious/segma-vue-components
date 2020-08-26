import Vue from 'vue';
import VueRouter from 'vue-router';
import DefaultLayout from '../layouts/Default.vue';
import * as meta from './meta';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'default-layout',
        component: DefaultLayout,
        redirect: { name: 'home' },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/Home.vue'),
                meta: {
                    title: '首页',
                },
            },
            {
                path: '/hello-world',
                name: 'helloWorld',
                component: () => import('../layouts/Demo.vue'),
                meta: meta.helloWorld,
            },
            {
                path: '/button',
                name: 'button',
                component: () => import('../layouts/Demo.vue'),
                meta: meta.button,
            },
        ],
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
