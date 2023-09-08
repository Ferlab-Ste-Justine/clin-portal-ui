/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);
  cy.get('[data-cy="RadioButton_CouvertureGenique"]').click({force: true});
  cy.resetColumns(0);
});

describe('Page de la couverture génique d\'un patient - Rechercher', () => {
  it('Gène A1BG', () => {
    cy.contains('Effacer les filtres').should('not.exist');
    cy.get('[data-cy="SearchBox"]').parent().find('[class="ant-input-clear-icon"]').should('not.exist');
    cy.get('[data-cy="SelectPanel"] [class="ant-select-clear"]').should('not.exist');

    cy.typeAndIntercept('[data-cy="SearchBox"]', 'a1bg', 'POST', '*/graphql', 4);

    cy.validateTableResultsCount('1 Résultat');
    cy.validateTableFirstRow('47.40%', 12);
    cy.get('[data-cy="AverageCoverage"]').contains('538.75').should('exist');

    cy.contains('Effacer les filtres').should('exist');
    cy.get('[data-cy="SearchBox"]').parent().find('[class="ant-input-clear-icon"]').should('exist');
    cy.get('[data-cy="SelectPanel"] [class="ant-select-clear"]').should('not.exist');

    cy.get('[data-cy="SelectPanel"]').click();
    cy.get('[data-cy="__missing__"]').should('exist');
    cy.get('[data-cy="MMG"]').should('not.exist');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[data-cy="SearchBox"]').parent().find('[class="ant-input-clear-icon"]').click({force:true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.contains('Effacer les filtres').should('not.exist');
    cy.get('[data-cy="SearchBox"]').parent().find('[class="ant-input-clear-icon"]').should('not.exist');
    cy.get('[data-cy="SelectPanel"] [class="ant-select-clear"]').should('not.exist');

    cy.validateTableResultsCount('19 574');
    cy.get('[data-cy="AverageCoverage"]').contains('442.02').should('exist');
  });
});

describe('Page de la couverture génique d\'un patient - Filtrer', () => {
  it('Panel MMG', () => {
    cy.contains('Effacer les filtres').should('not.exist');
    cy.get('[data-cy="SearchBox"]').parent().find('[class="ant-input-clear-icon"]').should('not.exist');
    cy.get('[data-cy="SelectPanel"] [class="ant-select-clear"]').should('not.exist');

    cy.get('[data-cy="SelectPanel"]').click();
    cy.clickAndIntercept('[data-cy="MMG"]', 'POST', '*/graphql', 1);
    
    cy.validateTableResultsCount('145 Résultats');
    cy.get('[data-cy="AverageCoverage"]').contains('440.71').should('exist');

    cy.contains('Effacer les filtres').should('exist');
    cy.get('[data-cy="SearchBox"]').parent().find('[class="ant-input-clear-icon"]').should('not.exist');
    cy.get('[data-cy="SelectPanel"] [class="ant-select-clear"]').should('exist');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[data-cy="SelectPanel"] [class="ant-select-clear"]').click({force:true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.contains('Effacer les filtres').should('not.exist');
    cy.get('[data-cy="SearchBox"]').parent().find('[class="ant-input-clear-icon"]').should('not.exist');
    cy.get('[data-cy="SelectPanel"] [class="ant-select-clear"]').should('not.exist');

    cy.validateTableResultsCount('19 574');
    cy.get('[data-cy="AverageCoverage"]').contains('442.02').should('exist');
  });
});

describe('Page de la couverture génique d\'un patient - Rechercher et filtrer', () => {
  it('Panel MMG et gène MYMK', () => {
    cy.contains('Effacer les filtres').should('not.exist');
    cy.get('[data-cy="SearchBox"]').parent().find('[class="ant-input-clear-icon"]').should('not.exist');
    cy.get('[data-cy="SelectPanel"] [class="ant-select-clear"]').should('not.exist');

    cy.get('[data-cy="SelectPanel"]').click();
    cy.clickAndIntercept('[data-cy="MMG"]', 'POST', '*/graphql', 1);
    cy.typeAndIntercept('[data-cy="SearchBox"]', 'MYMK', 'POST', '*/graphql', 4);

    cy.validateTableResultsCount('1 Résultats');
    cy.get('[data-cy="AverageCoverage"]').contains('436.65').should('exist');

    cy.contains('Effacer les filtres').should('exist');
    cy.get('[data-cy="SearchBox"]').parent().find('[class="ant-input-clear-icon"]').should('exist');
    cy.get('[data-cy="SelectPanel"] [class="ant-select-clear"]').should('exist');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.contains('Effacer les filtres').click({force:true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.contains('Effacer les filtres').should('not.exist');
    cy.get('[data-cy="SearchBox"]').parent().find('[class="ant-input-clear-icon"]').should('not.exist');
    cy.get('[data-cy="SelectPanel"] [class="ant-select-clear"]').should('not.exist');

    cy.validateTableResultsCount('19 574');
    cy.get('[data-cy="AverageCoverage"]').contains('442.02').should('exist');
  });
});
