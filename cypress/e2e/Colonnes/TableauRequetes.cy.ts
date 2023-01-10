/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

afterEach(() => {
  cy.logout();
});

describe('Tableau des requêtes', () => {
  describe('Personnaliser les colonnes', () => {

    beforeEach(() => {
      cy.visitPrescriptionsPage();
      cy.get('div[id*="tab-requests"]').click({force: true});

      cy.resetColumns(1);
    });

    it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
      cy.get('thead[class="ant-table-thead"]').eq(1)
        .find('th[class*="ant-table-cell"]').eq(0)
        .should('have.class', 'ant-table-selection-column');

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .find('th[class*="ant-table-cell"]').eq(1)
        .contains('Requête').should('exist');

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .find('th[class*="ant-table-cell"]').eq(2)
        .contains('Échantillon').should('exist');

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .find('th[class*="ant-table-cell"]').eq(3)
        .contains('Patient').should('exist');

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .find('th[class*="ant-table-cell"]').eq(4)
        .should('have.class', 'ant-table-column-has-sorters')
        .contains('Statut').should('exist');

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .find('th[class*="ant-table-cell"]').eq(5)
        .should('have.class', 'ant-table-column-has-sorters')
        .contains('Créée le').should('exist');

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .contains('Modifiée le').should('not.exist');
      cy.get('div[class="ant-popover-inner"]').eq(1)
        .find('div[class="ant-space-item"]').eq(6)
        .contains('Modifiée le').should('exist');

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .find('th[class*="ant-table-cell"]').eq(6)
        .should('have.class', 'ant-table-column-has-sorters')
        .contains('Analyse').should('exist');

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .find('th[class*="ant-table-cell"]').eq(7)
        .should('have.class', 'ant-table-column-has-sorters')
        .contains('LDM').should('exist');

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .find('th[class*="ant-table-cell"]').eq(8)
        .should('have.class', 'ant-table-column-has-sorters')
        .contains('EP').should('exist');

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .find('th[class*="ant-table-cell"]').eq(9)
        .should('have.class', 'ant-table-column-has-sorters')
        .contains('Prescription').should('exist');

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .find('th[class*="ant-table-cell"]').eq(10)
        .contains('Liens').should('exist');

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .contains('Requérant').should('not.exist');
      cy.get('div[class="ant-popover-inner"]').eq(1)
        .find('div[class="ant-space-item"]').eq(12)
        .contains('Requérant').should('exist');

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .contains('Prénatal').should('not.exist');
      cy.get('div[class="ant-popover-inner"]').eq(1)
        .find('div[class="ant-space-item"]').eq(13)
        .contains('Prénatal').should('exist');

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .contains('Dossier').should('not.exist');
      cy.get('div[class="ant-popover-inner"]').eq(1)
        .find('div[class="ant-space-item"]').eq(14)
        .contains('Dossier').should('exist');
/* CLIN-1551
      cy.get('thead[class="ant-table-thead"]').eq(1)
        .contains('Run').should('not.exist');
      cy.get('div[class="ant-popover-inner"]').eq(1)
        .find('div[class="ant-space-item"]').eq(15)
        .contains('Run').should('exist');*/
    });

    it('Masquer une colonne affichée', () => {
      cy.get('thead[class="ant-table-thead"]').eq(1)
        .contains('Requête').should('exist');

      cy.get('div[class="ant-popover-inner"]').eq(1)
        .find('div[class="ant-space-item"]').contains('Requête')
        .find('[type="checkbox"]').uncheck({force: true});

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .contains('Requête').should('not.exist');
    });

    it('Afficher une colonne masquée', () => {
      cy.get('thead[class="ant-table-thead"]').eq(1)
        .contains('Modifiée le').should('not.exist');

      cy.get('div[class="ant-popover-inner"]').eq(1)
        .find('div[class="ant-space-item"]').contains('Modifiée le')
        .find('[type="checkbox"]').check({force: true});

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .contains('Modifiée le').should('exist');
    });

    it.skip('Déplacer une colonne', () => {
      cy.get('thead[class="ant-table-thead"]').eq(1)
        .find('th[class="ant-table-cell"]').eq(1)
        .contains('Échantillon').should('exist');

      // Le drag and drop ne fonctionne pas
      cy.get('div[class="ant-popover-inner"]').eq(1)
        .find('span[aria-roledescription="sortable"]').eq(1).focus()
        .trigger('mousedown', {which: 1, eventConstructor: 'MouseEvent', force: true});

      cy.get('div[class*="ColumnSelector_ProTablePopoverColumn__nrwPi"]')
        .trigger('mousemove', {eventConstructor: 'MouseEvent', force: true})
        .trigger('mouseup', {which: 1, eventConstructor: 'MouseEvent', force: true});

      cy.get('thead[class="ant-table-thead"]').eq(1)
        .find('th[class="ant-table-cell"]').eq(0)
        .contains('Échantillon').should('exist');

    });
  });
});