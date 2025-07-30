<script setup lang="ts">
import { Layout, theme } from 'ant-design-vue';
import type { CSSProperties } from 'vue';
import Inner from './inner/index.vue';
import Link from './link/index.vue';

const { Content } = Layout;
const { token } = theme.useToken();

const mainStyle: CSSProperties = {
    background: token.value.colorBgContainer,
};
</script>

<template>
    <Content class="main" :style="mainStyle">
        <Inner></Inner>
        <Link></Link>
    </Content>
</template>

<style scoped lang="scss">
.main {
    overflow: hidden auto;
}
</style>
