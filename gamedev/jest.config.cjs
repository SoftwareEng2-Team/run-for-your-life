module.exports = {
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/jest.setup.js'
  ],
  testMatch: ['**/__tests__/**/*.test.js'],
  globals: {
    BASE_URL: 'file://' + process.cwd() + '/public_html/'
  },
  testEnvironment: 'jsdom',

  testEnvironmentOptions: {
    resources: "usable",
    runScripts: "dangerously"
  }
};
