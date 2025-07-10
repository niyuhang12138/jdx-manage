import { request } from '@/service';
import type { CaptchaRes, LoginReq, LoginRes } from '@/types/login';

export function getCaptchaImageApi() {
    return request.get<undefined, CaptchaRes>('/captchaImage');
}

export function loginApi(data: LoginReq) {
    return request.post<LoginReq, LoginRes>('/login', data);
}
