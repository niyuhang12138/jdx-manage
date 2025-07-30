<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import useLayoutStore from '@manage/stores/layout';
import { storeToRefs } from 'pinia';
import styled from '@vue-styled-components/core';

interface IProps {
    size: string;
}

const props = defineProps<IProps>();

const layoutStore = useLayoutStore();
const { siderCollapsed } = storeToRefs(layoutStore);

/**
 * 切换菜单是否折叠
 */
const iconClickHandler = () => {
    siderCollapsed.value = !siderCollapsed.value;
};

const Wrapper = styled.section`
    .icon {
        font-size: ${props.size};
        cursor: pointer;

        &:hover {
            animation: heartBeat 1s ease;
            color: ${(props) => props.theme.antd.colorPrimary};
        }
    }
`;
</script>
<template>
    <Wrapper class="wrapper">
        <MenuFoldOutlined class="icon" v-if="!siderCollapsed" @click="iconClickHandler" />
        <MenuUnfoldOutlined class="icon" v-else @click="iconClickHandler" />
    </Wrapper>
</template>
<style lang="scss" scoped>
@use '@manage/assets/styles/mixin.scss' as mixin;

.wrapper {
    @include mixin.flex-center;
}
</style>
