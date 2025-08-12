export interface infores {
    code: number;
    msg: string;
    permission: array<string>;
    roles: array<string>;
    user: user;
}

export interface user {
    // createBy: string;
    // createTime: string;
    userId: number;

    // deptId: number;
    userName: string;

    // companyId: number;
    deptName: string;
    nickName: string;

    // phonenumber: string;
    // sex: string;
    avatar: string;

    // password: string;
    // status: string;
    // delFlag: string;
    // loginIp: string;
    // loginDate: string;
    // dept: Dept;
    // roles: Role[];
    // admin: boolean;
}

// export interface Dept {
//     deptId: number;
//     parentId: number;
//     ancestors: string;
//     deptName: string;
//     orderNum: number;
//     leader: string;
//     status: string;
//     displayed: number;
//     children: Dept[];
// }

// export interface Role {
//     roleId: number;
//     roleName: string;
//     roleKey: string;
//     roleSort: number;
//     dataScope: string;
//     menuCheckStrictly: boolean;
//     deptCheckStrictly: boolean;
//     status: string;
//     flag: boolean;
//     permissions: string[];
//     admin: boolean;
// }
