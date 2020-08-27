import Vue from 'vue';
import VueRouter from 'vue-router';
import DefaultLayout from '../layouts/Default.vue';
import meta from './meta';
import camelCase from 'lodash/camelCase';

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
            ...meta.map(d => ({
                path: `/${d.name}`,
                name: camelCase(d.name),
                component: () => import('../layouts/Demo.vue'),
                meta: d,
            })),
        ],
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
