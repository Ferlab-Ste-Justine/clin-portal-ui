/// <reference types="Cypress" />
import '../../support/commands';

const presc_PAIRED = JSON.parse(Cypress.env('presc_PAIRED'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId.TEBA, 3);

  cy.showColumn('gnomAD ALT', 0);
  cy.showColumn('QP', 0);
  cy.showColumn(/^A$/, 0);
  cy.showColumn('A+R', 0);
  cy.showColumn('A/(A+R)', 0);
  cy.showColumn('Filtre', 0);
  cy.showColumn('CADD', 0);
  cy.showColumn('REVEL', 0);
});

describe('Page des variants d\'un patient (paired) - Consultation du tableau', () => {  
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chr10:g.100298459del', 2, true);
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chrY:g.9908200A>C', 2, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Type [CLIN-2149]', () => {
    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('Del', 3, true);
    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('SNV', 3, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Gène', () => {
    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('-', 6, true);
    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('ZYX', 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Hotspot', () => {
    cy.clickAndIntercept('thead[class="ant-table-thead"] [data-icon="fire"]', 'POST', '**/graphql', 1);
    cy.wait(1000);
    cy.get('[class*="ant-table-row"]').eq(0).find('td').eq(11).find('[class*="hotspotOutlined"]').should('exist');
    cy.get('[class*="ant-table-row"]').eq(0).find('[type="checkbox"]').check({force: true});
    cy.get('[class*="ant-table-row"]').eq(0).find('[type="checkbox"]').should('be.checked');
    cy.get('[class*="ant-table-row"]').eq(0).find('[type="checkbox"]').uncheck({force: true});
    cy.clickAndIntercept('thead[class="ant-table-thead"] [data-icon="fire"]', 'POST', '**/graphql', 1);
    cy.wait(1000);
    cy.get('[class*="ant-table-row"]').eq(0).find('td').eq(11).find('[class*="hotspotFilled"]').should('exist');
    cy.get('[class*="ant-table-row"]').eq(0).find('[type="checkbox"]').check({force: true});
    cy.get('[class*="ant-table-row"]').eq(0).find('[type="checkbox"]').should('be.checked');
  });

  it('Valider les fonctionnalités du tableau - Tri Tier', () => {
    cy.sortTableAndIntercept('Tier', 1);
    cy.validateTableFirstRow('-', 12, true);
    cy.sortTableAndIntercept('Tier', 1);
    cy.validateTableFirstRow('Other', 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri CMC', () => {
    cy.sortTableAndIntercept('CMC', 1);
    cy.validateTableFirstRow('-', 13, true);
    cy.sortTableAndIntercept('CMC', 1);
    cy.validateTableFirstRow('29938', 13, true);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    cy.sortTableAndIntercept(/^gnomAD $/, 1);
    cy.validateTableFirstRow('-', 14, true);
    cy.sortTableAndIntercept(/^gnomAD $/, 1);
    cy.validateTableFirstRow('1.00e+0', 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD ALT', () => {
    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('-', 15, true);
    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('145 318', 15, true);
  });

  it('Valider les fonctionnalités du tableau - Tri RQDM', () => {
    cy.sortTableAndIntercept('RQDM', 1);
    cy.validateTableFirstRow('0.00e+0', 16, true);
    cy.sortTableAndIntercept('RQDM', 1);
    cy.validateTableFirstRow(/4\.\d{2}e\-1/, 16, true);
  });

  it('Valider les fonctionnalités du tableau - Tri QS', () => {
    cy.sortTableAndIntercept('QS', 1);
    cy.validateTableFirstRow(/^0$/, 17, true);
    cy.sortTableAndIntercept('QS', 1);
    cy.validateTableFirstRow('391', 17, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Zyg.', () => {
    cy.sortTableAndIntercept('Zyg.', 1);
    cy.validateTableFirstRow('0/1', 18, true);
    cy.sortTableAndIntercept('Zyg.', 1);
    cy.validateTableFirstRow('0/1', 18, true);
  });

  it('Valider les fonctionnalités du tableau - Tri QP', () => {
    cy.sortTableAndIntercept('QP', 1);
    cy.validateTableFirstRow('-', 19, true);
    cy.sortTableAndIntercept('QP', 1);
    cy.validateTableFirstRow('-', 19, true);
  });

  it('Valider les fonctionnalités du tableau - Tri A', () => {
    cy.sortTableAndIntercept(/^A$/, 1);
    cy.validateTableFirstRow(/^3$/, 20, true);
    cy.sortTableAndIntercept(/^A$/, 1);
    cy.validateTableFirstRow('186', 20, true);
  });

  it('Valider les fonctionnalités du tableau - Tri A+R', () => {
    cy.sortTableAndIntercept(/^A\+R$/, 1);
    cy.validateTableFirstRow(/^3$/, 21, true);
    cy.sortTableAndIntercept(/^A\+R$/, 1);
    cy.validateTableFirstRow('1125', 21, true);
  });

  it('Valider les fonctionnalités du tableau - Tri A/(A+R)', () => {
    cy.sortTableAndIntercept('A/(A+R)', 1);
    cy.validateTableFirstRow('0.01', 22, true);
    cy.sortTableAndIntercept('A/(A+R)', 1);
    cy.validateTableFirstRow('1.00', 22, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Filtre', () => {
    cy.sortTableAndIntercept('Filtre', 1);
    cy.validateTableFirstRow('PASS', 23, true);
    cy.sortTableAndIntercept('Filtre', 1);
    cy.validateTableFirstRow('Weak Evidence', 23, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Gène', 1);
    cy.sortTableAndWait('Variant');
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chrY:g.56712379G>A', 2, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('', 1);
  });
});
