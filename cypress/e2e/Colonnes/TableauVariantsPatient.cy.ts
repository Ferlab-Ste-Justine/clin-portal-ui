/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

afterEach(() => {
  cy.logout();
});

describe('Tableau des variants d\'un patient', () => {
  describe('Personnaliser les colonnes', () => {

    beforeEach(() => {
      cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
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
        .contains('OMIM').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(5)
        .contains('ClinVar').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(6)
        .contains('ACMG').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(7)
        .contains('gnomAD').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(8)
        .contains('RQDM').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(9)
        .contains('QG').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(10)
        .contains('Zygosité').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .contains('Critères ACMG').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(12)
        .contains('Critères ACMG').should('exist');
/* CLICE-120
      cy.get('thead[class="ant-table-thead"]')
        .contains('CADD (Phred)').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(13)
        .contains('CADD (Phred)').should('exist');*/

      cy.get('thead[class="ant-table-thead"]')
        .contains('Génotypes (M : P)').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(13)
        .contains('Génotypes (M : P)').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .contains('HC').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(14)
        .contains('HC').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .contains('HCP').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(15)
        .contains('HCP').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .contains('Transmission').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(16)
        .contains('Transmission').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .contains('QP').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(17)
        .contains('QP').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .contains('OP').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(18)
        .contains('OP').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .contains('ALT').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(19)
        .contains('ALT').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .contains('ALT+REF').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(20)
        .contains('ALT+REF').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .contains('ALT/(ALT+REF)').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(21)
        .contains('ALT/(ALT+REF)').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .contains('Filtre').should('not.exist');
      cy.get('div[class="ant-popover-inner"]')
        .find('div[class="ant-space-item"]').eq(22)
        .contains('Filtre').should('exist');

      cy.get('thead[class="ant-table-thead"]')
        .find('th[class*="ant-table-cell"]').eq(11)
        .contains('Actions').should('exist');
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