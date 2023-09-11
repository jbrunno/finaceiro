const { defaults } = require('jest-config');

module.exports = {
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/test/setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setupEnv.ts'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|e2e|test).[jt]s?(x)',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.[jt]s',
    '!<rootDir>/src/**/{apm,index}.[jt]s',
    '!<rootDir>/src/**/*.{test,spec,e2e,mock,d}.[jt]s',
  ],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@test-utils/(.*)': ['<rootDir>/test/test-utils/$1'],
    '@perms/(.*)': ['<rootDir>/perms/$1'],
    '@bff/(.*)': ['<rootDir>/node_modules/@bff/core/dist/$1'],
    '@/(.*)': ['<rootDir>/src/$1'],
  },
  transform: {
    '\\.[jt]s?$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@bff)'],
  testEnvironment: 'node',
  moduleFileExtensions: [...defaults.moduleFileExtensions],
};
