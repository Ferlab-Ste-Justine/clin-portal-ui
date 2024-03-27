/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=e9bcdbfa-442f-49bb-96fe-6654f76a743e');
  });

  it('Supprimer une requête utilisée dans une combinaison', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_selected"]').find('button[class*="QueryPill_close"]').click();
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});

    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 2);
    cy.validatePillSelectedQuery('Position', ['100000']);
    cy.validateTotalSelectedQuery(/1,4\d{2}/);
    cy.validateTableResultsCount(/1 4\d{2}/);
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('[class*="QueryValues_queryValuesContainer"]').contains('Q1').should('exist');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('[class*="QueryValues_queryValuesContainer"]').contains('Q2').should('not.exist');
    cy.validateClearAllButton(true);
  });
});
