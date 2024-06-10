/// <reference types="Cypress" />
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visit('/');
});

describe('Page d\'accueil - Rechercher des prescriptions', () => {
  it('Par numéro de prescription', () => {
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de requête du cas-index', () => {
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.requestProbId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de dossier du cas-index', () => {
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.mrnProb, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de patient du cas-index', () => {
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.patientProbId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro d\'échantillon du cas-index', () => {
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.sampleProbId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de requête de la mère', () => {
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.requestMthId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de dossier de la mère', () => {
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.mrnMth.toLowerCase(), {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de patient de la mère', () => {
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.patientMthId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro d\'échantillon de la mère', () => {
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.sampleMthId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de requête du père', () => {
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.requestFthId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de dossier du père', () => {
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.mrnFth, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro de patient du père', () => {
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.patientFthId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });

  it('Par numéro d\'échantillon du père', () => {
    cy.get('[data-cy="PrescriptionAutoComplete"]').type(epCHUSJ_ldmCHUSJ.sampleFthId, {force: true});
    cy.clickAndIntercept('[data-cy="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]', 'POST', '**/$graphql*', 1);

    cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
  });
});

describe('Page d\'accueil - Rechercher des variants', () => {
  it('Par locus', () => {
    cy.get('[data-cy="SearchBox"]').type('5-96423719-c-t', {force: true});
    cy.clickAndIntercept('[data-cy="5-96423719-C-T"]', 'POST', '**/graphql', 3);

    cy.get('body').contains('chr5:g.96423719C>T').should('exist');
  });

  it('Par dbSNP', () => {
    cy.get('[data-cy="SearchBox"]').type('RS456709', {force: true});
    cy.clickAndIntercept('[data-cy="5-96423719-C-T"]', 'POST', '**/graphql', 3);

    cy.get('body').contains('chr5:g.96423719C>T').should('exist');
  });

  it('Par ClinVar', () => {
    cy.get('[data-cy="SearchBox"]').type('1183539', {force: true});
    cy.clickAndIntercept('[data-cy="5-96423719-C-T"]', 'POST', '**/graphql', 3);

    cy.get('body').contains('chr5:g.96423719C>T').should('exist');
  });
});
