/// <reference types="Cypress" />
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();
const presc_SOMATIC = JSON.parse(Cypress.env('presc_SOMATIC'));

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);

  cy.get('div[role="tabpanel"]').find('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('[type="checkbox"]').check({force: true});
  cy.get('div[id="content"] svg[data-icon="download"]').click({force: true});
  cy.wait(2000);
});

describe('Page des variants d\'un patient (somatic) - Exporter un variant en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('SNV_'+strDate+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauVariantsPatientSomatic.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauVariantsPatientSomatic.json');
  });
});
