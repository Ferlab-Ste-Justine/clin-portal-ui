/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants - Consultation du tableau', () => {
  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=0592969c-f83a-413a-b65d-578ab9d751fc');
    cy.showColumn('Tier', 0);
    cy.showColumn('Max Fra.', 0);
    cy.showColumn('Max Exo.', 0);
    cy.showColumn('CADD', 0);
    cy.showColumn('REVEL', 0);
  });
  
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chr10:g.100018446C>T', 1);
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chrY:g.9951709_9951710dup', 1);
  });

  it('Valider les fonctionnalités du tableau - Tri Type [CLIN-2149]', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('Ind', 2);
    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('Sub', 2);
  });

  it('Valider les fonctionnalités du tableau - Tri Gène [CLIN-2149,CLIN-2287]', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('-', 4);
    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('ZZZ3', 4);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept(/^gnomAD $/, 1);
    cy.validateTableFirstRow('-', 9);
    cy.sortTableAndIntercept(/^gnomAD $/, 1);
    cy.validateTableFirstRow('1.00e+0', 9);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD ALT', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('-', 10);
    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('152 312', 10);
  });

  it('Valider les fonctionnalités du tableau - Tri RQDM', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('RQDM', 1);
    cy.validateTableFirstRow('0.00e+0', 11);
    cy.sortTableAndIntercept('RQDM', 1);
    cy.validateTableFirstRow(/(1\.00e\+0|9\.\d{2}e\-1)/, 11);
  });

  it('Valider les fonctionnalités du tableau - Tri CMC', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('CMC', 1);
    cy.validateTableFirstRow('-', 12);
    cy.sortTableAndIntercept('CMC', 1);
    cy.validateTableFirstRow('419', 12);
  });

  it('Valider les fonctionnalités du tableau - Tri Hotspot', () => {
    cy.waitWhileSpin(2000);

    cy.clickAndIntercept('thead[class="ant-table-thead"] [data-icon="fire"]', 'POST', '**/graphql', 1);
    cy.wait(1000);
    cy.validateTableFirstRow('-', 13);
    cy.clickAndIntercept('thead[class="ant-table-thead"] [data-icon="fire"]', 'POST', '**/graphql', 1);
    cy.wait(1000);
    cy.get('[class*="ant-table-row"]').eq(0).find('td').eq(13).find('[class*="hotspotFilled"]').should('exist');
  });

  it('Valider les fonctionnalités du tableau - Tri Exo. (var)', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Exo. (var)', 1);
    cy.validateTableFirstRow('-', 14);
    cy.sortTableAndIntercept('Exo. (var)', 1);
    cy.validateTableFirstRow('0.9992', 14);
  });

  it('Valider les fonctionnalités du tableau - Tri Tier', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Tier', 1);
    cy.validateTableFirstRow('-', 15);
    cy.sortTableAndIntercept('Tier', 1);
    cy.validateTableFirstRow('Other', 15);
  });

  it('Valider les fonctionnalités du tableau - Tri Max Exo.', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Max Exo.', 1);
    cy.validateTableFirstRow('-', 17);
    cy.sortTableAndIntercept('Max Exo.', 1);
    cy.validateTableFirstRow('0.964', 17);
  });

  it('Valider les fonctionnalités du tableau - Tri ACMG F.', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('ACMG F.', 1);
    cy.validateTableFirstRow('-', 18);
    cy.sortTableAndIntercept('ACMG F.', 1);
    cy.validateTableFirstRow('VUS', 18);
  });

  it('Valider les fonctionnalités du tableau - Tri ACMG E.', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('ACMG E.', 1);
    cy.validateTableFirstRow('-', 19);
    cy.sortTableAndIntercept('ACMG E.', 1);
    cy.validateTableFirstRow('VUS', 19);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('gnomAD', 1);
    cy.sortTableAndWait('Variant');
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chrY:g.9906510G>C', 1);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.waitWhileSpin(20000);

    cy.validatePaging('', 0);
  });
});
  