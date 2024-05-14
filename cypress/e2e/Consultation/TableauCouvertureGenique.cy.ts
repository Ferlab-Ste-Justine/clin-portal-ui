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
    cy.get('tr[data-row-key]').eq(6).find('td').eq(2).contains('RPL41').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(3).contains(/^69$/).should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(4).contains('86.14').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(5).contains('44.93%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(6).contains('44.93%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(7).contains('44.93%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(8).contains('44.93%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(9).contains('43.48%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(10).contains('14.49%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(11).contains('14.49%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(12).contains('< 1%').should('exist');
    cy.get('tr[data-row-key]').eq(6).find('td').eq(13).contains('< 1%').should('exist');

    cy.get('[data-cy="AverageCoverage"]').contains('442.02').should('exist');
  });
 
  it('Valider les liens disponibles Lien SNV', () => {
    cy.get('tr[data-row-key]').eq(6).find('td').eq(1).find('[id="snv"]').click({force: true});
    cy.get('[class*="ant-radio-button-wrapper-checked"]').contains('SNV').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gène').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('RPL41').should('exist');
  });
 
  it('Valider les liens disponibles Lien CNV', () => {
    cy.get('tr[data-row-key]').eq(6).find('td').eq(1).find('[id="cnv"]').click({force: true});
    cy.get('[class*="ant-radio-button-wrapper-checked"]').contains('CNV').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gène').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('RPL41').should('exist');
  });

  it('Valider les liens disponibles Lien Gène', () => {
    cy.get('tr[data-row-key]').eq(6).find('td').eq(2).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/613315');
  });
  
  it('Valider les fonctionnalités du tableau - Tri Gène', () => {
    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('A1BG', 2, true);
    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('ZZZ3', 2, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Longueur', () => {
    cy.sortTableAndWait('Longueur');
    cy.validateTableFirstRow(/^18$/, 3, true);
    cy.sortTableAndIntercept('Longueur', 1);
    cy.validateTableFirstRow('107 249', 3, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Couv. Moy.', () => {
    cy.sortTableAndIntercept('Couv. Moy.', 1);
    cy.validateTableFirstRow('< 1', 4, true);
    cy.sortTableAndIntercept('Couv. Moy.', 1);
    cy.validateTableFirstRow('1570.45', 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri 5x', () => {
    cy.sortTableAndIntercept('5x', 1);
    cy.validateTableFirstRow('< 1%', 5, true);
    cy.sortTableAndIntercept('5x', 1);
    cy.validateTableFirstRow('100%', 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri 15x', () => {
    cy.sortTableAndIntercept('15x', 1);
    cy.validateTableFirstRow('< 1%', 6, true);
    cy.sortTableAndIntercept('15x', 1);
    cy.validateTableFirstRow('100%', 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri 30x', () => {
    cy.sortTableAndIntercept('30x', 1);
    cy.validateTableFirstRow('< 1%', 7, true);
    cy.sortTableAndIntercept('30x', 1);
    cy.validateTableFirstRow('100%', 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri 50x', () => {
    cy.sortTableAndIntercept('50x', 1);
    cy.validateTableFirstRow('< 1%', 8, true);
    cy.sortTableAndIntercept('50x', 1);
    cy.validateTableFirstRow('100%', 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri 100x', () => {
    cy.sortTableAndIntercept('100x', 1);
    cy.validateTableFirstRow('< 1%', 9, true);
    cy.sortTableAndIntercept('100x', 1);
    cy.validateTableFirstRow('100%', 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri 200x', () => {
    cy.sortTableAndIntercept('200x', 1);
    cy.validateTableFirstRow('< 1%', 10, true);
    cy.sortTableAndIntercept('200x', 1);
    cy.validateTableFirstRow('100%', 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri 300x', () => {
    cy.sortTableAndIntercept('300x', 1);
    cy.validateTableFirstRow('< 1%', 11, true);
    cy.sortTableAndIntercept('300x', 1);
    cy.validateTableFirstRow('100%', 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri 500x', () => {
    cy.sortTableAndIntercept('500x', 1);
    cy.validateTableFirstRow('< 1%', 12, true);
    cy.sortTableAndIntercept('500x', 1);
    cy.validateTableFirstRow('100%', 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri 1000x', () => {
    cy.sortTableAndIntercept('1000x', 1);
    cy.validateTableFirstRow('< 1%', 13, true);
    cy.sortTableAndIntercept('1000x', 1);
    cy.validateTableFirstRow('100%', 13, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('5x', 1);
    cy.sortTableAndIntercept('Gène', 1);
    cy.validateTableFirstRow('AC138969.4', 2, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.validatePaging('19 574', 1);
  });
});
