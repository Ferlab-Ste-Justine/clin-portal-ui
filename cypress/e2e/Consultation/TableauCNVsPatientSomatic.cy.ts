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
    cy.validateTableDataRowKeyContent('e216d4e7a7164b39f0fba518c47d24da7097660d', 1, 'LOSS:chr1:450731-7249626');
    cy.validateTableDataRowKeyContent('e216d4e7a7164b39f0fba518c47d24da7097660d', 2, /^1$/);
    cy.validateTableDataRowKeyContent('e216d4e7a7164b39f0fba518c47d24da7097660d', 3, '450 730');
    cy.validateTableDataRowKeyContent('e216d4e7a7164b39f0fba518c47d24da7097660d', 4, '7 249 625');
    cy.validateTableDataRowKeyContent('e216d4e7a7164b39f0fba518c47d24da7097660d', 5, /^LOSS$/);
    cy.validateTableDataRowKeyContent('e216d4e7a7164b39f0fba518c47d24da7097660d', 6, '6.8 Mb');
    cy.validateTableDataRowKeyContent('e216d4e7a7164b39f0fba518c47d24da7097660d', 7, '1.04404');
    cy.validateTableDataRowKeyContent('e216d4e7a7164b39f0fba518c47d24da7097660d', 8, /^191$/);
    cy.validateTableDataRowKeyContent('e216d4e7a7164b39f0fba518c47d24da7097660d', 9, /^[^,]+,[^,]+,[^,]+...$/);
    cy.validateTableDataRowKeyContent('e216d4e7a7164b39f0fba518c47d24da7097660d', 10, '0/1');
    cy.validateTableDataRowKeyContent('e216d4e7a7164b39f0fba518c47d24da7097660d', 11, 'CnvCopyRatio, LoDFail');
    cy.validateTableDataRowKeyContent('e216d4e7a7164b39f0fba518c47d24da7097660d', 12, /^128$/);
    cy.validateTableDataRowKeyContent('e216d4e7a7164b39f0fba518c47d24da7097660d', 13, '1979');
    cy.validateTableDataRowKeyContent('e216d4e7a7164b39f0fba518c47d24da7097660d', 14, '25, 7');
  });
 
  it('Valider les liens disponibles', () => {
    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains(/^191$/).click({force: true});
    cy.contains('LOSS:chr1:450731-7249626').should('exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');

    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').contains(/^[^,]+,[^,]+,[^,]+...$/).click({force: true});
    cy.contains('LOSS:chr1:450731-7249626').should('exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');

    cy.get('tr[data-row-key="e216d4e7a7164b39f0fba518c47d24da7097660d"]').find('svg[class="anticon"]').click({force: true});
    cy.contains('Alignement et variant').should('exist');
    cy.contains('Zoom in to see features').should('exist');
    cy.contains('ERROR').should('not.exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');
  });
  
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('GAIN:chr10:104353843-104454535', 1);
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('LOSS:chrX:624329-13938568', 1);
  });

  it('Valider les fonctionnalités du tableau - Tri Chr.', () => {
    cy.sortTableAndIntercept('Chr.', 1);
    cy.validateTableFirstRow(/^1$/, 2);
    cy.sortTableAndIntercept('Chr.', 1);
    cy.validateTableFirstRow(/^X$/, 2);
  });

  it('Valider les fonctionnalités du tableau - Tri Début', () => {
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('66 872', 3);
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('228 007 104', 3);
  });

  it('Valider les fonctionnalités du tableau - Tri Fin', () => {
    cy.sortTableAndIntercept('Fin', 1);
    cy.validateTableFirstRow('465 288', 4);
    cy.sortTableAndIntercept('Fin', 1);
    cy.validateTableFirstRow('228 511 965', 4);
  });

  it('Valider les fonctionnalités du tableau - Tri Événement', () => {
    cy.sortTableAndIntercept('Événement', 1);
    cy.validateTableFirstRow('GAIN', 5);
    cy.sortTableAndIntercept('Événement', 1);
    cy.validateTableFirstRow('LOSS', 5);
  });

  it('Valider les fonctionnalités du tableau - Tri Longueur', () => {
    cy.sortTableAndIntercept('Longueur', 1);
    cy.validateTableFirstRow('3.1 kb', 6);
    cy.sortTableAndIntercept('Longueur', 1);
    cy.validateTableFirstRow('92.4 Mb', 6);
  });

  it('Valider les fonctionnalités du tableau - Tri MS', () => {
    cy.sortTableAndIntercept('MS', 1);
    cy.validateTableFirstRow('0.0347309', 7);
    cy.sortTableAndIntercept('MS', 1);
    cy.validateTableFirstRow('1.83177', 7);
  });

  it('Valider les fonctionnalités du tableau - Tri # Gènes', () => {
    cy.sortTableAndIntercept('# Gènes', 1);
    cy.validateTableFirstRow(/^0$/, 8);
    cy.sortTableAndIntercept('# Gènes', 1);
    cy.validateTableFirstRow(/^670$/, 8);
  });

  it('Valider les fonctionnalités du tableau - Tri Qual.', () => {
    cy.sortTableAndIntercept('Qual.', 1);
    cy.validateTableFirstRow(/^90$/, 12);
    cy.sortTableAndIntercept('Qual.', 1);
    cy.validateTableFirstRow(/^200$/, 12);
  });

  it('Valider les fonctionnalités du tableau - Tri BC', () => {
    cy.sortTableAndIntercept('BC', 1);
    cy.validateTableFirstRow(/^6$/, 13);
    cy.sortTableAndIntercept('BC', 1);
    cy.validateTableFirstRow(/^7553$/, 13);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Chr.', 1);
    cy.sortTableAndIntercept('Chr.', 1);
    cy.sortTableAndWait('Début');
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('154 144 278', 3);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('304', 1);
  });
});
  