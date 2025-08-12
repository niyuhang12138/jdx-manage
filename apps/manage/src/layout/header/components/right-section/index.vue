<script setup lang="ts">
import Search from '../search/index.vue';
import Bell from '../bell/index.vue';
import Message from '../message/index.vue';
import Setting from '../setting/index.vue';
import DropDown from '../drop-down/index.vue';
import useLayoutStore from '@manage/stores/layout';
import { storeToRefs } from 'pinia';
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
        <Search :size="iconSize"></Search>
        <Bell :size="iconSize"></Bell>
        <Message :size="iconSize"></Message>
        <Setting :size="iconSize"></Setting>
        <DropDown :size="iconSize"></DropDown>
    </div>
</template>
