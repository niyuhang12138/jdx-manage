export interface captchares {
    msg: string;
    img: string;
    code: number;
    captchaEnabled: boolean;
    uuid: string;
}

export interface loginreq {
    code: string;
    username: string;
    password: string;
    uuid: string;
}

export interface loginres {
    msg: string;
    code: number;
    token: string;
}
