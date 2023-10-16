/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

  cy.visitPrescriptionsPage();
});

describe('Page des prescriptions et requêtes - Consultation du tableau des prescriptions', () => {
  beforeEach(() => {  
    cy.checkValueFacet('Statut', 'active');
    cy.checkValueFacet('Analyse', 'RGDI');
  
    cy.resetColumns(0);
  
    cy.showColumn('Modifiée le', 0);
    cy.showColumn('Requérant', 0);
    cy.showColumn('Prénatal', 0);
    cy.showColumn('Dossier', 0);
  });

  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 2, epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 3, epCHUSJ_ldmCHUSJ.patientProbId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 4, 'Approuvée');
    cy.validateTableDataRowKeyClass(epCHUSJ_ldmCHUSJ.prescriptionId, 4, 'ant-tag-green');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 5, epCHUSJ_ldmCHUSJ.stampDate);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 6, /^\d{4}-\d{2}-\d{2}$/);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 7, 'RGDI');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 8, 'LDM-CHUSJ');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 9, 'CHUSJ');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 10, '-');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 11, 'Non');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.prescriptionId, 12, epCHUSJ_ldmCHUSJ.mrnProb);
  });

  it('Valider les liens disponibles Lien Prescription', () => {
    cy.intercept('POST', '**/$graphql*').as('getPOSTgraphql');
    cy.get('tr[data-row-key="'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]').find('a[href*="prescription"]').click({force: true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.get('div[role="tablist"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist', {timeout: 20*1000});
  });
});

describe('Page des prescriptions et requêtes - Consultation du tableau des prescriptions', () => {
  beforeEach(() => {  
    cy.checkValueFacet('Statut', 'active');
    cy.checkValueFacet('Analyse', 'MYOC');
    cy.checkValueFacet('Analyse', 'HYPM');
  
    cy.resetColumns(0);
  
    cy.showColumn('Modifiée le', 0);
    cy.showColumn('Requérant', 0);
    cy.showColumn('Prénatal', 0);
    cy.showColumn('Dossier', 0);
  });

  it('Valider les fonctionnalités du tableau - Tri Prescription', () => {
    cy.sortTableAndIntercept('Prescription', 3);
    cy.validateTableFirstRow('MRN-283791', 12);
    cy.sortTableAndIntercept('Prescription', 3);
    cy.validateTableFirstRow('MRN-283900', 12);
  });

  it('Valider les fonctionnalités du tableau - Tri Patient', () => {
    cy.sortTableAndIntercept('Patient', 3);
    cy.validateTableFirstRow('MRN-283791', 12);
    cy.sortTableAndIntercept('Patient', 3);
    cy.validateTableFirstRow('MRN-283900', 12);
  });

  it('Valider les fonctionnalités du tableau - Tri Statut', () => {
    cy.sortTableAndIntercept('Statut', 3);
    cy.validateTableFirstRow('Approuvée', 4);
    cy.sortTableAndIntercept('Statut', 3);
    cy.validateTableFirstRow('Approuvée', 4);
  });

  it('Valider les fonctionnalités du tableau - Tri Créée le', () => {
    cy.sortTableAndIntercept('Créée le', 3);
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.stampDate, 5);
    cy.sortTableAndIntercept('Créée le', 3);
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.stampDate, 5);
  });

  it('Valider les fonctionnalités du tableau - Tri Modifiée le', () => {
    cy.sortTableAndIntercept('Modifiée le', 3);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 6);
    cy.sortTableAndIntercept('Modifiée le', 3);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 6);
  });

  it('Valider les fonctionnalités du tableau - Tri Analyse', () => {
    cy.sortTableAndIntercept('Analyse', 3);
    cy.validateTableFirstRow('HYPM', 7);
    cy.sortTableAndIntercept('Analyse', 3);
    cy.validateTableFirstRow('MYOC', 7);
  });

  it('Valider les fonctionnalités du tableau - Tri LDM', () => {
    cy.sortTableAndIntercept('LDM', 3);
    cy.validateTableFirstRow('LDM-CHUS', 8);
    cy.sortTableAndIntercept('LDM', 3);
    cy.validateTableFirstRow('LDM-CHUSJ', 8);
  });

  it('Valider les fonctionnalités du tableau - Tri EP', () => {
    cy.sortTableAndIntercept('EP', 3);
    cy.validateTableFirstRow('CHUS', 9);
    cy.sortTableAndIntercept('EP', 3);
    cy.validateTableFirstRow('CUSM', 9);
  });

  it('Valider les fonctionnalités du tableau - Tri Requérant', () => {
    cy.sortTableAndIntercept('Requérant', 3);
    cy.validateTableFirstRow('-', 10);
    cy.sortTableAndIntercept('Requérant', 3);
    cy.validateTableFirstRow('-', 10);
  });

  it('Valider les fonctionnalités du tableau - Tri Prénatal', () => {
    cy.sortTableAndIntercept('Prénatal', 3);
    cy.validateTableFirstRow('Non', 11);
    cy.sortTableAndIntercept('Prénatal', 3);
    cy.validateTableFirstRow('Non', 11);
  });

  it('Valider les fonctionnalités du tableau - Tri Dossier', () => {
    cy.sortTableAndIntercept('Dossier', 3);
    cy.validateTableFirstRow('MRN-283791', 12);
    cy.sortTableAndIntercept('Dossier', 3);
    cy.validateTableFirstRow('MRN-283900', 12);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('EP', 3);
    cy.sortTableAndIntercept('Dossier', 3);
    cy.validateTableFirstRow('MRN-283804', 12);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('101', 0);
  });
});
