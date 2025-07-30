<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem } from 'ant-design-vue';
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

interface BreadcrumbItem {
    label: string;
    link: string;
    icon?: string;
}

const defaultItems: Array<BreadcrumbItem> = [
    {
        label: '首页',
        link: '/index',
        icon: 'HomeOutlined',
    },
];

const route = useRoute();

const breadcrumbItems = computed<Array<BreadcrumbItem>>(() => {
    const label = route.meta.title;
    const link = route.path;
    const icon = route.meta.icon;
    if (!label) return defaultItems.concat({ label: '暂无名称', link, icon });
    if (defaultItems.find((item) => item.label === label)) return defaultItems;
    else return defaultItems.concat({ label, link, icon });
});
</script>
<template>
    <div class="wrapper">
        <Breadcrumb>
            <BreadcrumbItem v-for="item in breadcrumbItems" :key="item.link"
                ><RouterLink class="link" :to="item.link">
                    <template v-if="item.icon"><Component :is="item.icon"></Component></template>
                    {{ item.label }}
                </RouterLink></BreadcrumbItem
            >
        </Breadcrumb>
    </div>
</template>
<style lang="scss" scoped>
.wrapper {
    .link {
        vertical-align: bottom;
    }
}
</style>
