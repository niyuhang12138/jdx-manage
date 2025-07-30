<script setup lang="ts">
import { ThemeProvider } from '@vue-styled-components/core';
import { theme } from 'ant-design-vue';

const { token } = theme.useToken();
</script>
<template>
    <ThemeProvider :theme="{ antd: token }">
        <slot></slot>
    </ThemeProvider>
</template>
<style lang="scss" scoped></style>
