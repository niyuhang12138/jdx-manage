import { request } from '@manage/service';
import type { InfoRes } from '@manage/types/common/info';
import type { RoutesRes } from '@manage/types/common/routes';

export function getInfoApi() {
    return request.get<unknown, InfoRes>('/getInfo');
}

export function getRoutesApi() {
    return request.get<unknown, RoutesRes>('/getRouters');
}
