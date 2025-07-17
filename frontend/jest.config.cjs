module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  reporters: [
    "default",
    ["jest-html-reporter", {
      pageTitle: "Frontend Test Report",
      outputPath: "test-report/test-report.html"
    }]
  ]
};