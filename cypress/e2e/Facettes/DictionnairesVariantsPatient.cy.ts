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
                         'Severe Combined Immune Deficiency (SCID)',
                         'No Data'];

    cy.validateDictionnary('Panel RQDM', 'RQDM', dictionnary);
  });

  it('Variant - Type de variant', () => {
    const dictionnary = ['Insertion',
                         'Délétion',
                         'SNV',
                         'Indel',
                         'Substitution',
                         'Séquence Altération',
                         'No Data'];

    cy.validateDictionnary('Variant', 'Type de variant', dictionnary);
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

    cy.validateDictionnary('Variant', 'Conséquences', dictionnary);
  });

  it('Variant - Référence externe', () => {
    const dictionnary = ['DBSNP',
                         'Clinvar',
                         'PubMed',
                         'Cosmic',
                         'No Data'];

    cy.validateDictionnary('Variant', 'Référence externe', dictionnary);
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

    cy.validateDictionnary('Variant', 'Chromosome', dictionnary);
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

    cy.validateDictionnary('Gène', 'Type de gène', dictionnary);
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

    cy.validateDictionnary('Gène', 'Référence externe', dictionnary);
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
                         'Severe Combined Immune Deficiency (SCID)',
                         'No Data'];

    cy.validateDictionnary('Gène', 'RQDM', dictionnary);
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

    cy.validateDictionnary('Pathogénicité', 'ClinVar', dictionnary);
  });

  it('Pathogénicité - VEP', () => {
    const dictionnary = ['HIGH',
                          'MODERATE',
                          'LOW',
                          'MODIFIER',
                          'No Data'];

    cy.validateDictionnary('Pathogénicité', 'VEP', dictionnary);
  });

  it('Pathogénicité - ACMG de Exomiser', () => {
    const dictionnary = ['Pathogenic',
                         'Likely Pathogenic',
                         'Uncertain Significance',
                         'Likely Benign',
                         'Benign',
                         'No Data'];

    cy.validateDictionnary('Pathogénicité', 'ACMG de Exomiser', dictionnary);
  });

  it('Pathogénicité - FATHMM', () => {
    const dictionnary = ['Deleterious',
                          'Tolerated',
                          'No Data'];

    cy.validateDictionnary('Pathogénicité', 'FATHMM', dictionnary);
  });

  it('Pathogénicité - LRT', () => {
    const dictionnary = ['Deleterious',
                          'Neutral',
                          'Unknown',
                          'No Data'];

    cy.validateDictionnary('Pathogénicité', 'LRT', dictionnary);
  });

  it('Pathogénicité - Polyphen 2 HVAR', () => {
    const dictionnary = ['Benign',
                          'Damaging',
                          'Possibily Damaging',
                          'No Data'];

    cy.validateDictionnary('Pathogénicité', 'Polyphen 2 HVAR', dictionnary);
  });

  it('Pathogénicité - SIFT', () => {
    const dictionnary = ['Deleterious',
                          'Tolerated',
                          'No Data'];

    cy.validateDictionnary('Pathogénicité', 'SIFT', dictionnary);
  });

  it('Pathogénicité - CMC tier', () => {
    const dictionnary = ['Tier 1',
                         'Tier 2',
                         'Tier 3',
                         'Other',
                         'No Data'];

    cy.validateDictionnary('Pathogénicité', 'CMC tier', dictionnary);
  });

  it('Occurrence - Zygosité', () => {
    const dictionnary = ['HOM',
                          'HEM',
                          'HET'];

    cy.validateDictionnary('Occurrence', 'Zygosité', dictionnary);
  });

  it('Occurrence - Zygosité maternelle', () => {
    const dictionnary = ['HOM',
                          'HEM',
                          'HET',
                          'WT',
                          'UNK'];

    cy.validateDictionnary('Occurrence', 'Zygosité maternelle', dictionnary);
  });

  it('Occurrence - Zygosité paternelle', () => {
    const dictionnary = ['HOM',
                          'HEM',
                          'HET',
                          'WT',
                          'UNK'];

    cy.validateDictionnary('Occurrence', 'Zygosité paternelle', dictionnary);
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

    cy.validateDictionnary('Occurrence', 'Origine parentale', dictionnary);
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

    cy.validateDictionnary('Occurrence', 'Transmission', dictionnary);
  });

  it('Occurrence - Hét. composé', () => {
    const dictionnary = ['False',
                         'True'];

    cy.validateDictionnary('Occurrence', 'Hét. composé', dictionnary);
  });

  it('Occurrence - Hét. composé potentiel', () => {
    const dictionnary = ['False',
                         'True'];

    cy.validateDictionnary('Occurrence', 'Hét. composé potentiel', dictionnary);
  });

  it('Occurrence - Filtre (Dragen)', () => {
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

    cy.validateDictionnary('Occurrence', 'Filtre \(Dragen\)', dictionnary);
  });
});
