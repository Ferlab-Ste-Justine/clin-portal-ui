/// <reference types="Cypress" />
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();
const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.exec('rm cypress/downloads/*', {failOnNonZeroExit: false});

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

  cy.get('div[role="tabpanel"]').find('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('[type="checkbox"]').check({force: true});
  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/graphql', 3);
});

describe('Page des variants d\'un patient - Exporter un variant en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('SNV_'+strDate+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauVariantsPatient.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauVariantsPatient.json');
  });
});
