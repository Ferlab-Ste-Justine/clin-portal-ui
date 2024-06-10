/// <reference types="Cypress" />
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

  cy.visitPrescriptionsPage();
});

describe('Page des prescriptions et requêtes - Consultation du tableau des requêtes', () => {
  beforeEach(() => {  
    cy.checkValueFacet('Statut des prescriptions', 'active');
    cy.checkValueFacet('Analyse', 'RGDI');
  
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
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 8, 'G');
    cy.validateTableDataRowKeyClass(epCHUSJ_ldmCHUSJ.requestProbId, 8, 'ant-tag-green');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 9, 'LDM-CHUSJ');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 10, 'CHUSJ');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 11, epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 12, '-');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 13, 'Non');
    cy.validateTableDataRowKeyContent(epCHUSJ_ldmCHUSJ.requestProbId, 14, epCHUSJ_ldmCHUSJ.mrnProb);
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
    cy.checkValueFacet('Statut des prescriptions', 'active');
    cy.checkValueFacet('Analyse', 'HYPM');
  
    cy.get('div[id*="tab-requests"]').click({force: true});
    cy.resetColumns(1);
  
    cy.showColumn('Modifiée le', 1);
    cy.showColumn('Requérant', 1);
    cy.showColumn('Prénatal', 1);
    cy.showColumn('Dossier',1);
  
    cy.get('body').find('span[class*="ant-select-selection-item"]').eq(1).click({force: true});
    cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('100').click({force: true});
  });

  it('Valider les fonctionnalités du tableau - Tri Requête', () => {
    cy.sortTableAndIntercept('Requête', 3, 1);
    cy.validateTableFirstRow('MRN-283831', 14, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Requête', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 14, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Échantillon', () => {
    cy.sortTableAndIntercept('Échantillon', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 14, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Échantillon', 3, 1);
    cy.validateTableFirstRow('MRN-283890', 14, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Patient', () => {
    cy.sortTableAndIntercept('Patient', 3, 1);
    cy.validateTableFirstRow('MRN-283831', 14, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Patient', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 14, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Statut', () => {
    cy.sortTableAndIntercept('Statut', 3, 1);
    cy.validateTableFirstRow('Complétée', 4, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Statut', 3, 1);
    cy.validateTableFirstRow('Complétée', 4, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Créée le', () => {
    cy.sortTableAndIntercept('Créée le', 3, 1);
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.stampDate, 5, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Créée le', 3, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 5, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Modifiée le', () => {
    cy.sortTableAndIntercept('Modifiée le', 3, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 6, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Modifiée le', 3, 1);
    cy.validateTableFirstRow(/^\d{4}-\d{2}-\d{2}$/, 6, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Analyse', () => {
    cy.checkValueFacet('Analyse', 'MYOC');
    cy.sortTableAndIntercept('Analyse', 3, 1);
    cy.validateTableFirstRow('HYPM', 7, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Analyse', 3, 1);
    cy.validateTableFirstRow('MYOC', 7, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Bioinfo', () => {
    cy.checkValueFacet('Analyse', 'MYOC');
    cy.sortTableAndIntercept('Bioinfo', 3, 1);
    cy.validateTableFirstRow('G', 8, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Bioinfo', 3, 1);
    cy.validateTableFirstRow('G', 8, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri LDM', () => {
    cy.sortTableAndIntercept('LDM', 3, 1);
    cy.validateTableFirstRow('LDM-CHUS', 9, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('LDM', 3, 1);
    cy.validateTableFirstRow('LDM-CHUSJ', 9, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri EP', () => {
    cy.sortTableAndIntercept('EP', 3, 1);
    cy.validateTableFirstRow('CHUS', 10, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('EP', 3, 1);
    cy.validateTableFirstRow('CUSM', 10, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Prescription', () => {
    cy.sortTableAndIntercept('Prescription', 3, 1);
    cy.validateTableFirstRow('MRN-283831', 14, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Prescription', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 14, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Requérant', () => {
    cy.sortTableAndIntercept('Requérant', 3, 1);
    cy.validateTableFirstRow('-', 12, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Requérant', 3, 1);
    cy.validateTableFirstRow('-', 12, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Prénatal', () => {
    cy.sortTableAndIntercept('Prénatal', 3, 1);
    cy.validateTableFirstRow('Non', 13, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Prénatal', 3, 1);
    cy.validateTableFirstRow('Non', 13, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Tri Dossier', () => {
    cy.sortTableAndIntercept('Dossier', 3, 1);
    cy.validateTableFirstRow('MRN-283831', 14, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndIntercept('Dossier', 3, 1);
    cy.validateTableFirstRow('MRN-283900', 14, true, '[id="rc-tabs-0-panel-requests"]');
    cy.sortTableAndWait('Dossier', 1);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('LDM', 3, 1);
    cy.sortTableAndIntercept('Échantillon', 3, 1);
    cy.validateTableFirstRow('MRN-283831', 14, true, '[id="rc-tabs-0-panel-requests"]');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.checkValueFacet('Analyse', 'MYOC');
    cy.validatePaging(/10\d{1}/, 1, 1);
  });
});
  