import { setTitle } from '@/utils/view';
import { BASE_TITLE } from '@/utils/variable';
import type { Router } from 'vue-router';

/**
 * 注册动态标题守卫
 * @param router
 */
function dynamicTitleGuard(router: Router) {
    router.beforeEach((to, _, next) => {
        if (to.meta.title) {
            setTitle(to.meta.title + ' - ' + BASE_TITLE);
        } else {
            setTitle(BASE_TITLE);
        }
        next();
    });
}

export default dynamicTitleGuard;
