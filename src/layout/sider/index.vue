<script setup lang="ts">
import { Layout, theme } from 'ant-design-vue';
import type { CSSProperties } from 'vue';

const { Sider } = Layout;
const { token } = theme.useToken();

const sidleStyle: CSSProperties = {
    background: token.value.colorBgContainer,
    borderRightColor: token.value.colorBorder,
};
</script>
<template>
    <Sider class="sider" :style="sidleStyle">
        <section class="logo-section">
            <img class="logo-img" src="" />
            <h1 class="logo-title"></h1>
        </section>
    </Sider>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/variable' as variable;

.sider {
    width: variable.$sider-width;
    height: 100%;
    background: transparent;
    border-right-width: 0.27vw;
    border-right-style: solid;
    box-sizing: border-box;
}
</style>
