import { defineStore } from 'pinia';
import { ref } from 'vue';

const useThemeStore = defineStore('theme', () => {
    const colorPrimary = ref('#fd7412');

    return {
        colorPrimary,
    };
});

export default useThemeStore;
