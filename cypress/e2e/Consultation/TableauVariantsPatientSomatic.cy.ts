/// <reference types="Cypress" />
import '../../support/commands';

const presc_SOMATIC = JSON.parse(Cypress.env('presc_SOMATIC'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);

  cy.showColumn('Critères ACMG', 0);
  cy.showColumn('QP', 0);
  cy.showColumn('ALT', 0);
  cy.showColumn('ALT+REF', 0);
  cy.showColumn('ALT/(ALT+REF)', 0);
  cy.showColumn('Filtre', 0);
  cy.showColumn('Crit. Exo.', 0);
  cy.showColumn('CMC tier', 0);
});

describe('Page des variants d\'un patient (somatic) - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 2, 'chr10:g.1096268T>C');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 3, 'SNV');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 4, 'TO');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 4, 'ant-tag-blue');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 5, 'anticon');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 6, 'WDR37');
    cy.validateTableDataRowKeyAttr('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 6, 'data-icon', 'plus');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 7, 'ConsequencesCell_highImpact');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 7, 'Stop Lost p.Ter250Arg');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 8, 'AD');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 8, 'ant-tag-processing');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 9, /^B$/);
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 9, 'ant-tag-green');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 10, '-');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 11, '-');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 12, 'Lik. Benign');
    cy.validateTableDataRowKeyAttr('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 12, 'id', 'image0_1044_26488');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 13, '9.91e-1');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 13, 'GnomadCell_gnomadIndicatorDefault');
    cy.validateTableDataRowKeyContent('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 14, /^1$/);
    cy.validateTableDataRowKeyContent('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 14, '(2.31e-5)');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 15, 'hotspotOutlined');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 16, '64.73');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 17, 'Het');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 17, 'ant-tag-blue');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 18, 'BA1, BP4, BP6, PM4');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 19, '-');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 20, '321');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 21, '321');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 22, '1.00');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 23, 'PASS');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 24, '-');
    cy.validateTableDataRowKeyContent('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 25, 'Other');
    cy.validateTableDataRowKeyClass('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 25, 'ant-tag-default');
  });
 
  it('Valider les liens disponibles Lien UCSC', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('button[class*="ant-dropdown-trigger"]').click({force: true});
    cy.get('[data-menu-id*="UCSC"]').find('a[href]').invoke('removeAttr', 'target').click({force: true});
    cy.url().should('include', '1096268');
  });
 
  it('Valider les liens disponibles Lien LitVar', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('button[class*="ant-dropdown-trigger"]').click({force: true});
    cy.get('[data-menu-id*="LitVAR"]').find('a[href]').invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains('No Publications').should('exist');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').contains('chr10:g.1096268T>C').invoke('removeAttr', 'target').click({force: true});
    cy.get('[data-cy="Summary_Start"]').contains('1 096 268').should('exist');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('td').eq(5).find('a[href]').invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains(/^rs10794716$/).should('exist');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('td').eq(6).find('a[href]').invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains(/^WDR37$/).should('exist');
  });
 
  it('Valider les liens disponibles Lien Gène Plus', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('td').eq(6).find('[data-icon="plus"]').click({force: true});
    cy.validatePillSelectedQuery('Gène', ['WDR37']);
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('td').eq(8).find('a[href]').invoke('removeAttr', 'target').click({force: true});
    cy.closePopup();
    cy.get('body').contains(/^\*618586$/).should('exist');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('td').eq(9).find('a[href]').invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains(/^1185321$/).should('exist');
  });
 
  it('Valider les liens disponibles Lien ACMG', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('td').eq(12).find('a[href]').invoke('removeAttr', 'target').click({force: true});
    cy.url().should('include', '10-1096268-T-C');
  });
 
  it('Valider les liens disponibles Lien CMC', () => {
    cy.get('tr[data-row-key="bdc7b7f2fba4aef570b1ac84217fe870f14261db"]').find('td').eq(14).find('a[href]').invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains(/^ABLIM1$/).should('exist');
  });
  
  it('Valider les fonctionnalités du tableau - Tris [CLIN-2149]', () => {
    cy.sortTableAndIntercept('Variant', 3);
    cy.validateTableFirstRow('chr10:g.100063786T>C', 2);
    cy.sortTableAndIntercept('Variant', 3);
    cy.validateTableFirstRow('chrY:g.56884027T>G', 2);
    cy.sortTableAndWait('Variant');

    cy.sortTableAndIntercept('Type', 3);
    cy.validateTableFirstRow('Ind', 3);
    cy.sortTableAndIntercept('Type', 3);
    cy.validateTableFirstRow('Sub', 3);
    cy.sortTableAndWait('Type');

    cy.sortTableAndIntercept('Gène', 3);
    cy.validateTableFirstRow('-', 6);
    cy.sortTableAndIntercept('Gène', 3);
    cy.validateTableFirstRow('ZZZ3', 6);
    cy.sortTableAndWait('Gène');

    cy.sortTableAndIntercept('Exo.', 3);
    cy.validateTableFirstRow('-', 10);
    cy.sortTableAndIntercept('Exo.', 3);
    cy.validateTableFirstRow('-', 10);
    cy.sortTableAndWait('Exo.');

    cy.sortTableAndIntercept('ACMG Exo.', 3);
    cy.validateTableFirstRow('-', 11);
    cy.sortTableAndIntercept('ACMG Exo.', 3);
    cy.validateTableFirstRow('-', 11);
    cy.sortTableAndWait('ACMG Exo.');

    cy.sortTableAndIntercept('gnomAD', 3);
    cy.validateTableFirstRow('-', 13);
    cy.sortTableAndIntercept('gnomAD', 3);
    cy.validateTableFirstRow('1.00e+0', 13);
    cy.sortTableAndWait('gnomAD');

    cy.sortTableAndIntercept('CMC', 3);
    cy.validateTableFirstRow('-', 14);
    cy.sortTableAndIntercept('CMC', 3);
    cy.validateTableFirstRow('419', 14);
    cy.sortTableAndWait('CMC');

    cy.clickAndIntercept('thead[class="ant-table-thead"] [data-icon="fire"]', 'POST', '**/graphql', 3);
    cy.get('tr').eq(0).find('td').eq(12).find('[class*="hotspotOutlined"]').should('exist');
    cy.clickAndIntercept('thead[class="ant-table-thead"] [data-icon="fire"]', 'POST', '**/graphql', 3);
    cy.get('tr').eq(0).find('td').eq(12).find('[class*="hotspotFilled"]').should('exist');
    cy.clickAndIntercept('thead[class="ant-table-thead"] [data-icon="fire"]', 'POST', '**/graphql', 3);

    cy.sortTableAndIntercept('CMC tier', 3);
    cy.validateTableFirstRow('-', 25);
    cy.sortTableAndIntercept('CMC tier', 3);
    cy.validateTableFirstRow('Other', 25);
    cy.sortTableAndWait('CMC tier');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Gène', 3);
    cy.sortTableAndIntercept('Gène', 3);
    cy.sortTableAndIntercept('Variant', 3);
    cy.validateTableFirstRow('chr1:g.77580945G>A', 2);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('', 1);
  });
});
  