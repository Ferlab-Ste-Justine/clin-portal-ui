/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

afterEach(() => {
  cy.logout();
});

describe('Page d\'accueil', () => {
  describe('Rechercher des prescriptions', () => {
    it('Par numéro de prescription', () => {
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.prescriptionId, {force: true});

      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('a[href*="/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    });

    it('Par numéro de requête du cas-index', () => {
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.requestProbId, {force: true});

      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('a[href*="/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    });

    it('Par numéro de dossier du cas-index', () => {
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.mrnProb, {force: true});

      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('a[href*="/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    });

    it('Par numéro de patient du cas-index', () => {
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.patientProbId, {force: true});

      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('a[href*="/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    });

    it('Par numéro d\'échantillon du cas-index', () => {
      cy.get('input').first().type('SP_'+epCHUSJ_ldmCHUSJ.sampleProbId, {force: true});

      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('a[href*="/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    });

    it('Par numéro de requête de la mère', () => {
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.requestMthId, {force: true});

      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('a[href*="/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    });

    it('Par numéro de dossier de la mère', () => {
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.mrnMth, {force: true});

      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('a[href*="/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    });

    it('Par numéro de patient de la mère', () => {
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.patientMthId, {force: true});

      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('a[href*="/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    });

    it('Par numéro d\'échantillon de la mère', () => {
      cy.get('input').first().type('SP_'+epCHUSJ_ldmCHUSJ.sampleMthId, {force: true});

      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('a[href*="/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    });

    it('Par numéro de requête du père', () => {
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.requestFthId, {force: true});

      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('a[href*="/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    });

    it('Par numéro de dossier du père', () => {
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.mrnFth, {force: true});

      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('a[href*="/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    });

    it('Par numéro de patient du père', () => {
      cy.get('input').first().type(epCHUSJ_ldmCHUSJ.patientFthId, {force: true});

      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('a[href*="/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    });

    it('Par numéro d\'échantillon du père', () => {
      cy.get('input').first().type('SP_'+epCHUSJ_ldmCHUSJ.sampleFthId, {force: true});

      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('a[href*="/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId+'"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains(epCHUSJ_ldmCHUSJ.lastNameProb+' '+epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
    });
  });

  describe('Rechercher des variants', () => {
    it('Par locus', () => {
      cy.get('input').last().type('5-96423719-c-t', {force: true});

      cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
      cy.get('a[href*="/variant/entity/"]').find('div[class="ant-space-item"]').contains('rs456709').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});
      cy.wait('@getPOSTgraphql', {timeout: 5000});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains('chr5:g.96423719C>T').should('exist');
    });

    it('Par dbSNP', () => {
      cy.get('input').last().type('RS456709', {force: true});

      cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
      cy.get('a[href*="/variant/entity/"]').find('div[class="ant-space-item"]').contains('rs456709').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});
      cy.wait('@getPOSTgraphql', {timeout: 5000});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains('chr5:g.96423719C>T').should('exist');
    });

    it('Par ClinVar', () => {
      cy.get('input').last().type('1183539', {force: true});

      cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
      cy.get('a[href*="/variant/entity/"]').find('div[class="ant-space-item"]').contains('rs456709').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 5000});
      cy.wait('@getPOSTgraphql', {timeout: 5000});
      cy.wait('@getPOSTgraphql', {timeout: 5000});

      cy.get('body').contains('chr5:g.96423719C>T').should('exist');
    });
  });
});