/// <reference types="Cypress" />

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visit('/');

  cy.get('[class="ant-page-header-heading-extra"] svg[data-icon="download"]').click({force: true});
  cy.wait(5000);
});

describe('Télécharger les panels', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('panels.xlsx');
  });
});
