/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des CNVs d\'un patient - Dictionnaire', () => {

  beforeEach(() => {
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);
  });

  it('Panel RQDM - RQDM [CLIN-2127]', () => {
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
                         'No Data'];

    cy.validateDictionnary('rqdm', /^RQDM$/, 0, dictionnary);
  });

  it('Variant - Type de variant', () => {
    const dictionnary = ['GAIN',
                          'LOSS',
                          'No Data'];

    cy.validateDictionnary('category_variant', /^Type de variant$/, 0, dictionnary);
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

    cy.validateDictionnary('category_variant', /^Chromosome$/, 2, dictionnary);
  });

  it('Gène - Panel RQDM [CLIN-2127]', () => {
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
                         'No Data'];

    cy.validateDictionnary('category_genomic', /^Panel RQDM$/, 0, dictionnary);
  });

  it('Occurrence - Filtre (Dragen)', () => {
    const dictionnary = ['PASS',
                         'CnvQual',
                         'CnvCopyRatio',
                         'LoDFail',
                         'No Data'];

    cy.validateDictionnary('category_occurrence', /^Filtre \(Dragen\)$/, 0, dictionnary);
  });
});
