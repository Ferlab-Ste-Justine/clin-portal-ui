/// <reference types="Cypress" />
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
});

describe('Page d\'une prescription - Vérifier les informations affichées', () => {
  it('Panneau Analyse', () => {
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(0).contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(2).contains('--').should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(3).contains('Approuvée').should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(4).contains('Retard global de développement / Déficience intellectuelle (Trio) (RGDI)').should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(5).contains('--').should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(6).contains(epCHUSJ_ldmCHUSJ.stampDate).should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(7).contains('--').should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(8).contains('CHUSJ').should('exist');
    cy.get('[data-cy="AnalysisCard"] [class="ant-descriptions-item-content"]').eq(9).contains('LDM-CHUSJ').should('exist');
  });
  
  it('Panneau Patient', () => {
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(0).contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(1).contains(epCHUSJ_ldmCHUSJ.mrnProb).should('exist');
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(1).contains('CHUSJ').should('exist');
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(2).contains(epCHUSJ_ldmCHUSJ.ramqProb).should('exist');
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(3).contains(epCHUSJ_ldmCHUSJ.lastNameProb).should('exist');
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(3).contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(4).contains(epCHUSJ_ldmCHUSJ.birthdayProb).should('exist');
    cy.get('[data-cy="PatientCard"] [class="ant-descriptions-item-content"]').eq(5).contains(epCHUSJ_ldmCHUSJ.genderProb).should('exist');
  });
  
  it('Panneau Information clinique', () => {
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [class*="ClinicalInformationCard"] [class="ant-descriptions-item-content"]').eq(0).contains('--').should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [class*="ClinicalInformationCard"] [class="ant-descriptions-item-content"]').eq(1).contains('--').should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [class*="ClinicalInformationCard"] [class="ant-descriptions-item-content"]').eq(2).contains('--').should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [class*="ClinicalInformationCard"] [class="ant-descriptions-item-content"]').eq(3).contains('--').should('exist');

    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(0).contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(1).contains('Complétée').should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(2).contains(epCHUSJ_ldmCHUSJ.stampDate).should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(3).contains('--').should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(4).contains(epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(5).contains('Fichiers').should('exist');
  });
  
  it('Panneau Mère', () => {
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(0).contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(1).contains(epCHUSJ_ldmCHUSJ.mrnMth).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(1).contains('CHUSJ').should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(2).contains(epCHUSJ_ldmCHUSJ.ramqMth).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(3).contains(epCHUSJ_ldmCHUSJ.lastNameMth).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(3).contains(epCHUSJ_ldmCHUSJ.firstNameMth).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(4).contains(epCHUSJ_ldmCHUSJ.birthdayMth).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(5).contains('Féminin').should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(6).contains(epCHUSJ_ldmCHUSJ.statusMth).should('exist');

    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(0).contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(1).contains('Complétée').should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(2).contains(epCHUSJ_ldmCHUSJ.stampDate).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(3).contains('--').should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(4).contains(epCHUSJ_ldmCHUSJ.sampleMthId, {matchCase: false}).should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(5).contains('Fichiers').should('exist');
  });
  
  it('Panneau Père', () => {
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(0).contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(1).contains(epCHUSJ_ldmCHUSJ.mrnFth).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(1).contains('CHUSJ').should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(2).contains(epCHUSJ_ldmCHUSJ.ramqFth).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(3).contains(epCHUSJ_ldmCHUSJ.lastNameFth).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(3).contains(epCHUSJ_ldmCHUSJ.firstNameFth).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(4).contains(epCHUSJ_ldmCHUSJ.birthdayFth).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(5).contains('Masculin').should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [class="ant-descriptions-item-content"]').eq(6).contains(epCHUSJ_ldmCHUSJ.statusFth).should('exist');
    
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(0).contains(epCHUSJ_ldmCHUSJ.requestFthId).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(1).contains('Complétée').should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(2).contains(epCHUSJ_ldmCHUSJ.stampDate).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(3).contains('--').should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(4).contains(epCHUSJ_ldmCHUSJ.sampleFthId).should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"] [data-row-key="0"] [class="ant-table-cell"]').eq(5).contains('Fichiers').should('exist');
  });
});

describe('Page d\'une prescription - Valider les liens disponibles', () => {
  it('Lien Fichiers (Cas-index)', () => {
    cy.clickAndIntercept('[data-cy="ArchiveLink_'+epCHUSJ_ldmCHUSJ.requestProbId+'"]', 'POST', '**/$graphql*', 1);
    cy.resetColumns(0);
    cy.contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist', {timeout: 20*1000});
  });

  it('Lien Fichiers (Mère)', () => {
    cy.clickAndIntercept('[data-cy="ArchiveLink_'+epCHUSJ_ldmCHUSJ.requestMthId+'"]', 'POST', '**/$graphql*', 1);
    cy.resetColumns(0);
    cy.contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist', {timeout: 20*1000});
  });

  it('Lien Fichiers (Père)', () => {
    cy.clickAndIntercept('[data-cy="ArchiveLink_'+epCHUSJ_ldmCHUSJ.requestFthId+'"]', 'POST', '**/$graphql*', 1);
    cy.resetColumns(0);
    cy.contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist', {timeout: 20*1000});
  });
});

describe('Page d\'une prescription - Valider les panneaux masquables', () => {
  it('Panneau Information clinique', () => {
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Mère', () => {
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Père', () => {
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });
});
  