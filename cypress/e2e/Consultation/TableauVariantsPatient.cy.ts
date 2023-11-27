/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
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
});

describe('Page des variants d\'un patient - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 2, 'chrX:g.123403094G>A');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 3, 'SNV');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 4, 'anticon');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 5, 'GRIA3');
    cy.validateTableDataRowKeyAttr('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 5, 'data-icon', 'plus');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 6, 'ConsequencesCell_moderateImpact');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 6, 'Missense p.Arg394Gln');
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(7).find('path[d*="M16.7732"]').should('exist'); // C
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(7).find('path[d*="M8.98279"]').should('exist'); // M
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(7).find('path[d*="M10.9335"]').should('not.exist'); // P
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 8, 'XLR');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 8, 'ant-tag-processing');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 9, /^B$/);
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 9, /^LB$/);
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 9, 'ant-tag-green');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 9, 'ant-tag-lime');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 10, '0.9641');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 11, 'VUS');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 11, 'ant-tag-orange');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 12, '9.01e-4');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 12, 'GnomadCell_gnomadIndicator');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 13, '101');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 14, /^6$/);
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 14, /(4.\d{2}e-2)/);
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 15, '170');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 15, 'GQLine_high');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 16, 'Hem');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 16, 'ant-tag-blue');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 17, '0/1 : 0');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 18, '-');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 19, '-');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 20, 'XLR');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 21, '0.97');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 22, 'M');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 22, 'ant-tag-blue');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 23, '84');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 24, '84');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 25, '1.00');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 26, 'PASS');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 27, 'PP4, BP6_Strong');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 28, /^3$/);
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 28, '(6.93e-5)');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 29, 'Other');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 29, 'ant-tag-default');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 30, '2.56e+1');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 31, '-');
  });
 
  it('Valider les liens disponibles Lien UCSC', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('button[class*="ant-dropdown-trigger"]').click({force: true});
    cy.get('[data-menu-id*="UCSC"]').find('a[href]')
      .should('have.attr', 'href', 'https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chrX%3A123403094-123403095');
  });
 
  it('Valider les liens disponibles Lien LitVar', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('button[class*="ant-dropdown-trigger"]').click({force: true});
    cy.get('[data-menu-id*="LitVAR"]').find('a[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/research/litvar2/docsum?text=rs138817389');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').contains('chrX:g.123403094G>A').invoke('removeAttr', 'target').click({force: true});
    cy.get('[data-cy="Summary_Start"]').contains('123 403 094').should('exist');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(4).find('a[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs138817389');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(5).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/305915');
  });
 
  it('Valider les liens disponibles Lien Gène Plus', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(5).find('[data-icon="plus"]').click({force: true});
    cy.validatePillSelectedQuery('Gène', ['GRIA3']);
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(8).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/305915');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(9).find('a[href]').eq(1)
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/198752');
  });
 
  it('Valider les liens disponibles Lien RQDM', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(14).find('a[href]').click({force: true});
    cy.validateTableResultsCount('6 Résultats');
  });
 
  it('Valider les liens disponibles Lien CMC', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(28).find('a[href]')
      .should('have.attr', 'href', 'https://cancer.sanger.ac.uk/cosmic/mutation/overview?id=21242198&genome=37');
  });
  
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.get('[id="query-builder-header-tools"]').find('[data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chr10:g.100049106G>A', 2);
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chrY:g.9951709_9951710del', 2);
  });

  it('Valider les fonctionnalités du tableau - Tri Type [CLIN-2149]', () => {
    cy.get('[id="query-builder-header-tools"]').find('[data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('Ins', 3);
    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('SNV', 3);
  });

  it('Valider les fonctionnalités du tableau - Tri Gène', () => {
    cy.get('[id="query-builder-header-tools"]').find('[data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('-', 5);
    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('ZZZ3', 5);
  });

  it('Valider les fonctionnalités du tableau - Tri Exo.', () => {
    cy.get('[id="query-builder-header-tools"]').find('[data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Exo.', 1);
    cy.validateTableFirstRow('-', 10);
    cy.sortTableAndIntercept('Exo.', 1);
    cy.validateTableFirstRow('0.9641', 10);
  });

  it('Valider les fonctionnalités du tableau - Tri ACMG E.', () => {
    cy.get('[id="query-builder-header-tools"]').find('[data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('ACMG E.', 1);
    cy.validateTableFirstRow('-', 11);
    cy.sortTableAndIntercept('ACMG E.', 1);
    cy.validateTableFirstRow('VUS', 11);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    cy.get('[id="query-builder-header-tools"]').find('[data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept(/^gnomAD $/, 1);
    cy.validateTableFirstRow('-', 12);
    cy.sortTableAndIntercept(/^gnomAD $/, 1);
    cy.validateTableFirstRow('1.00e+0', 12);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD ALT', () => {
    cy.get('[id="query-builder-header-tools"]').find('[data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('-', 13);
    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('152 312', 13);
  });

  it('Valider les fonctionnalités du tableau - Tri RQDM', () => {
    cy.get('[id="query-builder-header-tools"]').find('[data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('RQDM', 1);
    cy.validateTableFirstRow('0.00e+0', 14);
    cy.sortTableAndIntercept('RQDM', 1);
    cy.validateTableFirstRow('1.00e+0', 14);
  });

  it('Valider les fonctionnalités du tableau - Tri QG', () => {
    cy.sortTableAndIntercept('QG', 1);
    cy.validateTableFirstRow(/^1$/, 15);
    cy.sortTableAndIntercept('QG', 1);
    cy.validateTableFirstRow('447', 15);
  });

  it('Valider les fonctionnalités du tableau - Tri Zyg.', () => {
    cy.sortTableAndIntercept('Zyg.', 1);
    cy.validateTableFirstRow('Hem', 16);
    cy.sortTableAndIntercept('Zyg.', 1);
    cy.validateTableFirstRow('Hom', 16);
  });

  it('Valider les fonctionnalités du tableau - Tri Trans.', () => {
    cy.sortTableAndIntercept('Trans.', 1);
    cy.validateTableFirstRow('-', 20);
    cy.sortTableAndIntercept('Trans.', 1);
    cy.validateTableFirstRow('XLR DNV', 20);
  });

  it('Valider les fonctionnalités du tableau - Tri QP', () => {
    cy.sortTableAndIntercept('QP', 1);
    cy.validateTableFirstRow(/^0$/, 21);
    cy.sortTableAndIntercept('QP', 1);
    cy.validateTableFirstRow('34.99', 21);
  });

  it('Valider les fonctionnalités du tableau - Tri OP', () => {
    cy.sortTableAndIntercept('OP', 1);
    cy.validateTableFirstRow('-', 22);
    cy.sortTableAndIntercept('OP', 1);
    cy.validateTableFirstRow('UNK', 22);
  });

  it('Valider les fonctionnalités du tableau - Tri A', () => {
    cy.sortTableAndIntercept(/^A$/, 1);
    cy.validateTableFirstRow(/^3$/, 23);
    cy.sortTableAndIntercept(/^A$/, 1);
    cy.validateTableFirstRow('458', 23);
  });

  it('Valider les fonctionnalités du tableau - Tri A+R', () => {
    cy.sortTableAndIntercept(/^A\+R$/, 1);
    cy.validateTableFirstRow(/^3$/, 24);
    cy.sortTableAndIntercept(/^A\+R$/, 1);
    cy.validateTableFirstRow('631', 24);
  });

  it('Valider les fonctionnalités du tableau - Tri A/(A+R)', () => {
    cy.sortTableAndIntercept('A/(A+R)', 1);
    cy.validateTableFirstRow('0.05', 25);
    cy.sortTableAndIntercept('A/(A+R)', 1);
    cy.validateTableFirstRow('1.00', 25);
  });

  it('Valider les fonctionnalités du tableau - Tri Filtre', () => {
    cy.sortTableAndIntercept('Filtre', 1);
    cy.validateTableFirstRow('DRAGENIndelHardQUAL', 26);
    cy.sortTableAndIntercept('Filtre', 1);
    cy.validateTableFirstRow('PASS', 26);
  });

  it('Valider les fonctionnalités du tableau - Tri CMC', () => {
    cy.get('[id="query-builder-header-tools"]').find('[data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('CMC', 1);
    cy.validateTableFirstRow('-', 28);
    cy.sortTableAndIntercept('CMC', 1);
    cy.validateTableFirstRow('419', 28);
  });

  it('Valider les fonctionnalités du tableau - Tri Tier', () => {
    cy.get('[id="query-builder-header-tools"]').find('[data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Tier', 1);
    cy.validateTableFirstRow('-', 29);
    cy.sortTableAndIntercept('Tier', 1);
    cy.validateTableFirstRow('Other', 29);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.get('[id="query-builder-header-tools"]').find('[data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('gnomAD', 1);
    cy.sortTableAndIntercept('gnomAD', 1);
    cy.sortTableAndIntercept('Gène', 1);
    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow(/(ZNHIT1|ZNF875)/, 5);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('', 1);
  });
});
  