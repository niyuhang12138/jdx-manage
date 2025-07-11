<script setup lang="ts">
import { Layout, theme } from 'ant-design-vue';
import type { CSSProperties } from 'vue';

const { Header } = Layout;
const { token } = theme.useToken();

const headerStyle: CSSProperties = {
    background: token.value.colorBgContainer,
};
</script>

<template>
    <Header class="header" :style="headerStyle"></Header>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variable' as variable;

.header {
    height: variable.$header-height;
    background: red;
}
</style>
