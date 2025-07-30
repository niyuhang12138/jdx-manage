<script setup lang="ts">
import { MenuOutlined } from '@ant-design/icons-vue';
import styled from '@vue-styled-components/core';
import useLayoutStore from '@manage/stores/layout';
import { storeToRefs } from 'pinia';

interface IProps {
    size: string;
}

const props = defineProps<IProps>();

const layoutStore = useLayoutStore();
const { drawerSiderSwitch } = storeToRefs(layoutStore);

const Wrapper = styled.section`
    .icon {
        font-size: ${props.size};
        cursor: pointer;

        &:hover {
            animation: swing 1s ease;
            color: ${(props) => props.theme.antd.colorPrimary};
        }
    }
`;

const menuIconClickHandler = () => {
    drawerSiderSwitch.value = !drawerSiderSwitch.value;
};
</script>
<template>
    <Wrapper class="wrapper">
        <MenuOutlined class="icon" @click="menuIconClickHandler" />
    </Wrapper>
</template>
<style lang="scss" scoped>
@use '@manage/assets/styles/mixin.scss' as mixin;

.wrapper {
    @include mixin.flex-center;
}
</style>
