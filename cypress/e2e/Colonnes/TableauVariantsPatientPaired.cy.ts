/// <reference types="Cypress" />
import '../../support/commands';

const presc_PAIRED = JSON.parse(Cypress.env('presc_PAIRED'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants d\'un patient (paired) - Colonnes du tableau', () => {

  beforeEach(() => {
    cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId, 3);
  });

  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Actions').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Variant').should('exist');
    
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Type').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Bioinfo').should('exist');
  
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('dbSNP').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(6)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Gène').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(7)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Conséquence').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(8)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('MANE').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(9)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('OMIM').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(10)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('ClinVar').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(11)
      .should('have.class', 'ant-table-column-has-sorters')
      .find('[data-icon="fire"]').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(12)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Tier').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(13)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('CMC').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(14)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains(/^gnomAD $/).should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('gnomAD ALT').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(13)
      .contains('gnomAD ALT').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(15)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('RQDM').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(16)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('QS').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(17)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Zyg.').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('QP').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(17)
      .contains('QP').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains(/^A$/).should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(18)
      .contains(/^A$/).should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('A+R').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(19)
      .contains('A+R').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('A/(A+R)').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(20)
      .contains('A/(A+R)').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Filtre').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(21)
      .contains('Filtre').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('CADD').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(22)
      .contains('CADD').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('REVEL').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(23)
      .contains('REVEL').should('exist');
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
      .contains('gnomAD ALT').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('gnomAD ALT')
      .find('[type="checkbox"]').check({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('gnomAD ALT').should('exist');
  });

  it.skip('Déplacer une colonne', () => {
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class="ant-table-cell"]').eq(4)
      .contains('dbSNP').should('exist');

    // Le drag and drop ne fonctionne pas
    cy.get('div[class="ant-popover-inner"]')
      .find('span[aria-roledescription="sortable"]').eq(1).focus()
      .trigger('mousedown', {which: 1, eventConstructor: 'MouseEvent', force: true});

    cy.get('div[class*="ColumnSelector_ProTablePopoverColumn__nrwPi"]')
      .trigger('mousemove', {eventConstructor: 'MouseEvent', force: true})
      .trigger('mouseup', {which: 1, eventConstructor: 'MouseEvent', force: true});

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class="ant-table-cell"]').eq(3)
      .contains('dbSNP').should('exist');
  });
});
