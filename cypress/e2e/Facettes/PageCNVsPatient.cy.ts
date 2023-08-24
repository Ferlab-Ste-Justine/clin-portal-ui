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

  it('Panel RQDM - Panel RQDM', () => {
    cy.validateFacetFilter('rqdm', 'Panel RQDM', 0, 'POLYM', /^26$/);
  });

  it('Variant - Type de variant', () => {
    cy.validateFacetFilter('category_variant', 'Type de variant', 0, 'GAIN', /^121$/);
  });

  it('Variant - Chromosome', () => {
    cy.validateFacetFilter('category_variant', 'Chromosome', 2, '15', /^16$/);
  });

  it('Gène - Panel RQDM', () => {
    cy.validateFacetFilter('category_genomic', 'Panel RQDM', 0, 'POLYM', /^26$/);
  });

  it('Gène - HPO', () => {
    cy.validateFacetFilter('category_genomic', 'HPO', 1, 'Autosomal recessive inheritance (HP:0000007)', /^24$/, true);
  });

  it('Gène - ORPHANET', () => {
    cy.validateFacetFilter('category_genomic', 'ORPHANET', 2, 'Precursor B-cell acute lymphoblastic leukemia', /^(9|8)$/, true);
  });

  it('Gène - OMIM', () => {
    cy.validateFacetFilter('category_genomic', 'OMIM', 3, 'Fraser syndrome 3', /^2$/, true);
  });

  it('Gène - DDD', () => {
    cy.validateFacetFilter('category_genomic', 'DDD', 4, 'AGNATHIA-OTOCEPHALY COMPLEX biallelic', /^1$/, true);
  });

  it('Gène - COSMIC', () => {
    cy.validateFacetFilter('category_genomic', 'COSMIC', 5, 'Other tumour types', /^1$/, true);
  });

  it('Occurrence - Filtre (Dragen)', () => {
    cy.validateFacetFilter('category_occurrence', 'Filtre (Dragen)', 0, 'CnvQual', /^98$/);
  });
});
