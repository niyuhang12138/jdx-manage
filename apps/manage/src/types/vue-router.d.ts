import 'vue-router';
import type { RouteRecordRaw as OriginRouteRecordRaw } from 'vue-router';

export type RouteRecordRaw = OriginRouteRecordRaw & {
    children?: Array<RouteRecordRaw>;
    roles?: Array<string>;
};

declare module 'vue-router' {
    interface RouteMeta {
        title?: string; // 页面标题
        noCache?: boolean; // 是否缓存
        breadcrumb?: string; // 是否在面包屑中显示
        activeMenu?: string; // 对应的激活菜单
        icon?: string;
    }
}
