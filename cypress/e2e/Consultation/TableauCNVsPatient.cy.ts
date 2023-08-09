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
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 1, 'GAIN:chr1:196774873-196832007');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 2, /^1$/);
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 3, '196 774 872');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 4, '196 832 006');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 5, /^GAIN$/);
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 6, '57.1 kb');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 7, '1.38788');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 8, /^3$/);
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 9, /^2$/);
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 10, 'CFHR1');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 10, 'CFHR3');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 11, './1');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 12, 'PASS');
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 13, /^75$/);
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 14, /^22$/);
    cy.validateTableDataRowKeyContent('c6c851354ecc5c10473d596260d5bfff84bbc9db', 15, '3, 0');
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
    cy.sortTableAndIntercept('Chr.', 3);
    cy.validateTableFirstRow(/^1$/, 2);
    cy.sortTableAndIntercept('Chr.', 3);
    cy.validateTableFirstRow(/^Y$/, 2);
    cy.sortTableAndIntercept('Chr.', 0);

    cy.sortTableAndIntercept('Début', 3);
    cy.validateTableFirstRow('14 806', 3);
    cy.sortTableAndIntercept('Début', 3);
    cy.validateTableFirstRow('238 158 998', 3);
    cy.sortTableAndIntercept('Début', 0);

    cy.sortTableAndIntercept('MS', 3);
    cy.validateTableFirstRow('0.00831442', 7);
    cy.sortTableAndIntercept('MS', 3);
    cy.validateTableFirstRow('2.7587', 7);
    cy.sortTableAndIntercept('MS', 0);

    cy.sortTableAndIntercept('CN', 3);
    cy.validateTableFirstRow(/^0$/, 8);
    cy.sortTableAndIntercept('CN', 3);
    cy.validateTableFirstRow(/^6$/, 8);
    cy.sortTableAndIntercept('CN', 0);

    cy.sortTableAndIntercept('Qual.', 3);
    cy.validateTableFirstRow(/^3$/, 13);
    cy.sortTableAndIntercept('Qual.', 3);
    cy.validateTableFirstRow('150', 13);
    cy.sortTableAndIntercept('Qual.', 0);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Chr.', 3);
    cy.sortTableAndIntercept('Début', 0);
    cy.sortTableAndIntercept('Début', 3);
    cy.validateTableFirstRow('207 526 712', 3);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('196', 1);
  });
});
  