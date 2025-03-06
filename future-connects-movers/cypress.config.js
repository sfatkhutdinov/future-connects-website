const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1280,
    viewportHeight: 800,
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    experimentalStudio: true,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
}); 