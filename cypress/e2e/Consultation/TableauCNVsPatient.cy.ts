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
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 2, 'CFHR1');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 2, 'CFHR3');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 3, 'GAIN:chr1:196774873-196832007');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 4, /^1$/);
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 5, '196 774 872');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 6, '196 832 006');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 7, /^GAIN$/);
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 8, '57.1 kb');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 9, '1.38788');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 10, /^3$/);
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 11, /^2$/);
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 12, './1');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 13, 'PASS');
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 14, /^75$/);
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 15, /^22$/);
    cy.validateTableDataRowKeyContent('c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c', 16, '3, 0');
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.checkAndClickApplyFacet('Variant', 'Type de variant', 'GAIN');
    cy.get('[class*="QueryBar_selected"]').find('[class*="anticon-save"]').should('not.exist');
  });
 
  it('Valider les liens disponibles', () => {
    cy.get('tr[data-row-key="c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c"]').contains(/^2$/).click({force: true});
    cy.contains('GAIN:chr1:196774873-196832007').should('exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');

    cy.get('tr[data-row-key="c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c"]').contains('CFHR1').click({force: true});
    cy.contains('GAIN:chr1:196774873-196832007').should('exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');

    cy.get('tr[data-row-key="c2dab14eafa15ebf65ead73a8a8e729fd3b11a9c"]').find('svg[class="anticon"]').click({force: true});
    cy.contains('Alignement et variant').should('exist');
    cy.contains('Zoom in to see features').should('exist');
    cy.contains('ERROR').should('not.exist');
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');
  });
  
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('GAIN:chr10:126388041-126388160', 3, true);
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('LOSS:chrY:22406016-22406135', 3, true);
  });
  
  it('Valider les fonctionnalités du tableau - Tri Chr.', () => {
    cy.sortTableAndIntercept('Chr.', 1);
    cy.validateTableFirstRow(/^1$/, 4, true);
    cy.sortTableAndIntercept('Chr.', 1);
    cy.validateTableFirstRow(/^Y$/, 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Début', () => {
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('14 806', 5, true);
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('238 158 998', 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Fin', () => {
    cy.sortTableAndIntercept('Fin', 1);
    cy.validateTableFirstRow('14 939', 6, true);
    cy.sortTableAndIntercept('Fin', 1);
    cy.validateTableFirstRow('238 159 213', 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Événement', () => {
    cy.sortTableAndIntercept('Événement', 1);
    cy.validateTableFirstRow('GAIN', 7, true);
    cy.sortTableAndIntercept('Événement', 1);
    cy.validateTableFirstRow('LOSS', 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Longueur', () => {
    cy.sortTableAndIntercept('Longueur', 1);
    cy.validateTableFirstRow('2 bp', 8, true);
    cy.sortTableAndIntercept('Longueur', 1);
    cy.validateTableFirstRow('1.5 Mb', 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri MS', () => {
    cy.sortTableAndIntercept('MS', 1);
    cy.validateTableFirstRow('0.00831442', 9, true);
    cy.sortTableAndIntercept('MS', 1);
    cy.validateTableFirstRow('2.7587', 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri CN', () => {
    cy.sortTableAndIntercept('CN', 1);
    cy.validateTableFirstRow(/^0$/, 10, true);
    cy.sortTableAndIntercept('CN', 1)
    cy.validateTableFirstRow(/^6$/, 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri # Gènes', () => {
    cy.sortTableAndIntercept('# Gènes', 1);
    cy.validateTableFirstRow(/^0$/, 11, true);
    cy.sortTableAndIntercept('# Gènes', 1);
    cy.validateTableFirstRow('38', 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Qual.', () => {
    cy.sortTableAndIntercept('Qual.', 1);
    cy.validateTableFirstRow(/^3$/, 14, true);
    cy.sortTableAndIntercept('Qual.', 1);
    cy.validateTableFirstRow('150', 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri BC', () => {
    cy.sortTableAndIntercept('BC', 1);
    cy.validateTableFirstRow(/^1$/, 15, true);
    cy.sortTableAndIntercept('BC', 1);
    cy.validateTableFirstRow('119', 15, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Chr.', 1);
    cy.sortTableAndIntercept('Début', 0);
    cy.sortTableAndIntercept('Début', 1);
    cy.validateTableFirstRow('207 526 712', 5, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('196', 1);
  });
});
  