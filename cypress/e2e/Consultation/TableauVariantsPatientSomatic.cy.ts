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
  cy.showColumn('Crit. Exo.', 0);
  cy.showColumn('CADD', 0);
  cy.showColumn('REVEL', 0);
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
    cy.get('tr[data-row-key="bdc7b7f2fba4aef570b1ac84217fe870f14261db"]').find('td').eq(8).find('path[d*="M16.7732"]').should('exist'); // C
    cy.get('tr[data-row-key="bdc7b7f2fba4aef570b1ac84217fe870f14261db"]').find('td').eq(8).find('path[d*="M8.98279"]').should('not.exist'); // M
    cy.get('tr[data-row-key="bdc7b7f2fba4aef570b1ac84217fe870f14261db"]').find('td').eq(8).find('path[d*="M10.9335"]').should('not.exist'); // P
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 9, 'AD');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 9, 'ant-tag-blue');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 10, /^B$/);
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 10, 'ant-tag-green');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 11, 'hotspotOutlined'); /////////////////
    cy.validateTableDataRowKeyContent('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 12, 'Other'); ////////////////
    cy.validateTableDataRowKeyClass('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 12, 'ant-tag-default');
    cy.validateTableDataRowKeyContent('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 13, /^1$/); ////////////////////
    cy.validateTableDataRowKeyContent('bdc7b7f2fba4aef570b1ac84217fe870f14261db', 13, '(2.31e-5)');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 14, '9.91e-1'); ////////////////
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 14, 'GnomadCell_gnomadIndicatorDefault');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 15, '150 926');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 16, /^128$/);
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 16, /(\d{1}.\d{2}e(-|\+)\d{1})/);
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 17, '64.73');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 18, 'Het');
    cy.validateTableDataRowKeyClass('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 18, 'ant-tag-blue');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 19, '-');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 20, '321');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 21, '321');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 22, '1.00');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 23, 'PASS');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 24, '-');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 25, '4.00e+0');
    cy.validateTableDataRowKeyContent('02fcc26c193333c0ed9f89fdfe6a3f79c5527af3', 26, '-');
  });
 
  it('Valider les liens disponibles Lien UCSC', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('button[class*="ant-dropdown-trigger"]').click({force: true});
    cy.get('[data-menu-id*="UCSC"]').find('a[href]')
      .should('have.attr', 'href', 'https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chr10%3A1096268-1096269');
  });
 
  it('Valider les liens disponibles Lien LitVar', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('button[class*="ant-dropdown-trigger"]').click({force: true});
    cy.get('[data-menu-id*="LitVAR"]').find('a[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/research/litvar2/docsum?text=rs10794716');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').contains('chr10:g.1096268T>C').invoke('removeAttr', 'target').click({force: true});
    cy.get('[data-cy="Summary_Start"]').contains('1 096 268').should('exist');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('td').eq(5).find('a[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs10794716');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('td').eq(6).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/618586');
  });
 
  it('Valider les liens disponibles Lien Gène Plus', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('td').eq(6).find('[data-icon="plus"]').click({force: true});
    cy.validatePillSelectedQuery('Gène', ['WDR37']);
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('td').eq(9).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/618586');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('td').eq(10).find('a[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/1185321');
  });
 
  it('Valider les liens disponibles Lien CMC', () => {
    cy.get('tr[data-row-key="bdc7b7f2fba4aef570b1ac84217fe870f14261db"]').find('td').eq(13).find('a[href]')
      .should('have.attr', 'href', 'https://cancer.sanger.ac.uk/cosmic/mutation/overview?id=23814818&genome=37');
  });
 
  it('Valider les liens disponibles Lien RQDM', () => {
    cy.get('tr[data-row-key="02fcc26c193333c0ed9f89fdfe6a3f79c5527af3"]').find('td').eq(16).find('a[href]').click({force: true});
    cy.validateTableResultsCount(/^130$/);
  });
  
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
    cy.validateTableFirstRow('1.00e+0', 16);
  });

  it('Valider les fonctionnalités du tableau - Tri QS', () => {
    cy.sortTableAndIntercept('QS', 1);
    cy.validateTableFirstRow(/^0$/, 17);
    cy.sortTableAndIntercept('QS', 1);
    cy.validateTableFirstRow('81.99', 17);
  });

  it('Valider les fonctionnalités du tableau - Tri Zyg.', () => {
    cy.sortTableAndIntercept('Zyg.', 1);
    cy.validateTableFirstRow('Het', 18);
    cy.sortTableAndIntercept('Zyg.', 1);
    cy.validateTableFirstRow('Het', 18);
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
