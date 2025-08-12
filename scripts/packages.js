const fs = require('fs');
const path = require('path');
const YAML = require('yamljs');
const { globSync } = require('glob');

const WORKSPACE_FILE = 'pnpm-workspace.yaml';

const workspaceConfig = YAML.load(WORKSPACE_FILE);

const packages = workspaceConfig.packages || [];

const matchedPackages = [];

/**
 * 判断给定路径是否为目录
 * @param {*} path 路径
 * @returns {boolean} 如果是目录则返回 true，否则返回 false
 */
function isDirectory(path) {
    return fs.statSync(path).isDirectory();
}

/**
 * 判断给定路径是否为通配符
 * @param {*} pkg
 * @returns {boolean} 如果是通配符则返回 true，否则返回 false
 */
function isAsteriskWildcard(pkg) {
    return pkg.endsWith('/*');
}

packages.forEach((pkg) => {
    if (isAsteriskWildcard(pkg)) {
        // glob的工作路径是使用当前脚本运行时的所在目录进行匹配的
        globSync(pkg, { cwd: path.join(__dirname, '../') }).forEach((matchedPath) => {
            matchedPackages.push(matchedPath.replace(/\\/g, '/'));
        });
    } else {
        // 如果不是通配符，则需要判断是否是目录
        if (!isDirectory(pkg)) throw new Error(`路径 ${pkg} 不是一个目录`);
        console.log('路径是目录:', pkg);
        // 如果是目录，则直接添加到结果数组
        matchedPackages.push(pkg);
    }
});

module.exports = matchedPackages;
