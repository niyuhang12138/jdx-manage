import { BASE_TIMEOUT, BASE_URL } from '@manage/utils/variable';
import Request from './Request';
import useUserStore from '@manage/stores/user';
import { ErrorCode, errorCodeMap } from '@manage/utils/errorCode';
import router from '@manage/router';
import { message } from 'ant-design-vue';

export const request = new Request({
    baseURL: BASE_URL,
    timeout: BASE_TIMEOUT,
});

request.setRequestInterceptors(
    (config) => {
        const userStore = useUserStore();

        const token = userStore.getToken();
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

request.setResponseInterceptors<{
    code?: number;
    msg?: string;
}>(
    (response) => {
        return new Promise((resolve, reject) => {
            const userStore = useUserStore();

            const code = response.data.code ?? ErrorCode.OK;
            const msg: string = errorCodeMap[code] ?? response.data.msg ?? errorCodeMap['default'];

            // 未授权的或者说登录状态过期。
            if (code === ErrorCode.UN_AUTHORIZED) {
                userStore.logOut();
                router.push('/login');
                reject(new Error(msg));
            }

            // if (!(response.status >= 200 && response.status < 300)) {
            //     return Promise.reject(
            //         new Error(`请求错误: ${response.status} - ${response.statusText}`),
            //     );
            // }

            // if (response.data.code && response.data.code === ErrorCode.UN_AUTHORIZED) {
            //     // 处理未授权的错误
            //     reject({
            //         msg: ErrorMessage.UN_AUTHORIZED,
            //         code: ErrorCode.UN_AUTHORIZED,
            //     });
            // }

            // if (response.data.code) {
            //     switch (response.data.code) {
            //         case ErrorCode.REQUEST_ERROR:
            //             message.error(ErrorMessage.REQUEST_ERROR);
            //             break;
            //         case ErrorCode.SERVER_ERROR:
            //             message.error(ErrorMessage.SERVER_ERROR);
            //             break;
            //         case ErrorCode.UN_AUTHORIZED:
            //             break;
            //     }
            // }

            resolve(response);
        });
    },
    (error: Error) => {
        let { message: msg } = error;
        if (msg == 'Network Error') {
            msg = '后端接口连接异常';
        } else if (msg.includes('timeout')) {
            msg = '系统接口请求超时';
        } else if (msg.includes('Request failed with status code')) {
            msg = '系统接口' + msg.substring(msg.length - 3) + '异常';
        }
        message.error(msg);
        return Promise.reject(error);
    },
);
