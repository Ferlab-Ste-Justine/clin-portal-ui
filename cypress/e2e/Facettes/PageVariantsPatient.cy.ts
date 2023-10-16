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
    cy.validateExpandCollapse('Panel RQDM');
  });

  it('Panel RQDM - RQDM', () => {
    cy.validateFacetFilter('Panel RQDM', 'RQDM', 'POLYM', 'POLYM', /^24 975$/);
    cy.validateFacetRank(0, 'RQDM');
  });

  it('Variant - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Variant');
  });

  it('Variant - Type de variant', () => {
    cy.validateFacetFilter('Variant', 'Type de variant', 'SNV', 'SNV', /^157 594$/);
    cy.validateFacetRank(0, 'Type de variant');
  });

  it('Variant - Conséquences', () => {
    cy.validateFacetFilter('Variant', 'Conséquences', 'Downstream Gene', 'downstream_gene_variant', /^38 150$/);
    cy.validateFacetRank(1, 'Conséquences');
  });

  it('Variant - Référence externe', () => {
    cy.validateFacetFilter('Variant', 'Référence externe', 'No Data', '__missing__', /^7\d{2}$/);
    cy.validateFacetRank(2, 'Référence externe');
  });

  it('Variant - Chromosome', () => {
    cy.validateFacetFilter('Variant', 'Chromosome', '19', '19', /^11 806$/);
    cy.validateFacetRank(3, 'Chromosome');
  });

  it('Variant - Position', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Variant"]').click({force: true});
    cy.validateFacetRank(4, 'Position');
  });

  it('Gène - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Gène');
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
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Gène"]').click({force: true});
    cy.validateFacetRank(2, 'gnomAD pLi');
  });

  it('Gène - gnomAD LOEUF', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Gène"]').click({force: true});
    cy.validateFacetRank(3, 'gnomAD LOEUF');
  });

  it('Gène - RQDM', () => {
    cy.validateFacetFilter('Gène', 'RQDM', 'POLYM', 'POLYM', /^24 975$/);
    cy.validateFacetRank(4, 'RQDM');
  });

  it('Gène - HPO', () => {
    cy.validateFacetFilter('Gène', 'HPO', 'Autosomal recessive inheritance (HP:0000007)', 'Autosomal recessive inheritance (HP:0000007)', /^31 726$/);
    cy.validateFacetRank(5, 'HPO');
  });

  it('Gène - ORPHANET', () => {
    cy.validateFacetFilter('Gène', 'ORPHANET', 'Autosomal recessive non-syndromic sensorineural deafness type DFNB', 'Autosomal recessive non-syndromic sensorineural deafness type DFNB', /^1 271$/);
    cy.validateFacetRank(6, 'ORPHANET');
  });

  it('Gène - OMIM', () => {
    cy.validateFacetFilter('Gène', 'OMIM', 'Celiac disease, susceptibility to', 'Celiac disease, susceptibility to', /^470$/);
    cy.validateFacetRank(7, 'OMIM');
  });

  it('Gène - DDD', () => {
    cy.validateFacetFilter('Gène', 'DDD', 'AUTOSOMAL RECESSIVE MENTAL RETARDATION', 'AUTOSOMAL RECESSIVE MENTAL RETARDATION', /^721$/);
    cy.validateFacetRank(8, 'DDD');
  });

  it('Gène - COSMIC', () => {
    cy.validateFacetFilter('Gène', 'COSMIC', 'Leukaemia', 'leukaemia', /^183$/);
    cy.validateFacetRank(9, 'COSMIC');
  });

  it('Fréquence - Fréq. all. tous les patients', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Fréquence"]').click({force: true});
    cy.validateFacetRank(0, 'Fréq. all. tous les patients');
  });

  it('Fréquence - Fréq. all. patients atteints', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Fréquence"]').click({force: true});
    cy.validateFacetRank(1, 'Fréq. all. patients atteints');
  });

  it('Fréquence - Fréq. all. patients non atteints', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Fréquence"]').click({force: true});
    cy.validateFacetRank(2, 'Fréq. all. patients non atteints');
  });

  it('Fréquence - gnomAD Exome 2.1.1', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Fréquence"]').click({force: true});
    cy.validateFacetRank(3, 'gnomAD Exome 2.1.1');
  });

  it('Fréquence - gnomAD Genome 2.1.1', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Fréquence"]').click({force: true});
    cy.validateFacetRank(4, 'gnomAD Genome 2.1.1');
  });

  it('Fréquence - gnomAD Genome 3.0', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Fréquence"]').click({force: true});
    cy.validateFacetRank(5, 'gnomAD Genome 3.0');
  });

  it('Fréquence - gnomAD Genome 3.1.1', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Fréquence"]').click({force: true});
    cy.validateFacetRank(6, 'gnomAD Genome 3.1.1');
  });

  it('Fréquence - gnomAD Genome 3.1.1 ALT', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Fréquence"]').click({force: true});
    cy.validateFacetRank(7, 'gnomAD Genome 3.1.1 ALT');
  });

  it('Fréquence - TopMed Bravo', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Fréquence"]').click({force: true});
    cy.validateFacetRank(8, 'TopMed Bravo');
  });

  it('Fréquence - 1000 Genome', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Fréquence"]').click({force: true});
    cy.validateFacetRank(9, '1000 Genome');
  });

  it('Pathogénicité - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Pathogénicité');
  });

  it('Pathogénicité - ClinVar', () => {
    cy.validateFacetFilter('Pathogénicité', 'ClinVar', 'Likely Benign', 'Likely_benign', /^1 162$/);
    cy.validateFacetRank(0, 'ClinVar');
  });

  it('Pathogénicité - VEP', () => {
    cy.validateFacetFilter('Pathogénicité', 'VEP', 'HIGH', 'HIGH', /^671$/);
    cy.validateFacetRank(1, 'VEP');
  });

  it('Pathogénicité - Score Exomiser', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Pathogénicité"]').click({force: true});
    cy.validateFacetRank(2, 'Score Exomiser');
  });

  it('Pathogénicité - ACMG de Exomiser', () => {
    cy.validateFacetFilter('Pathogénicité', 'ACMG de Exomiser', 'Uncertain Significance', 'UNCERTAIN_SIGNIFICANCE', /^13$/);
    cy.validateFacetRank(3, 'ACMG de Exomiser');
  });

  it('Pathogénicité - Critères ACMG de Exomiser', () => {
    cy.validateFacetFilter('Pathogénicité', 'Critères ACMG de Exomiser', 'BP4 Moderate,BP6', 'BP4_Moderate,BP6', /^1$/);
    cy.validateFacetRank(4, 'Critères ACMG de Exomiser');
  });

  it('Pathogénicité - CADD (Phred)', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Pathogénicité"]').click({force: true});
    cy.validateFacetRank(5, 'CADD (Phred)');
  });

  it('Pathogénicité - CADD (Raw)', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Pathogénicité"]').click({force: true});
    cy.validateFacetRank(6, 'CADD (Raw)');
  });

  it('Pathogénicité - DANN', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Pathogénicité"]').click({force: true});
    cy.validateFacetRank(7, 'DANN');
  });

  it('Pathogénicité - FATHMM', () => {
    cy.validateFacetFilter('Pathogénicité', 'FATHMM', 'Tolerated', 'T', /^9 183$/);
    cy.validateFacetRank(8, 'FATHMM');
  });

  it('Pathogénicité - LRT', () => {
    cy.validateFacetFilter('Pathogénicité', 'LRT', 'Neutral', 'N', /^6 653$/);
    cy.validateFacetRank(9, 'LRT');
  });

  it('Pathogénicité - Polyphen 2 HVAR', () => {
    cy.validateFacetFilter('Pathogénicité', 'Polyphen 2 HVAR', 'Possibily Damaging', 'P', /^749$/);
    cy.validateFacetRank(10, 'Polyphen 2 HVAR');
  });

  it('Pathogénicité - SIFT', () => {
    cy.validateFacetFilter('Pathogénicité', 'SIFT', 'Deleterious', 'D', /^2 107$/);
    cy.validateFacetRank(11, 'SIFT');
  });

  it('Pathogénicité - SpliceAI', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Pathogénicité"]').click({force: true});
    cy.validateFacetRank(12, 'SpliceAI');
  });

  it('Pathogénicité - REVEL', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Pathogénicité"]').click({force: true});
    cy.validateFacetRank(13, 'REVEL');
  });

  it('Pathogénicité - CMC', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Pathogénicité"]').click({force: true});
    cy.validateFacetRank(14, 'CMC');
  });

  it('Pathogénicité - CMC (ratio)', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Pathogénicité"]').click({force: true});
    cy.validateFacetRank(15, 'CMC (ratio)');
  });

  it('Pathogénicité - CMC tier', () => {
    cy.validateFacetFilter('Pathogénicité', 'CMC tier', 'Tier 3', '3', /^26\d{1}$/);
    cy.validateFacetRank(16, 'CMC tier');
  });

  it('Occurrence - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Occurrence');
  });

  it('Occurrence - Zygosité', () => {
    cy.validateFacetFilter('Occurrence', 'Zygosité', 'HET', 'HET', /^107 569$/);
    cy.validateFacetRank(0, 'Zygosité');
  });

  it('Occurrence - Zygosité maternelle', () => {
    cy.validateFacetFilter('Occurrence', 'Zygosité maternelle', 'HOM', 'HOM', /^64 388$/);
    cy.validateFacetRank(1, 'Zygosité maternelle');
  });

  it('Occurrence - Zygosité paternelle', () => {
    cy.validateFacetFilter('Occurrence', 'Zygosité paternelle', 'UNK', 'UNK', /^240$/);
    cy.validateFacetRank(2, 'Zygosité paternelle');
  });

  it('Occurrence - Origine parentale', () => {
    cy.validateFacetFilter('Occurrence', 'Origine parentale', 'Father and Mother', 'both', /^59 407$/);
    cy.validateFacetRank(3, 'Origine parentale');
  });

  it('Occurrence - Transmission', () => {
    cy.validateFacetFilter('Occurrence', 'Transmission', 'Autosomal Dominant De Novo', 'autosomal_dominant_de_novo', /^2 773$/);
    cy.validateFacetRank(4, 'Transmission');
  });

  it('Occurrence - Hét. composé', () => {
    cy.validateFacetFilter('Occurrence', 'Hét. composé', 'False', 'false', /^183 029$/);
    cy.validateFacetRank(5, 'Hét. composé');
  });

  it('Occurrence - Hét. composé potentiel', () => {
    cy.validateFacetFilter('Occurrence', 'Hét. composé potentiel', 'True', 'true', /^4 486$/);
    cy.validateFacetRank(6, 'Hét. composé potentiel');
  });

  it('Occurrence - Filtre (Dragen)', () => {
    cy.validateFacetFilter('Occurrence', 'Filtre (Dragen)', 'DRAGENIndelHardQUAL', 'DRAGENIndelHardQUAL', /^66$/);
    cy.validateFacetRank(7, 'Filtre (Dragen)');
  });

  it('Occurrence - Qualité de profondeur', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Occurrence"]').click({force: true});
    cy.validateFacetRank(8, 'Qualité de profondeur');
  });

  it('Occurrence - Profondeur allélique ALT', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Occurrence"]').click({force: true});
    cy.validateFacetRank(9, 'Profondeur allélique ALT');
  });

  it('Occurrence - Profondeur totale ALT + REF', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Occurrence"]').click({force: true});
    cy.validateFacetRank(10, 'Profondeur totale ALT + REF');
  });

  it('Occurrence - Ratio allélique ALT / (ALT+REF)', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Occurrence"]').click({force: true});
    cy.validateFacetRank(11, 'Ratio allélique ALT / (ALT+REF)');
  });

  it('Occurrence - Qualité du génotype', () => {
    // TODO Filter
    cy.get('[data-cy="SidebarMenuItem_Occurrence"]').click({force: true});
    cy.validateFacetRank(12, 'Qualité du génotype');
  });
});
