<script setup lang="ts">
import { Layout, theme } from 'ant-design-vue';
import type { CSSProperties } from 'vue';

import useLayoutStore from '@manage/stores/layout';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
import Menu from '@manage/components/menu/index.vue';

const a: any = 12;

const { Sider } = Layout;
const { token } = theme.useToken();
const layoutStore = useLayoutStore();
const { siderWidth, siderCollapsed, isDesktop, isMobile } = storeToRefs(layoutStore);

/**
 * Sider区域动态样式
 */
const sidleStyle = computed<CSSProperties>(() => {
    return {
        background: token.value.colorBgContainer,
        borderRightColor: token.value.colorBorder,
    };
});

/**
 * 响应式布局，监听屏幕变化，如果是桌面设备则展开侧边栏，否则折叠
 */
watch(isDesktop, (newVal) => {
    siderCollapsed.value = !newVal;
});

const collapsedWidth = computed(() => {
    console.log(isMobile.value ? 0 : 80);
    return isMobile.value ? 0 : 80;
});
</script>

<template>
    <Sider
        class="sider"
        :style="sidleStyle"
        :width="siderWidth"
        :trigger="null"
        collapsible
        :collapsed="siderCollapsed"
        :collapsed-width="collapsedWidth"
    >
        <Menu></Menu>
    </Sider>
</template>

<style lang="scss" scoped>
@use '@manage/assets/styles/variable' as variable;

.sider {
    box-sizing: border-box;
    height: 100%;
    background: transparent;
    border-right-style: solid;
    border-right-width: 1px;
}
</style>
