/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

afterEach(() => {
  cy.logout();
});

describe('Tableau des archives', () => {
  describe('Personnaliser les colonnes', () => {

    beforeEach(() => {
      cy.visitArchivesPatientPage(epCHUSJ_ldmCHUSJ.patientProbId);
    });

    it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
      cy.get('thead[class="ant-table-thead"]')
        .contains('URL').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(0)
        .contains('URL').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(0)
        .contains('Nom du fichier').should('exist');
      
      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(1)
        .contains('Type').should('exist');
    
      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(2)
//        .should('have.class', 'ant-table-column-has-sorters') CLIN-1616
        .contains('Format').should('exist');
  
      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(3)
//        .should('have.class', 'ant-table-column-has-sorters') CLIN-1616
        .contains('Patient').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(4)
//        .should('have.class', 'ant-table-column-has-sorters') CLIN-1616
        .contains('Requête').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(5)
        .contains('Échantillon (LDM)').should('exist');
/* CLIN-1617
      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(6)
//        .should('have.class', 'ant-table-column-has-sorters') CLIN-1616
        .contains('Analyse bioinfo').should('exist');*/

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(7)
        .contains('Date').should('exist');
    
      cy.get('thead[class="ant-table-thead"]')
        .contains('Taille').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(10)
        .contains('Taille').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .contains('Hash').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(11)
        .contains('Hash').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .contains('Run').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(12)
        .contains('Run').should('exist');
/* CLIN-1617
      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(8)
        .contains('Actions').should('exist');*/
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
});