/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants - Filtrer avec les facettes', () => {

  beforeEach(() => {
    cy.visitVariantsPage();
  });

  it('Patient - Analyse', () => {
    cy.validateFacetFilter('patient', 'Analyse', 0, 'MYOC', /^870 60\d{1}$/);
  });

  it('Patient - Statut clinique', () => {
    cy.validateFacetFilter('patient', 'Statut clinique', 1, 'Non atteint', /^423 26\d{1}$/);
  });

  it('Patient - Sexe', () => {
    cy.validateFacetFilter('patient', 'Sexe', 2, 'Indéterminé', /^192 10\d{1}$/);
  });
});
