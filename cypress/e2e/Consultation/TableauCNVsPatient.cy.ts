/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

  cy.showColumn('GT', 0);
  cy.showColumn('Filtre', 0);
  cy.showColumn('Qual.', 0);
  cy.showColumn('MS', 0);
  cy.showColumn('BC', 0);
  cy.showColumn('PE', 0);
});

describe('Page des CNVs d\'un patient - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 2, 'CFHR1');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 2, 'CFHR3');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 3, 'GAIN:chr1:196774873-196832007');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 4, /^1$/);
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 5, '196 774 872');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 6, '196 832 006');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 7, /^GAIN$/);
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 8, '57.1 kb');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 9, '1.38788');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 10, /^3$/);
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 11, /^2$/);
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 12, './1');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 13, 'PASS');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 14, /^75$/);
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 15, /^22$/);
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 16, '3, 0');
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
  
  it('Valider les fonctionnalités du tableau - Tri Chr.', () => {
    cy.sortTableAndIntercept('Chr.', 1);
    cy.validateTableFirstRow(/^1$/, 4);
    cy.sortTableAndIntercept('Chr.', 1);
    cy.validateTableFirstRow(/^Y$/, 4);
  });

  it('Valider les fonctionnalités du tableau - Tri Début', () => {
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('14 806', 5);
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('238 158 998', 5);
  });

  it('Valider les fonctionnalités du tableau - Tri MS', () => {
    cy.sortTableAndIntercept('MS', 1);
    cy.validateTableFirstRow('0.00831442', 9);
    cy.sortTableAndIntercept('MS', 1);
    cy.validateTableFirstRow('2.7587', 9);
  });

  it('Valider les fonctionnalités du tableau - Tri CN', () => {
    cy.sortTableAndIntercept('CN', 1);
    cy.validateTableFirstRow(/^0$/, 10);
    cy.sortTableAndIntercept('CN', 1)
    cy.validateTableFirstRow(/^6$/, 10);
  });

  it('Valider les fonctionnalités du tableau - Tri Qual.', () => {
    cy.sortTableAndIntercept('Qual.', 1);
    cy.validateTableFirstRow(/^3$/, 14);
    cy.sortTableAndIntercept('Qual.', 1);
    cy.validateTableFirstRow('150', 14);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Chr.', 1);
    cy.sortTableAndIntercept('Début', 0);
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('207 526 712', 5);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('196', 1);
  });
});
  