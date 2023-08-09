/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPage('?sharedFilterId=ed4de9bb-016e-4869-ac9d-40b11ac3102a');

  cy.showColumn('Critères ACMG', 0);
});

describe('Page des variants - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 1, 'chrX:g.123403094G>A');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 2, 'SNV');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 3, 'anticon');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 4, 'GRIA3');
    cy.validateTableDataRowKeyAttr('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 4, 'data-icon', 'plus');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 5, 'ConsequencesCell_moderateImpact');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 5, 'Missense p.Arg394Gln');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 6, 'XLR');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 6, 'ant-tag-processing');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 7, /^B$/);
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 7, /^LB$/);
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 7, 'ant-tag-green');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 7, 'ant-tag-lime');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 8, 'Benign');
    cy.validateTableDataRowKeyAttr('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 8, 'id', 'image0_1044_26488');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 9, '9.01e-4');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 9, 'GnomadCell_gnomadIndicator');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 10, /^6$/);
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 10, '4.55e-2');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 11, 'BP6, BS1, BS2, PP3');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').contains('chrX:g.123403094G>A').invoke('removeAttr', 'target').click({force: true});
    cy.get('[data-cy="Summary_Start"]').contains('123 403 094').should('exist');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(3).find('a[href]').invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains(/^rs138817389$/).should('exist');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(4).find('a[href]').invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains(/^GRIA3$/).should('exist');
  });
 
  it('Valider les liens disponibles Lien Gène Plus', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(4).find('[data-icon="plus"]').click({force: true});
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gène').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('GRIA3').should('exist');
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(6).find('a[href]').invoke('removeAttr', 'target').click({force: true});
    cy.closePopup();
    cy.get('body').contains(/^\*305915$/).should('exist');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(7).find('a[href]').eq(1).invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains(/^198752$/).should('exist');
  });
 
  it('Valider les liens disponibles Lien ACMG', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(8).find('a[href]').invoke('removeAttr', 'target').click({force: true});
    cy.url().should('include', 'X-123403094-G-A');
  });
 
  it('Valider les liens disponibles Lien RQDM', () => {
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(10).find('a[href]').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains('6 Résultats').should('exist');
  });
  
  it('Valider les fonctionnalités du tableau - Tris [CLIN-2149]', () => {
    cy.get('[id="query-builder-header-tools"]').find('[data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Variant', 3);
    cy.validateTableFirstRow('chr10:g.100018446C>T', 1);
    cy.sortTableAndIntercept('Variant', 3);
    cy.validateTableFirstRow('chrY:g.9951709_9951710dup', 1);
    cy.sortTableAndWait('Variant');

    cy.sortTableAndIntercept('Type', 3);
    cy.validateTableFirstRow('Ind', 2);
    cy.sortTableAndIntercept('Type', 3);
    cy.validateTableFirstRow('Sub', 2);
    cy.sortTableAndWait('Type');

    cy.sortTableAndIntercept('Gène', 3);
    cy.validateTableFirstRow('-', 4);
    cy.sortTableAndIntercept('Gène', 3);
    cy.validateTableFirstRow('ZZZ3', 4);
    cy.sortTableAndWait('Gène');

    cy.sortTableAndIntercept('gnomAD', 3);
    cy.validateTableFirstRow('-', 9);
    cy.sortTableAndIntercept('gnomAD', 3);
    cy.validateTableFirstRow('1.00e+0', 9);
    cy.sortTableAndWait('gnomAD');

    cy.sortTableAndIntercept('RQDM', 3);
    cy.validateTableFirstRow('-', 10);
    cy.sortTableAndIntercept('RQDM', 3);
    cy.validateTableFirstRow('1.00e+0', 10);
    cy.sortTableAndWait('RQDM');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.get('[id="query-builder-header-tools"]').find('[data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('gnomAD', 3);
    cy.sortTableAndWait('Variant');
    cy.validateTableFirstRow('chr10:g.100185334G>A', 1);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('[id="query-builder-header-tools"]').find('[data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(20000);

    cy.validatePaging('', 0);
  });
});
  