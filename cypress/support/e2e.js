/* eslint-disable */
/// <reference types="Cypress" />
import './commands';

// Ignore uncaught exception so tests doesn't stop mid run
Cypress.on('uncaught:exception', () => false);

before(() => {
  cy.exec('npm cache clear --force');
  cy.wait(1000);
});

after(() => {
  cy.exec('npm cache clear --force');
  cy.wait(1000);
});
