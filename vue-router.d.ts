import 'vue-router';

export {};

declare module 'vue-router' {
    interface RouteMeta {
        title?: string; // 页面标题
    }
}
