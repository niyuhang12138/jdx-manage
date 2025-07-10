import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import registerGuard from './guard';

const staticRoutes = [
    {
        path: '/',
        name: 'AppIndex',
        component: () => import('@/views/AppIndex.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: {
            title: '登录',
        },
    },
] satisfies RouteRecordRaw[];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...staticRoutes],
});

// 注册路由守卫
registerGuard(router);

export default router;
