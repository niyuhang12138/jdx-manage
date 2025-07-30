<script setup lang="ts">
import { Layout, theme } from 'ant-design-vue';
import { computed, type CSSProperties } from 'vue';
import useLayoutStore from '@manage/stores/layout';
import { storeToRefs } from 'pinia';
import LeftSection from './components/left-section/index.vue';
import RightSection from './components/right-section/index.vue';

const { Header } = Layout;
const { token } = theme.useToken();
const layoutStore = useLayoutStore();
const { defaultHeaderHeight, mobileHeaderHeight, isMobile } = storeToRefs(layoutStore);

const headerStyle = computed<CSSProperties>(() => {
    return {
        background: token.value.colorBgContainer,
        height: isMobile.value ? `${mobileHeaderHeight.value}vw` : `${defaultHeaderHeight.value}px`,
        borderBottomColor: token.value.colorBorder,
    };
});
</script>

<template>
    <Header class="header" :style="headerStyle">
        <LeftSection class="left"></LeftSection>
        <RightSection class="right"></RightSection>
    </Header>
</template>

<style scoped lang="scss">
@use '@manage/assets/styles/variable' as variable;

.header {
    border-bottom: 1px solid transparent;
    display: flex;
    justify-content: space-between;

    .left,
    .right {
        height: 100%;
        display: flex;
        align-items: center;
        gap: 20px;
    }
}

@media (max-width: variable.$md-screen) {
    .header {
        padding: 0 6.4vw;
    }
}
</style>
