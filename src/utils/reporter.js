/**
 * Reporter Configuration
 * Generates Cucumber HTML report (bootstrap template)
 */
const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    'App Version': process.env.RELEASE_VERSION || '1.0.0',
    'Test Environment': process.env.APP_HOST || 'dev-app.getinspeq.com',
    Browser: process.env.BROWSER || 'chromium',
    Platform: process.platform,
    'Executed By': process.env.USER || process.env.USERNAME || 'Local'
  }
};

reporter.generate(options);

console.log('Cucumber HTML report generated at: reports/cucumber-report.html');

