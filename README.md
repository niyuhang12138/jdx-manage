# Git Flow

- 分支管理
    - 主分支：`master`
    - 开发分支：`develop`
    - 功能分支：`feature/xxx`
    - 修复分支：`fix/xxx`
    - 发布分支：`release/xxx`
    - 热修复分支：`hotfix/xxx`
- 版本管理
    - 版本号：`x.y.z`
    - 版本管理：`npm version <patch|minor|major>`

# Git Commit 规范

Git commit 信息应遵循以下格式：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Header(必需)

Header部分只有一行，包含三个字段

- `type`（类型）：必需，用于说明提交的类别：
    - `feat`：新功能（feature）
    - `fix`：修补bug
    - `docs`：文档（documentation）
    - `style`：格式（不影响代码运行的变动）
    - `refactor`：重构（即不是新增功能，也不是修改bug的代码变动）
    - `pref`：性能优化
    - `test`：增加测试
    - `build`：构建
    - `ci`：持续集成
    - `chore`：构建过程或辅助工具的变动
    - `revert`：回滚提交
- `scope`（范围）：可选，用于说明提交影响的范围，比如数据层、控制层、视图层等。
    - 例如：`scope`为`user`，表示影响用户相关的功能。
- `subject`（主题）：必需，用于说明提交的内容。
    - 例如：`subject`为`add login feature`，表示新增登录功能。

## Body（可选）

对提交的详细描述，可以分为多行，用于解释修改的背景、动机和具体内容。

## Footer（可选）

用于记录一些额外的信息，最常见的是：

- `BREAKING CHANGE`：表示有破坏性变更，需要注意。
- `Closes #123`：表示关闭了编号为123的issue。
- `Fixes #456`：表示修复了编号为456的issue。
- `Relates to #789`：表示与编号为789的issue相关。

## 示例

```
refactor(tools): 重构加密模块 API

将原有的 encrypt(data, key) 和 decrypt(data, key) 方法统一为 crypto.encrypt(data) 和 crypto.decrypt(data)。

BREAKING CHANGE: `encrypt` 和 `decrypt` 方法不再从模块直接导出，而是作为 `crypto` 对象的属性导出。所有调用方需要更新其导入和使用方式。
```

## 如何在项目中使用

为了确保团队成员都遵循这套规范，我们可以引入工具来自动化检查和辅助提交。

1. 安装工具：
    - `commitlint`：用于检查提交信息是否符合规范。
    - `husky`：用于在提交前触发钩子，执行检查。
    - `lint-staged`：用于在提交前对暂存的文件进行检查。
2. 配置工具：
    - 配置 `commitlint` 规则。
    - 配置 `husky` 钩子。
    - 配置 `lint-staged` 规则。
3. 团队成员使用：
    - 团队成员在提交代码前，需要先运行 `git add` 暂存文件。
    - 团队成员在提交代码前，需要先运行 `git commit` 提交代码。
    - 团队成员在提交代码前，需要先运行 `git push` 推送代码。
