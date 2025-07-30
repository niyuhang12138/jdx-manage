/** @type {import('stylelint').Config} */
export default {
    extends: [
        'stylelint-config-standard', // 标准配置
        'stylelint-config-standard-scss', // 支持scss
        'stylelint-config-html', // 支持html
    ],
    ignorePatterns: ['**/node_modules/**', '**/dist/**'], // 忽略node_modules和dist目录
    rules: {
        // 自定义规则
        'no-empty-source': null, // 允许空文件
        'keyframes-name-pattern': null, // 允许自定义动画名称
    },
};
