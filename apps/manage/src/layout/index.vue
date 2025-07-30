<script setup lang="ts">
import { Layout } from 'ant-design-vue';
import Sider from '@manage/layout/sider/index.vue';
import Header from '@manage/layout/header/index.vue';
import Main from '@manage/layout/main/index.vue';
import DrawerMenu from '@manage/components/drawer-menu/index.vue';
</script>
<template>
    <div class="container">
        <Layout class="layout">
            <Sider></Sider>
            <Layout>
                <Header></Header>
                <Main></Main>
            </Layout>
        </Layout>

        <!-- 抽屉菜单 -->
        <DrawerMenu></DrawerMenu>
    </div>
</template>
<style lang="scss" scoped>
.container {
    .layout {
        height: 100%;
    }
}
</style>
