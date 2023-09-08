/// <reference types="Cypress" />
import { Replacement } from '../../support/commands';
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();
const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);
  cy.get('[data-cy="RadioButton_CouvertureGenique"]').click({force: true});

  cy.get('div[role="tabpanel"]').find('tr[data-row-key="6"]').find('[type="checkbox"]').check({force: true});
  cy.get('div[id="content"] svg[data-icon="download"]').eq(1).click({force:true});
  cy.wait(2000);
});

describe('Page de la couverture génique d\'un patient - Exporter les statistiques en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('GC_'+strDate+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauCouvertureGenique.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauCouvertureGenique.json');
  });
});
