import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { localCache } from '@manage/utils/cache';
import type { User } from '@manage/types/common/info';
import { getInfoApi } from '@manage/api/common';
import useAppStore from './app';

const useUserStore = defineStore('user', () => {
    const token = ref(localCache.get<string>('token') ?? '');
    const appStore = useAppStore();
    const { isLogin } = storeToRefs(appStore);

    const getToken = () => {
        return token.value;
    };

    const setToken = (newToken: string) => {
        token.value = newToken;
        localCache.set('token', newToken);
    };

    const rmToken = () => {
        token.value = '';
        localCache.remove('token');
    };

    const user = ref<User | null>(null);
    const roles = ref<Array<string>>([]);
    const permissions = ref<Array<string>>([]);

    const getInfo = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await getInfoApi();
                if (res.data.code === 200) {
                    user.value = res.data.user;
                    permissions.value = res.data.permission;
                    if (res.data.roles && res.data.roles.length > 0) {
                        roles.value = res.data.roles;
                    } else {
                        roles.value = ['ROLE_DEFAULT'];
                    }
                    resolve(void 0);
                }
            } catch {
                reject();
            }
        });
    };

    /**
     * 删除登录状态信息
     */
    const logOut = () => {
        rmToken();
        user.value = null;
        roles.value = [];
        permissions.value = [];
        isLogin.value = false;
    };

    return {
        getToken,
        setToken,
        rmToken,
        user,
        roles,
        permissions,
        getInfo,
        logOut,
    };
});

export default useUserStore;
