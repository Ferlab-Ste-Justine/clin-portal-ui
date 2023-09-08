/// <reference types="Cypress" />
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();
const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/graphql', 2);
});

describe('Page des CNVs d\'un patient - Exporter les CNVs en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('CNV_'+strDate+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauCNVsPatient.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauCNVsPatient.json');
  });
});
