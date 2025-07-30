<script setup lang="ts">
import { Dropdown, Avatar, Menu } from 'ant-design-vue';
import type { MenuProps } from 'ant-design-vue';
import defaultAvatar from '@manage/assets/images/profile.jpg';
import { UserSwitchOutlined, SwapOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import useUserStore from '@manage/stores/user';
import { storeToRefs } from 'pinia';
import { computed, h } from 'vue';
import { useRouter } from 'vue-router';
import useLayoutStore from '@manage/stores/layout';
import type { AvatarSize } from 'ant-design-vue/es/avatar';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const layoutStore = useLayoutStore();
const { isMobile } = storeToRefs(layoutStore);

const router = useRouter();

// 默认公司名称
const defaultDeptName = '未查询到公司名称';

/**
 * 查看个人信息
 */
const gotoProfileHandler = () => {
    router.push('/user/profile');
};

/**
 * 退出登录
 */
const logoutHandler = () => {
    console.log('退出登录');
};

const swapAccountHandler = () => {
    console.log('切换我的关联账号');
};

/**
 * dropdown 下拉列表
 */
const menuItems: MenuProps['items'] = [
    {
        key: 'profile',
        icon: () => h(UserSwitchOutlined),
        label: '个人中心',
        onClick: gotoProfileHandler,
    },
    {
        key: 'logout',
        icon: () => h(LogoutOutlined),
        label: '退出登录',
        onClick: logoutHandler,
    },
    {
        key: 'swap-account',
        icon: () => h(SwapOutlined),
        label: '切换我的关联账号',
        onClick: swapAccountHandler,
    },
];

const avatarSize = computed<AvatarSize>(() => {
    return isMobile.value ? 'default' : 'large'; // 根据是否是移动端调整头像大小
});
</script>
<template>
    <div class="wrapper">
        <Dropdown>
            <section class="profile-area">
                <Avatar :src="defaultAvatar" shape="square" :size="avatarSize"></Avatar>
                <div class="company-name" v-if="!isMobile">
                    {{ user?.deptName ?? defaultDeptName }}
                </div>
            </section>

            <template #overlay>
                <Menu :items="menuItems"></Menu>
            </template>
        </Dropdown>
    </div>
</template>
<style lang="scss" scoped>
@use '@manage/assets/styles/mixin.scss' as mixin;

.wrapper {
    @include mixin.flex-center;

    .profile-area {
        @include mixin.flex-center;

        gap: 10px;
        cursor: pointer;

        .company-name {
            font-size: 16px;
            font-weight: bold;
        }
    }
}
</style>
