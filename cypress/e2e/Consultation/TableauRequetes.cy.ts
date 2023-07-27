/// <reference types="Cypress" />
import '../../support/commands';

const prescs_CUSM_RGDI = JSON.parse(Cypress.env('prescs_CUSM_RGDI'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

  cy.visitPrescriptionsPage();

  cy.checkValueFacet(0, 'Approuvée');
  cy.checkValueFacet(2, 'RGDI');
  cy.checkValueFacet(3, 'LDM-CUSM');

  cy.get('div[id*="tab-requests"]').click({force: true});
  cy.resetColumns(1);

  cy.intercept('**/user').as('getUser2');
  cy.get('div[class="ant-popover-inner"]').eq(1)
    .find('div[class="ant-space-item"]').contains('Modifiée le')
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getUser2', {timeout: 20*1000});

  cy.intercept('**/user').as('getUser3');
  cy.get('div[class="ant-popover-inner"]').eq(1)
    .find('div[class="ant-space-item"]').contains('Requérant')
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getUser3', {timeout: 20*1000});

  cy.intercept('**/user').as('getUser4');
  cy.get('div[class="ant-popover-inner"]').eq(1)
    .find('div[class="ant-space-item"]').contains('Prénatal')
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getUser4', {timeout: 20*1000});

  cy.intercept('**/user').as('getUser5');
  cy.get('div[class="ant-popover-inner"]').eq(1)
    .find('div[class="ant-space-item"]').contains('Dossier')
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getUser5', {timeout: 20*1000});

  cy.get('body').contains('Requêtes (9)').should('exist');
});

describe('Page des prescriptions et requêtes - Consultation du tableau des requêtes', () => {

  it('Vérifier les informations affichées Requête aléatoire d\'une prescription aléatoire', () => {
    const randomPresc = Math.floor(Math.random() * 3);
    const randomReq = Math.floor(Math.random() * 3);
    cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].requestId+'"]').contains(prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].requestId).should('exist');
    cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].requestId+'"]').contains(prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].sampleId).should('exist');
    cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].requestId+'"]').contains(prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].patientId).should('exist');
    cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].requestId+'"]').contains('Complétée').should('exist');
    cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].requestId+'"]').contains(prescs_CUSM_RGDI.stampDate).should('exist');
    cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].requestId+'"]').contains(prescs_CUSM_RGDI.stampDate).should('exist');
    cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].requestId+'"]').contains('RGDI').should('exist');
    cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].requestId+'"]').contains('LDM-CUSM').should('exist');
    cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].requestId+'"]').contains('CUSM').should('exist');
    cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].requestId+'"]').contains(prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId).should('exist');
    cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].requestId+'"]').contains('Non').should('exist');
    cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].requestId+'"]').contains(prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].mrn).should('exist');
  });

  it('Valider les liens disponibles Lien Requête d\'une requête aléatoire d\'une prescription aléatoire', () => {
    const randomPresc = Math.floor(Math.random() * 3);
    const randomReq = Math.floor(Math.random() * 3);
    cy.clickAndIntercept('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].requestId+'"] a[href*="prescription"]', 'POST', '**/$graphql*', 1, 0);
    cy.get('div[role="tablist"]').contains(prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId).should('exist', {timeout: 20*1000});
  });

  it('Valider les liens disponibles Lien Prescription d\'une requête aléatoire d\'une prescription aléatoire', () => {
    const randomPresc = Math.floor(Math.random() * 3);
    const randomReq = Math.floor(Math.random() * 3);
    cy.clickAndIntercept('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].requests[randomReq].requestId+'"] a[href*="prescription"]', 'POST', '**/$graphql*', 1, 1);
    cy.get('div[role="tablist"]').contains(prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId).should('exist', {timeout: 20*1000});
  });

});
  