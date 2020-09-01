import Vue from 'vue';
import VueRouter from 'vue-router';
import DefaultLayout from '../layouts/Default.vue';
import { RouteType } from './constant';
import camelCase from 'lodash/camelCase';
import component from './component';
import directive from './directive';
import service from './service';
import mixin from './mixin';

Vue.use(VueRouter);

const toRoute = meta => ({
    path: meta.type === RouteType.Default ? `/${meta.name}` : `/${meta.type}/${meta.name}`,
    name: camelCase(meta.name),
    component: () => import('../layouts/Demo.vue'),
    meta,
});

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
                    type: RouteType.Default,
                },
            },
            ...component.map(toRoute),
            ...directive.map(toRoute),
            ...service.map(toRoute),
            ...mixin.map(toRoute),
        ],
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
