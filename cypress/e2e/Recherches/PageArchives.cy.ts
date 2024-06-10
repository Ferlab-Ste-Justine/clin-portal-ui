/// <reference types="Cypress" />
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page d\'archives - Rechercher des fichiers', () => {

  beforeEach(() => {
    cy.visit('/archive/exploration');
  });

  it('Par numéro de requête du cas-index', () => {
    cy.get('[data-cy="ArchivesSearch"]').type(epCHUSJ_ldmCHUSJ.requestProbId, {force: true});
    cy.clickAndIntercept('[data-cy="ArchivesSpace"] button', 'POST', '**/$graphql*', 1);

    cy.resetColumns(0);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
  });

  it('Par numéro de patient du cas-index', () => {
    cy.get('[data-cy="ArchivesSearch"]').type(epCHUSJ_ldmCHUSJ.patientProbId, {force: true});
    cy.clickAndIntercept('[data-cy="ArchivesSpace"] button', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
  });

  it('Par numéro de requête de la mère', () => {
    cy.get('[data-cy="ArchivesSearch"]').type(epCHUSJ_ldmCHUSJ.requestMthId, {force: true});
    cy.clickAndIntercept('[data-cy="ArchivesSpace"] button', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
  });

  it('Par numéro de patient de la mère', () => {
    cy.get('[data-cy="ArchivesSearch"]').type(epCHUSJ_ldmCHUSJ.patientMthId, {force: true});
    cy.clickAndIntercept('[data-cy="ArchivesSpace"] button', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
  });

  it('Par numéro de requête du père', () => {
    cy.get('[data-cy="ArchivesSearch"]').type(epCHUSJ_ldmCHUSJ.requestFthId, {force: true});
    cy.clickAndIntercept('[data-cy="ArchivesSpace"] button', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestFthId).should('exist');
  });

  it('Par numéro de patient du père', () => {
    cy.get('[data-cy="ArchivesSearch"]').type(epCHUSJ_ldmCHUSJ.patientFthId, {force: true});
    cy.clickAndIntercept('[data-cy="ArchivesSpace"] button', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist');
    cy.get('body').contains(epCHUSJ_ldmCHUSJ.requestFthId).should('exist');
  });
});
