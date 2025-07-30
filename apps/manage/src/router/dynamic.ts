import type { RouteRecordRaw } from '@manage/types/vue-router';
import Inner from '@manage/layout/main/inner/index.vue';
// import Link from '@/layout/main/link/index.vue';

/**
 * NOTE：动态路由配置说明
 *
 * name：string # 路由名称
 * query：Record<string, string> # 访问路由时默认传递参数
 * roles：Array<string> # 访问路由的角色权限
 * permission：Array<string> # 访问路由的菜单权限
 * meta：{
 *  noCache：boolean # keep-alive不缓存
 *  title：string # 名称
 *  breadcrumb：boolean # 是否在面包屑中显示
 *  activeMenu: string # 对应激活菜单
 * }
 */

/**
 * 动态路由
 */
const dynamicRoutes: Array<RouteRecordRaw> = [
    {
        path: '/user',
        component: Inner,
        redirect: 'noredirect',
        children: [
            {
                path: 'profile',
                component: () => import('@manage/views/user/profile/index.vue'),
                name: 'Profile',
                meta: { title: '个人中心' },
            },
        ],
    },
] satisfies Array<RouteRecordRaw>;

export default dynamicRoutes;
