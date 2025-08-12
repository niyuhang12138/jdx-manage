/** @type {import('stylelint').Config} */
module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-standard-scss',
        'stylelint-config-recommended-vue',
        'stylelint-config-recess-order',
    ],
    plugins: ['stylelint-scss'],
    overrides: [
        {
            files: ['**/*.vue'],
            customSyntax: 'postcss-html',
        },
        {
            files: ['**/*.scss'],
            customSyntax: 'postcss-scss',
        },
    ],
    rules: {
        'at-rule-no-unknown': null, // 禁用默认规则，交给 scss 插件处理
        'scss/at-rule-no-unknown': true,
        'media-query-no-invalid': null, // 允许无效的媒体查询
    },
    // 忽略不需要检查的文件
    ignoreFiles: ['**/node_modules/**/*', '**/dist/**/*', '**/build/**/*', '**/coverage/**/*'],
};
