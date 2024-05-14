/// <reference types="Cypress" />
import '../../support/commands';

const presc_SOMATIC = JSON.parse(Cypress.env('presc_SOMATIC'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);

  cy.get('body').find('div[role="tabpanel"]').find('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('td[class*="ant-table-cell-fix-left"]').eq(1).find('svg[class="anticon"]').first().click({force: true});
});

describe('Tiroir d\'une occurrence (somatic)', () => {
  it('Vérifier les informations affichées', () => {
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(0).contains('chr10:g.1096268T>C').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(1).contains(presc_SOMATIC.patientProbId).should('exist');

    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(0).contains('0/1').should('exist');

    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(0).contains('-').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(1).contains('321').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(2).contains('321').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(3).contains('1.00').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(4).contains('PASS').should('exist');

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