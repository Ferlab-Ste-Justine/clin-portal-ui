/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants - Colonnes du tableau', () => {

    beforeEach(() => {
      cy.visitVariantsPage();
    });

  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Variant').should('exist');
    
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Type').should('exist');
  
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('dbSNP').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Gène').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Conséquence').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(6)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('OMIM').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(7)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('ClinVar').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(8)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('ACMG').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(9)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('gnomAD').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(10)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('RQDM').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Critères ACMG').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(10)
      .contains('Critères ACMG').should('exist');
/* CLICE-120
    cy.get('thead[class="ant-table-thead"]')
      .contains('CADD (Phred)').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(11)
      .contains('CADD (Phred)').should('exist');*/
  });

  it('Masquer une colonne affichée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('Type').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Type')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Type').should('not.exist');
  });

  it('Afficher une colonne masquée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('Critères ACMG').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Critères ACMG')
      .find('[type="checkbox"]').check({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Critères ACMG').should('exist');
  });

  it.skip('Déplacer une colonne', () => {
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class="ant-table-cell"]').eq(3)
      .contains('dbSNP').should('exist');

    // Le drag and drop ne fonctionne pas
    cy.get('div[class="ant-popover-inner"]')
      .find('span[aria-roledescription="sortable"]').eq(1).focus()
      .trigger('mousedown', {which: 1, eventConstructor: 'MouseEvent', force: true});

    cy.get('div[class*="ColumnSelector_ProTablePopoverColumn__nrwPi"]')
      .trigger('mousemove', {eventConstructor: 'MouseEvent', force: true})
      .trigger('mouseup', {which: 1, eventConstructor: 'MouseEvent', force: true});

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class="ant-table-cell"]').eq(2)
      .contains('dbSNP').should('exist');
  });
});
