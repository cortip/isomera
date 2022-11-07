import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  displayName: 'api',
  preset: '../../jest.preset.js',
  testNamePattern: '^.+\\.e2e.test.[tj]s$',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  coverageDirectory: '../../coverage/apps/api',
  setupFiles: [
    'dotenv',
    'jest-ts-auto-mock',
    '<rootDir>jest-ts-auto-mock.config.ts',
  ],
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },

  // rootDir: 'src',
  // testRegex: '.spec.ts$',
  // transform: {
  //   '^.+\\.ts$': 'ts-jest',
  // },
  // coverageDirectory: '../coverage',
  // testEnvironment: 'node',
  // setupFiles: ['@suncin/dotenv', 'jest-ts-auto-mock'],
  // globals: {
  //   'ts-jest': {
  //     compiler: 'ttypescript',
  //     tsconfig: 'tsconfig.test.json',
  //   },
  // },
};

export default jestConfig;
