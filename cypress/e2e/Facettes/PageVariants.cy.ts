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
    cy.validateFacetFilter('Patient', 'Statut clinique', 'Non atteint', 'not_affected', /^423 \d{3}$/);
    cy.validateFacetRank(1, 'Statut clinique');
  });

  it('Patient - Sexe', () => {
    cy.validateFacetFilter('Patient', 'Sexe', 'Indéterminé', 'unknown', /^192 10\d{1}$/);
    cy.validateFacetRank(2, 'Sexe');
  });

  it('Pathogénicité - Score Exomiser (max)', () => {
    cy.validateFacetNumFilter('Pathogénicité', 'Score Exomiser (max)', '0.01', '1 298 759');
    cy.validateFacetRank(1, 'Score Exomiser (max)');
  });

  it('Pathogénicité - ACMG de Exomiser (max)', () => {
    cy.validateFacetFilter('Pathogénicité', 'ACMG de Exomiser (max)', 'Uncertain Significance', 'UNCERTAIN_SIGNIFICANCE', /^15$/);
    cy.validateFacetRank(2, 'ACMG de Exomiser (max)');
  });

  it('Pathogénicité - Critères ACMG de Exomiser (max)', () => {
    cy.validateFacetFilter('Pathogénicité', 'Critères ACMG de Exomiser (max)', 'PP4', 'PP4', /^5$/);
    cy.validateFacetRank(3, 'Critères ACMG de Exomiser (max)');
  });

  it('Pathogénicité - Score Franklin (max)', () => {
    cy.validateFacetNumFilter('Pathogénicité', 'Score Franklin (max)', '0.01', /^1 298 772$/);
    cy.validateFacetRank(6, 'Score Franklin (max)');
  });

  it('Requêtes - Pilule personnalisée', () => {
    cy.get(`[data-cy="SidebarMenuItem_Requêtes"]`).click({force: true});

    cy.intercept('POST', '**/graphql').as('getRouteMatcher');
    cy.get('[class*="QueriesSidebar_queryPill"]').contains('Cypress').click({force: true});
    cy.wait('@getRouteMatcher', {timeout: 20*1000});

    cy.get('[class*="QueryPill_selected"]').should('have.css', 'background-color', 'rgb(35, 164, 215)');

    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_title"]').contains('Cypress').should('exist');
    cy.get('body').contains('1 082 073').should('exist');
  });
});
