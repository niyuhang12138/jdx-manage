<script setup lang="ts">
import FoldOrUnFold from '../fold-or-unfold/index.vue';
import Breadcrumb from '../breadcrumb/index.vue';
import useLayoutStore from '@manage/stores/layout';
import { storeToRefs } from 'pinia';
import Logo from '@manage/assets/images/logo.png';
import Menu from '../menu/index.vue';
import { computed } from 'vue';

const layoutStore = useLayoutStore();
const { isMobile } = storeToRefs(layoutStore);

/**
 * 计算图标大小
 */
const iconSize = computed<string>(() => {
    return isMobile.value ? '4.2667vw' : '20px';
});
</script>
<template>
    <div class="wrapper">
        <template v-if="!isMobile">
            <FoldOrUnFold :size="iconSize"></FoldOrUnFold>
            <Breadcrumb></Breadcrumb>
        </template>
        <template v-else>
            <img class="logo" :src="Logo" alt="Logo" />
            <Menu :size="iconSize"></Menu>
        </template>
    </div>
</template>
<style lang="scss" scoped>
.wrapper {
    .logo {
        width: 7vw;
        height: 7vw;
    }
}
</style>
