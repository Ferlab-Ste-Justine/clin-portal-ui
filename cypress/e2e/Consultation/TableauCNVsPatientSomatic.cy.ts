/// <reference types="Cypress" />
import '../../support/commands';

const presc_SOMATIC = JSON.parse(Cypress.env('presc_SOMATIC'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCNVsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);

  cy.showColumn('GT', 0);
  cy.showColumn('Filtre', 0);
  cy.showColumn('Qual.', 0);
  cy.showColumn('BC', 0);
  cy.showColumn('PE', 0);
});

describe('Page des CNVs d\'un patient (somatic) - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent('10d77ed5670191a6f0e0f0ef999cda88910a4d7c', 2, /^[^,]+,[^,]+,[^,]+...$/);
    cy.validateTableDataRowKeyContent('10d77ed5670191a6f0e0f0ef999cda88910a4d7c', 3, 'LOSS:chr1:450731-7249626');
    cy.validateTableDataRowKeyContent('10d77ed5670191a6f0e0f0ef999cda88910a4d7c', 4, /^1$/);
    cy.validateTableDataRowKeyContent('10d77ed5670191a6f0e0f0ef999cda88910a4d7c', 5, '450 730');
    cy.validateTableDataRowKeyContent('10d77ed5670191a6f0e0f0ef999cda88910a4d7c', 6, '7 249 625');
    cy.validateTableDataRowKeyContent('10d77ed5670191a6f0e0f0ef999cda88910a4d7c', 7, /^LOSS$/);
    cy.validateTableDataRowKeyContent('10d77ed5670191a6f0e0f0ef999cda88910a4d7c', 8, '6.8 Mb');
    cy.validateTableDataRowKeyContent('10d77ed5670191a6f0e0f0ef999cda88910a4d7c', 9, '1.04404');
    cy.validateTableDataRowKeyContent('10d77ed5670191a6f0e0f0ef999cda88910a4d7c', 10, /^191$/);
    cy.validateTableDataRowKeyContent('10d77ed5670191a6f0e0f0ef999cda88910a4d7c', 11, '0/1');
    cy.validateTableDataRowKeyContent('10d77ed5670191a6f0e0f0ef999cda88910a4d7c', 12, 'CnvCopyRatio, LoDFail');
    cy.validateTableDataRowKeyContent('10d77ed5670191a6f0e0f0ef999cda88910a4d7c', 13, /^128$/);
    cy.validateTableDataRowKeyContent('10d77ed5670191a6f0e0f0ef999cda88910a4d7c', 14, '1979');
    cy.validateTableDataRowKeyContent('10d77ed5670191a6f0e0f0ef999cda88910a4d7c', 15, '25, 7');
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.checkAndClickApplyFacet('Variant', 'Type de variant', 'GAIN');
    cy.get('[class*="QueryBar_selected"]').find('[class*="anticon-save"]').should('not.exist');
  });
 
  it('Valider les liens disponibles', () => {
    cy.get('tr[data-row-key="10d77ed5670191a6f0e0f0ef999cda88910a4d7c"]').contains(/^191$/).click({force: true});
    cy.contains('LOSS:chr1:450731-7249626').should('exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');

    cy.get('tr[data-row-key="10d77ed5670191a6f0e0f0ef999cda88910a4d7c"]').contains(/^[^,]+,[^,]+,[^,]+...$/).click({force: true});
    cy.contains('LOSS:chr1:450731-7249626').should('exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');

    cy.get('tr[data-row-key="10d77ed5670191a6f0e0f0ef999cda88910a4d7c"]').find('svg[class="anticon"]').click({force: true});
    cy.contains('Alignement et variant').should('exist');
    cy.contains('Zoom in to see features').should('exist');
    cy.contains('ERROR').should('not.exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');
  });
  
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('GAIN:chr10:104353843-104454535', 3, true);
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('LOSS:chrX:624329-13938568', 3, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Chr.', () => {
    cy.sortTableAndIntercept('Chr.', 1);
    cy.validateTableFirstRow(/^1$/, 4, true);
    cy.sortTableAndIntercept('Chr.', 1);
    cy.validateTableFirstRow(/^X$/, 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Début', () => {
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('66 872', 5, true);
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('228 007 104', 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Fin', () => {
    cy.sortTableAndIntercept('Fin', 1);
    cy.validateTableFirstRow('465 288', 6, true);
    cy.sortTableAndIntercept('Fin', 1);
    cy.validateTableFirstRow('228 511 965', 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Événement', () => {
    cy.sortTableAndIntercept('Événement', 1);
    cy.validateTableFirstRow('GAIN', 7, true);
    cy.sortTableAndIntercept('Événement', 1);
    cy.validateTableFirstRow('LOSS', 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Longueur', () => {
    cy.sortTableAndIntercept('Longueur', 1);
    cy.validateTableFirstRow('3.1 kb', 8, true);
    cy.sortTableAndIntercept('Longueur', 1);
    cy.validateTableFirstRow('92.4 Mb', 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri MS', () => {
    cy.sortTableAndIntercept('MS', 1);
    cy.validateTableFirstRow('0.0347309', 9, true);
    cy.sortTableAndIntercept('MS', 1);
    cy.validateTableFirstRow('1.83177', 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri # Gènes', () => {
    cy.sortTableAndIntercept('# Gènes', 1);
    cy.validateTableFirstRow(/^0$/, 10, true);
    cy.sortTableAndIntercept('# Gènes', 1);
    cy.validateTableFirstRow(/^670$/, 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Qual.', () => {
    cy.sortTableAndIntercept('Qual.', 1);
    cy.validateTableFirstRow(/^90$/, 13, true);
    cy.sortTableAndIntercept('Qual.', 1);
    cy.validateTableFirstRow(/^200$/, 13, true);
  });

  it('Valider les fonctionnalités du tableau - Tri BC', () => {
    cy.sortTableAndIntercept('BC', 1);
    cy.validateTableFirstRow(/^6$/, 14, true);
    cy.sortTableAndIntercept('BC', 1);
    cy.validateTableFirstRow(/^7553$/, 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Chr.', 1);
    cy.sortTableAndIntercept('Chr.', 1);
    cy.sortTableAndWait('Début');
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('154 144 278', 5, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('304', 1);
  });
});
  