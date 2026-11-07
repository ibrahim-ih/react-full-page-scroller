const path = require('path')

const rootDir = __dirname
const babelTransform = ['babel-jest', { rootMode: 'upward' }]

module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  projects: [
    {
      displayName: 'library',
      rootDir,
      roots: ['<rootDir>/src'],
      collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.test.{js,jsx,ts,tsx}',
        '!src/__tests__/**',
        '!src/**/*.spec.{js,jsx,ts,tsx}',
        '!src/setupTests.ts',
        '!src/test-utils.js'
      ],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
      transform: { '^.+\\.[jt]sx?$': babelTransform }
    },
    {
      displayName: 'example',
      rootDir: path.join(rootDir, 'example'),
      roots: ['<rootDir>/src'],
      testEnvironment: 'jsdom',
      moduleNameMapper: {
        '\\.(css|gif|jpe?g|png|svg)$': '<rootDir>/jest.fileMock.js'
      },
      transform: { '^.+\\.[jt]sx?$': babelTransform }
    }
  ]
}
