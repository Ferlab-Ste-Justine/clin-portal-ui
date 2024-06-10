/// <reference types="Cypress" />
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, Cypress.env('shared_filter_id'));

  cy.get('body').find('div[role="tabpanel"]').find('tr[data-row-key="9ea37b2966662962908b94b1898dc0a9ac4e9645"]').find('td[class*="ant-table-cell-fix-left"]').eq(1).find('svg[class="anticon"]').first().click({force: true});
});

describe('Tiroir d\'une occurrence', () => {
  it('Vérifier les informations affichées', () => {
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(0).contains('chr10:g.113623545C>T').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(1).contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');

    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(0).contains('0/1').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(1).contains('NRAP').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(1).contains('( 3 )').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(2).contains('NRAP').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(2).contains('( 4 )').should('exist');

    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(0).contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(0).find('path[d*=C1]').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(0).find('path[d*=V1]').should('not.exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(0).contains('0/1').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(1).contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(1).find('path[d*=V1]').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(1).find('path[d*=C1]').should('not.exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(1).contains('0/0').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(3).contains('Mother').should('exist');

    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(3).find('tr[class="ant-descriptions-row"]').eq(0).contains('0.27').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(3).find('tr[class="ant-descriptions-row"]').eq(1).contains('124').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(3).find('tr[class="ant-descriptions-row"]').eq(2).contains('246').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(3).find('tr[class="ant-descriptions-row"]').eq(3).contains('0.50').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(3).find('tr[class="ant-descriptions-row"]').eq(4).contains('48').should('exist');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(3).find('tr[class="ant-descriptions-row"]').eq(5).contains('PASS').should('exist');
  });
 
  it('Valider les liens disponibles', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(1).contains('3').click({force: true});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.contains('4 Résultats').should('exist', {timeout: 60*1000});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(2).contains('4').click({force: true});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.contains('4 Résultats').should('exist', {timeout: 60*1000});
  });
  
  it('Vérifier les informations affichées des métriques de séquençage parental', () => {
    cy.get('div[class*="ant-drawer-open"]').find('div[class*="OccurrenceDrawer_description"]').eq(2).find('tr[class="ant-descriptions-row"]').eq(0).find('button[class*="ant-btn-sm"]').click({force: true});

    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(0).contains('0.27').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(1).contains('117').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(2).contains('223').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(3).contains('0.52').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(4).contains('48').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(0).find('tr[class="ant-descriptions-row"]').eq(5).contains('PASS').should('exist');

    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(0).contains('0.27').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(1).contains('0').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(2).contains('144').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(3).contains('0.00').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(4).contains('87').should('exist');
    cy.get('div[class*="SequencingMetricModal_description"]').eq(1).find('tr[class="ant-descriptions-row"]').eq(5).contains('PASS').should('exist');
  });
});