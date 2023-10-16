/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants - Filtrer avec les facettes', () => {

  beforeEach(() => {
    cy.visitVariantsPage();
  });

  it('Patient - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Patient');
  });

  it('Patient - Analyse', () => {
    cy.validateFacetFilter('Patient', 'Analyse', 'MYOC', 'MYOC', /^870 60\d{1}$/);
    cy.validateFacetRank(0, 'Analyse');
  });

  it('Patient - Statut clinique', () => {
    cy.validateFacetFilter('Patient', 'Statut clinique', 'Non atteint', 'not_affected', /^423 26\d{1}$/);
    cy.validateFacetRank(1, 'Statut clinique');
  });

  it('Patient - Sexe', () => {
    cy.validateFacetFilter('Patient', 'Sexe', 'Indéterminé', 'unknown', /^192 10\d{1}$/);
    cy.validateFacetRank(2, 'Sexe');
  });
});
