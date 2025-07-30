<script setup lang="ts">
import { SettingOutlined } from '@ant-design/icons-vue';
import styled from '@vue-styled-components/core';

interface IProps {
    size: string;
}

const props = defineProps<IProps>();

const Wrapper = styled.section`
    .icon {
        font-size: ${props.size};
        cursor: pointer;

        &:hover {
            animation: rotate 1s ease;
            color: ${(props) => props.theme.antd.colorPrimary};
        }
    }
`;
</script>
<template>
    <Wrapper class="wrapper">
        <SettingOutlined class="icon"></SettingOutlined>
    </Wrapper>
</template>
<style lang="scss" scoped>
@use '@manage/assets/styles/mixin.scss' as mixin;

.wrapper {
    @include mixin.flex-center;
}
</style>
