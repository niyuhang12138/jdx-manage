import { request } from '@manage/service';
import type { CaptchaRes, LoginReq, LoginRes } from '@manage/types/login';

export function getCaptchaImageApi() {
    return request.get<undefined, CaptchaRes>('/captchaImage');
}

export function loginApi(data: LoginReq) {
    return request.post<LoginReq, LoginRes>('/login', data);
}
