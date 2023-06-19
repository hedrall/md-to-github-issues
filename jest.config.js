module.exports = {
    verbose: true,
    roots: ['<rootDir>/test'],
    transform: {
        '^.+\\.ts$': 'esbuild-jest'
    }
}
