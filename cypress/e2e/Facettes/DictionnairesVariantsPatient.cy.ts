/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants d\'un patient - Dictionnaire', () => {

  beforeEach(() => {
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  });

  it('Panel RQDM - RQDM', () => {
    const dictionnary = ['Malignant Hyperthermia (HYPM)',
                         'Congenital Myopathies (MYOC)',
                         'Global Developmental Delay / Intellectual Deficiency (Trio) (RGDI)',
                         'Hematological malignancies predisposition (TUHEM)',
                         'Congenital Myasthenia (MYAC)',
                         'Global Muscular diseases (Global Panel) (MMG)',
                         'Muscular Dystrophies (DYSM)',
                         'Nuclear Mitochondriopathies (MITN)',
                         'Pediatric cancer predisposition (TUPED)',
                         'Polymalformation (POLYM)',
                         'RGDI+ (RGDI+)',
                         'Rhabdomyolysis (RHAB)',
                         'Solid Tumor (somatic) (SSOLID)',
                         'Leukemia (somatic) (SHEMA)',
                         'Tumoral Exome (EXTUM)',
                         'No Data'];

    cy.validateDictionnary('rqdm', /^RQDM$/, 0, dictionnary);
  });

  it('Variant - Type de variant', () => {
    const dictionnary = ['Insertion',
                         'Délétion',
                         'SNV',
                         'Indel',
                         'Substitution',
                         'Séquence Altération',
                         'No Data'];

    cy.validateDictionnary('category_variant', /^Type de variant$/, 0, dictionnary);
  });

  it('Variant - Conséquences', () => {
    const dictionnary = ['Transcript Ablation',
                          'Splice Acceptor',
                          'Splice Donor',
                          'Stop Gained',
                          'Frameshift',
                          'Stop Lost',
                          'Start Lost',
                          'Transcript Amplification',
                          'Inframe Insertion',
                          'Inframe Deletion',
                          'Missense',
                          'Protein Altering',
                          'Splice Region',
                          'Splice Donor 5th Base',
                          'Splice Donor Region',
                          'Splice Polypyrimidine Tract',
                          'Incomplete Terminal Codon',
                          'Start Retained',
                          'Stop Retained',
                          'Synonymous',
                          'Coding Sequence',
                          'Mature MiRNA',
                          '5 Prime UTR',
                          '3 Prime UTR',
                          'Non Coding Transcript Exon',
                          'Intron',
                          'NMD Transcript',
                          'Non Coding Transcript',
                          'Upstream Gene',
                          'Downstream Gene',
                          'TFBS Ablation',
                          'TFBS Amplification',
                          'TF Binding Site',
                          'Regulatory Region Ablation',
                          'Regulatory Region Amplification',
                          'Feature Elongation',
                          'Regulatory Region',
                          'Feature Truncation',
                          'Intergenic',
                          'No Data'];

    cy.validateDictionnary('category_variant', /^Conséquences$/, 1, dictionnary);
  });

  it('Variant - Référence externe', () => {
    const dictionnary = ['DBSNP',
                         'Clinvar',
                         'PubMed',
                         'Cosmic',
                         'No Data'];

    cy.validateDictionnary('category_variant', /^Référence externe$/, 2, dictionnary);
  });

  it('Variant - Chromosome', () => {
    const dictionnary = [/^1$/,
                         /^2$/,
                         '3',
                         '4',
                         '5',
                         '6',
                         '7',
                         '8',
                         '9',
                         '10',
                         '11',
                         '12',
                         '13',
                         '14',
                         '15',
                         '16',
                         '17',
                         '18',
                         '19',
                         '20',
                         '21',
                         '22',
                         'X',
                         'Y',
                         'No Data'];

    cy.validateDictionnary('category_variant', /^Chromosome$/, 3, dictionnary);
  });

  it('Gène - Type de gène', () => {
    const dictionnary = ['IG C Gene',
                          'IG D Gene',
                          'IG J Gene',
                          'IG LV Gene',
                          'IG V Gene',
                          'TR C Gene',
                          'TR J Gene',
                          'TR V Gene',
                          'TR D Gene',
                          'IG Pseudogene',
                          'IG C Pseudogene',
                          'IG J Pseudogene',
                          'IG V Pseudogene',
                          'TR V Pseudogene',
                          'TR J Pseudogene',
                          'Mt RRNA',
                          'Mt TRNA',
                          'MiRNA',
                          'Misc RNA',
                          'RRNA',
                          'ScRNA',
                          'SnRNA',
                          'SnoRNA',
                          'Ribozyme',
                          'SRNA',
                          'ScaRNA',
                          'Non Coding',
                          'LncRNA',
                          'Mt TRNA Pseudogene',
                          'TRNA Pseudogene',
                          'SnoRNA Pseudogene',
                          'SnRNA Pseudogene',
                          'ScRNA Pseudogene',
                          'RRNA Pseudogene',
                          'Misc RNA Pseudogene',
                          'MiRNA Pseudogene',
                          'TEC',
                          'Nonsense Mediated Decay',
                          'Non Stop Decay',
                          'Retained Intron',
                          'Protein Coding',
                          'Protein Coding LoF',
                          'Protein Coding CDS Not Defined',
                          'Processed Transcript',
                          'Non Coding',
                          'Ambiguous Orf',
                          'Sense Intronic',
                          'Sense Overlapping',
                          'Antisense RNA',
                          'Known Ncrna',
                          'Pseudogene',
                          'Processed Pseudogene',
                          'Polymorphic Pseudogene',
                          'Retrotransposed',
                          'Transcribed Processed Pseudogene',
                          'Transcribed Unprocessed Pseudogene',
                          'Transcribed Unitary Pseudogene',
                          'Translated Processed Pseudogene',
                          'Translated Unprocessed Pseudogene',
                          'Unitary Pseudogene',
                          'Unprocessed Pseudogene',
                          'Artifact',
                          'LincRNA',
                          'Macro LncRNA',
                          '3prime Overlapping NcRNA',
                          'Disrupted Domain',
                          'Vault RNA',
                          'Bidirectional Promoter LncRNA',
                          'No Data'];

    cy.validateDictionnary('category_genomic', /^Type de gène$/, 0, dictionnary);
  });

  it('Gène - Référence externe', () => {
    const dictionnary = ['OMIM',
                         'HPO',
                         'Orphanet',
                         'SpliceAI',
                         'Cosmic',
                         'gnomAD',
                         'DDD',
                         'No Data'];

    cy.validateDictionnary('category_genomic', /^Référence externe$/, 1, dictionnary);
  });

  it('Gène - RQDM', () => {
    const dictionnary = ['Malignant Hyperthermia (HYPM)',
                         'Congenital Myopathies (MYOC)',
                         'Global Developmental Delay / Intellectual Deficiency (Trio) (RGDI)',
                         'Hematological malignancies predisposition (TUHEM)',
                         'Congenital Myasthenia (MYAC)',
                         'Global Muscular diseases (Global Panel) (MMG)',
                         'Muscular Dystrophies (DYSM)',
                         'Nuclear Mitochondriopathies (MITN)',
                         'Pediatric cancer predisposition (TUPED)',
                         'Polymalformation (POLYM)',
                         'RGDI+ (RGDI+)',
                         'Rhabdomyolysis (RHAB)',
                         'Solid Tumor (somatic) (SSOLID)',
                         'Leukemia (somatic) (SHEMA)',
                         'Tumoral Exome (EXTUM)',
                         'No Data'];

    cy.validateDictionnary('category_genomic', /^RQDM$/, 4, dictionnary);
  });

  it('Pathogénicité - ClinVar', () => {
    const dictionnary = ['Benign',
                         'Likely Benign',
                         'Uncertain Significance',
                         'Conflicting Interpretations Of Pathogenicity',
                         'Pathogenic',
                         'Not Provided',
                         'Drug Response',
                         'Risk Factor',
                         'Likely Pathogenic',
                         'Association',
                         'Other',
                         'Affects',
                         'Protective',
                         'Confers Sensitivity',
                         'Uncertain Risk Allele',
                         'Association Not Found',
                         'Likely Risk Allele',
                         'Low Penetrance',
                         'No Data'];

    cy.validateDictionnary('category_pathogenicity', /^ClinVar$/, 0, dictionnary);
  });

  it('Pathogénicité - VEP', () => {
    const dictionnary = ['HIGH',
                          'MODERATE',
                          'LOW',
                          'MODIFIER',
                          'No Data'];

    cy.validateDictionnary('category_pathogenicity', /^VEP$/, 1, dictionnary);
  });

  it('Pathogénicité - ACMG de Exomiser', () => {
    const dictionnary = ['Pathogenic',
                         'Likely Pathogenic',
                         'Uncertain Significance',
                         'Likely Benign',
                         'Benign',
                         'No Data'];

    cy.validateDictionnary('category_pathogenicity', /^ACMG de Exomiser$/, 3, dictionnary);
  });

  it('Pathogénicité - Verdict ACMG', () => {
    const dictionnary = ['Pathogenic',
                          'Likely Pathogenic',
                          'Uncertain Significance',
                          'Likely Benign',
                          'Benign',
                          'No Data'];

    cy.validateDictionnary('category_pathogenicity', /^Verdict ACMG$/, 5, dictionnary);
  });

  it('Pathogénicité - Critères ACMG', () => {
    const dictionnary = ['PVS1',
                          'PS1',
                          'PS2',
                          'PS3',
                          'PS4',
                          'PM1',
                          'PM2',
                          'PM3',
                          'PM4',
                          'PM5',
                          'PM6',
                          'PP1',
                          'PP2',
                          'PP3',
                          'PP4',
                          'PP5',
                          'BA1',
                          'BS1',
                          'BS2',
                          'BS3',
                          'BS4',
                          'BP1',
                          'BP2',
                          'BP3',
                          'BP4',
                          'BP5',
                          'BP6',
                          'BP7',
                          'No Data'];

    cy.validateDictionnary('category_pathogenicity', /^Critères ACMG$/, 6, dictionnary);
  });

  it('Pathogénicité - FATHMM', () => {
    const dictionnary = ['Deleterious',
                          'Tolerated',
                          'No Data'];

    cy.validateDictionnary('category_pathogenicity', /^FATHMM$/, 10, dictionnary);
  });

  it('Pathogénicité - LRT', () => {
    const dictionnary = ['Deleterious',
                          'Neutral',
                          'Unknown',
                          'No Data'];

    cy.validateDictionnary('category_pathogenicity', /^LRT$/, 11, dictionnary);
  });

  it('Pathogénicité - Polyphen 2 HVAR', () => {
    const dictionnary = ['Benign',
                          'Damaging',
                          'Possibily Damaging',
                          'No Data'];

    cy.validateDictionnary('category_pathogenicity', /^Polyphen 2 HVAR$/, 12, dictionnary);
  });

  it('Pathogénicité - SIFT', () => {
    const dictionnary = ['Deleterious',
                          'Tolerated',
                          'No Data'];

    cy.validateDictionnary('category_pathogenicity', /^SIFT$/, 13, dictionnary);
  });

  it('Pathogénicité - CMC tier', () => {
    const dictionnary = ['Tier 1',
                         'Tier 2',
                         'Tier 3',
                         'Other',
                         'No Data'];

    cy.validateDictionnary('category_pathogenicity', /^CMC tier$/, 18, dictionnary);
  });

  it('Occurrence - Zygosité', () => {
    const dictionnary = ['HOM',
                          'HEM',
                          'HET'];

    cy.validateDictionnary('category_occurrence', /^Zygosité$/, 0, dictionnary);
  });

  it('Occurrence - Zygosité maternelle', () => {
    const dictionnary = ['HOM',
                          'HEM',
                          'HET',
                          'WT',
                          'UNK'];

    cy.validateDictionnary('category_occurrence', /^Zygosité maternelle$/, 1, dictionnary);
  });

  it('Occurrence - Zygosité paternelle', () => {
    const dictionnary = ['HOM',
                          'HEM',
                          'HET',
                          'WT',
                          'UNK'];

    cy.validateDictionnary('category_occurrence', /^Zygosité paternelle$/, 2, dictionnary);
  });

  it('Occurrence - Origine parentale', () => {
    const dictionnary = ['None (de novo)',
                          'Possible de novo',
                          'Father and Mother',
                          'Mother',
                          'Father',
                          'Possible Father',
                          'Possible Mother',
                          'Ambiguous',
                          'Unknown',
                          'No Data'];

    cy.validateDictionnary('category_occurrence', /^Origine parentale$/, 3, dictionnary);
  });

  it('Occurrence - Transmission', () => {
    const dictionnary = ['Autosomal Dominant De Novo',
                          'Autosomal Dominant',
                          'Autosomal Recessive',
                          'X Linked Dominant De Novo',
                          'X Linked Recessive De Novo',
                          'X Linked Dominant',
                          'X Linked Recessive',
                          'Non Carrier Proband',
                          'Unknown Parents Genotype',
                          'Unknown Father Genotype',
                          'Unknown Mother Genotype',
                          'Unknown Proband Genotype',
                          'No Data'];

    cy.validateDictionnary('category_occurrence', /^Transmission$/, 4, dictionnary);
  });

  it('Variant - Hét. composé', () => {
    const dictionnary = ['False',
                         'True'];

    cy.validateDictionnary('category_occurrence', /^Hét. composé$/, 5, dictionnary);
  });

  it('Variant - Hét. composé potentiel', () => {
    const dictionnary = ['False',
                         'True'];

    cy.validateDictionnary('category_occurrence', /^Hét. composé potentiel$/, 6, dictionnary);
  });

  it('Variant - Filtre (Dragen)', () => {
    const dictionnary = ['PASS',
                         'DRAGENSnpHardQUAL',
                         'DRAGENIndelHardQUAL',
                         'LowDepth',
                         'PloidyConflict',
                         'Base Quality',
                         'Lod Fstar',
                         'Mapping Quality',
                         'Weak Evidence',
                         'No Reliable Supporting Read',
                         'Systematic Noise',
                         'Filtered Reads',
                         'Fragment Length',
                         'Too Few Supporting Reads',
                         'Low Frac Info Reads',
                         'Read Position',
                         'Multiallelic',
                         'Long Indel',
                         'No Data'];

    cy.validateDictionnary('category_occurrence', /^Filtre \(Dragen\)$/, 7, dictionnary);
  });
});
