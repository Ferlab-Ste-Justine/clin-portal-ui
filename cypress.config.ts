import { defineConfig } from 'cypress';

import { getDateTime } from './cypress/support/utils';

const { strDate, strTime } = getDateTime();

const getName = (url: string|undefined) => {
  const strUrl = url !== undefined ? url : "";
  if (strUrl.includes('clin-')) {
    return strUrl.replace('https://', '').split('.')[0].split('-').splice(2, 4).join('-');
  } else {
    return 'QA';
  }
};

export default defineConfig({
  projectId: 'e6jd58',
  chromeWebSecurity: false,
  video: false,
  videoUploadOnPasses: false,
  screenshotOnRunFailure: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config);
    },
    baseUrl: 'https://portail.qa.cqgc.hsj.rtss.qc.ca/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    slowTestThreshold: 60000,
    experimentalSessionAndOrigin: true,
    downloadsFolder: `cypress/downloads/${getName(process.env.CYPRESS_BASE_URL)}`,
    screenshotsFolder: `cypress/screenshots/${getName(process.env.CYPRESS_BASE_URL)}`,
    videosFolder: `cypress/videos/${getName(process.env.CYPRESS_BASE_URL)}/`,
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  reporter: 'junit',
  reporterOptions: {
    mochaFile:
      'cypress/results/' +
      `${getName(process.env.CYPRESS_BASE_URL)}/` +
      strDate +
      '_' +
      strTime +
      '-[hash].xml',
    rootSuiteTitle: 'Tests Cypress',
  },
});
