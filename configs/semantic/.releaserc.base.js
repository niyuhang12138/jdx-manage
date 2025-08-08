module.exports = (pkgRoot) => {
    return {
        branches: ['master'],
        extends: ['semantic-release-monorepo'],
        plugins: [
            [
                '@semantic-release/commit-analyzer',
                {
                    preset: 'angular',
                    parserOpts: {
                        headerPattern: '^(:[\\w_+-]+:)\\s*(\\w+)(?:\\(([^)]*)\\))?:\\s*(.*)$',
                        headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
                        noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
                    },
                    releaseRules: [
                        { type: 'feat', release: 'minor' },
                        { type: 'fix', release: 'patch' },
                        { type: 'perf', release: 'patch' },
                        { type: 'refactor', release: 'patch' },
                        { type: 'docs', release: 'patch' },
                        { type: 'ci', release: 'patch' },
                        { type: 'style', release: 'patch' },
                        { type: 'test', release: 'patch' },
                        { type: 'revert', release: 'patch' },
                        { type: 'build', release: 'patch' },
                        { type: 'chore', release: 'patch' },
                        { breaking: true, release: 'major' },
                    ],
                },
            ],
            [
                '@semantic-release/release-notes-generator',
                {
                    parserOpts: {
                        headerPattern: '^(:[\\w_+-]+:)\\s*(\\w+)(?:\\(([^)]*)\\))?:\\s*(.*)$',
                        headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
                    },
                    writerOpts: {
                        groupBy: 'type',
                        commitGroupsSort: 'title',
                        commitsSort: ['scope', 'subject'],
                        transform: {
                            feat: {
                                title: '✨ Features',
                            },
                            fix: {
                                title: '🐛 Bug Fixes',
                            },
                            perf: {
                                title: '⚡️ Performance Improvements',
                            },
                            refactor: {
                                title: '♻️ Code Refactoring',
                            },
                            docs: {
                                title: '📝 Documentation',
                            },
                            style: {
                                title: '💄 Code Style',
                            },
                            test: {
                                title: '✅ Tests',
                            },
                            build: {
                                title: '📦️ Build System',
                            },
                            ci: {
                                title: '👷 CI/CD',
                            },
                            chore: {
                                title: '🚀 Chores',
                            },
                            revert: {
                                title: '⏪ Reverts',
                            },
                            init: {
                                title: '🎉 Initialization',
                            },
                        },
                    },
                },
            ],
            [
                '@semantic-release/changelog',
                {
                    changelogFile: 'CHANGELOG.md',
                },
            ],
            [
                '@semantic-release/git',
                {
                    assets: ['CHANGELOG.md', 'package.json'],
                    message:
                        ':rocket: chore(' +
                        pkgRoot +
                        '): release：${nextRelease.version}\n\n${nextRelease.notes}',
                },
            ],
        ],
    };
};
