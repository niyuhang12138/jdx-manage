import '@vue-styled-components/core';
import type { GlobalToken } from 'ant-design-vue/es/theme/interface/index.d.ts';

declare module '@vue-styled-components/core' {
    interface DefaultTheme {
        antd: GlobalToken;
    }
}
