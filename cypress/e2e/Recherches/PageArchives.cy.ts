/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

afterEach(() => {
  cy.logout();
});

describe('Page d\'archives', () => {
  describe('Rechercher des fichiers', () => {

    beforeEach(() => {
      cy.visit('/archive/exploration');
    });

    it('Par numéro de requête du cas-index', () => {
      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.requestProbId, {force: true});
      cy.get('button[class*="ant-input-search-button"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});
      
      cy.resetColumns(0);

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
    });

    it('Par numéro de patient du cas-index', () => {
      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.patientProbId, {force: true});
      cy.get('button[class*="ant-input-search-button"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
    });

    it('Par numéro de requête de la mère', () => {
      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.requestMthId, {force: true});
      cy.get('button[class*="ant-input-search-button"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
    });

    it('Par numéro de patient de la mère', () => {
      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.patientMthId, {force: true});
      cy.get('button[class*="ant-input-search-button"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
    });

    it('Par numéro de requête du père', () => {
      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.requestFthId, {force: true});
      cy.get('button[class*="ant-input-search-button"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestFthId).should('exist');
    });

    it('Par numéro de patient du père', () => {
      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.patientFthId, {force: true});
      cy.get('button[class*="ant-input-search-button"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist');
      cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestFthId).should('exist');
    });
  });
});
