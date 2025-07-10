<script setup lang="ts">
import { Layout } from 'ant-design-vue';
import type { CSSProperties } from 'vue';
const { Header, Content, Sider } = Layout;

const headerStyle: CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
};

const contentStyle: CSSProperties = {
    textAlign: 'center',
    // height: 1
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
};

const siderStyle: CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',
};
</script>
<template>
    <div class="container">
        <Layout>
            <Sider :style="siderStyle">11</Sider>
            <Layout>
                <Header :style="headerStyle">22</Header>
                <Content :style="contentStyle">33</Content>
            </Layout>
        </Layout>
    </div>
</template>
<style lang="scss" scoped></style>
