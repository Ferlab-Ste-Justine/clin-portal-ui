/// <reference types="Cypress" />
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

  cy.showColumn('M : P', 0);
  cy.showColumn('HC', 0);
  cy.showColumn('HCP', 0);
  cy.showColumn('Trans.', 0);
  cy.showColumn('QP', 0);
  cy.showColumn('OP', 0);
  cy.showColumn(/^A$/, 0);
  cy.showColumn('A+R', 0);
  cy.showColumn('A/(A+R)', 0);
  cy.showColumn('Filtre', 0);
  cy.showColumn('Crit. Exo.', 0);
  cy.showColumn(/^CMC$/, 0);
  cy.showColumn('Tier', 0);
  cy.showColumn('CADD', 0);
  cy.showColumn('REVEL', 0);
  cy.showColumn('Crit. Fra.', 0);
});

describe('Page des variants d\'un patient - Consultation du tableau', () => {  
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chr10:g.100049106G>A', 2, true);
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chrY:g.9951709_9951710del', 2, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Type [CLIN-2149]', () => {
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('Ins', 3, true);
    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('SNV', 3, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Gène', () => {
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('-', 5, true);
    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('ZZZ3', 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Fra.', () => {
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Fra.', 1);
    cy.validateTableFirstRow('-', 10, true);
    cy.sortTableAndIntercept('Fra.', 1);
    cy.validateTableFirstRow('-', 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Exo.', () => {
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Exo.', 1);
    cy.validateTableFirstRow('-', 11, true);
    cy.sortTableAndIntercept('Exo.', 1);
    cy.validateTableFirstRow('0.964', 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri ACMG F.', () => {
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('ACMG F.', 1);
    cy.validateTableFirstRow('ND', 12, true);
    cy.sortTableAndIntercept('ACMG F.', 1);
    cy.validateTableFirstRow('VUS', 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri ACMG E.', () => {
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('ACMG E.', 1);
    cy.validateTableFirstRow('ND', 13, true);
    cy.sortTableAndIntercept('ACMG E.', 1);
    cy.validateTableFirstRow('VUS', 13, true);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept(/^gnomAD $/, 1);
    cy.validateTableFirstRow('-', 14, true);
    cy.sortTableAndIntercept(/^gnomAD $/, 1);
    cy.validateTableFirstRow('1.00e+0', 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD ALT', () => {
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('-', 15, true);
    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('152 312', 15, true);
  });

  it('Valider les fonctionnalités du tableau - Tri RQDM', () => {
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('RQDM', 1);
    cy.validateTableFirstRow('0.00e+0', 16, true);
    cy.sortTableAndIntercept('RQDM', 1);
    cy.validateTableFirstRow(/(1\.00e\+0|\d{1}\.\d{2}e\-1)/, 16, true);
  });

  it('Valider les fonctionnalités du tableau - Tri QG', () => {
    cy.sortTableAndIntercept('QG', 1);
    cy.validateTableFirstRow(/^1$/, 17, true);
    cy.sortTableAndIntercept('QG', 1);
    cy.validateTableFirstRow('447', 17, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Zyg.', () => {
    cy.sortTableAndIntercept('Zyg.', 1);
    cy.validateTableFirstRow(/^1$/, 18, true);
    cy.sortTableAndIntercept('Zyg.', 1);
    cy.validateTableFirstRow('1/1', 18, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Trans.', () => {
    cy.sortTableAndIntercept('Trans.', 1);
    cy.validateTableFirstRow('-', 22, true);
    cy.sortTableAndIntercept('Trans.', 1);
    cy.validateTableFirstRow('XLR DNV', 22, true);
  });

  it('Valider les fonctionnalités du tableau - Tri QP', () => {
    cy.sortTableAndIntercept('QP', 1);
    cy.validateTableFirstRow(/^0$/, 23, true);
    cy.sortTableAndIntercept('QP', 1);
    cy.validateTableFirstRow('34.99', 23, true);
  });

  it('Valider les fonctionnalités du tableau - Tri OP', () => {
    cy.sortTableAndIntercept('OP', 1);
    cy.validateTableFirstRow('-', 24, true);
    cy.sortTableAndIntercept('OP', 1);
    cy.validateTableFirstRow('UNK', 24, true);
  });

  it('Valider les fonctionnalités du tableau - Tri A', () => {
    cy.sortTableAndIntercept(/^A$/, 1);
    cy.validateTableFirstRow(/^3$/, 25, true);
    cy.sortTableAndIntercept(/^A$/, 1);
    cy.validateTableFirstRow('458', 25, true);
  });

  it('Valider les fonctionnalités du tableau - Tri A+R', () => {
    cy.sortTableAndIntercept(/^A\+R$/, 1);
    cy.validateTableFirstRow(/^3$/, 26, true);
    cy.sortTableAndIntercept(/^A\+R$/, 1);
    cy.validateTableFirstRow('631', 26, true);
  });

  it('Valider les fonctionnalités du tableau - Tri A/(A+R)', () => {
    cy.sortTableAndIntercept('A/(A+R)', 1);
    cy.validateTableFirstRow('0.05', 27, true);
    cy.sortTableAndIntercept('A/(A+R)', 1);
    cy.validateTableFirstRow('1.00', 27, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Filtre', () => {
    cy.sortTableAndIntercept('Filtre', 1);
    cy.validateTableFirstRow('DRAGENIndelHardQUAL', 28, true);
    cy.sortTableAndIntercept('Filtre', 1);
    cy.validateTableFirstRow('PASS', 28, true);
  });

  it('Valider les fonctionnalités du tableau - Tri CMC', () => {
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('CMC', 1);
    cy.validateTableFirstRow('-', 30, true);
    cy.sortTableAndIntercept('CMC', 1);
    cy.validateTableFirstRow('419', 30, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Tier', () => {
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Tier', 1);
    cy.validateTableFirstRow('-', 31, true);
    cy.sortTableAndIntercept('Tier', 1);
    cy.validateTableFirstRow('Other', 31, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('gnomAD', 1);
    cy.sortTableAndIntercept('gnomAD', 1);
    cy.sortTableAndIntercept('Gène', 1);
    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow(/(ZNHIT1|ZNF875)/, 5, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('', 1);
  });
});
  