<script setup lang="ts">
import { Menu, type ItemType, theme } from 'ant-design-vue';
import { computed, type CSSProperties } from 'vue';
import useRouteStore from '@manage/stores/route';
import { useRouter } from 'vue-router';
import type { RouteRecordRaw } from '@manage/types/vue-router';
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface';
import { storeToRefs } from 'pinia';
import Logo from '@manage/assets/images/logo.png';
import { BASE_TITLE } from '@manage/utils/variable';
import useLayoutStore from '@manage/stores/layout';

const routeStore = useRouteStore();
const { siderItems } = storeToRefs(routeStore);

const layoutStore = useLayoutStore();
const { defaultHeaderHeight, siderCollapsed, isMobile } = storeToRefs(layoutStore);

const router = useRouter();

const { token } = theme.useToken();

/**
 * Logo区域动态样式
 */
const logoSectionStyle = computed<CSSProperties>(() => {
    return {
        height: defaultHeaderHeight.value + 'px',
        borderBottomColor: token.value.colorBorder,
    };
});

/**
 * Logo标题显示逻辑
 */
const isLogoTitleShow = computed(() => {
    return !siderCollapsed.value || isMobile.value;
});

/**
 * Menu区域样式
 */
const menuSectionStyle = computed<CSSProperties>(() => {
    return {
        height: `calc(100% - ${defaultHeaderHeight.value}px)`,
    };
});

/**
 * 获取路由映射菜单对象
 * @param route
 */
function getItem(route: RouteRecordRaw) {
    const item: ItemType & {
        children?: Array<ItemType>;
    } = {
        key: route.path,
        // icon: route.meta.icon,
        label: route.meta?.title ?? '默认标题',
    };
    if (route.children) {
        item.children = route.children.map((item) => getItem(item));
    }
    return item;
}

/**
 * 默认一定会显式的菜单
 */
const defaultItems: Array<ItemType> = [
    {
        key: '/index',
        label: '首页',
    },
];

/**
 * 计算所有菜单项
 */
const menuItems = computed<Array<ItemType>>(() => {
    return defaultItems.concat(
        siderItems.value.map((item: RouteRecordRaw) => {
            return getItem(item);
        }),
    );
});

/**
 * 菜单被点击时触发
 */
const menuClickHandler = ({ key }: MenuInfo) => {
    console.log('click menu key = ', key);
    router.push(key.toString());
};
</script>
<template>
    <div class="container">
        <section class="logo-section" :style="logoSectionStyle">
            <img class="logo-img" :src="Logo" alt="logo" />
            <h1 class="logo-title" v-show="isLogoTitleShow">{{ BASE_TITLE }}</h1>
        </section>
        <section class="menu-section" :style="menuSectionStyle">
            <Menu mode="inline" :items="menuItems" @click="menuClickHandler"></Menu>
        </section>
    </div>
</template>
<style lang="scss" scoped>
@use '@manage/assets/styles/variable' as variable;

.container {
    .logo-section {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0 10px;

        .logo-img {
            transition: all 0.3s ease;
            width: 32px;
            height: 32px;
        }
    }

    .menu-section {
        overflow-y: auto;
    }
}

@media (max-width: variable.$md-screen) {
    .container {
        .logo-section {
            .logo-img {
                width: 8.5333vw;
                height: 8.5333vw;
            }

            .logo-title {
                font-size: 4.2667vw;
            }
        }
    }
}
</style>
