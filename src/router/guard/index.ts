import type { Router } from 'vue-router';
import dynamicTitleGuard from './dynamic-title';

function registerGuard(router: Router) {
    // 动态标题守卫
    dynamicTitleGuard(router);
}

export default registerGuard;
