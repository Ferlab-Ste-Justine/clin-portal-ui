/* eslint-disable no-console */
/// <reference types="Cypress" />
import { rmdir } from 'fs';

require('dotenv').config();

module.exports = (on: Cypress.PluginEvents, config: Cypress.ConfigOptions) => {
  on('task', {
    deleteFolder(folderName) {
      console.log('deleting folder %s', folderName);

      return new Promise((resolve, reject) => {
        rmdir(folderName, { maxRetries: 10, recursive: true }, (err: any) => {
          if (err) {
            console.error(err);
            return reject(err);
          }
          resolve(null);
        });
      });
    },
    log (message: any) {
      console.log(message);
      return null
    },
  });

  if (!config.env) {
    config.env = {};
  }

  config.env.zeppelin_URL = process.env.REACT_APP_ZEPLIN_URL;
  config.env.fhir_URL     = process.env.REACT_APP_FHIR_CONSOLE_URL;

  config.env.username_DG_CHUSJ_CUSM_CHUS = process.env.CYPRESS_USERNAME_DG_CHUSJ_CUSM_CHUS;
  config.env.username_G_CHUSJ_CUSM_CHUS  = process.env.CYPRESS_USERNAME_G_CHUSJ_CUSM_CHUS;
  config.env.username_DG_CHUSJ           = process.env.CYPRESS_USERNAME_DG_CHUSJ;
  config.env.username_G_CHUSJ            = process.env.CYPRESS_USERNAME_G_CHUSJ;
  config.env.username_G_CUSM             = process.env.CYPRESS_USERNAME_G_CUSM;
  config.env.username_DG_CHUS            = process.env.CYPRESS_USERNAME_DG_CHUS;
  config.env.username_G_CHUS             = process.env.CYPRESS_USERNAME_G_CHUS;
  config.env.username_D_CUSM             = process.env.CYPRESS_USERNAME_D_CUSM;
  config.env.username_R_CHUSJ            = process.env.CYPRESS_USERNAME_R_CHUSJ;
  config.env.password                    = process.env.CYPRESS_PASSWORD;
  config.env.shared_filter_id         = process.env.CYPRESS_SHAREDFILTERID;

  config.env.google_Username = process.env.CYPRESS_GOOGLE_USERNAME;
  config.env.google_Password = process.env.CYPRESS_GOOGLE_PASSWORD;

  return config;
};

export {};
