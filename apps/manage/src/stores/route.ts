import { defineStore } from 'pinia';
import { getRoutesApi } from '@manage/api/common';
import { cloneDeep } from '@manage/utils/operator';
import { ref } from 'vue';
import type { RouteRecordRaw } from '@manage/types/vue-router';
import Inner from '@manage/layout/main/inner/index.vue';
import Link from '@manage/layout/main/link/index.vue';
import dynamicRoutes from '@manage/router/dynamic';

const views = import.meta.glob('../views/**/*.vue');

const useRouteStore = defineStore('route', () => {
    const siderItems = ref<Array<RouteRecordRaw>>([]);

    const getRoutes = (): Promise<Array<RouteRecordRaw>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await getRoutesApi();
                const data = res.data.data;
                const remoteDynamic = clearUpRoutes(cloneDeep(data));
                siderItems.value = getSideRoutes(cloneDeep(remoteDynamic));
                const remoteDynamicRoutes = filterRemoteDynamicRoutes(cloneDeep(remoteDynamic));
                const localDynamicRoutes = cloneDeep(dynamicRoutes);
                const routes = remoteDynamicRoutes.concat(localDynamicRoutes);

                resolve(routes);
            } catch {
                reject();
            }
        });
    };

    return {
        siderItems,
        getRoutes,
    };
});

/**
 * 菜单处理
 * @param routes
 * @returns
 */
function getSideRoutes(routes: Array<RouteRecordRaw>): Array<RouteRecordRaw> {
    return routes;
}

function filterRemoteDynamicRoutes(routes: Array<RouteRecordRaw>): Array<RouteRecordRaw> {
    const res: RouteRecordRaw[] = [];

    const recursion = (routesList: Array<RouteRecordRaw>) => {
        routesList.forEach((route) => {
            if (route.children) {
                // 如果有children属性则继续递归
                recursion(route.children);
            } else {
                // 如果没有将此路由添加到res
                res.push(route);
            }
        });
    };

    recursion(routes);

    return res;
}

/**
 * 整理服务器返回的路由对象
 * @param routes
 * @param lastPath
 * @returns
 */
function clearUpRoutes(
    routes: Array<RouteRecordRaw>,
    lastPath: string = '',
): Array<RouteRecordRaw> {
    return routes.map((route) => {
        route.path = lastPath ? lastPath + '/' + route.path : route.path;
        if (route.children) {
            // 如果存在子路由
            route.children = clearUpRoutes(route.children, route.path);
        } else {
            delete route.children;
        }

        if (route.component) {
            /**
             * 这里强行转换的原因,因为服务器的component属性返回的是string类型,但是本地的TS类型中不应该是string类型
             */
            const component = route.component as unknown as string;
            if (component === 'Layout' || component === 'ParentView') {
                // 目录菜单
                route.component = Inner;
            } else if (component === 'InnerLink') {
                // 内部外链
                route.component = Link;
            } else {
                // 页面
                route.component = loadView(component);
            }
        }

        return route;
    });
}

/**
 * 手动创建路由懒加载
 * @param viewPath 本地的组件地址
 * @returns
 */
function loadView(viewPath: string): any {
    for (const path in views) {
        const dir = path.split('views/')[1].split('.vue')[0];
        if (dir === viewPath) {
            return () => (views[path] as any)();
        }
    }
}

export default useRouteStore;
