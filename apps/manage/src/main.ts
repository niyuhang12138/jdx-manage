// animate.css
import 'animate.css';
// nprogress样式
import 'nprogress/nprogress.css';
// 全局样式
import '@manage/assets/styles/main.scss';
// 注册全局组件函数
import registerGlobalComponent from '@manage/components';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// 注册全局组件
registerGlobalComponent(app);

app.mount('#app');
