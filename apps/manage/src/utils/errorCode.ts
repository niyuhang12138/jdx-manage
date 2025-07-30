export enum ErrorCode {
    UN_AUTHORIZED = 401,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500,
    OK = 200,
}

export const errorCodeMap: {
    [key: string | number]: string;
} = {
    [ErrorCode.UN_AUTHORIZED]: '未授权，请重新登录',
    [ErrorCode.BAD_REQUEST]: '请求错误',
    [ErrorCode.SERVER_ERROR]: '服务端错误，请稍后再试。',
    default: '系统未知错误，请联系管理员。',
};
