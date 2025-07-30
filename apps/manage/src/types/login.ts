export interface CaptchaRes {
    msg: string;
    img: string;
    code: number;
    captchaEnabled: boolean;
    uuid: string;
}

export interface LoginReq {
    code: string;
    username: string;
    password: string;
    uuid: string;
}

export interface LoginRes {
    msg: string;
    code: number;
    token: string;
}
