<script setup lang="ts">
import notfound from '@manage/assets/images/404/404.png';
import { Row, Col, Button } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goHomePageHandler = () => {
    router.replace('/');
};
</script>

<template>
    <div class="container">
        <Row>
            <Col class="pic" :md="16" :span="0">
                <img :src="notfound" alt="404" />
            </Col>
            <Col class="description" :md="8" :span="24">
                <div class="reason">404错误!</div>
                <div class="tip">找不到网页！</div>
                <div class="info">
                    对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
                </div>
                <Button
                    class="return-home-page"
                    type="primary"
                    size="large"
                    @click="goHomePageHandler"
                    >返回首页</Button
                >
            </Col>
        </Row>
    </div>
</template>

<style lang="scss" scoped>
@use '@manage/assets/styles/variable.scss' as variable;

.container {
    display: flex;
    align-items: center;
    justify-content: center;

    .pic {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        & > img {
            width: 80%;
            animation: rubberBand 5s ease infinite;
        }
    }

    .description {
        padding: 8vw;

        .reason {
            margin-bottom: 5.3333vw;
            font-size: 8.5333vw;
            font-weight: bold;
            color: #1482f0;
            opacity: 0;
            animation-name: slide-up;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
        }

        .tip {
            margin-bottom: 2.6667vw;
            font-size: 5.3333vw;
            font-weight: bold;
            color: #222;
            opacity: 0;
            animation: slide-up 0.5s 0.2s forwards;
        }

        .info {
            margin-bottom: 8vw;
            font-size: 3.4667vw;
            line-height: 5.6vw;
            color: grey;
            opacity: 0;
            animation: slide-up 0.5s 0.2s forwards;
        }

        .return-home-page {
            animation: slide-up 0.5s 0.2s forwards;
        }

        @keyframes slide-up {
            0% {
                opacity: 0;
                transform: translateY(60px);
            }

            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
}

@media (min-width: variable.$md-screen) {
    .container {
        .description {
            .reason {
                margin-bottom: 1vw;
                font-size: 2vw;
            }

            .tip {
                margin-bottom: 1vw;
                font-size: 1vw;
            }

            .info {
                margin-bottom: 1vw;
                font-size: 1vw;
                line-height: 2vw;
            }
        }
    }
}
</style>
