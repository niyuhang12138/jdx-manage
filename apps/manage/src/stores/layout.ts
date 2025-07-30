import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import useBreakpoint from 'ant-design-vue/es/_util/hooks/useBreakpoint';
import type { Breakpoint } from 'ant-design-vue/es/_util/responsiveObserve';

/**
 * 布局相关的 Pinia Store
 */
const breakpointsOrder: Breakpoint[] = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
const mobileBreakpoints: Breakpoint[] = ['xs', 'sm'];
const tabletBreakpoints: Breakpoint[] = ['md'];
const desktopBreakpoints: Breakpoint[] = ['lg', 'xl', 'xxl'];
const largeScreenBreakpoints: Breakpoint[] = ['xxxl'];

const useLayoutStore = defineStore('layout', () => {
    // 侧边栏宽度
    const siderWidth = ref(250);

    // 头部高度
    const defaultHeaderHeight = ref(64);
    const mobileHeaderHeight = ref(13.3333);

    // 侧边栏折叠状态
    const siderCollapsed = ref(false);

    /**
     * 响应式断点
     * 使用 Ant Design Vue 的 useBreakpoint 钩子来获取当前屏幕的断点信息
     */
    const breakpoints = useBreakpoint();

    /**
     * 获取当前屏幕的符合条件的最高断点
     * @returns 按照数组定义顺序返回的最高断点名称，或者 null 如果没有匹配的断点
     */
    const getCurrentBreakpoint = (): Breakpoint | null => {
        return breakpointsOrder.find((bp) => breakpoints.value[bp]) || null;
    };

    /**
     * 手机
     */
    const isMobile = computed(() => {
        const currentBreakpoint = getCurrentBreakpoint();
        return currentBreakpoint ? mobileBreakpoints.includes(currentBreakpoint) : false;
    });

    /**
     * 平板
     */
    const isTablet = computed(() => {
        const currentBreakpoint = getCurrentBreakpoint();
        return currentBreakpoint ? tabletBreakpoints.includes(currentBreakpoint) : false;
    });

    /**
     * 桌面设备
     */
    const isDesktop = computed(() => {
        const currentBreakpoint = getCurrentBreakpoint();
        return currentBreakpoint ? desktopBreakpoints.includes(currentBreakpoint) : false;
    });

    /**
     * 大屏幕设备
     */
    const isLargeScreen = computed(() => {
        const currentBreakpoint = getCurrentBreakpoint();
        return currentBreakpoint ? largeScreenBreakpoints.includes(currentBreakpoint) : false;
    });

    watch([isMobile, isTablet], (newVal) => {
        siderCollapsed.value = newVal[0] || newVal[1];
    });

    const drawerSiderSwitch = ref(false);

    return {
        siderWidth,
        defaultHeaderHeight,
        mobileHeaderHeight,
        siderCollapsed,
        isMobile,
        isTablet,
        isDesktop,
        isLargeScreen,
        drawerSiderSwitch,
    };
});

export default useLayoutStore;
