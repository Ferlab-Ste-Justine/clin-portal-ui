/// <reference types="Cypress" />
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants d\'un patient - Filtrer avec les facettes', () => {

  beforeEach(() => {
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  });

  it('Gène - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Gène');
  });

  it('Recherche par symbole - PRDX1', () => {
    cy.get(`[data-cy="SidebarMenuItem_Gène"]`).click({force: true});
    cy.get('[class*="SearchLabel_title"]').contains('Recherche par gène').should('exist'); //data-cy="SearchLabel_Title"

    cy.get('[class*="SearchLabel_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true}); //data-cy="SearchLabel_InfoCircleOutlined"
    cy.get('body').contains('Recherche par symbole, alias et Ensembl ID').should('exist');

    cy.intercept('GET', '**/PRDX1').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(0).find('input').type('prdx1', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.wait('@getRouteMatcher', {timeout: 60*1000});

    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('PRDX1').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="ant-tag"]').contains('PRDX1').should('exist'); //data-cy="Tag_PRDX1"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gène').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PRDX1').should('exist');
    cy.validateTableResultsCount(/^13$/);

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[class*="ant-select-show-search"] [class="ant-tag"]').should('not.exist'); //data-cy="Tag_PRDX1"
  });

  it('Recherche par alias - NKEFA', () => {
    cy.get(`[data-cy="SidebarMenuItem_Gène"]`).click({force: true});

    cy.intercept('GET', '**/NKEFA').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(0).find('input').type('nkefa', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.wait('@getRouteMatcher', {timeout: 60*1000});

    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('PRDX1').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="ant-tag"]').contains('PRDX1').should('exist'); //data-cy="Tag_PRDX1"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gène').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PRDX1').should('exist');
    cy.validateTableResultsCount(/^13$/);
  });

  it('Recherche par Ensembl ID - ENSG00000117450', () => {
    cy.get(`[data-cy="SidebarMenuItem_Gène"]`).click({force: true});

    cy.intercept('GET', '**/ENSG00000117450').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(0).find('input').type('ensg00000117450', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.wait('@getRouteMatcher', {timeout: 60*1000});

    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('PRDX1').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="ant-tag"]').contains('PRDX1').should('exist'); //data-cy="Tag_PRDX1"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gène').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PRDX1').should('exist');
    cy.validateTableResultsCount(/^13$/);
  });

  it('Gène - Type de gène', () => {
    cy.validateFacetFilter('Gène', 'Type de gène', 'Protein Coding', 'protein_coding', /^154 040$/);
    cy.validateFacetRank(0, 'Type de gène');
  });

  it('Gène - Référence externe', () => {
    cy.validateFacetFilter('Gène', 'Référence externe', 'OMIM', 'OMIM', /^54 110$/);
    cy.validateFacetRank(1, 'Référence externe');
  });

  it('Gène - gnomAD pLi', () => {
    cy.validateFacetNumFilter('Gène', 'gnomAD pLi', '0.01', /^141 443$/);
    cy.validateFacetRank(2, 'gnomAD pLi');
  });

  it('Gène - gnomAD LOEUF', () => {
    cy.validateFacetNumFilter('Gène', 'gnomAD LOEUF', '0.01', /^59 125$/);
    cy.validateFacetRank(3, 'gnomAD LOEUF');
  });

  it('Gène - OMIM (transmission)', () => {
    cy.validateFacetFilter('Gène', 'OMIM (transmission)', 'Smu', 'Smu', /^683$/);
    cy.validateFacetRank(4, 'OMIM (transmission)');
  });

  it('Gène - RQDM', () => {
    cy.validateFacetFilter('Gène', 'RQDM', /^POLYM v1$/, 'POLYM', /^24 975$/);
    cy.validateFacetRank(5, 'RQDM');
  });

  it('Gène - HPO', () => {
    cy.validateFacetFilter('Gène', 'HPO', 'Autosomal recessive inheritance (HP:0000007)', 'Autosomal recessive inheritance (HP:0000007)', /^31 726$/);
    cy.validateFacetRank(6, 'HPO');
  });

  it('Gène - ORPHANET', () => {
    cy.validateFacetFilter('Gène', 'ORPHANET', 'Autosomal recessive non-syndromic sensorineural deafness type DFNB', 'Autosomal recessive non-syndromic sensorineural deafness type DFNB', /^1 271$/);
    cy.validateFacetRank(7, 'ORPHANET');
  });

  it('Gène - OMIM', () => {
    cy.validateFacetFilter('Gène', 'OMIM', 'Celiac disease, susceptibility to', 'Celiac disease, susceptibility to', /^470$/);
    cy.validateFacetRank(8, 'OMIM');
  });

  it('Gène - DDD', () => {
    cy.validateFacetFilter('Gène', 'DDD', 'AUTOSOMAL RECESSIVE MENTAL RETARDATION', 'AUTOSOMAL RECESSIVE MENTAL RETARDATION', /^721$/);
    cy.validateFacetRank(9, 'DDD');
  });

  it('Gène - COSMIC', () => {
    cy.validateFacetFilter('Gène', 'COSMIC', 'Leukaemia', 'leukaemia', /^183$/);
    cy.validateFacetRank(10, 'COSMIC');
  });
});
