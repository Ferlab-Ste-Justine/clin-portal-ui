/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants - Consultation du tableau', () => {
  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=ed4de9bb-016e-4869-ac9d-40b11ac3102a');
    cy.showColumn('Tier', 0);
    cy.showColumn('Max Fra.', 0);
    cy.showColumn('Max Exo.', 0);
    cy.showColumn('CADD', 0);
    cy.showColumn('REVEL', 0);
  });
  
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 1, 'chrX:g.123403094G>A');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 2, 'SNV');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 3, 'anticon');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 4, 'GRIA3');
    cy.validateTableDataRowKeyAttr('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 4, 'data-icon', 'plus');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 5, 'ConsequencesCell_moderateImpact');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 5, 'Missense p.Arg394Gln');
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(6).find('path[d*="M16.7732"]').should('exist'); // C
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(6).find('path[d*="M8.98279"]').should('exist'); // M
    cy.get('tr[data-row-key="4577893f4d3c2463e9fdef3419f7781d00fffdf3"]').find('td').eq(6).find('path[d*="M10.9335"]').should('not.exist'); // P
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 7, 'XLR');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 7, 'ant-tag-blue');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 8, /^B$/);
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 8, /^LB$/);
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 8, 'ant-tag-green');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 8, 'ant-tag-lime');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 9, '9.01e-4');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 9, 'GnomadCell_gnomadIndicator');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 10, '101');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 11, /^6$/);
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 11, /(\d{1}.\d{2}e-2)/);
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 12, /^3$/);
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 12, '(6.93e-5)');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 13, '-');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 14, '0.9436');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 15, 'Other');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 15, 'ant-tag-default');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 16, '-');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 17, '0.964');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 18, 'ND');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 18, 'ant-tag');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 19, 'VUS');
    cy.validateTableDataRowKeyClass('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 19, 'ant-tag-orange');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 20, '-');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 21, '2.56e+1');
    cy.validateTableDataRowKeyContent('4577893f4d3c2463e9fdef3419f7781d00fffdf3', 22, '-');
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.get('[class*="QueryBar_selected"]').find('[class*="anticon-save"]').should('exist');
  });
});
  