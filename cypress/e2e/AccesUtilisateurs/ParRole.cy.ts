/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('mrn_283773'));
const epCUSM_ldmCHUSJ = JSON.parse(Cypress.env('mrn_283824'));
const epCUSM_ldmCUSM = JSON.parse(Cypress.env('mrn_283897'));
const epCHUS_ldmCHUS = JSON.parse(Cypress.env('mrn_283834'));

const strPrescUrlCHUSJCHUSJ = '/prescription/entity/' + epCHUSJ_ldmCHUSJ.prescriptionId;
const strPrescUrlCUSMCHUSJ = '/prescription/entity/' + epCUSM_ldmCHUSJ.prescriptionId;
const strPrescUrlCUSMCUSM = '/prescription/entity/' + epCUSM_ldmCUSM.prescriptionId;
const strPrescUrlCHUSCHUS = '/prescription/entity/' + epCHUS_ldmCHUS.prescriptionId;
const strVarUrlCHUSJCHUSJ =
  '/snv/exploration/patient/' + epCHUSJ_ldmCHUSJ.patientId + '/' + epCHUSJ_ldmCHUSJ.prescriptionId;
const strVarUrlCUSMCHUSJ =
  '/snv/exploration/patient/' + epCUSM_ldmCHUSJ.patientId + '/' + epCUSM_ldmCHUSJ.prescriptionId;
const strVarUrlCUSMCUSM =
  '/snv/exploration/patient/' + epCUSM_ldmCUSM.patientId + '/' + epCUSM_ldmCUSM.prescriptionId;
const strVarUrlCHUSCHUS =
  '/snv/exploration/patient/' + epCHUS_ldmCHUS.patientId + '/' + epCHUS_ldmCHUS.prescriptionId;

describe('Accès des utilisateurs', () => {
  it('Docteur et généticien (CHUSJ, CUSM, CHUS)', () => {
    // Se connecter
    cy.visit('/');
    cy.wait(2000);
    cy.get('input[type="email"]').type(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'));
    cy.get('input[type="password"]').type(Cypress.env('password'), { log: false });
    cy.get('button[type="submit"]').click();

    // Les prescriptions de tous les EPs sont visibles
    cy.visit('/prescription/search');
    cy.wait(2000);
    cy.contains('LDM-CHUSJ');
    cy.contains('LDM-CUSM');
    cy.contains('LDM-CHUS');

    // Accéder à la page de tous les variants
    cy.visit('/snv/exploration');
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visit(strPrescUrlCHUSJCHUSJ);
    cy.wait(2000);
    cy.contains('Jacob');
    cy.contains('Variants');
    cy.contains('Fichiers');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visit(strVarUrlCHUSJCHUSJ);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visit(strPrescUrlCUSMCHUSJ);
    cy.wait(2000);
    cy.contains('Henri');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visit(strVarUrlCUSMCHUSJ);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visit(strPrescUrlCUSMCUSM);
    cy.wait(2000);
    cy.contains('Maya');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visit(strVarUrlCUSMCUSM);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visit(strPrescUrlCHUSCHUS);
    cy.wait(2000);
    cy.contains('Tristan');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CHUS
    cy.visit(strVarUrlCHUSCHUS);
    cy.wait(2000);
    cy.contains('Résultats');

    cy.logout;
  });

  it('Généticien (CHUSJ, CUSM, CHUS)', () => {
    // Se connecter
    cy.visit('/');
    cy.wait(2000);
    cy.get('input[type="email"]').type(Cypress.env('username_G_CHUSJ_CUSM_CHUS'));
    cy.get('input[type="password"]').type(Cypress.env('password'), { log: false });
    cy.get('button[type="submit"]').click();

    // Les prescriptions de tous les EPs sont visibles
    cy.visit('/prescription/search');
    cy.wait(2000);
    cy.contains('LDM-CHUSJ');
    cy.contains('LDM-CUSM');
    cy.contains('LDM-CHUS');

    // Accéder à la page de tous les variants
    cy.visit('/snv/exploration');
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visit(strPrescUrlCHUSJCHUSJ);
    cy.wait(2000);
    cy.contains('Jacob');
    cy.contains('Variants');
    cy.contains('Fichiers');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visit(strVarUrlCHUSJCHUSJ);
    cy.wait(2000);

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visit(strPrescUrlCUSMCHUSJ);
    cy.wait(2000);
    cy.contains('Henri');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visit(strVarUrlCUSMCHUSJ);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visit(strPrescUrlCUSMCUSM);
    cy.wait(2000);
    cy.contains('Maya');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visit(strVarUrlCUSMCUSM);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visit(strPrescUrlCHUSCHUS);
    cy.wait(2000);
    cy.contains('Tristan');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CHUS
    cy.visit(strVarUrlCHUSCHUS);
    cy.wait(2000);
    cy.contains('Résultats');

    cy.logout;
  });

  it('Docteur et généticien (CHUSJ)', () => {
    // Se connecter
    cy.visit('/');
    cy.wait(2000);
    cy.get('input[type="email"]').type(Cypress.env('username_DG_CHUSJ'));
    cy.get('input[type="password"]').type(Cypress.env('password'), { log: false });
    cy.get('button[type="submit"]').click();

    // Les prescriptions de tous les EPs sont visibles
    cy.visit('/prescription/search');
    cy.wait(2000);
    cy.contains('LDM-CHUSJ');
    cy.contains('LDM-CUSM');
    cy.contains('LDM-CHUS');

    // Accéder à la page de tous les variants
    cy.visit('/snv/exploration');
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visit(strPrescUrlCHUSJCHUSJ);
    cy.wait(2000);
    cy.contains('Jacob');
    cy.contains('Variants');
    cy.contains('Fichiers');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visit(strVarUrlCHUSJCHUSJ);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visit(strPrescUrlCUSMCHUSJ);
    cy.wait(2000);
    cy.contains('Henri');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visit(strVarUrlCUSMCHUSJ);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visit(strPrescUrlCUSMCUSM);
    cy.wait(2000);
    cy.contains('*****');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visit(strVarUrlCUSMCUSM);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visit(strPrescUrlCHUSCHUS);
    cy.wait(2000);
    cy.contains('*****');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CHUS
    cy.visit(strVarUrlCHUSCHUS);
    cy.wait(2000);
    cy.contains('Résultats');

    cy.logout;
  });

  it('Généticien (CHUSJ)', () => {
    // Se connecter
    cy.visit('/');
    cy.wait(2000);
    cy.get('input[type="email"]').type(Cypress.env('username_G_CHUSJ'));
    cy.get('input[type="password"]').type(Cypress.env('password'), { log: false });
    cy.get('button[type="submit"]').click();

    // Les prescriptions de tous les EPs sont visibles
    cy.visit('/prescription/search');
    cy.wait(2000);
    cy.contains('LDM-CHUSJ');
    cy.contains('LDM-CUSM');
    cy.contains('LDM-CHUS');

    // Accéder à la page de tous les variants
    cy.visit('/snv/exploration');
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visit(strPrescUrlCHUSJCHUSJ);
    cy.wait(2000);
    cy.contains('Jacob');
    cy.contains('Variants');
    cy.contains('Fichiers');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visit(strVarUrlCHUSJCHUSJ);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visit(strPrescUrlCUSMCHUSJ);
    cy.wait(2000);
    cy.contains('Henri');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visit(strVarUrlCUSMCHUSJ);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visit(strPrescUrlCUSMCUSM);
    cy.wait(2000);
    cy.contains('*****');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visit(strVarUrlCUSMCUSM);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visit(strPrescUrlCHUSCHUS);
    cy.wait(2000);
    cy.contains('*****');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CHUS
    cy.visit(strVarUrlCHUSCHUS);
    cy.wait(2000);
    cy.contains('Résultats');

    cy.logout;
  });

  it('Généticien (CUSM)', () => {
    // Se connecter
    cy.visit('/');
    cy.wait(2000);
    cy.get('input[type="email"]').type(Cypress.env('username_G_CUSM'));
    cy.get('input[type="password"]').type(Cypress.env('password'), { log: false });
    cy.get('button[type="submit"]').click();

    // Les prescriptions de tous les EPs sont visibles
    cy.visit('/prescription/search');
    cy.wait(2000);
    cy.contains('LDM-CHUSJ');
    cy.contains('LDM-CUSM');
    cy.contains('LDM-CHUS');

    // Accéder à la page de tous les variants
    cy.visit('/snv/exploration');
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visit(strPrescUrlCHUSJCHUSJ);
    cy.wait(2000);
    cy.contains('*****');
    cy.contains('Variants');
    cy.contains('Fichiers');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visit(strVarUrlCHUSJCHUSJ);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visit(strPrescUrlCUSMCHUSJ);
    cy.wait(2000);
    cy.contains('*****');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visit(strVarUrlCUSMCHUSJ);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visit(strPrescUrlCUSMCUSM);
    cy.wait(2000);
    cy.contains('Maya');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visit(strVarUrlCUSMCUSM);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visit(strPrescUrlCHUSCHUS);
    cy.wait(2000);
    cy.contains('*****');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CHUS
    cy.visit(strVarUrlCHUSCHUS);
    cy.wait(2000);
    cy.contains('Résultats');

    cy.logout;
  });

  it('Docteur et généticien (CHUS)', () => {
    // Se connecter
    cy.visit('/');
    cy.wait(2000);
    cy.get('input[type="email"]').type(Cypress.env('username_DG_CHUS'));
    cy.get('input[type="password"]').type(Cypress.env('password'), { log: false });
    cy.get('button[type="submit"]').click();

    // Les prescriptions de tous les EPs sont visibles
    cy.visit('/prescription/search');
    cy.wait(2000);
    cy.contains('LDM-CHUSJ');
    cy.contains('LDM-CUSM');
    cy.contains('LDM-CHUS');

    // Accéder à la page de tous les variants
    cy.visit('/snv/exploration');
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visit(strPrescUrlCHUSJCHUSJ);
    cy.wait(2000);
    cy.contains('*****');
    cy.contains('Variants');
    cy.contains('Fichiers');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visit(strVarUrlCHUSJCHUSJ);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visit(strPrescUrlCUSMCHUSJ);
    cy.wait(2000);
    cy.contains('*****');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visit(strVarUrlCUSMCHUSJ);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visit(strPrescUrlCUSMCUSM);
    cy.wait(2000);
    cy.contains('*****');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visit(strVarUrlCUSMCUSM);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visit(strPrescUrlCHUSCHUS);
    cy.wait(2000);
    cy.contains('Tristan');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CHUS
    cy.visit(strVarUrlCHUSCHUS);
    cy.wait(2000);
    cy.contains('Résultats');

    cy.logout;
  });

  it('Généticien (CHUS)', () => {
    // Se connecter
    cy.visit('/');
    cy.wait(2000);
    cy.get('input[type="email"]').type(Cypress.env('username_G_CHUS'));
    cy.get('input[type="password"]').type(Cypress.env('password'), { log: false });
    cy.get('button[type="submit"]').click();

    // Les prescriptions de tous les EPs sont visibles
    cy.visit('/prescription/search');
    cy.wait(2000);
    cy.contains('LDM-CHUSJ');
    cy.contains('LDM-CUSM');
    cy.contains('LDM-CHUS');

    // Accéder à la page de tous les variants
    cy.visit('/snv/exploration');
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CHUSJ
    cy.visit(strPrescUrlCHUSJCHUSJ);
    cy.wait(2000);
    cy.contains('*****');
    cy.contains('Variants');
    cy.contains('Fichiers');

    // Accéder aux variants d'un patient du CHUSJ
    cy.visit(strVarUrlCHUSJCHUSJ);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CHUSJ)
    cy.visit(strPrescUrlCUSMCHUSJ);
    cy.wait(2000);
    cy.contains('*****');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CUSM (LDM: CHUSJ)
    cy.visit(strVarUrlCUSMCHUSJ);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CUSM (LDM: CUSM)
    cy.visit(strPrescUrlCUSMCUSM);
    cy.wait(2000);
    cy.contains('*****');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CUSM (LDM: CUSM)
    cy.visit(strVarUrlCUSMCUSM);
    cy.wait(2000);
    cy.contains('Résultats');

    // Accéder à la page Prescription d'un patient du CHUS
    cy.visit(strPrescUrlCHUSCHUS);
    cy.wait(2000);
    cy.contains('Tristan');
    cy.contains('Variants');
    cy.contains('Fichiers');
    // Accéder aux variants d'un patient du CHUS
    cy.visit(strVarUrlCHUSCHUS);
    cy.wait(2000);
    cy.contains('Résultats');

    cy.logout;
  });
});
