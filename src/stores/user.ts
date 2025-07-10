import { defineStore } from 'pinia';
import { ref } from 'vue';
import { localCache } from '@/utils/cache';

const useUserStore = defineStore('user', () => {
    const token = ref(localCache.get<string>('token') ?? '');

    const setToken = (newToken: string) => {
        token.value = newToken;
        localCache.set('token', newToken);
    };

    const removeToken = () => {
        token.value = '';
        localCache.remove('token');
    };

    return {
        setToken,
        removeToken,
    };
});

export default useUserStore;
