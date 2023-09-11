const { defaults } = require('jest-config');

module.exports = {
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.[jt]s?(x)',
    '!<rootDir>/src/**/{hotjar,bootstrap,apm,config,index}.[jt]s?(x)',
    '!<rootDir>/src/**/*.{test,spec,d}.[jt]s?(x)',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@test-utils/(.*)': ['<rootDir>/test/test-utils/$1'],
    '@frontend/(.*)': ['<rootDir>/node_modules/@frontend/core/dist/$1'],
    '@/(.*)': ['<rootDir>/src/$1'],
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/transform/fileTransformer.js',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@frontend)'],
  moduleFileExtensions: [...defaults.moduleFileExtensions],
};
