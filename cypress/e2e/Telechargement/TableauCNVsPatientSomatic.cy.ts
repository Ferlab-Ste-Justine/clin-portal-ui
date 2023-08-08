/// <reference types="Cypress" />
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();
const presc_SOMATIC = JSON.parse(Cypress.env('presc_SOMATIC'));

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);

  cy.get('div[role="tabpanel"]').find('tr[data-row-key="831fe9ca63829ba02f77cb30cd3cbbcd30f72911"]').find('[type="checkbox"]').check({force: true});
  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/graphql', 3);
});

describe('Page des CNVs d\'un patient (somatic) - Exporter les CNVs en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('CNV_'+strDate+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauCNVsPatientSomatic.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauCNVsPatientSomatic.json');
  });
});
