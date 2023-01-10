/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

afterEach(() => {
  cy.logout();
});

describe('Page des variants', () => {
  describe('Filtrer avec les facettes', () => {

    beforeEach(() => {
      cy.visitVariantsPage();
    });

    describe('Patient', () => {
      beforeEach(() => {
        cy.get('li[data-key="patient"]').click({force: true});
      });

      it('Analyse', () => {
        cy.get('span[class*="FilterContainer_title"]', {timeout: 5000}).contains('Analyse').click({force: true});

        cy.get('div[class*="CheckboxFilter_checkboxFilterItem"]', {timeout: 5000}).contains('MYOC')
          .find('[type="checkbox"]').check({force: true});
          cy.clickApplyFacet();

        cy.get('body').contains('954 285').should('exist');
      });

      it('Statut clinique', () => {
        cy.get('span[class*="FilterContainer_title"]', {timeout: 5000}).contains('Statut clinique').click({force: true});

        cy.get('div[class*="CheckboxFilter_checkboxFilterItem"]', {timeout: 5000}).contains('Non atteint')
          .find('[type="checkbox"]').check({force: true});
          cy.clickApplyFacet();

        cy.get('body').contains('511 795').should('exist');
      });

      it('Sexe', () => {
        cy.get('span[class*="FilterContainer_title"]', {timeout: 5000}).contains('Sexe').click({force: true});

        cy.get('div[class*="CheckboxFilter_checkboxFilterItem"]', {timeout: 5000}).contains('Unknown')
          .find('[type="checkbox"]').check({force: true});
        cy.clickApplyFacet();

        cy.get('body').contains('225 836').should('exist');
      });
    });
  });
});