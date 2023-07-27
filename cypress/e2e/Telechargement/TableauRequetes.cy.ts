/// <reference types="Cypress" />
import { Replacement } from '../../support/commands';
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();
const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.exec('rm cypress/downloads/*', {failOnNonZeroExit: false});

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitPrescriptionsPage();
  cy.get('div[id*="tab-requests"]').click({force: true});

  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/graphql', 3, 1);
});

describe('Page des prescriptions et requêtes - Exporter les requêtes en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('RQ_'+strDate+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauRequetes.json');
  });

  it('Valider le contenu du fichier', () => {
    const replacements: Replacement[] = [
      { placeholder: '{{requestId}}', value: epCHUSJ_ldmCHUSJ.requestProbId },
      { placeholder: '{{patientId}}', value: epCHUSJ_ldmCHUSJ.patientProbId },
      { placeholder: '{{stampDate}}', value: epCHUSJ_ldmCHUSJ.stampDate },
      { placeholder: '{{prescriptionId}}', value: epCHUSJ_ldmCHUSJ.prescriptionId },
    ];
    cy.validateFileContent('ExportTableauRequetes.json', replacements);
  });
});
