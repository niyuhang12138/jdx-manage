import { BASE_TIMEOUT, BASE_URL } from '@/utils/variable';
import Request from './Request';

export const request = new Request({
    baseURL: BASE_URL,
    timeout: BASE_TIMEOUT,
});

request.setRequestInterceptors((config) => {
    return config;
});

request.setResponseInterceptors((response) => {
    if (!(response.status >= 200 && response.status < 300)) {
        return Promise.reject(new Error(`请求错误: ${response.status} - ${response.statusText}`));
    }
    return response;
});
