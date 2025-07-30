import { registerAntdIcons } from '@manage/components/antd-icon';
import type { App } from 'vue';

function registerGlobalComponent(app: App) {
    registerAntdIcons(app);
}

export default registerGlobalComponent;
