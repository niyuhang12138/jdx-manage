<script setup lang="ts">
import { Layout } from 'ant-design-vue';
import Sider from '@/layout/sider/index.vue';
import Header from '@/layout/header/index.vue';
import Main from '@/layout/main/index.vue';
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
    </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/variable' as variable;

.container {
    .layout {
        height: 100%;
    }
}
</style>
