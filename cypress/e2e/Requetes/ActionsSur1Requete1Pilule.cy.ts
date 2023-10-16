/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=b07af6d5-dedc-4081-a218-b8893dba5dd4');
  });

  it('Éditer une pilule via la facette', () => {
    cy.checkAndClickApplyFacet('Variant', 'Type de variant', 'insertion');

    cy.validatePillSelectedQuery('Type de variant', ['SNV','Insertion']);
    cy.validateTotalSelectedQuery('1.2M');
    cy.validateTableResultsCount(/1 181 \d{3}/);
    cy.validateClearAllButton(false);
  });

  it('Éditer une pilule via son popup', () => {
    cy.get('[class*="QueryValues_queryValuesContainer"]').contains('SNV').click({force:true});
    cy.get('input[id="input-insertion"]').check({force: true});
    cy.clickAndIntercept('[data-cy="Apply_Type de variant"]', 'POST', '**/graphql', 3);

    cy.validatePillSelectedQuery('Type de variant', ['SNV','Insertion']);
    cy.validateTotalSelectedQuery('1.2M');
    cy.validateTableResultsCount(/1 181 \d{3}/);
    cy.validateClearAllButton(false);
  });

  it('Ajouter une pilule à une requête', () => {
    cy.checkAndClickApplyFacet('Variant', 'Chromosome', '19');

    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validatePillSelectedQuery('Chromosome', ['19'], 1);
    cy.validateOperatorSelectedQuery('Et');
    cy.validateTotalSelectedQuery('69.2K');
    cy.validateTableResultsCount(/69 \d{3}/);
    cy.validateClearAllButton(false);
  });

  it('Construire une deuxième requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('button[class*="QueryTools_button"]').contains('Nouvelle requête').click({force:true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.get('body').contains('Utiliser les filtres pour créer une requête').should('exist');
    cy.validateTotalSelectedQuery('1.3M');
    cy.validateTableResultsCount(/1 298 \d{3}/);
    cy.validateClearAllButton(false);

    cy.checkAndClickApplyFacet('Variant', 'Chromosome', '19');

    cy.validatePillSelectedQuery('Chromosome', ['19']);
    cy.validateTotalSelectedQuery('82.6K');
    cy.validateTableResultsCount(/82 \d{3}/);
    cy.validateClearAllButton(true);
  });

  it('Dupliquer une requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_selected"]').find('[data-icon="copy"]').click({force: true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 082 \d{3}/);
    cy.validateClearAllButton(true);
  });
});
