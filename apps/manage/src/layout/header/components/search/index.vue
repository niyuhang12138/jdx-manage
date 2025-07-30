<script setup lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue';
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
            animation: headShake 1s ease;
            color: ${(props) => props.theme.antd.colorPrimary};
        }
    }
`;
</script>
<template>
    <Wrapper class="wrapper">
        <SearchOutlined class="icon" />
    </Wrapper>
</template>
<style lang="scss" scoped>
@use '@manage/assets/styles/mixin.scss' as mixin;

.wrapper {
    @include mixin.flex-center;
}
</style>
