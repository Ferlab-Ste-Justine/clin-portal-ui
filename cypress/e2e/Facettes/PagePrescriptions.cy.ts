/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des prescriptions et requêtes - Filtrer avec les facettes', () => {

  beforeEach(() => {
    cy.visitPrescriptionsPage();
  });

  it('Statut - Approuvée', () => {
    cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(0).contains('Statut').should('exist');
    cy.checkValueFacet('Statut', 'active');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });
  
  it('Statut des requêtes - Complétée', () => {
    cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(1).contains('Statut des requêtes').should('exist');
    cy.checkValueFacet('Statut des requêtes', 'completed');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });
  
  it('Analyse - Malignant Hyperthermia (HYPM)', () => {
    cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(2).contains('Analyse').should('exist');
    cy.checkValueFacet('Analyse', 'HYPM');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });

  it('Analyse - Congenital Myopathies (MYOC)', () => {
    cy.checkValueFacet('Analyse', 'MYOC');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });

  it('Analyse - Global Developmental Delay / Intellectual Deficiency (Trio) (RGDI)', () => {
    cy.checkValueFacet('Analyse', 'RGDI');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });
  
  it('Laboratoire (LDM) - LDM-CHUSJ', () => {
    cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(3).contains('Laboratoire (LDM)').should('exist');
    cy.checkValueFacet('Laboratoire (LDM)', 'LDM-CHUSJ');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });

  it('Laboratoire (LDM) - LDM-CHUS', () => {
    cy.checkValueFacet('Laboratoire (LDM)', 'LDM-CHUS');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });

  it('Laboratoire (LDM) - LDM-CUSM', () => {
    cy.checkValueFacet('Laboratoire (LDM)', 'LDM-CUSM');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });
  
  it('Établissement prescripteur - CHUSJ', () => {
    cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(4).contains('Établissement prescripteur').should('exist');
    cy.checkValueFacet('Établissement prescripteur', 'CHUSJ');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });

  it('Établissement prescripteur - CHUS', () => {
    cy.checkValueFacet('Établissement prescripteur', 'CHUS');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });

  it('Établissement prescripteur - CUSM', () => {
    cy.checkValueFacet('Établissement prescripteur', 'CUSM');

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions 0').should('exist');
    cy.get('body').contains('Requêtes 0').should('exist');
  });
  
  it('Prénatal - False', () => {
    cy.checkValueFacet('Prénatal', 'false'); 

    cy.get('input[class="ant-input"]').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

    cy.get('body').contains('Prescriptions (1)').should('exist');
    cy.get('body').contains('Requêtes (3)').should('exist');
  });
});
