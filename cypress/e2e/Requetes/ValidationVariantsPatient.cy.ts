/// <reference types="Cypress" />
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants d\'un patient - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, 'd1de057e-f4e7-4245-97e0-6bab9070e799');
  });

  it('Validation Facette numérique ou No Data [CLIN-2954]', () => {
    cy.validateTotalSelectedQuery('156K');
    cy.validateTableResultsCount('155 549');
  });

  it('Validation Facette numérique OU Facette standard [CLIN-2954]', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('184K');
    cy.validateTableResultsCount('183 998');
  });

  it('Validation Facette numérique ou No Data ET Facette standard [CLIN-2954]', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(2).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('1,517');
    cy.validateTableResultsCount('1 517');
  });

  it('Validation Facette standard (Any of) [CLIN-2954]', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(3).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('176K');
    cy.validateTableResultsCount('175 938');
  });

  it('Validation Facette standard (All of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(4).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('0');
    cy.validateTableResultsCount('Aucun résultat');
  });

  it('Validation Facette standard (None of) [CLIN-2954]', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(5).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('8,139');
    cy.validateTableResultsCount('8 139');
  });

  it('Validation Facette standard (None of) ET Facette numérique [CLIN-2954]', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(6).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('126K');
    cy.validateTableResultsCount('126 131');
  });
});

describe('Page des variants d\'un patient - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '41598abd-42ea-4242-b0ef-d6809264e277');
  });

  it('Validation Q1 - Facette numérique ou No Data OU Facette numérique ou No Data [CLIN-2954]', () => {
    cy.validateTotalSelectedQuery('24.1K');
    cy.validateTableResultsCount('24 101');
  });

  it('Validation Q2 - Facette standard OU Facette standard [CLIN-2954]', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('3,113');
    cy.validateTableResultsCount('3 113');
  });

  it('Validation Q3 - Q1 OU Q2 [CLIN-2954]', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(2).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('27.2K');
    cy.validateTableResultsCount('27 213');
  });

  it('Validation Q4 - Facette numérique ou No Data ET Facette standard [CLIN-2954]', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(3).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('1,517');
    cy.validateTableResultsCount('1 517');
  });

  it('Validation Q5 - Facette numérique ou No Data ET Facette numérique ou No Data [CLIN-2954]', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(4).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('184');
    cy.validateTableResultsCount('184');
  });

  it('Validation Q6 - Q4 ET Q5', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(5).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('9');
    cy.validateTableResultsCount('9');
  });

  it('Validation Q7 - Q3 OU Q6 OU Facette numérique ou No Data [CLIN-2954]', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(6).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('49.5K');
    cy.validateTableResultsCount('49 476');
  });

  it('Validation Q8 - Facette numérique ou No Data [CLIN-2954]', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(7).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('172K');
    cy.validateTableResultsCount('172 491');
  });

  it('Validation Q9 - Q7 OU Q8 [CLIN-2954]', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(8).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('184K');
    cy.validateTableResultsCount('184 077');
  });
});
