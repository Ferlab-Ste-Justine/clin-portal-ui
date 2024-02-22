/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des CNVs d\'un patient - Dictionnaire', () => {
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

    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=92e4e5c0-5b1e-4521-a140-f4e28b2bf420');
    cy.validateDictionnaryPresetValues('Panel RQDM', 'Panel RQDM', dictionnary);

    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=f5d9e3d5-6970-49c3-860c-d3ab00a06cdb');
    cy.validateDictionnaryNewValues('Panel RQDM', 'Panel RQDM', dictionnary);
  });

  it('Variant - Type de variant', () => {
    const dictionnary = ['GAIN',
                          'LOSS',
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

  it('Gène - Panel RQDM', () => {
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
                         'No Data'];

    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=92e4e5c0-5b1e-4521-a140-f4e28b2bf420');
    cy.validateDictionnaryPresetValues('Occurrence', 'Filtre \(Dragen\)', dictionnary);

    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3, '?sharedFilterId=f5d9e3d5-6970-49c3-860c-d3ab00a06cdb');
    cy.validateDictionnaryNewValues('Occurrence', 'Filtre \(Dragen\)', dictionnary);
  });
});
