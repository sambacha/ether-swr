/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testRegex: '/test/.*\\.test\\.*',
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['./test'],
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      // ts-jest configuration goes here and your IDE will suggest which configs when typing
    },
  },
}
