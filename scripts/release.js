const matchedPackages = require('./packages.js');
const { execSync } = require('child_process');

matchedPackages.forEach((pkg) => {
    console.log('*********》 Releasing package：', pkg, '《*********');
    execSync(`cd ${pkg} && semantic-release`, {
        stdio: 'inherit',
        cwd: process.cwd(),
    });
});

/**
 * 获取最近一次 commit 的 scope
 * @returns {string|null} 返回 scope 或 null
 */
function getLastCommitScope() {
    try {
        // 假设你的 commit 格式为 :emoji: type(scope): subject
        const msg = execSync('git log -1 --pretty=%s', {
            encoding: 'utf-8',
        }).trim();
        const match = msg.match(/^(:[\w_+-]+:)\s*\w+\(([^)]+)\):/);
        if (match) {
            return match[2];
        }
        return null;
    } catch {
        return null;
    }
}

if (getLastCommitScope() === 'root') {
    console.log('*********》 Releasing package：root《*********');
    execSync('semantic-release', { stdio: 'inherit', cwd: process.cwd() });
}
