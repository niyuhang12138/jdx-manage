module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // 提交类型枚举，与commitizen交互选项对应
        'type-enum': [
            2,
            'always',
            [
                'feat', // 新功能
                'fix', // 修复bug
                'docs', // 文档变更
                'style', // 代码格式调整
                'refactor', // 代码重构
                'perf', // 性能优化
                'test', // 测试相关
                'build', // 构建配置变更
                'ci', // CI配置变更
                'chore', // 其他不影响代码的变动
                'revert', // 回滚提交
            ],
        ],
        // 提交类型必须小写
        'type-case': [2, 'always', 'lower-case'],
        // 提交类型不能为空
        'type-empty': [2, 'never'],
        // 提交描述不能为空
        'subject-empty': [2, 'never'],
        // 提交描述结尾不能有句号
        'subject-full-stop': [2, 'never', '.'],
        // 提交信息头部最大长度72字符
        'header-max-length': [2, 'always', 72],
    },
};
