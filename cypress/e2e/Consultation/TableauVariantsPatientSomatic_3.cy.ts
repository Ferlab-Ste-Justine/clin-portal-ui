/// <reference types="Cypress" />
import '../../support/commands';

const presc_SOMATIC = JSON.parse(Cypress.env('presc_SOMATIC'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);

  cy.showColumn('gnomAD ALT', 0);
  cy.showColumn('QP', 0);
  cy.showColumn(/^A$/, 0);
  cy.showColumn('A+R', 0);
  cy.showColumn('A/(A+R)', 0);
  cy.showColumn('Filtre', 0);
  cy.showColumn('CADD', 0);
  cy.showColumn('REVEL', 0);
});

describe('Page des variants d\'un patient (somatic) - Consultation du tableau', () => {  
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chr10:g.100063786T>C', 2);
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chrY:g.56884027T>G', 2);
  });

  it('Valider les fonctionnalités du tableau - Tri Type [CLIN-2149]', () => {
    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('Ind', 3);
    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('Sub', 3);
  });

  it('Valider les fonctionnalités du tableau - Tri Gène', () => {
    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('-', 6);
    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('ZZZ3', 6);
  });

  it('Valider les fonctionnalités du tableau - Tri Hotspot', () => {
    cy.clickAndIntercept('thead[class="ant-table-thead"] [data-icon="fire"]', 'POST', '**/graphql', 1);
    cy.wait(1000);
    cy.get('[class*="ant-table-row"]').eq(0).find('td').eq(11).find('[class*="hotspotOutlined"]').should('exist');
    cy.clickAndIntercept('thead[class="ant-table-thead"] [data-icon="fire"]', 'POST', '**/graphql', 1);
    cy.wait(1000);
    cy.get('[class*="ant-table-row"]').eq(0).find('td').eq(11).find('[class*="hotspotFilled"]').should('exist');
  });

  it('Valider les fonctionnalités du tableau - Tri Tier', () => {
    cy.sortTableAndIntercept('Tier', 1);
    cy.validateTableFirstRow('-', 12);
    cy.sortTableAndIntercept('Tier', 1);
    cy.validateTableFirstRow('Other', 12);
  });

  it('Valider les fonctionnalités du tableau - Tri CMC', () => {
    cy.sortTableAndIntercept('CMC', 1);
    cy.validateTableFirstRow('-', 13);
    cy.sortTableAndIntercept('CMC', 1);
    cy.validateTableFirstRow('419', 13);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    cy.sortTableAndIntercept(/^gnomAD $/, 1);
    cy.validateTableFirstRow('-', 14);
    cy.sortTableAndIntercept(/^gnomAD $/, 1);
    cy.validateTableFirstRow('1.00e+0', 14);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD ALT', () => {
    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('-', 15);
    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('152 312', 15);
  });

  it('Valider les fonctionnalités du tableau - Tri RQDM', () => {
    cy.sortTableAndIntercept('RQDM', 1);
    cy.validateTableFirstRow('0.00e+0', 16);
    cy.sortTableAndIntercept('RQDM', 1);
    cy.validateTableFirstRow(/(1\.00e\+0|\d{1}\.\d{2}e\-1)/, 16);
  });

  it('Valider les fonctionnalités du tableau - Tri QS', () => {
    cy.sortTableAndIntercept('QS', 1);
    cy.validateTableFirstRow(/^0$/, 17);
    cy.sortTableAndIntercept('QS', 1);
    cy.validateTableFirstRow('81.99', 17);
  });

  it('Valider les fonctionnalités du tableau - Tri Zyg.', () => {
    cy.sortTableAndIntercept('Zyg.', 1);
    cy.validateTableFirstRow('0/1', 18);
    cy.sortTableAndIntercept('Zyg.', 1);
    cy.validateTableFirstRow('0/1', 18);
  });

  it('Valider les fonctionnalités du tableau - Tri QP', () => {
    cy.sortTableAndIntercept('QP', 1);
    cy.validateTableFirstRow('-', 19);
    cy.sortTableAndIntercept('QP', 1);
    cy.validateTableFirstRow('-', 19);
  });

  it('Valider les fonctionnalités du tableau - Tri A', () => {
    cy.sortTableAndIntercept(/^A$/, 1);
    cy.validateTableFirstRow(/^3$/, 20);
    cy.sortTableAndIntercept(/^A$/, 1);
    cy.validateTableFirstRow('1489', 20);
  });

  it('Valider les fonctionnalités du tableau - Tri A+R', () => {
    cy.sortTableAndIntercept(/^A\+R$/, 1);
    cy.validateTableFirstRow(/^3$/, 21);
    cy.sortTableAndIntercept(/^A\+R$/, 1);
    cy.validateTableFirstRow('2553', 21);
  });

  it('Valider les fonctionnalités du tableau - Tri A/(A+R)', () => {
    cy.sortTableAndIntercept('A/(A+R)', 1);
    cy.validateTableFirstRow('0.01', 22);
    cy.sortTableAndIntercept('A/(A+R)', 1);
    cy.validateTableFirstRow('1.00', 22);
  });

  it('Valider les fonctionnalités du tableau - Tri Filtre', () => {
    cy.sortTableAndIntercept('Filtre', 1);
    cy.validateTableFirstRow('PASS', 23);
    cy.sortTableAndIntercept('Filtre', 1);
    cy.validateTableFirstRow('Weak Evidence', 23);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Gène', 1);
    cy.sortTableAndIntercept('Gène', 1);
    cy.sortTableAndWait('Variant');
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chr1:g.77633035C>T', 2);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('', 1);
  });
});
