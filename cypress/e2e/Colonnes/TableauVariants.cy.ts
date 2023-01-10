/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

afterEach(() => {
  cy.logout();
});

describe('Tableau des variants', () => {
  describe('Personnaliser les colonnes', () => {

    beforeEach(() => {
      cy.visitVariantsPage();
    });

    it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(0)
        .contains('Variant').should('exist');
      
      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(1)
        .contains('Type').should('exist');
    
      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(2)
        .contains('dbSNP').should('exist');
  
      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(3)
        .contains('Conséquences').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(4)
        .contains('ClinVar').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(5)
        .contains('ACMG').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(6)
        .contains('gnomAD').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(7)
        .contains('RQDM').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .contains('Critères ACMG').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(9)
        .contains('Critères ACMG').should('exist');
/* CLICE-120
      cy.get('thead[class="ant-table-thead"]')
        .contains('CADD (Phred)').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(10)
        .contains('CADD (Phred)').should('exist');*/
    });

    it('Masquer une colonne affichée', () => {
      cy.get('thead[class="ant-table-thead"]')
        .contains('Variant').should('exist');

      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').contains('Variant')
        .find('[type="checkbox"]').uncheck({force: true});

      cy.get('thead[class="ant-table-thead"]')
        .contains('Variant').should('not.exist');
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
        .find('th[class="ant-table-cell"]').eq(1)
        .contains('Type').should('exist');

      // Le drag and drop ne fonctionne pas
      cy.get('div[class="ant-popover-inner"]')
        .find('span[aria-roledescription="sortable"]').eq(1).focus()
        .trigger('mousedown', {which: 1, eventConstructor: 'MouseEvent', force: true});

      cy.get('div[class*="ColumnSelector_ProTablePopoverColumn__nrwPi"]')
        .trigger('mousemove', {eventConstructor: 'MouseEvent', force: true})
        .trigger('mouseup', {which: 1, eventConstructor: 'MouseEvent', force: true});

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class="ant-table-cell"]').eq(0)
        .contains('Type').should('exist');

    });
  });
});