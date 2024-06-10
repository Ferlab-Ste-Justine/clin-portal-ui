/// <reference types="Cypress" />
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page de la couverture génique d\'un patient - Colonnes du tableau', () => {

  beforeEach(() => {
    cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.get('[data-cy="RadioButton_CouvertureGenique"]').click({force: true});
    cy.resetColumns(0);
  });

  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('have.class', 'ant-table-selection-column');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Actions').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Gène').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Longueur').should('exist');
  
    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Couv. Moy.').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('5x').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(6)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('15x').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(7)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('30x').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(8)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('50x').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(9)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('100x').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(10)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('200x').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(11)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('300x').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(12)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('500x').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(13)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('1000x').should('exist');
  });

  it('Masquer/Afficher une colonne', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('Gène').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Gène')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Gène').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Gène')
      .find('[type="checkbox"]').check({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Gène').should('exist');
  });
});
