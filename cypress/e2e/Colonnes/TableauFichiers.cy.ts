/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des fichiers d\'un patient - Colonnes du tableau', () => {

  beforeEach(() => {
    cy.visitFilesPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);
  });

  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Nom du fichier').should('exist');
  
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Format').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('have.class', 'ant-table-column-has-sorters')
      .should('have.attr', 'aria-sort', 'ascending')
      .contains('Patient').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Requête').should('exist');
/*
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Position').should('exist');
*/
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Échantillon (LDM)').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Analyse bioinfo').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(6)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Date').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(7)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Actions').should('exist');
  
    cy.get('thead[class="ant-table-thead"]')
      .contains('Taille').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(9)
      .contains('Taille').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Hash').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(10)
      .contains('Hash').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Run').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(11)
      .contains('Run').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Run').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(12)
      .contains('Type').should('exist');
  });

  it('Masquer une colonne affichée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('Patient').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Patient')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Patient').should('not.exist');
  });

  it('Afficher une colonne masquée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('Taille').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Taille')
      .find('[type="checkbox"]').check({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Taille').should('exist');
  });

  it.skip('Déplacer une colonne', () => {
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class="ant-table-cell"]').eq(1)
      .contains('Nom du fichier').should('exist');

    // Le drag and drop ne fonctionne pas
    cy.get('div[class="ant-popover-inner"]')
      .find('span[aria-roledescription="sortable"]').eq(1).focus()
      .trigger('mousedown', {which: 1, eventConstructor: 'MouseEvent', force: true});

    cy.get('div[class*="ColumnSelector_ProTablePopoverColumn__nrwPi"]')
      .trigger('mousemove', {eventConstructor: 'MouseEvent', force: true})
      .trigger('mouseup', {which: 1, eventConstructor: 'MouseEvent', force: true});

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class="ant-table-cell"]').eq(0)
      .contains('Nom du fichier').should('exist');

  });
});