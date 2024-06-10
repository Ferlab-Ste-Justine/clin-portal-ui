/// <reference types="Cypress" />
import { Replacement } from '../../support/commands';
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();
let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitPrescriptionsPage();

  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/graphql', 3);
});

describe('Page des prescriptions et requêtes - Exporter les prescriptions en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('PR_'+strDate+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauPrescriptions.json');
  });

  it('Valider le contenu du fichier', () => {
    const replacements: Replacement[] = [
      { placeholder: '{{prescriptionId}}', value: epCHUSJ_ldmCHUSJ.prescriptionId },
      { placeholder: '{{patientId}}', value: epCHUSJ_ldmCHUSJ.patientProbId },
      { placeholder: '{{stampDate}}', value: epCHUSJ_ldmCHUSJ.stampDate },
    ];
    cy.validateFileContent('ExportTableauPrescriptions.json', replacements);
  });
});
