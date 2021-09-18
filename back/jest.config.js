/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  // testRegex: "/__tests__/.*\\.test\\.(js|ts)$",
  testRegex: ['.*\\.test\\.ts$'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
}
