import { createRouter, createWebHistory } from 'vue-router';
import registerGuard from './guard';
import staticRoutes from './static';

export const whiteList = ['/login'];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...staticRoutes],
});

// 注册路由守卫
registerGuard(router);

export default router;
