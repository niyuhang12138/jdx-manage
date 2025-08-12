import * as Icons from '@ant-design/icons-vue';
import type { App, DefineComponent } from 'vue';

// 提取所有图标组件名称（包含不同命名形式）
export const allAntdIconNames: Array<string> = Object.keys(Icons)
    // 过滤出可能的图标组件（排除工具类函数）
    .filter((name) => {
        // 匹配以 Icon 结尾，或包含 Outlined/Filled 等风格后缀的名称
        return name.endsWith('Icon') || /(Outlined|Filled|TwoTone)$/.test(name);
    });

export function registerAntdIcons(app: App) {
    allAntdIconNames.forEach((iconName: string) => {
        app.component(iconName, (Icons as unknown as Array<string>)[iconName] as DefineComponent);
    });
}
