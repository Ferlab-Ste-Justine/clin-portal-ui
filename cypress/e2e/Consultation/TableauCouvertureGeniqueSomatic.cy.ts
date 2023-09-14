/// <reference types="Cypress" />
import '../../support/commands';

const presc_SOMATIC = JSON.parse(Cypress.env('presc_SOMATIC'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCQPatientPage(presc_SOMATIC.prescriptionId);
  cy.get('[data-cy="RadioButton_CouvertureGenique"]').click({force: true});
  cy.resetColumns(0);
});

describe('Page de la couverture génique d\'un patient (somatic) - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.get('tr[data-row-key]').eq(6).find('td').eq(2).contains('RPL41').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(3).contains(/^69$/).should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(4).contains('86.14').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(5).contains('44.93%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(6).contains('44.93%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(7).contains('44.93%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(8).contains('44.93%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(9).contains('43.48%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(10).contains('14.49%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(11).contains('14.49%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(12).contains('< 1%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(13).contains('< 1%').should('exist');

    cy.get('[data-cy="AverageCoverage"]').contains('442.02').should('exist');
  });
});
