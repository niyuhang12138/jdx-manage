import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAppStore = defineStore('app', () => {
    const isLogin = ref(false);

    return {
        isLogin,
    };
});

export default useAppStore;
