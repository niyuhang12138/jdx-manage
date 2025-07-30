import type { RouteRecordRaw } from '@manage/types/vue-router';

const staticRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        component: () => import('@manage/views/Main.vue'),
        children: [
            {
                path: '/',
                redirect: '/index',
            },
            {
                path: 'index',
                name: 'HomePage',
                component: () => import('@manage/views/home/index.vue'),
                meta: {
                    title: '首页',
                },
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@manage/views/Login.vue'),
        meta: {
            title: '登录',
        },
    },
    {
        path: '/:pathMath(.*)',
        name: 'NotFound',
        component: () => import('@manage/views/error/404.vue'),
        meta: {
            title: '404',
        },
    },
] satisfies RouteRecordRaw[];

export default staticRoutes;
