/// <reference types="Cypress" />
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPage('?sharedFilterId=ed4de9bb-016e-4869-ac9d-40b11ac3102a');

  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/graphql', 2);
});

describe('Page des variants - Exporter un variant en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('SNV_'+strDate+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauVariants.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauVariants.json');
  });
});
