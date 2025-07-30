<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import useThemeStore from '@manage/stores/theme';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';

const themeStore = useThemeStore();
const { colorPrimary } = storeToRefs(themeStore);

const antdTheme = computed<ThemeConfig>(() => {
    return {
        token: {
            colorPrimary: colorPrimary.value,
        },
    };
});
</script>

<template>
    <ConfigProvider :theme="antdTheme">
        <slot></slot>
    </ConfigProvider>
</template>
