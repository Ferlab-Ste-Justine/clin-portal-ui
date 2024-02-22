/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des CNVs d\'un patient - Filtrer avec les facettes', () => {

  beforeEach(() => {
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  });

  it('Panel RQDM - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Panel RQDM');
  });

  it('Recherche par gène - CFHR1', () => {
    cy.get(`[data-cy="SidebarMenuItem_Gène"]`).click({force: true});
    cy.get('[class*="SearchLabel_title"]').contains('Recherche par gène').should('exist'); //data-cy="SearchLabel_Title"

    cy.get('[class*="SearchLabel_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true}); //data-cy="SearchLabel_InfoCircleOutlined"
    cy.get('body').contains('Recherche par symbole, alias et Ensembl ID').should('exist');

    cy.intercept('GET', '**/CFHR1').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(0).find('input').type('CFHR1', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.wait('@getRouteMatcher', {timeout: 60*1000});

    cy.get('[class*="ant-select-dropdown"]').contains('CFHR1').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="ant-tag"]').contains('CFHR1').should('exist'); //data-cy="Tag_CFHR1"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gène').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('CFHR1').should('exist');
    cy.validateTableResultsCount(/^1$/);

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[class*="ant-select-show-search"] [class="ant-tag"]').should('not.exist'); //data-cy="Tag_CFHR1"
  });

  it('Recherche par gène - FHR1', () => {
    cy.get(`[data-cy="SidebarMenuItem_Gène"]`).click({force: true});

    cy.intercept('GET', '**/FHR1').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(0).find('input').type('FHR1', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.wait('@getRouteMatcher', {timeout: 60*1000});

    cy.get('[class*="ant-select-dropdown"]').contains('CFHR1').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="ant-tag"]').contains('CFHR1').should('exist'); //data-cy="Tag_CFHR1"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gène').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('CFHR1').should('exist');
    cy.validateTableResultsCount(/^1$/);
  });

  it('Recherche par gène - ENSG00000244414', () => {
    cy.get(`[data-cy="SidebarMenuItem_Gène"]`).click({force: true});

    cy.intercept('GET', '**/ENSG00000244414').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(0).find('input').type('ENSG00000244414', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.wait('@getRouteMatcher', {timeout: 60*1000});

    cy.get('[class*="ant-select-dropdown"]').contains('CFHR1').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="ant-tag"]').contains('CFHR1').should('exist'); //data-cy="Tag_CFHR1"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gène').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('CFHR1').should('exist');
    cy.validateTableResultsCount(/^1$/);
  });

  it('Panel RQDM - Panel RQDM', () => {
    cy.validateFacetFilter('Panel RQDM', 'Panel RQDM', 'POLYM', 'POLYM', /^26$/);
    cy.validateFacetRank(0, 'Panel RQDM');
  });

  it('Variant - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Variant');
  });

  it('Variant - Type de variant', () => {
    cy.validateFacetFilter('Variant', 'Type de variant', 'GAIN', 'GAIN', /^121$/);
    cy.validateFacetRank(0, 'Type de variant');
  });

  it('Variant - Longueur du CNV', () => {
    cy.validateFacetNumFilter('Variant', 'Longueur du CNV', '5', /^2$/);
    cy.validateFacetRank(1, 'Longueur du CNV');
  });

  it('Variant - Chromosome', () => {
    cy.validateFacetFilter('Variant', 'Chromosome', '15', '15', /^16$/);
    cy.validateFacetRank(2, 'Chromosome');
  });

  it('Variant - Début du CNV', () => {
    cy.validateFacetNumFilter('Variant', 'Début du CNV', '100000', /^2$/);
    cy.validateFacetRank(3, 'Début du CNV');
  });

  it('Variant - Fin du CNV', () => {
    cy.validateFacetNumFilter('Variant', 'Fin du CNV', '100000', /^2$/);
    cy.validateFacetRank(4, 'Fin du CNV');
  });

  it('Gène - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Gène', true);
  });

  it('Gène - Panel RQDM', () => {
    cy.validateFacetFilter('Gène', 'Panel RQDM', 'POLYM', 'POLYM', /^26$/);
    cy.validateFacetRank(0, 'Panel RQDM');
  });

  it('Gène - HPO', () => {
    cy.validateFacetFilter('Gène', 'HPO', 'Autosomal recessive inheritance (HP:0000007)', 'Autosomal recessive inheritance (HP:0000007)', /^24$/, true);
    cy.validateFacetRank(1, 'HPO');
  });

  it('Gène - ORPHANET', () => {
    cy.validateFacetFilter('Gène', 'ORPHANET', 'Precursor B-cell acute lymphoblastic leukemia', 'Precursor B-cell acute lymphoblastic leukemia', /^(9|8)$/, true);
    cy.validateFacetRank(2, 'ORPHANET');
  });

  it('Gène - OMIM', () => {
    cy.validateFacetFilter('Gène', 'OMIM', 'Fraser syndrome 3', 'Fraser syndrome 3', /^2$/, true);
    cy.validateFacetRank(3, 'OMIM');
  });

  it('Gène - DDD', () => {
    cy.validateFacetFilter('Gène', 'DDD', 'AGNATHIA-OTOCEPHALY COMPLEX biallelic', 'AGNATHIA-OTOCEPHALY COMPLEX biallelic', /^1$/, true);
    cy.validateFacetRank(4, 'DDD');
  });

  it('Gène - COSMIC', () => {
    cy.validateFacetFilter('Gène', 'COSMIC', 'Other tumour types', 'other tumour types', /^1$/, true);
    cy.validateFacetRank(5, 'COSMIC');
  });

  it('Occurrence - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Occurrence');
  });

  it('Occurrence - Filtre (Dragen)', () => {
    cy.validateFacetFilter('Occurrence', 'Filtre (Dragen)', 'CnvQual', 'cnvQual', /^98$/);
    cy.validateFacetRank(0, 'Filtre (Dragen)');
  });

  it('Occurrence - Qualité du CNV', () => {
    cy.validateFacetNumFilter('Occurrence', 'Qualité du CNV', '5', /^12$/);
    cy.validateFacetRank(1, 'Qualité du CNV');
  });
});
