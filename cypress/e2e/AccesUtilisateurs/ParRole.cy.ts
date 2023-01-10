/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));
const epCUSM_ldmCHUSJ  = JSON.parse(Cypress.env('presc_EP_CUSM_LDM_CHUSJ'));
const epCUSM_ldmCUSM   = JSON.parse(Cypress.env('presc_EP_CUSM_LDM_CUSM'));
const epCHUS_ldmCHUS   = JSON.parse(Cypress.env('presc_EP_CHUS_LDM_CHUS'));

describe('Accès des utilisateurs', () => {

  afterEach(() => {
    cy.logout();
  });

  it('Docteur et généticien (CHUSJ, CUSM, CHUS)', () => {
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

    // Les prescriptions de tous les EPs sont visibles
    cy.visitPrescriptionsPage();
    cy.contains('LDM-CHUSJ').should('exist');
    cy.contains('LDM-CUSM').should('exist');
    cy.contains(/^LDM-CHUS$/).should('exist');
    // Le lien "Variants" du tableau des prescriptions est visible
    cy.contains('Variants').should('exist');
    // Les liens "Fichiers" et "Variants" du tableau des requêtes sont visibles
    cy.get('div[id*="tab-requests"]').click({force: true});
    cy.contains('Fichiers').should('exist');
    cy.contains('Variants').should('exist');

    // Accéder à la page de tous les variants
    cy.visitVariantsPage();
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visitVariantsPatientPage(epCUSM_ldmCHUSJ.patientProbId, epCUSM_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCUSM.prescriptionId);
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visitVariantsPatientPage(epCUSM_ldmCUSM.patientProbId, epCUSM_ldmCUSM.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visitPrescriptionEntityPage(epCHUS_ldmCHUS.prescriptionId);
    cy.contains(epCHUS_ldmCHUS.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CHUS
    cy.visitVariantsPatientPage(epCHUS_ldmCHUS.patientProbId, epCHUS_ldmCHUS.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Les liens de la footer sont visibles
    cy.contains('Zeppelin').should('exist', {timeout: 20*1000});
    cy.contains('Fhir').should('exist', {timeout: 20*1000});
  });

  it('Généticien (CHUSJ, CUSM, CHUS)', () => {
    cy.login(Cypress.env('username_G_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

    // Les prescriptions de tous les EPs sont visibles
    cy.visitPrescriptionsPage();
    cy.contains('LDM-CHUSJ').should('exist');
    cy.contains('LDM-CUSM').should('exist');
    cy.contains(/^LDM-CHUS$/).should('exist');
    // Le lien "Variants" du tableau des prescriptions est visible
    cy.contains('Variants').should('exist');
    // Les liens "Fichiers" et "Variants" du tableau des requêtes sont visibles
    cy.get('div[id*="tab-requests"]').click({force: true});
    cy.contains('Fichiers').should('exist');
    cy.contains('Variants').should('exist');

    // Accéder à la page de tous les variants
    cy.visitVariantsPage();
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visitVariantsPatientPage(epCUSM_ldmCHUSJ.patientProbId, epCUSM_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCUSM.prescriptionId);
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visitVariantsPatientPage(epCUSM_ldmCUSM.patientProbId, epCUSM_ldmCUSM.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visitPrescriptionEntityPage(epCHUS_ldmCHUS.prescriptionId);
    cy.contains(epCHUS_ldmCHUS.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CHUS
    cy.visitVariantsPatientPage(epCHUS_ldmCHUS.patientProbId, epCHUS_ldmCHUS.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Les liens de la footer sont visibles
    cy.contains('Zeppelin').should('exist', {timeout: 20*1000});
    cy.contains('Fhir').should('exist', {timeout: 20*1000});
  });

  it('Docteur et généticien (CHUSJ)', () => {
    cy.login(Cypress.env('username_DG_CHUSJ'), Cypress.env('password'));

    // Les prescriptions de tous les EPs sont visibles
    cy.visitPrescriptionsPage();
    cy.contains('LDM-CHUSJ').should('exist');
    cy.contains('LDM-CUSM').should('exist');
    cy.contains(/^LDM-CHUS$/).should('exist');
    // Le lien "Variants" du tableau des prescriptions est visible
    cy.contains('Variants').should('exist');
    // Les liens "Fichiers" et "Variants" du tableau des requêtes sont visibles
    cy.get('div[id*="tab-requests"]').click({force: true});
    cy.contains('Fichiers').should('exist');
    cy.contains('Variants').should('exist');

    // Accéder à la page de tous les variants
    cy.visitVariantsPage();
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visitVariantsPatientPage(epCUSM_ldmCHUSJ.patientProbId, epCUSM_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCUSM.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visitVariantsPatientPage(epCUSM_ldmCUSM.patientProbId, epCUSM_ldmCUSM.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visitPrescriptionEntityPage(epCHUS_ldmCHUS.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCHUS_ldmCHUS.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CHUS
    cy.visitVariantsPatientPage(epCHUS_ldmCHUS.patientProbId, epCHUS_ldmCHUS.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Les liens de la footer ne sont pas visibles
    cy.contains('Zeppelin').should('not.exist', {timeout: 20*1000});
    cy.contains('Fhir').should('not.exist', {timeout: 20*1000});
  });

  it('Généticien (CHUSJ)', () => {
    cy.login(Cypress.env('username_G_CHUSJ'), Cypress.env('password'));

    // Les prescriptions de tous les EPs sont visibles
    cy.visitPrescriptionsPage();
    cy.contains('LDM-CHUSJ').should('exist');
    cy.contains('LDM-CUSM').should('exist');
    cy.contains(/^LDM-CHUS$/).should('exist');
    // Le lien "Variants" du tableau des prescriptions est visible
    cy.contains('Variants').should('exist');
    // Les liens "Fichiers" et "Variants" du tableau des requêtes sont visibles
    cy.get('div[id*="tab-requests"]').click({force: true});
    cy.contains('Fichiers').should('exist');
    cy.contains('Variants').should('exist');

    // Accéder à la page de tous les variants
    cy.visitVariantsPage();
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visitVariantsPatientPage(epCUSM_ldmCHUSJ.patientProbId, epCUSM_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCUSM.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visitVariantsPatientPage(epCUSM_ldmCUSM.patientProbId, epCUSM_ldmCUSM.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visitPrescriptionEntityPage(epCHUS_ldmCHUS.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCHUS_ldmCHUS.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CHUS
    cy.visitVariantsPatientPage(epCHUS_ldmCHUS.patientProbId, epCHUS_ldmCHUS.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Les liens de la footer ne sont pas visibles
    cy.contains('Zeppelin').should('not.exist', {timeout: 20*1000});
    cy.contains('Fhir').should('not.exist', {timeout: 20*1000});
  });

  it('Généticien (CUSM)', () => {
    cy.login(Cypress.env('username_G_CUSM'), Cypress.env('password'));

    // Les prescriptions de tous les EPs sont visibles
    cy.visitPrescriptionsPage();
    cy.contains('LDM-CHUSJ').should('exist');
    cy.contains('LDM-CUSM').should('exist');
    cy.contains(/^LDM-CHUS$/).should('exist');
    // Le lien "Variants" du tableau des prescriptions est visible
    cy.contains('Variants').should('exist');
    // Les liens "Fichiers" et "Variants" du tableau des requêtes sont visibles
    cy.get('div[id*="tab-requests"]').click({force: true});
    cy.contains('Fichiers').should('exist');
    cy.contains('Variants').should('exist');

    // Accéder à la page de tous les variants
    cy.visitVariantsPage();
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visitVariantsPatientPage(epCUSM_ldmCHUSJ.patientProbId, epCUSM_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCUSM.prescriptionId);
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visitVariantsPatientPage(epCUSM_ldmCUSM.patientProbId, epCUSM_ldmCUSM.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visitPrescriptionEntityPage(epCHUS_ldmCHUS.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCHUS_ldmCHUS.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CHUS
    cy.visitVariantsPatientPage(epCHUS_ldmCHUS.patientProbId, epCHUS_ldmCHUS.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Les liens de la footer ne sont pas visibles
    cy.contains('Zeppelin').should('not.exist', {timeout: 20*1000});
    cy.contains('Fhir').should('not.exist', {timeout: 20*1000});
  });

  it('Docteur et généticien (CHUS)', () => {
    cy.login(Cypress.env('username_DG_CHUS'), Cypress.env('password'));

    // Les prescriptions de tous les EPs sont visibles
    cy.visitPrescriptionsPage();
    cy.contains('LDM-CHUSJ').should('exist');
    cy.contains('LDM-CUSM').should('exist');
    cy.contains(/^LDM-CHUS$/).should('exist');
    // Le lien "Variants" du tableau des prescriptions est visible
    cy.contains('Variants').should('exist');
    // Les liens "Fichiers" et "Variants" du tableau des requêtes sont visibles
    cy.get('div[id*="tab-requests"]').click({force: true});
    cy.contains('Fichiers').should('exist');
    cy.contains('Variants').should('exist');

    // Accéder à la page de tous les variants
    cy.visitVariantsPage();
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visitVariantsPatientPage(epCUSM_ldmCHUSJ.patientProbId, epCUSM_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCUSM.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visitVariantsPatientPage(epCUSM_ldmCUSM.patientProbId, epCUSM_ldmCUSM.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visitPrescriptionEntityPage(epCHUS_ldmCHUS.prescriptionId);
    cy.contains(epCHUS_ldmCHUS.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CHUS
    cy.visitVariantsPatientPage(epCHUS_ldmCHUS.patientProbId, epCHUS_ldmCHUS.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Les liens de la footer ne sont pas visibles
    cy.contains('Zeppelin').should('not.exist', {timeout: 20*1000});
    cy.contains('Fhir').should('not.exist', {timeout: 20*1000});
  });

  it('Généticien (CHUS)', () => {
    cy.login(Cypress.env('username_G_CHUS'), Cypress.env('password'));

    // Les prescriptions de tous les EPs sont visibles
    cy.visitPrescriptionsPage();
    cy.contains('LDM-CHUSJ').should('exist');
    cy.contains('LDM-CUSM').should('exist');
    cy.contains(/^LDM-CHUS$/).should('exist');
    // Le lien "Variants" du tableau des prescriptions est visible
    cy.contains('Variants').should('exist');
    // Les liens "Fichiers" et "Variants" du tableau des requêtes sont visibles
    cy.get('div[id*="tab-requests"]').click({force: true});
    cy.contains('Fichiers').should('exist');
    cy.contains('Variants').should('exist');

    // Accéder à la page de tous les variants
    cy.visitVariantsPage();
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visitVariantsPatientPage(epCUSM_ldmCHUSJ.patientProbId, epCUSM_ldmCHUSJ.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visitPrescriptionEntityPage(epCUSM_ldmCUSM.prescriptionId);
    cy.contains('*****').should('exist');
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('not.exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visitVariantsPatientPage(epCUSM_ldmCUSM.patientProbId, epCUSM_ldmCUSM.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visitPrescriptionEntityPage(epCHUS_ldmCHUS.prescriptionId);
    cy.contains(epCHUS_ldmCHUS.firstNameProb).should('exist');
    cy.contains('Variants').should('exist');
    cy.contains('Fichiers').should('exist');
    // Accéder aux variants d'un patient du CHUS
    cy.visitVariantsPatientPage(epCHUS_ldmCHUS.patientProbId, epCHUS_ldmCHUS.prescriptionId, 6);
    cy.contains('Résultats').should('exist', {timeout: 20*1000});

    // Les liens de la footer ne sont pas visibles
    cy.contains('Zeppelin').should('not.exist', {timeout: 20*1000});
    cy.contains('Fhir').should('not.exist', {timeout: 20*1000});
  });

  it('Docteur (CUSM)', () => {
    cy.login(Cypress.env('username_D_CUSM'), Cypress.env('password'));

    // Les prescriptions uniquement du EP CUSM sont visibles
    cy.visitPrescriptionsPage();
    cy.contains(/^CHUSJ$/).should('not.exist');
    cy.contains(/^CUSM$/).should('exist');
    cy.contains(/^CHUS$/).should('not.exist');
    // Le lien "Variants" du tableau des prescriptions n'est pas isible
    cy.contains('Variants').should('not.exist');
    // Les liens "Fichiers" et "Variants" du tableau des requêtes ne sont pas visibles
    cy.get('div[id*="tab-requests"]').click({force: true});
    cy.contains('Fichiers').should('not.exist');
    cy.contains('Variants').should('not.exist');

    // Accéder à la page de tous les variants est impossible
    cy.visit('/snv/exploration');
    cy.contains('403').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ est impossible
    cy.visit('/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains('403').should('exist', {timeout: 20*1000});
    // Accéder aux variants d'un patient du CHUSJ est impossible
    cy.visit('/snv/exploration/patient/'+epCHUSJ_ldmCHUSJ.patientProbId+'/'+epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains('403').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
    cy.visit('/prescription/entity/'+epCUSM_ldmCHUSJ.prescriptionId);
    cy.wait('@getPOSTgraphql', {timeout: 5000});
    cy.contains(epCUSM_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('not.exist');
    cy.contains('Fichiers').should('not.exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ) est impossible
    cy.visit('/snv/exploration/patient/'+epCUSM_ldmCHUSJ.patientProbId+'/'+epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains('403').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
    cy.visit('/prescription/entity/'+epCUSM_ldmCUSM.prescriptionId);
    cy.wait('@getPOSTgraphql', {timeout: 5000});
    cy.contains(epCUSM_ldmCUSM.firstNameProb).should('exist');
    cy.contains('Variants').should('not.exist');
    cy.contains('Fichiers').should('not.exist');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM) est impossible
    cy.visit('/snv/exploration/patient/'+epCUSM_ldmCUSM.patientProbId+'/'+epCUSM_ldmCUSM.prescriptionId);
    cy.contains('403').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS est impossible
    cy.visit('/prescription/entity/'+epCHUS_ldmCHUS.prescriptionId);
    cy.contains('403').should('exist', {timeout: 20*1000});
    // Accéder aux variants d'un patient du CHUS est impossible
    cy.visit('/snv/exploration/patient/'+epCHUS_ldmCHUS.patientProbId+'/'+epCHUS_ldmCHUS.prescriptionId);
    cy.contains('403').should('exist', {timeout: 20*1000});

    // Les liens de la footer ne sont pas visibles
    cy.contains('Zeppelin').should('not.exist', {timeout: 20*1000});
    cy.contains('Fhir').should('not.exist', {timeout: 20*1000});
  });

  it('Résident (CHUSJ)', () => {
    cy.login(Cypress.env('username_R_CHUSJ'), Cypress.env('password'));

    // Les prescriptions uniquement du EP CHUSJ sont visibles
    cy.visitPrescriptionsPage();
    cy.contains(/^CHUSJ$/).should('exist');
    cy.contains(/^CUSM$/).should('not.exist');
    cy.contains(/^CHUS$/).should('not.exist');
    // Le lien "Variants" du tableau des prescriptions n'est pas isible
    cy.contains('Variants').should('not.exist');
    // Les liens "Fichiers" et "Variants" du tableau des requêtes ne sont pas visibles
    cy.get('div[id*="tab-requests"]').click({force: true});
    cy.contains('Fichiers').should('not.exist');
    cy.contains('Variants').should('not.exist');

    // Accéder à la page de tous les variants est impossible
    cy.visit('/snv/exploration');
    cy.contains('403').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
    cy.visit('/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.wait('@getPOSTgraphql', {timeout: 5000});
    cy.contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    cy.contains('Variants').should('not.exist');
    cy.contains('Fichiers').should('not.exist');
    // Accéder aux variants d'un patient du CHUSJ est impossible
    cy.visit('/snv/exploration/patient/'+epCHUSJ_ldmCHUSJ.patientProbId+'/'+epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.contains('403').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ) est impossible
    cy.visit('/prescription/entity/'+epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains('403').should('exist', {timeout: 20*1000});
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ) est impossible
    cy.visit('/snv/exploration/patient/'+epCUSM_ldmCHUSJ.patientProbId+'/'+epCUSM_ldmCHUSJ.prescriptionId);
    cy.contains('403').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ) est impossible
    cy.visit('/prescription/entity/'+epCUSM_ldmCUSM.prescriptionId);
    cy.contains('403').should('exist', {timeout: 20*1000});
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ) est impossible
    cy.visit('/snv/exploration/patient/'+epCUSM_ldmCUSM.patientProbId+'/'+epCUSM_ldmCUSM.prescriptionId);
    cy.contains('403').should('exist', {timeout: 20*1000});

    // Accéder à la page Prescription d'un patient du CHUS est impossible
    cy.visit('/prescription/entity/'+epCHUS_ldmCHUS.prescriptionId);
    cy.contains('403').should('exist', {timeout: 20*1000});
    // Accéder aux variants d'un patient du CHUS est impossible
    cy.visit('/snv/exploration/patient/'+epCHUS_ldmCHUS.patientProbId+'/'+epCHUS_ldmCHUS.prescriptionId);
    cy.contains('403').should('exist', {timeout: 20*1000});

    // Les liens de la footer ne sont pas visibles
    cy.contains('Zeppelin').should('not.exist', {timeout: 20*1000});
    cy.contains('Fhir').should('not.exist', {timeout: 20*1000});
  });
});
