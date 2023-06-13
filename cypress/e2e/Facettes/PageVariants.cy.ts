/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants - Filtrer avec les facettes', () => {

  beforeEach(() => {
    cy.visitVariantsPage();
  });

  it('Patient - Analyse', () => {
    cy.get('li[data-key="patient"]').click({force: true});
    cy.get('span[class*="FilterContainer_title"]', {timeout: 5000}).contains('Analyse').click({force: true});

    cy.get('div[class*="CheckboxFilter_checkboxFilterItem"]', {timeout: 5000}).contains('MYOC')
      .find('[type="checkbox"]').check({force: true});
    cy.clickApplyFacet();

    cy.get('[class*="QueryPill_field"]').contains('Analyse').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('MYOC').should('exist');
    cy.get('body').contains(/^870 60\d{1}$/).should('exist');
  });

  it('Patient - Statut clinique', () => {
    cy.get('li[data-key="patient"]').click({force: true});
    cy.get('span[class*="FilterContainer_title"]', {timeout: 5000}).contains('Statut clinique').click({force: true});

    cy.get('div[class*="CheckboxFilter_checkboxFilterItem"]', {timeout: 5000}).contains('Non atteint')
      .find('[type="checkbox"]').check({force: true});
    cy.clickApplyFacet();

    cy.get('[class*="QueryPill_field"]').contains('Statut clinique').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('Non atteint').should('exist');
    cy.get('body').contains(/^423 26\d{1}$/).should('exist');
  });

  it('Patient - Sexe', () => {
    cy.get('li[data-key="patient"]').click({force: true});
    cy.get('span[class*="FilterContainer_title"]', {timeout: 5000}).contains('Sexe').click({force: true});

    cy.get('div[class*="CheckboxFilter_checkboxFilterItem"]', {timeout: 5000}).contains('Indéterminé')
      .find('[type="checkbox"]').check({force: true});
    cy.clickApplyFacet();

    cy.get('[class*="QueryPill_field"]').contains('Sexe').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('Indéterminé').should('exist');
    cy.get('body').contains(/^192 10\d{1}$/).should('exist');
  });
});
