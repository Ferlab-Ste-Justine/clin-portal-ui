/// <reference types="Cypress" />
import '../../support/commands';

const prescs_CUSM_RGDI = JSON.parse(Cypress.env('prescs_CUSM_RGDI'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

  cy.visitPrescriptionsPage();

  cy.checkValueFacet(0, 'Approuvée');
  cy.checkValueFacet(2, 'RGDI');
  cy.checkValueFacet(3, 'LDM-CUSM');

  cy.resetColumns(0);

  cy.intercept('**/user').as('getUser2');
  cy.get('div[class="ant-popover-inner"]')
    .find('div[class="ant-space-item"]').contains('Modifiée le')
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getUser2', {timeout: 20*1000});

  cy.intercept('**/user').as('getUser3');
  cy.get('div[class="ant-popover-inner"]')
    .find('div[class="ant-space-item"]').contains('Requérant')
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getUser3', {timeout: 20*1000});

  cy.intercept('**/user').as('getUser4');
  cy.get('div[class="ant-popover-inner"]')
    .find('div[class="ant-space-item"]').contains('Prénatal')
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getUser4', {timeout: 20*1000});

  cy.intercept('**/user').as('getUser5');
  cy.get('div[class="ant-popover-inner"]')
    .find('div[class="ant-space-item"]').contains('Dossier')
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getUser5', {timeout: 20*1000});

  cy.get('body').contains('Prescriptions (3)').should('exist');
});

afterEach(() => {
  cy.logout();
});

describe('Tableau des prescriptions', () => {
  describe('Vérifier les informations affichées', () => {
    const randomPresc = Math.floor(Math.random() * 3);

    it('De la prescription #'+(randomPresc+1)+' (aléatoire)', () => {
      cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId+'"]').contains(prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId).should('exist');
      cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId+'"]').contains(prescs_CUSM_RGDI.prescriptions[randomPresc].requests[0].patientId).should('exist');
      cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId+'"]').contains('Approuvée').should('exist');
      cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId+'"]').contains(prescs_CUSM_RGDI.stampDate).should('exist');
      cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId+'"]').contains(prescs_CUSM_RGDI.stampDate).should('exist');
      cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId+'"]').contains('RGDI').should('exist');
      cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId+'"]').contains('LDM-CUSM').should('exist');
      cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId+'"]').contains('CUSM').should('exist');
      cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId+'"]').contains('Non').should('exist');
      cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId+'"]').contains(prescs_CUSM_RGDI.prescriptions[randomPresc].requests[0].mrn).should('exist');
      cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId+'"]').contains('Variants').should('exist');
    });
  });

  describe('Valider les liens disponibles', () => {
    const randomPresc = Math.floor(Math.random() * 3);

    it('Lien Prescription de la prescription #'+(randomPresc+1)+' (aléatoire)', () => {
      cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
      cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId+'"]').find('a[href*="prescription"]').click({force: true});
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});

      cy.contains('Prescription ID : '+prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId).should('exist', {timeout: 20*1000});
    });

    it('Lien Variants de la prescription #'+(randomPresc+1)+' (aléatoire)', () => {
      cy.intercept('POST', '**/graphql').as('getPOSTgraphql9');
      cy.get('tr[data-row-key="'+prescs_CUSM_RGDI.prescriptions[randomPresc].prescriptionId+'"]').find('a[href*="snv"]').click({force: true});
      cy.wait('@getPOSTgraphql9', {timeout: 20*1000});
      cy.wait('@getPOSTgraphql9', {timeout: 20*1000});
      cy.wait('@getPOSTgraphql9', {timeout: 20*1000});
      cy.contains('Patient ID : '+prescs_CUSM_RGDI.prescriptions[randomPresc].requests[0].patientId).should('exist', {timeout: 20*1000});
    });
  });
});