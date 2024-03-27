/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=0592969c-f83a-413a-b65d-578ab9d751fc');
  });

  it('Construire une première requête', () => {
    cy.get('body').contains('Utiliser les filtres pour créer une requête').should('exist');
    cy.validateTotalSelectedQuery('1.3M');
    cy.validateTableResultsCount(/1 3\d{2} \d{3}/);

    cy.checkAndClickApplyFacet('Variant', 'Type de variant', 'SNV');

    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.validateClearAllButton(false);
  });
});
