import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import vuePlugin from 'eslint-plugin-vue';
// import * as vueParser from 'vue-eslint-parser';
import prettierConfig from 'eslint-config-prettier';
import { defineFlatConfig } from 'eslint-define-config';

// React配置 (预留)
// import reactPlugin from 'eslint-plugin-react';
// import reactHooksPlugin from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
    // 1. 全局配置
    {
        ignores: ['**/dist/**', '**/node_modules/**', '**/*.d.ts'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },

    // 2. TypeScript 通用配置
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...tsPlugin.configs['eslint-recommended'].rules,
            ...tsPlugin.configs.recommended.rules,
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },

    // 3. Vue 配置
    // 直接展开 Vue 的基础配置数组
    ...vuePlugin.configs['flat/essential'],
    // 然后，为 Vue 文件添加或覆盖规则
    {
        files: ['apps/manage/**/*.{ts,vue}'],
        rules: {
            'vue/multi-word-component-names': 'off',
        },
    },

    // 4. React 项目专属配置 (预留)
    // {
    //     files: ['apps/react-app/**/*.{ts,tsx}'],
    //     plugins: { react: reactPlugin, 'react-hooks': reactHooksPlugin },
    //     rules: {
    //         ...reactPlugin.configs.recommended.rules,
    //         ...reactHooksPlugin.configs.recommended.rules,
    //         'react/react-in-jsx-scope': 'off',
    //     },
    // },

    // 5. Prettier 配置 (必须在最后)
    prettierConfig,
];
