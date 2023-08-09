/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

  cy.visitPrescriptionsPage();
});

describe('Page des prescriptions et requêtes - Consultation du tableau des requêtes', () => {
  beforeEach(() => {  
    cy.checkValueFacet(0, 'Approuvée');
    cy.checkValueFacet(2, 'RGDI');
  
    cy.get('div[id*="tab-requests"]').click({force: true});
    cy.resetColumns(1);
  
    cy.showColumn('Modifiée le', 1);
    cy.showColumn('Requérant', 1);
    cy.showColumn('Prénatal', 1);
    cy.showColumn('Dossier',1);
  
    cy.get('body').find('span[class*="ant-select-selection-item"]').eq(1).click({force: true});
    cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('100').click({force: true});
  });

  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 1, epCHUSJ_ldmCHUSJ.requestProbId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 2, epCHUSJ_ldmCHUSJ.sampleProbId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 3, epCHUSJ_ldmCHUSJ.patientProbId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 4, 'Complétée');
    cy.validateTableDataRowKeyClass(epCHUSJ_ldmCHUSJ.requestProbId, 4, 'ant-tag-green');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 5, epCHUSJ_ldmCHUSJ.stampDate);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 6, /^\d{4}-\d{2}-\d{2}$/);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 7, 'RGDI');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 8, 'LDM-CHUSJ');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 9, 'CHUSJ');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 10, epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 11, '-');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 12, 'Non');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 13, epCHUSJ_ldmCHUSJ.mrnProb);
  });

  it('Valider les liens disponibles Lien Requête', () => {
    cy.clickAndIntercept('tr[data-row-key="'+epCHUSJ_ldmCHUSJ.requestProbId+'"] a[href*="prescription"]', 'POST', '**/$graphql*', 1, 0);
    cy.get('div[role="tablist"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist', {timeout: 20*1000});
  });

  it('Valider les liens disponibles Lien Prescription', () => {
    cy.clickAndIntercept('tr[data-row-key="'+epCHUSJ_ldmCHUSJ.requestProbId+'"] a[href*="prescription"]', 'POST', '**/$graphql*', 1, 1);
    cy.get('div[role="tablist"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist', {timeout: 20*1000});
  });
});

describe('Page des prescriptions et requêtes - Consultation du tableau des requêtes', () => {
  beforeEach(() => {  
    cy.checkValueFacet(0, 'Approuvée');
    cy.checkValueFacet(2, 'MYOC');
    cy.checkValueFacet(2, 'HYPM');
  
    cy.get('div[id*="tab-requests"]').click({force: true});
    cy.resetColumns(1);
  
    cy.showColumn('Modifiée le', 1);
    cy.showColumn('Requérant', 1);
    cy.showColumn('Prénatal', 1);
    cy.showColumn('Dossier',1);
  
    cy.get('body').find('span[class*="ant-select-selection-item"]').eq(1).click({force: true});
    cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('100').click({force: true});
  });

  it('Valider les fonctionnalités du tableau - Tris', () => {
    cy.sortTableAndIntercept('Requête', 3, 1);
    cy.validateTableFirstRow('MRN-283791', 13, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Requête', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 13, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('Requête', 1);

    cy.sortTableAndIntercept('Échantillon', 3, 1);
    cy.validateTableFirstRow('MRN-283791', 13, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Échantillon', 3, 1);
    cy.validateTableFirstRow('MRN-283890', 13, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('Échantillon', 1);

    cy.sortTableAndIntercept('Patient', 3, 1);
    cy.validateTableFirstRow('MRN-283791', 13, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Patient', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 13, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('Patient', 1);

    cy.sortTableAndIntercept('Statut', 3, 1);
    cy.validateTableFirstRow('Complétée', 4, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Statut', 3, 1);
    cy.validateTableFirstRow('Complétée', 4, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('Statut', 1);

    cy.sortTableAndIntercept('Créée le', 3, 1);
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.stampDate, 5, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Créée le', 3, 1);
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.stampDate, 5, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('Créée le', 1);

    cy.sortTableAndIntercept('Modifiée le', 3, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 6, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Modifiée le', 3, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 6, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('Modifiée le', 1);

    cy.sortTableAndIntercept('Analyse', 3, 1);
    cy.validateTableFirstRow('HYPM', 7, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Analyse', 3, 1);
    cy.validateTableFirstRow('MYOC', 7, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('Analyse', 1);

    cy.sortTableAndIntercept('LDM', 3, 1);
    cy.validateTableFirstRow('LDM-CHUS', 8, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('LDM', 3, 1);
    cy.validateTableFirstRow('LDM-CHUSJ', 8, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('LDM', 1);

    cy.sortTableAndIntercept('EP', 3, 1);
    cy.validateTableFirstRow('CHUS', 9, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('EP', 3, 1);
    cy.validateTableFirstRow('CUSM', 9, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('EP', 1);

    cy.sortTableAndIntercept('Prescription', 3, 1);
    cy.validateTableFirstRow('MRN-283791', 13, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Prescription', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 13, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('Prescription', 1);

    cy.sortTableAndIntercept('Requérant', 3, 1);
    cy.validateTableFirstRow('-', 11, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Requérant', 3, 1);
    cy.validateTableFirstRow('-', 11, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('Requérant', 1);

    cy.sortTableAndIntercept('Prénatal', 3, 1);
    cy.validateTableFirstRow('Non', 12, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Prénatal', 3, 1);
    cy.validateTableFirstRow('Non', 12, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('Prénatal', 1);

    cy.sortTableAndIntercept('Dossier', 3, 1);
    cy.validateTableFirstRow('MRN-283791', 13, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Dossier', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 13, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('Dossier', 1);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('LDM', 3, 1);
    cy.sortTableAndIntercept('Échantillon', 3, 1);
    cy.validateTableFirstRow('MRN-283804', 13, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('101', 1);
  });
});
  