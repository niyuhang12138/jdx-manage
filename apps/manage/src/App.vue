<script setup lang="ts">
import { RouterView } from 'vue-router';
import AntdConfig from '@manage/components/antd-config/index.vue';
import StyledConfig from '@manage/components/styled-config/index.vue';
</script>
<template>
    <AntdConfig>
        <StyledConfig>
            <RouterView #default="{ Component }">
                <Component :is="Component" style="width: 100vw; height: 100vh"></Component>
            </RouterView>
        </StyledConfig>
    </AntdConfig>
</template>
