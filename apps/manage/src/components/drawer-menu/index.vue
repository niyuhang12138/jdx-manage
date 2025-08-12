<script setup lang="ts">
import { Drawer } from 'ant-design-vue';
import Menu from '@manage/components/menu/index.vue';
import useLayoutStore from '@manage/stores/layout';
import { storeToRefs } from 'pinia';
import type { CSSProperties } from 'vue';

const layoutStore = useLayoutStore();
const { drawerSiderSwitch } = storeToRefs(layoutStore);

const drawerBodyStyle: CSSProperties = {
    padding: '0px',
};
</script>
<template>
    <div class="wrapper">
        <Drawer
            v-model:open="drawerSiderSwitch"
            placement="left"
            width="70%"
            :body-style="drawerBodyStyle"
            :closable="false"
        >
            <Menu></Menu>
        </Drawer>
    </div>
</template>
