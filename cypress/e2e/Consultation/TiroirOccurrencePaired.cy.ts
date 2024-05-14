/// <reference types="Cypress" />
import '../../support/commands';

const presc_PAIRED = JSON.parse(Cypress.env('presc_PAIRED'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);

  cy.get('body').find('div[role="tabpanel"]').find('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"]').find('td[class*="ant-table-cell-fix-left"]').eq(1).find('svg[class="anticon"]').first().click({force: true});
});

describe('Tiroir d\'une occurrence (paired)', () => {
  it('Vérifier les informations affichées', () => {
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(0).contains('chr10:g.17617338A>C').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(1).contains(presc_PAIRED.patientProbId).should('exist');

    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(0).contains('0/1').should('exist');

    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(0).contains('-').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(1).contains('9').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(2).contains('136').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(3).contains('0.07').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(4).contains('Weak Evidence').should('exist');

    cy.get('div[class*="ant-drawer-open"]').contains('Hét. composé').should('not.exist');
    cy.get('div[class*="ant-drawer-open"]').contains('Hét. composé potentiel').should('not.exist');
    cy.get('div[class*="ant-drawer-open"]').contains('Famille').should('not.exist');
    cy.get('div[class*="ant-drawer-open"]').contains('Génotype Mère').should('not.exist');
    cy.get('div[class*="ant-drawer-open"]').contains('Génotype Père').should('not.exist');
    cy.get('div[class*="ant-drawer-open"]').contains('Transmission').should('not.exist');
    cy.get('div[class*="ant-drawer-open"]').contains('Origine parentale').should('not.exist');
    cy.get('div[class*="ant-drawer-open"]').contains('Qualité du génotype').should('not.exist');
  });
});