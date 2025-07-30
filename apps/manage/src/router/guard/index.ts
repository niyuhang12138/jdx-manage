import type { Router } from 'vue-router';
import dynamicTitleGuard from './dynamic-title';
import dynamicRouteGuard from './dynamic-route';

function registerGuard(router: Router) {
    // 动态标题守卫
    dynamicTitleGuard(router);
    dynamicRouteGuard(router);
}

export default registerGuard;
