/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);
  cy.get('[data-cy="RadioButton_CouvertureGenique"]').click({force: true});
  cy.resetColumns(0);
});

describe('Page de la couverture génique d\'un patient - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent('6', 2, 'RPL41');
    cy.validateTableDataRowKeyContent('6', 3, /^69$/);
    cy.validateTableDataRowKeyContent('6', 4, '86.14');
    cy.validateTableDataRowKeyContent('6', 5, '44.93%');
    cy.validateTableDataRowKeyContent('6', 6, '44.93%');
    cy.validateTableDataRowKeyContent('6', 7, '44.93%');
    cy.validateTableDataRowKeyContent('6', 8, '44.93%');
    cy.validateTableDataRowKeyContent('6', 9, '43.48%');
    cy.validateTableDataRowKeyContent('6', 10, '14.49%');
    cy.validateTableDataRowKeyContent('6', 11, '14.49%');
    cy.validateTableDataRowKeyContent('6', 12, '< 1%');
    cy.validateTableDataRowKeyContent('6', 13, '< 1%');

    cy.get('[data-cy="AverageCoverage"]').contains('442.02').should('exist');
  });
 
  it('Valider les liens disponibles Lien SNV', () => {
    cy.get('tr[data-row-key="6"]').find('td').eq(1).find('[id="snv"]').click({force: true});
    cy.get('[class*="ant-radio-button-wrapper-checked"]').contains('SNV').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gène').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('RPL41').should('exist');
  });
 
  it('Valider les liens disponibles Lien CNV', () => {
    cy.get('tr[data-row-key="6"]').find('td').eq(1).find('[id="cnv"]').click({force: true});
    cy.get('[class*="ant-radio-button-wrapper-checked"]').contains('CNV').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gène').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('RPL41').should('exist');
  });

  it('Valider les liens disponibles Lien Gène', () => {
    cy.get('tr[data-row-key="6"]').find('td').eq(2).find('a[href]').invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains(/^RPL41$/).should('exist');
  });
  
  it('Valider les fonctionnalités du tableau - Tris', () => {
    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('A1BG', 2);
    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('ZZZ3', 2);
    cy.sortTableAndIntercept('Gène', 1);

    cy.sortTableAndIntercept('Longueur', 1);
    cy.validateTableFirstRow(/^18$/, 3);
    cy.sortTableAndIntercept('Longueur', 1);
    cy.validateTableFirstRow('107 249', 3);
    cy.sortTableAndIntercept('Longueur', 1);

    cy.sortTableAndIntercept('Couv. Moy.', 1);
    cy.validateTableFirstRow('< 1', 4);
    cy.sortTableAndIntercept('Couv. Moy.', 1);
    cy.validateTableFirstRow('1570.45', 4);
    cy.sortTableAndIntercept('Couv. Moy.', 1);

    cy.sortTableAndIntercept('5x', 1);
    cy.validateTableFirstRow('< 1%', 5);
    cy.sortTableAndIntercept('5x', 1);
    cy.validateTableFirstRow('100%', 5);
    cy.sortTableAndIntercept('5x', 1);

    cy.sortTableAndIntercept('15x', 1);
    cy.validateTableFirstRow('< 1%', 6);
    cy.sortTableAndIntercept('15x', 1);
    cy.validateTableFirstRow('100%', 6);
    cy.sortTableAndIntercept('15x', 1);

    cy.sortTableAndIntercept('30x', 1);
    cy.validateTableFirstRow('< 1%', 7);
    cy.sortTableAndIntercept('30x', 1);
    cy.validateTableFirstRow('100%', 7);
    cy.sortTableAndIntercept('30x', 1);

    cy.sortTableAndIntercept('50x', 1);
    cy.validateTableFirstRow('< 1%', 8);
    cy.sortTableAndIntercept('50x', 1);
    cy.validateTableFirstRow('100%', 8);
    cy.sortTableAndIntercept('50x', 1);

    cy.sortTableAndIntercept('100x', 1);
    cy.validateTableFirstRow('< 1%', 9);
    cy.sortTableAndIntercept('100x', 1);
    cy.validateTableFirstRow('100%', 9);
    cy.sortTableAndIntercept('100x', 1);

    cy.sortTableAndIntercept('200x', 1);
    cy.validateTableFirstRow('< 1%', 10);
    cy.sortTableAndIntercept('200x', 1);
    cy.validateTableFirstRow('100%', 10);
    cy.sortTableAndIntercept('200x', 1);

    cy.sortTableAndIntercept('300x', 1);
    cy.validateTableFirstRow('< 1%', 11);
    cy.sortTableAndIntercept('300x', 1);
    cy.validateTableFirstRow('100%', 11);
    cy.sortTableAndIntercept('300x', 1);

    cy.sortTableAndIntercept('500x', 1);
    cy.validateTableFirstRow('< 1%', 12);
    cy.sortTableAndIntercept('500x', 1);
    cy.validateTableFirstRow('100%', 12);
    cy.sortTableAndIntercept('500x', 1);

    cy.sortTableAndIntercept('1000x', 1);
    cy.validateTableFirstRow('< 1%', 13);
    cy.sortTableAndIntercept('1000x', 1);
    cy.validateTableFirstRow('100%', 13);
    cy.sortTableAndIntercept('1000x', 1);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('5x', 1);
    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('AC138969.4', 2);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('19 574', 1);
  });
});
