import { Linter } from 'eslint';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

// 通用配置
const baseConfig: Linter.Config = {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/coverage/**', '**/vendor/**'],
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
            browser: true,
            node: true,
        },
    },
    plugins: {
        '@typescript-eslint': tsPlugin as any,
        prettier: prettierPlugin,
    },
    rules: {
        // 基础规则
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unused-vars': 'off', // 由TS插件处理
        'prettier/prettier': 'error',

        // TypeScript规则
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/ban-ts-comment': ['warn', { 'ts-ignore': 'allow-with-description' }],
    },
};

// TypeScript配置
const typescriptConfig: Linter.Config = {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            project: ['./tsconfig.json', './packages/*/tsconfig.json', './apps/*/tsconfig.json'],
            tsconfigRootDir: process.cwd(),
        },
    },
};

// Vue配置
const vueConfig: Linter.Config = {
    files: ['**/*.vue'],
    languageOptions: {
        parser: vueParser,
        parserOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
    plugins: {
        vue: vuePlugin,
    },
    rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-v-html': 'warn',
        // 'vue/script-setup-uses-vars': 'error',
        'vue/attribute-hyphenation': ['error', 'always'],
    },
};

// React专用配置
const reactConfig: Linter.Config = {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
        react: reactPlugin,
        'react-hooks': reactHooksPlugin,
    },
    rules: {
        ...reactPlugin.configs.recommended.rules,
        ...reactHooksPlugin.configs.recommended.rules,
        'react/react-in-jsx-scope': 'off', // React 17+ 不需要显式导入React
        'react/prop-types': 'off', // 使用TypeScript类型检查
        'react/display-name': 'warn',
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
        'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
        react: {
            version: 'detect', // 自动检测React版本
        },
    },
};

// 导出完整配置
export default [
    baseConfig,
    typescriptConfig,
    vueConfig,
    reactConfig,
    prettierConfig, // 禁用与Prettier冲突的规则
];
