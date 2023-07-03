/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

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

  cy.intercept('**/user').as('getUser5');
  cy.get('div[class="ant-popover-inner"]')
    .find('div[class="ant-space-item"]').contains('SM')
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getUser5', {timeout: 20*1000});

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

describe('Page des CNVs d\'un patient - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains('GAIN:chr1:196774873-196832007').should('exist');
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains(/^1$/).should('exist');
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains('196 774 872').should('exist');
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains('196 832 006').should('exist');
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains(/^GAIN$/).should('exist');
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains('57.1 kb').should('exist');
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains(/^3$/).should('exist');
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains(/^2$/).should('exist');
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains('CFHR1').should('exist');
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains('CFHR3').should('exist');
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains('./1').should('exist');
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains('PASS').should('exist');
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains(/^75$/).should('exist');
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains('1.38788').should('exist');
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains(/^22$/).should('exist');
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains('3, 0').should('exist');
  });
 
  it('Valider les liens disponibles', () => {
    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains(/^2$/).click({force: true});
    cy.contains('GAIN:chr1:196774873-196832007').should('exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');

    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').contains('CFHR1').click({force: true});
    cy.contains('GAIN:chr1:196774873-196832007').should('exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');

    cy.get('tr[data-row-key="c6c851354ecc5c10473d596260d5bfff84bbc9db"]').find('svg[class="anticon"]').click({force: true});
    cy.contains('Alignement et variant').should('exist');
    cy.contains('Zoom in to see features').should('exist');
    cy.contains('ERROR').should('not.exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');
  });
  
  it('Valider les fonctionnalités du tableau - Tris', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('thead[class="ant-table-thead"]').contains('Chr.').click({force: true});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains(/^1$/).should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('thead[class="ant-table-thead"]').contains('Chr.').click({force: true});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains(/^Y$/).should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Chr.').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql3');
    cy.get('thead[class="ant-table-thead"]').contains('Début').click({force: true});
    cy.wait('@getPOSTgraphql3', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql3', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql3', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('14 806').should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql4');
    cy.get('thead[class="ant-table-thead"]').contains('Début').click({force: true});
    cy.wait('@getPOSTgraphql4', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql4', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql4', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('238 158 998').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Début').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql5');
    cy.get('thead[class="ant-table-thead"]').contains('CN').click({force: true});
    cy.wait('@getPOSTgraphql5', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql5', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql5', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains(/^0$/).should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql6');
    cy.get('thead[class="ant-table-thead"]').contains('CN').click({force: true});
    cy.wait('@getPOSTgraphql6', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql6', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql6', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains(/^6$/).should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('CN').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql7');
    cy.get('thead[class="ant-table-thead"]').contains('Qual.').click({force: true});
    cy.wait('@getPOSTgraphql7', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql7', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql7', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains(/^3$/).should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql8');
    cy.get('thead[class="ant-table-thead"]').contains('Qual.').click({force: true});
    cy.wait('@getPOSTgraphql8', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql8', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql8', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('150').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Qual.').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql9');
    cy.get('thead[class="ant-table-thead"]').contains('SM').click({force: true});
    cy.wait('@getPOSTgraphql9', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql9', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql9', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('0.00831442').should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql10');
    cy.get('thead[class="ant-table-thead"]').contains('SM').click({force: true});
    cy.wait('@getPOSTgraphql10', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql10', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql10', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('2.7587').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('SM').click({force: true});
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
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
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('207 526 712').should('exist');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('body').find('span[class*="ant-select-selection-item"]').eq(1).click({force: true});
    cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('100').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains('Résultats 1 - 100 de 196').should('exist');

    cy.get('body').find('span[class*="ant-select-selection-item"]').eq(1).click({force: true});
    cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('20').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains('Résultats 1 - 20 de 196').should('exist');
    cy.get('body').find('button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('Début').parent('button').should('be.disabled');

    cy.get('body').find('button[type="button"]').contains('Suivant').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains('Résultats 21 - 40 de 196').should('exist');
    cy.get('body').find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Suivant').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains('Résultats 41 - 60 de 196').should('exist');
    cy.get('body').find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Précédent').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains('Résultats 21 - 40 de 196').should('exist');
    cy.get('body').find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Début').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains('Résultats 1 - 20 de 196').should('exist');
    cy.get('body').find('button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('Début').parent('button').should('be.disabled');
  });
});
  