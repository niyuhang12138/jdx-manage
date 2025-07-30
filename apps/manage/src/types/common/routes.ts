import type { RouteRecordRaw } from '@manage/types/vue-router';

export interface RoutesRes {
    code: number;
    data: Array<RouteRecordRaw>;
}
