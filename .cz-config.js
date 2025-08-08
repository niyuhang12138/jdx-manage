const matchedPackages = require('./scripts/packages.js');

/** @type {Array<import('cz-customizable').Option>} */
const scopes = matchedPackages
    .map((pkg) => ({ name: pkg, value: pkg }))
    .concat({
        name: 'root',
        value: 'root',
    });

/** @type {import('cz-customizable').Options} */
const czConfig = {
    // 提交类型
    types: [
        {
            name: '✨ feat:     新功能',
            value: ':sparkles: feat',
        },
        {
            name: '🐛 fix:      修复 bug',
            value: ':bug: fix',
        },
        {
            name: '⚡️ perf:     性能优化',
            value: ':zap: perf',
        },
        {
            name: '♻️  refactor: 重构',
            value: ':recycle: refactor',
        },
        {
            name: '✏️  docs:     文档变更',
            value: ':pencil2: docs',
        },
        {
            name: '👷 ci:       CI 相关变更',
            value: ':construction_worker: ci',
        },
        {
            name: '💄 style:    代码样式美化',
            value: ':lipstick: style',
        },
        {
            name: '✅ test:     测试',
            value: ':white_check_mark: test',
        },
        {
            name: '⏪️ revert:   回退',
            value: ':rewind: revert',
        },
        {
            name: '📦️ build:    打包',
            value: ':package: build',
        },
        {
            name: '🚀 chore:    构建/工程依赖/工具/其他杂项',
            value: ':rocket: chore',
        },
        {
            name: '🎉 init:     初始化',
            value: ':tada: init',
        },
    ],

    // 影响范围
    scopes,

    // 覆盖范围
    // scopeOverrides: {}

    // 自定义消息配置
    messages: {
        type: '选择提交类型（↑↓键选择，回车确认）：',
        scope: '选择影响范围（可选，直接回车跳过）：',
        customScope: '输入自定义影响范围：',
        subject: '输入简短描述（必填）：',
        body: '输入详细描述（可选，换行请使用转义字符\\n）：',
        breaking: '输入破坏性变更说明（可选）：',
        footer: '输入关联issue（可选，格式：#123）：',
        confirmCommit: '确认提交？(y/n)',
    },

    allowCustomScopes: false, // 允许自定义范围
    // 允许破坏性变更, 选择以下类型会启用破坏性变更提示
    allowBreakingChanges: [':sparkles: feat', ':bug: fix'],

    // 跳过的问题列表
    // skipQuestions: [],

    subjectLimit: 50,

    breakingPrefix: 'BREAKING CHANGE: ',
};

module.exports = czConfig;
