/// <reference types="Cypress" />
import '../../support/commands';

let epCHUSJ_ldmCHUSJ: any;

beforeEach(() => {
  epCHUSJ_ldmCHUSJ = Cypress.env('globalData').presc_EP_CHUSJ_LDM_CHUSJ;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des CNVs d\'un patient - Dictionnaire', () => {
  it('Panel RQDM - RQDM [CLIN-2971]', () => {
    const dictionnary = ['Malignant Hyperthermia (HYPM v1)',
                         'Congenital Myopathies (MYOC v1)',
                         'Global Developmental Delay / Intellectual Disability (Trio) (RGDI v3)',
                         'Hematological Malignancies Predisposition (TUHEM v1)',
                         'Congenital Myasthenia (MYAC v1)',
                         'Global Muscular Diseases (MMG v1)',
                         'Muscular Dystrophies (DYSM v1)',
                         'Nuclear Mitochondriopathies (MITN v2)',
                         'Pediatric Cancer Predisposition (TUPED v1)',
                         'Polymalformation (POLYM v1)',
                         'RGDI+ (RGDI+ v5)',
                         'Rhabdomyolysis (RHAB v1)',
                         'Solid Tumor (Somatic) (SSOLID v2)',
                         'Leukemia (Somatic) (SHEMA v3)',
                         'Severe Combined Immune Deficiency (SCID v1)',
                         'Thrombocytopenia (THBP v1)',
                         'No Data'];

    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=92e4e5c0-5b1e-4521-a140-f4e28b2bf420');
    cy.validateDictionnaryPresetValues('Panel RQDM', 'Panel RQDM', dictionnary);

    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=f5d9e3d5-6970-49c3-860c-d3ab00a06cdb');
    cy.validateDictionnaryNewValues('Panel RQDM', 'Panel RQDM', dictionnary);
  });

  it('Variant - Type de variant', () => {
    const dictionnary = ['GAIN',
                         'LOSS',
                         'GAINLOH',
                         'CNLOH',
                         'No Data'];

    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=92e4e5c0-5b1e-4521-a140-f4e28b2bf420');
    cy.validateDictionnaryPresetValues('Variant', 'Type de variant', dictionnary);

    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=f5d9e3d5-6970-49c3-860c-d3ab00a06cdb');
    cy.validateDictionnaryNewValues('Variant', 'Type de variant', dictionnary);
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

    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=92e4e5c0-5b1e-4521-a140-f4e28b2bf420');
    cy.validateDictionnaryPresetValues('Variant', 'Chromosome', dictionnary);

    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=f5d9e3d5-6970-49c3-860c-d3ab00a06cdb');
    cy.validateDictionnaryNewValues('Variant', 'Chromosome', dictionnary);
  });

  it('Gène - Panel RQDM [CLIN-2971]', () => {
    const dictionnary = ['Malignant Hyperthermia (HYPM v1)',
                         'Congenital Myopathies (MYOC v1)',
                         'Global Developmental Delay / Intellectual Disability (Trio) (RGDI v3)',
                         'Hematological Malignancies Predisposition (TUHEM v1)',
                         'Congenital Myasthenia (MYAC v1)',
                         'Global Muscular Diseases (MMG v1)',
                         'Muscular Dystrophies (DYSM v1)',
                         'Nuclear Mitochondriopathies (MITN v2)',
                         'Pediatric Cancer Predisposition (TUPED v1)',
                         'Polymalformation (POLYM v1)',
                         'RGDI+ (RGDI+ v5)',
                         'Rhabdomyolysis (RHAB v1)',
                         'Solid Tumor (Somatic) (SSOLID v2)',
                         'Leukemia (Somatic) (SHEMA v3)',
                         'Severe Combined Immune Deficiency (SCID v1)',
                         'Thrombocytopenia (THBP v1)',
                         'No Data'];

    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=92e4e5c0-5b1e-4521-a140-f4e28b2bf420');
    cy.validateDictionnaryPresetValues('Gène', 'Panel RQDM', dictionnary);

    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=f5d9e3d5-6970-49c3-860c-d3ab00a06cdb');
    cy.validateDictionnaryNewValues('Gène', 'Panel RQDM', dictionnary);
  });

  it('Occurrence - Filtre (Dragen)', () => {
    const dictionnary = ['PASS',
                         'CnvQual',
                         'CnvCopyRatio',
                         'LoDFail',
                         'BinCount',
                         'SegmentMean',
                         'No Data'];

    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=92e4e5c0-5b1e-4521-a140-f4e28b2bf420');
    cy.validateDictionnaryPresetValues('Occurrence', 'Filtre \(Dragen\)', dictionnary);

    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=f5d9e3d5-6970-49c3-860c-d3ab00a06cdb');
    cy.validateDictionnaryNewValues('Occurrence', 'Filtre \(Dragen\)', dictionnary);
  });
});
