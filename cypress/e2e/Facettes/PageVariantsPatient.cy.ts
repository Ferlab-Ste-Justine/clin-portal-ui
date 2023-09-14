/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants d\'un patient - Filtrer avec les facettes', () => {

  beforeEach(() => {
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  });

  it('Panel RQDM - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('rqdm');
  });

  it('Panel RQDM - RQDM', () => {
    cy.validateFacetFilter('rqdm', 'RQDM', 0, 'POLYM', /^24 975$/);
  });

  it('Variant - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('category_variant');
  });

  it('Variant - Type de variant', () => {
    cy.validateFacetFilter('category_variant', 'Type de variant', 0, 'SNV', /^157 594$/);
  });

  it('Variant - Conséquences', () => {
    cy.validateFacetFilter('category_variant', 'Conséquences', 1, 'Downstream Gene', /^38 150$/);
  });

  it('Variant - Référence externe', () => {
    cy.validateFacetFilter('category_variant', 'Référence externe', 2, 'No Data', /^7\d{2}$/);
  });

  it('Variant - Chromosome', () => {
    cy.validateFacetFilter('category_variant', 'Chromosome', 3, '19', /^11 806$/);
  });

  it('Gène - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('category_genomic');
  });

  it('Gène - Type de gène', () => {
    cy.validateFacetFilter('category_genomic', 'Type de gène', 0, 'Protein Coding', /^154 040$/);
  });

  it('Gène - Référence externe', () => {
    cy.validateFacetFilter('category_genomic', 'Référence externe', 1, 'OMIM', /^54 110$/);
  });

  it('Gène - RQDM', () => {
    cy.validateFacetFilter('category_genomic', 'RQDM', 4, 'POLYM', /^24 975$/);
  });

  it('Gène - HPO', () => {
    cy.validateFacetFilter('category_genomic', 'HPO', 5, 'Autosomal recessive inheritance (HP:0000007)', /^31 726$/);
  });

  it('Gène - ORPHANET', () => {
    cy.validateFacetFilter('category_genomic', 'ORPHANET', 6, 'Autosomal recessive non-syndromic sensorineural deafness type DFNB', /^1 271$/);
  });

  it('Gène - OMIM', () => {
    cy.validateFacetFilter('category_genomic', 'OMIM', 7, 'Celiac disease, susceptibility to', /^470$/);
  });

  it('Gène - DDD', () => {
    cy.validateFacetFilter('category_genomic', 'DDD', 8, 'AUTOSOMAL RECESSIVE MENTAL RETARDATION', /^721$/);
  });

  it('Gène - COSMIC', () => {
    cy.validateFacetFilter('category_genomic', 'COSMIC', 9, 'Leukaemia', /^183$/);
  });

  it('Pathogénicité - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('category_pathogenicity');
  });

  it('Pathogénicité - ClinVar', () => {
    cy.validateFacetFilter('category_pathogenicity', 'ClinVar', 0, 'Likely Benign', /^1 162$/);
  });

  it('Pathogénicité - VEP', () => {
    cy.validateFacetFilter('category_pathogenicity', 'VEP', 1, 'HIGH', /^671$/);
  });

  it('Pathogénicité - ACMG de Exomiser', () => {
    cy.validateFacetFilter('category_pathogenicity', 'ACMG de Exomiser', 3, 'Uncertain Significance', /^13$/);
  });

  it('Pathogénicité - Critères ACMG de Exomiser', () => {
    cy.validateFacetFilter('category_pathogenicity', 'Critères ACMG de Exomiser', 4, 'BP4 Moderate,BP6', /^1$/);
  });

  it('Pathogénicité - FATHMM', () => {
    cy.validateFacetFilter('category_pathogenicity', 'FATHMM', 8, 'Tolerated', /^9 183$/);
  });

  it('Pathogénicité - LRT', () => {
    cy.validateFacetFilter('category_pathogenicity', 'LRT', 9, 'Neutral', /^6 653$/);
  });

  it('Pathogénicité - Polyphen 2 HVAR', () => {
    cy.validateFacetFilter('category_pathogenicity', 'Polyphen 2 HVAR', 10, 'Possibily Damaging', /^749$/);
  });

  it('Pathogénicité - SIFT', () => {
    cy.validateFacetFilter('category_pathogenicity', 'SIFT', 11, 'Deleterious', /^2 107$/);
  });

  it('Pathogénicité - CMC tier', () => {
    cy.validateFacetFilter('category_pathogenicity', 'CMC tier', 16, 'Tier 3', /^26\d{1}$/);
  });

  it('Occurrence - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('category_occurrence');
  });

  it('Occurrence - Zygosité', () => {
    cy.validateFacetFilter('category_occurrence', 'Zygosité', 0, 'HET', /^107 569$/);
  });

  it('Occurrence - Zygosité maternelle', () => {
    cy.validateFacetFilter('category_occurrence', 'Zygosité maternelle', 1, 'HOM', /^64 388$/);
  });

  it('Occurrence - Zygosité paternelle', () => {
    cy.validateFacetFilter('category_occurrence', 'Zygosité paternelle', 2, 'UNK', /^240$/);
  });

  it('Occurrence - Origine parentale', () => {
    cy.validateFacetFilter('category_occurrence', 'Origine parentale', 3, 'Father and Mother', /^59 407$/);
  });

  it('Occurrence - Transmission', () => {
    cy.validateFacetFilter('category_occurrence', 'Transmission', 4, 'Autosomal Dominant De Novo', /^2 773$/);
  });

  it('Occurrence - Hét. composé', () => {
    cy.validateFacetFilter('category_occurrence', 'Hét. composé', 5, 'False', /^183 029$/);
  });

  it('Occurrence - Hét. composé potentiel', () => {
    cy.validateFacetFilter('category_occurrence', 'Hét. composé potentiel', 6, 'True', /^4 486$/);
  });

  it('Occurrence - Filtre (Dragen)', () => {
    cy.validateFacetFilter('category_occurrence', 'Filtre (Dragen)', 7, 'DRAGENIndelHardQUAL', /^66$/);
  });
});
