import type { Router } from 'vue-router';
import Nprogress from 'nprogress';
import useUserStore from '@manage/stores/user';
import { whiteList } from '..';
import useAppStore from '@manage/stores/app';
import { storeToRefs } from 'pinia';
import useRouteStore from '@manage/stores/route';

function dynamicRouteGuard(router: Router) {
    router.beforeEach(async (to) => {
        const userStore = useUserStore();
        const appStore = useAppStore();
        const routeStore = useRouteStore();
        const { isLogin } = storeToRefs(appStore);

        Nprogress.start();

        try {
            if (userStore.getToken()) {
                if (to.path === '/login') return '/';

                if (isLogin.value) return;

                isLogin.value = true;

                Nprogress.inc();
                await userStore.getInfo();
                Nprogress.inc();
                const routes = await routeStore.getRoutes();
                Nprogress.inc();
                routes.forEach((route) => router.addRoute('Main', route));
                return to.fullPath;
            } else {
                // 如果没有token，且访问的不是白名单中的路由，则重定向到登录页
                if (whiteList.includes(to.path)) {
                    return;
                } else {
                    return { path: '/login', query: { redirect: to.fullPath } };
                }
            }
        } catch {
            return { path: '/login', query: { redirect: to.fullPath } };
        } finally {
            Nprogress.done();
        }
    });
}

export default dynamicRouteGuard;
