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
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Variant"]').click({force: true});
    cy.validateFacetRank(1, 'Longueur du CNV');
  });

  it('Variant - Chromosome', () => {
    cy.validateFacetFilter('Variant', 'Chromosome', '15', '15', /^16$/);
    cy.validateFacetRank(2, 'Chromosome');
  });

  it('Variant - Début du CNV', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Variant"]').click({force: true});
    cy.validateFacetRank(3, 'Début du CNV');
  });

  it('Variant - Fin du CNV', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Variant"]').click({force: true});
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
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Occurrence"]').click({force: true});
    cy.validateFacetRank(1, 'Qualité du CNV');
  });
});
