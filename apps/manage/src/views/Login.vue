<script lang="ts" setup>
import { h, onMounted, onUnmounted, reactive, ref, useTemplateRef } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import LoginPicture from '@manage/assets/images/logo.png';
import { BASE_TITLE } from '@manage/utils/variable';
import { Form, FormItem, Input, Button, Checkbox, Row, Col, message } from 'ant-design-vue';
import {
    UserOutlined,
    LockOutlined,
    MinusCircleOutlined,
    LoginOutlined,
} from '@ant-design/icons-vue';
import { getCaptchaImageApi, loginApi } from '@manage/api/login';
import type { LoginReq } from '@manage/types/login';
import type { Rule } from 'ant-design-vue/es/form';
import { useRouter } from 'vue-router';
import useUserStore from '@manage/stores/user';
import { localCache } from '@manage/utils/cache';

const router = useRouter();
const userStore = useUserStore();
const { Password } = Input;
const loginForm = ref<FormInstance>();

type LoginData = LoginReq & { remember: boolean };
type LoginAccount = Record<Exclude<keyof LoginReq, 'uuid' | 'code'>, string>;

const loginData: LoginData = reactive({
    username: '',
    password: '',
    uuid: '',
    code: '',
    remember: false,
});

// loginData中的所有字段都使用Rule[]
const loginRules: Record<Exclude<keyof LoginData, 'remember' | 'uuid'>, Rule[]> = {
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入密码' }],
    code: [{ required: true, message: '请输入验证码' }],
};

// 存储图片验证码
const captchaImage = ref('');

/**
 * 获取验证码图片
 */
async function getCaptchaImage() {
    const res = await getCaptchaImageApi();
    captchaImage.value = 'data:image/gif;base64,' + res.data.img;
    loginData.uuid = res.data.uuid;
}

// 登录加载状态
const loading = ref(false);

/**
 * 登录处理函数
 */
const loginHandler = async () => {
    loading.value = true;
    try {
        const { username, password, code, uuid } = loginData;
        const res = await loginApi({ username, password, code, uuid });
        if (res.data.code !== 200) {
            message.error(res.data.msg);
            loginData.code = '';
            // 获取新的验证码
            await getCaptchaImage();
            return;
        }
        message.success('欢迎回来～');
        // 存储token
        userStore.setToken(res.data.token);
        // 如果记住密码，存储用户名和密码
        if (loginData.remember) {
            localCache.set<LoginAccount>('login-account', {
                username: loginData.username,
                password: loginData.password,
            });
        } else {
            localCache.remove('login-account');
        }
        // 跳转到首页
        router.push('/');
    } finally {
        loading.value = false;
    }
};

const loginTitleInstance = useTemplateRef<HTMLDivElement>('loginTitle');
// 定时器（在onUnmounted时清除）
let timer: NodeJS.Timeout;
/**
 * 登录标题动画
 */
function loginTitleAnimation() {
    let str = '';
    const len = BASE_TITLE.length;
    timer = setInterval(() => {
        if (loginTitleInstance.value) {
            if (str.length === len) {
                str = BASE_TITLE.slice(0, 1);
            } else {
                str = BASE_TITLE.slice(0, str.length + 1);
            }
            loginTitleInstance.value.textContent = str;
        }
    }, 500);
}

/**
 * 设置初始登录数据
 */
function setInitialLoginData() {
    const loginAccount = localCache.get<LoginAccount>('login-account');
    if (loginAccount) {
        loginData.username = loginAccount.username;
        loginData.password = loginAccount.password;
        loginData.remember = true;
    }
}

/**
 * 初始化数据
 */
const init = async () => {
    await getCaptchaImage();
    // 设置登录标题的动画
    loginTitleAnimation();
    // 设置初始登录数据
    setInitialLoginData();
};

onMounted(() => {
    init();
});

onUnmounted(() => {
    // 清除定时器
    clearInterval(timer);
});
</script>

<template>
    <div class="container">
        <!-- 背景图 -->
        <div class="login-bg"></div>

        <Row class="login-row">
            <Col :span="0" :xl="12"></Col>
            <Col :span="24" :xl="12" class="login-col">
                <!-- 登录卡片 -->
                <div class="login-card">
                    <div class="login-logo">
                        <img :src="LoginPicture" alt="Logo" />
                        <h1>
                            <span class="login-title" ref="loginTitle">{{ BASE_TITLE }}</span>
                        </h1>
                    </div>

                    <Form
                        :form="loginForm"
                        :model="loginData"
                        name="login"
                        @finish="loginHandler"
                        size="large"
                        autocomplete="off"
                        :rules="loginRules"
                    >
                        <!-- 用户名 -->
                        <FormItem name="username">
                            <Input placeholder="用户名" v-model:value="loginData.username">
                                <template #prefix>
                                    <UserOutlined />
                                </template>
                            </Input>
                        </FormItem>

                        <!-- 密码 -->
                        <FormItem name="password">
                            <Password placeholder="密码" v-model:value="loginData.password">
                                <template #prefix>
                                    <LockOutlined />
                                </template>
                            </Password>
                        </FormItem>

                        <FormItem name="code">
                            <div class="verification-code">
                                <Input placeholder="验证码" v-model:value="loginData.code">
                                    <template #prefix>
                                        <MinusCircleOutlined />
                                    </template>
                                </Input>
                                <img :src="captchaImage" alt="验证码" @click="getCaptchaImage" />
                            </div>
                        </FormItem>

                        <!-- 记住密码和忘记密码 -->
                        <FormItem name="remember" valuePropName="checked">
                            <Checkbox v-model:checked="loginData.remember">记住密码</Checkbox>
                        </FormItem>

                        <!-- 登录按钮 -->
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                :loading="loading"
                                :icon="h(LoginOutlined)"
                            >
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div></Col
            >
        </Row>
    </div>
</template>

<style lang="scss" scoped>
@use '@manage/assets/styles/variable.scss' as variable;
@use '@manage/assets/styles/animate';

.container {
    position: relative;

    .login-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: all 0.3s ease;
    }

    .login-row {
        height: 100%;

        .login-col {
            position: relative;
            height: 100%;

            .login-card {
                display: flex;
                flex-direction: column;
                justify-content: center;
                position: absolute;
                width: 100%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                padding: 5vw;
                border-radius: 2.6667vw;
                box-shadow: 0 2.6667vw 8vw rgb(0 0 0 / 10%);
                z-index: 10;
                transition: all 0.3s ease;
                box-sizing: border-box;
                background: #fff;
                opacity: 0.9;

                .login-logo {
                    text-align: center;
                    margin-bottom: 10vw;

                    & > img {
                        border-radius: 50%;
                        margin-bottom: 1vw;
                    }

                    & > h1 {
                        font-weight: 600;

                        .login-title {
                            user-select: none;
                            font-size: 6vw;
                            display: inline-block;
                            border-right: 2px solid #000;
                            white-space: nowrap;
                            overflow: hidden;
                            animation: cursor-blink 0.5s steps(1) infinite;
                        }
                    }
                }

                .verification-code {
                    display: flex;
                    flex-wrap: nowrap;

                    img {
                        height: 40px;
                        margin-left: 10px;
                    }
                }
            }
        }
    }
}

@media (max-width: variable.$md-screen) {
    .container {
        .login-row {
            .login-col {
                .login-card {
                    background: url('../assets/images/login-bg-small.jpg') no-repeat top left / 100%;
                    height: 100%;

                    .login-logo {
                        & > img {
                            width: 13.3333vw;
                            height: 13.3333vw;
                            margin-bottom: 5vw;
                        }
                    }
                }
            }
        }
    }
}

@media (min-width: variable.$md-screen) {
    .container {
        .login-bg {
            background: url('../assets/images/login-bg.jpg') no-repeat center center / cover;
        }

        .login-row {
            .login-col {
                .login-card {
                    @media (min-width: variable.$sm-screen) {
                        width: 40vw;
                        padding: 3vw;

                        .login-logo {
                            margin-bottom: 2vw;

                            & > img {
                                width: 4vw;
                                height: 4vw;
                            }

                            & > h1 {
                                .login-title {
                                    font-size: 3vw;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@media (min-width: variable.$xl-screen) {
    .container {
        .login-bg {
            background: url('../assets/images/login-bg-large.jpg') no-repeat center center / cover;
        }

        .login-row {
            .login-col {
                .login-card {
                    width: 25vw;
                    padding: 2vw;

                    .login-logo {
                        margin-bottom: 1.5vw;

                        & > img {
                            width: 2.5vw;
                            height: 2.5vw;
                        }

                        h1 {
                            .login-title {
                                font-size: 1.3333vw;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
