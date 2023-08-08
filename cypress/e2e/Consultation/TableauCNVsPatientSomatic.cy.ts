/// <reference types="Cypress" />
import '../../support/commands';

const presc_SOMATIC = JSON.parse(Cypress.env('presc_SOMATIC'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);

  cy.resetColumns(0);

  cy.intercept('**/user').as('getUser2');
  cy.get('div[class="ant-popover-inner"]')
    .find('div[class="ant-space-item"]').contains('GT')
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getUser2', {timeout: 20*1000});

  cy.intercept('**/user').as('getUser3');
  cy.get('div[class="ant-popover-inner"]')
    .find('div[class="ant-space-item"]').contains('Filtre')
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getUser3', {timeout: 20*1000});

  cy.intercept('**/user').as('getUser4');
  cy.get('div[class="ant-popover-inner"]')
    .find('div[class="ant-space-item"]').contains('Qual.')
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getUser4', {timeout: 20*1000});

  cy.intercept('**/user').as('getUser6');
  cy.get('div[class="ant-popover-inner"]')
    .find('div[class="ant-space-item"]').contains('BC')
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getUser6', {timeout: 20*1000});

  cy.intercept('**/user').as('getUser7');
  cy.get('div[class="ant-popover-inner"]')
    .find('div[class="ant-space-item"]').contains('PE')
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getUser7', {timeout: 20*1000});
});

describe('Page des CNVs d\'un patient (somatic) - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains('LOSS:chr1:450731-7249626').should('exist');
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains(/^1$/).should('exist');
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains('450 730').should('exist');
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains('7 249 625').should('exist');
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains(/^LOSS$/).should('exist');
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains('6.8 Mb').should('exist');
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains('1.04404').should('exist');
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains(/^191$/).should('exist');
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains('CDK11A').should('exist');
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains('DVL1').should('exist');
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains('LINC02781').should('exist');
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains('0/1').should('exist');
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains('CnvCopyRatio, LoDFail').should('exist');
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains(/^128$/).should('exist');
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains('1979').should('exist');
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains('25, 7').should('exist');
  });
 
  it('Valider les liens disponibles', () => {
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains(/^191$/).click({force: true});
    cy.contains('LOSS:chr1:450731-7249626').should('exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');

    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains('CDK11A').click({force: true});
    cy.contains('LOSS:chr1:450731-7249626').should('exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');

    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').find('svg[class="anticon"]').click({force: true});
    cy.contains('Alignement et variant').should('exist');
    cy.contains('Zoom in to see features').should('exist');
    cy.contains('ERROR').should('not.exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');
  });
  
  it('Valider les fonctionnalités du tableau - Tris [CLIN-2135]', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('thead[class="ant-table-thead"]').contains('Variant').click({force: true});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('GAIN:chr10:104353843-104454535').should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('thead[class="ant-table-thead"]').contains('Variant').click({force: true});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('LOSS:chrX:624329-13938568').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Variant').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql3');
    cy.get('thead[class="ant-table-thead"]').contains('Chr.').click({force: true});
    cy.wait('@getPOSTgraphql3', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql3', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql3', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains(/^1$/).should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql4');
    cy.get('thead[class="ant-table-thead"]').contains('Chr.').click({force: true});
    cy.wait('@getPOSTgraphql4', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql4', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql4', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains(/^X$/).should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Chr.').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql5');
    cy.get('thead[class="ant-table-thead"]').contains('Début').click({force: true});
    cy.wait('@getPOSTgraphql5', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql5', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql5', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('66 872').should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql6');
    cy.get('thead[class="ant-table-thead"]').contains('Début').click({force: true});
    cy.wait('@getPOSTgraphql6', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql6', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql6', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('228 007 104').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Début').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql7');
    cy.get('thead[class="ant-table-thead"]').contains('Fin').click({force: true});
    cy.wait('@getPOSTgraphql7', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql7', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql7', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('465 288').should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql8');
    cy.get('thead[class="ant-table-thead"]').contains('Fin').click({force: true});
    cy.wait('@getPOSTgraphql8', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql8', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql8', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('228 511 965').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Fin').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql9');
    cy.get('thead[class="ant-table-thead"]').contains('Événement').click({force: true});
    cy.wait('@getPOSTgraphql9', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql9', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql9', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('GAIN').should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql10');
    cy.get('thead[class="ant-table-thead"]').contains('Événement').click({force: true});
    cy.wait('@getPOSTgraphql10', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql10', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql10', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('LOSS').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Événement').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql11');
    cy.get('thead[class="ant-table-thead"]').contains('Longueur').click({force: true});
    cy.wait('@getPOSTgraphql11', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql11', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql11', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('3.1 kb').should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql12');
    cy.get('thead[class="ant-table-thead"]').contains('Longueur').click({force: true});
    cy.wait('@getPOSTgraphql12', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql12', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql12', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('92.4 Mb').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Longueur').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql13');
    cy.get('thead[class="ant-table-thead"]').contains('MS').click({force: true});
    cy.wait('@getPOSTgraphql13', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql13', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql13', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('0.0347309').should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql14');
    cy.get('thead[class="ant-table-thead"]').contains('MS').click({force: true});
    cy.wait('@getPOSTgraphql14', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql14', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql14', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('1.83177').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('MS').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql15');
    cy.get('thead[class="ant-table-thead"]').contains('# Gènes').click({force: true});
    cy.wait('@getPOSTgraphql15', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql15', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql15', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains(/^0$/).should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql16');
    cy.get('thead[class="ant-table-thead"]').contains('# Gènes').click({force: true});
    cy.wait('@getPOSTgraphql16', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql16', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql16', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains(/^670$/).should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('# Gènes').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql17');
    cy.get('thead[class="ant-table-thead"]').contains('Qual.').click({force: true});
    cy.wait('@getPOSTgraphql17', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql17', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql17', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains(/^90$/).should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql18');
    cy.get('thead[class="ant-table-thead"]').contains('Qual.').click({force: true});
    cy.wait('@getPOSTgraphql18', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql18', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql18', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains(/^200$/).should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Qual.').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql19');
    cy.get('thead[class="ant-table-thead"]').contains('BC').click({force: true});
    cy.wait('@getPOSTgraphql19', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql19', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql19', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains(/^6$/).should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql20');
    cy.get('thead[class="ant-table-thead"]').contains('BC').click({force: true});
    cy.wait('@getPOSTgraphql20', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql20', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql20', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains(/^7553$/).should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('BC').click({force: true});
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('thead[class="ant-table-thead"]').contains('Chr.').click({force: true});
    cy.get('thead[class="ant-table-thead"]').contains('Chr.').click({force: true});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('thead[class="ant-table-thead"]').contains('Début').click({force: true});
    cy.get('thead[class="ant-table-thead"]').contains('Début').click({force: true});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('154 144 278').should('exist');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('body').find('span[class*="ant-select-selection-item"]').eq(1).click({force: true});
    cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('100').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains('Résultats 1 - 100 de 304').should('exist');

    cy.get('body').find('span[class*="ant-select-selection-item"]').eq(1).click({force: true});
    cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('20').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains('Résultats 1 - 20 de 304').should('exist');
    cy.get('body').find('button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('Début').parent('button').should('be.disabled');

    cy.get('body').find('button[type="button"]').contains('Suivant').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains('Résultats 21 - 40 de 304').should('exist');
    cy.get('body').find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Suivant').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains('Résultats 41 - 60 de 304').should('exist');
    cy.get('body').find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Précédent').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains('Résultats 21 - 40 de 304').should('exist');
    cy.get('body').find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Début').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains('Résultats 1 - 20 de 304').should('exist');
    cy.get('body').find('button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('Début').parent('button').should('be.disabled');
  });
});
  