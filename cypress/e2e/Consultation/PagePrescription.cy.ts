/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

  cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
  cy.visit('/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId);
  cy.wait('@getPOSTgraphql', {timeout: 5000});
});

afterEach(() => {
  cy.logout();
});

describe('Page d\'une prescription', () => {
  describe('Vérifier les informations affichées', () => {
    it('De la section Analyse', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(0).contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(0).contains('Approuvée').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(0).contains('Retard global de développement / Déficience intellectuelle (Trio) (RGDI)').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(0).contains(epCHUSJ_ldmCHUSJ.stampDate).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(0).contains('LDM-CHUSJ').should('exist');
    });
    
    it('De la section Patient', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(1).contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(1).contains(epCHUSJ_ldmCHUSJ.mrnProb).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(1).contains(epCHUSJ_ldmCHUSJ.ramqProb).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(1).contains(epCHUSJ_ldmCHUSJ.lastNameProb).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(1).contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(1).contains(epCHUSJ_ldmCHUSJ.birthdayProb).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(1).contains(epCHUSJ_ldmCHUSJ.genderProb).should('exist');
    });
    
    it('De la section Information clinique', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).contains('Complétée').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).contains(epCHUSJ_ldmCHUSJ.stampDate).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).contains('SP_'+epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).contains('Fichiers').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).contains('Variants').should('exist');
    });
    
    it('De la section Mère', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains(epCHUSJ_ldmCHUSJ.mrnMth, {matchCase: false}).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains(epCHUSJ_ldmCHUSJ.ramqMth).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains(epCHUSJ_ldmCHUSJ.lastNameMth).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains(epCHUSJ_ldmCHUSJ.firstNameMth).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains(epCHUSJ_ldmCHUSJ.birthdayMth).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('Féminin').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains(epCHUSJ_ldmCHUSJ.statusMth).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('Complétée').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains(epCHUSJ_ldmCHUSJ.stampDate).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('SP_'+epCHUSJ_ldmCHUSJ.sampleMthId, {matchCase: false}).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('Fichiers').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('Variants').should('exist');
    });
    
    it('De la section Père', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).contains(epCHUSJ_ldmCHUSJ.mrnFth).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).contains(epCHUSJ_ldmCHUSJ.ramqFth).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).contains(epCHUSJ_ldmCHUSJ.lastNameFth).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).contains(epCHUSJ_ldmCHUSJ.firstNameFth).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).contains(epCHUSJ_ldmCHUSJ.birthdayFth).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).contains('Masculin').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).contains(epCHUSJ_ldmCHUSJ.statusFth).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).contains(epCHUSJ_ldmCHUSJ.requestFthId).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).contains('Complétée').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).contains(epCHUSJ_ldmCHUSJ.stampDate).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).contains('SP_'+epCHUSJ_ldmCHUSJ.sampleFthId).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).contains('Fichiers').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).contains('Variants').should('exist');
    });
  });
 
  describe('Valider les liens disponibles', () => {
    it('Bouton Voir les variants', () => {
      cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
      cy.get('div[class*="Header_contentHeader"]').find('button[type="button"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
      cy.contains('Patient ID : '+epCHUSJ_ldmCHUSJ.patientProbId).should('exist', {timeout: 20*1000});
    });

    it('Lien Fichiers (Cas-index)', () => {
      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('a[href*="archive"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
      cy.contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist', {timeout: 20*1000});
    });

    it('Lien Fichiers (Mère)', () => {
      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('a[href*="archive"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
      cy.contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist', {timeout: 20*1000});
    });

    it('Lien Fichiers (Père)', () => {
      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('a[href*="archive"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
      cy.contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist', {timeout: 20*1000});
    });

    it('Lien Variants (Cas-index)', () => {
      cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('a[href*="snv"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
      cy.contains('Patient ID : '+epCHUSJ_ldmCHUSJ.patientProbId).should('exist', {timeout: 20*1000});
    });

    it('Lien Variants (Mère)', () => {
      cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('a[href*="snv"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
      cy.contains('Patient ID : '+epCHUSJ_ldmCHUSJ.patientMthId).should('exist', {timeout: 20*1000});
    });

    it('Lien Variants (Père)', () => {
      cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('a[href*="snv"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
      cy.contains('Patient ID : '+epCHUSJ_ldmCHUSJ.patientFthId).should('exist', {timeout: 20*1000});
    });
  });

  describe('Valider les panneaux masquables', () => {
    it('Panneau Information clinique', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="ant-collapse-content-active"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="ant-collapse-content-active"]').should('exist');
    });

    it('Panneau Mère', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
    });

    it('Panneau Père', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('div[class*="ant-collapse-content-active"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('div[class*="ant-collapse-content-active"]').should('exist');
    });
  });
});