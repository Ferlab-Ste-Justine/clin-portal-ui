/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=6adae5cd-36a9-49b6-833f-bbc656d516d6');
  });

  it('Sélectionner une requête', () => {
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTableResultsCount(/1 4\d{2}/);
  });

  it('Afficher/Masquer les champs', () => {
    cy.get('button[role="switch"]').click({force: true});

    cy.validatePillSelectedQuery('', ['SNV']);
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).click();
    cy.validatePillSelectedQuery('Position', ['100000']);
    cy.validateTotalSelectedQuery(/1,4\d{2}/);
    cy.validateTableResultsCount(/1 4\d{2}/);
    cy.validateClearAllButton(true);

    cy.get('button[role="switch"]').click({force: true});

    cy.validatePillSelectedQuery('Position', ['100000']);
    cy.validateTotalSelectedQuery(/1,4\d{2}/);
    cy.validateTableResultsCount(/1 4\d{2}/);
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).click();
    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.validateClearAllButton(true);
  });

  it('Masquer/Afficher le panneau des requêtes', () => {
    cy.get('span[class*="ant-collapse-arrow"]').click({force: true});

    cy.get('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);

    cy.get('span[class*="ant-collapse-arrow"]').click({force: true});

    cy.get('div[class*="ant-collapse-content-active"]').should('exist');
    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.validateClearAllButton(true);
  });

  it('Combiner deux requêtes avec ET', () => {
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryTools"]').find('button[class*="ant-dropdown-trigger"]').click({force: true});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class="ant-dropdown-menu-title-content"]').contains('Et').click({force: true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validatePillSelectedQuery('', ['Q1']);
    cy.validatePillSelectedQuery('', ['Q2'], 1);
    cy.validateOperatorSelectedQuery('Et');
    cy.validateTotalSelectedQuery(/1,2\d{2}/);
    cy.validateTableResultsCount(/1 2\d{2}/);
    cy.validateClearAllButton(true);
  });

  it('Combiner deux requêtes avec OU', () => {
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryTools"]').find('button[class*="ant-dropdown-trigger"]').click({force: true});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class="ant-dropdown-menu-title-content"]').contains('Ou').click({force: true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validatePillSelectedQuery('', ['Q1']);
    cy.validatePillSelectedQuery('', ['Q2'], 1);
    cy.validateOperatorSelectedQuery('Ou');
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.validateClearAllButton(true);
  });

  it('Combiner deux requêtes avec Combiner', () => {
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryTools"]').find('button[class*="ant-btn-compact-first-item"]').click({force: true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validatePillSelectedQuery('', ['Q1']);
    cy.validatePillSelectedQuery('', ['Q2'], 1);
    cy.validateOperatorSelectedQuery('Et');
    cy.validateTotalSelectedQuery(/1,2\d{2}/);
    cy.validateTableResultsCount(/1 2\d{2}/);
    cy.validateClearAllButton(true);
  });

  it('Supprimer une requête avec le bouton et annuler', () => {
    cy.get('[class*="QueryBar_selected"]').find('[data-icon="delete"]').click({force: true});
    cy.get('[class*="ant-popconfirm"]').should('not.have.class', 'ant-popover-hidden');

    cy.get('[class*="ant-popconfirm"]').find('button[class*="ant-btn-default"]').click({force:true});
    cy.get('[class*="ant-popconfirm"]').should('have.class', 'ant-popover-hidden', {timeout: 5000});
    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 2);
    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.validateClearAllButton(true);
  });

  it('Supprimer une requête avec le bouton et confirmer', () => {
    cy.get('[class*="QueryBar_selected"]').find('[data-icon="delete"]').click({force: true});
    cy.get('[class*="ant-popconfirm"]').should('not.have.class', 'ant-popover-hidden');

    cy.clickAndIntercept('[class*="ant-popconfirm"] button[class*="ant-btn-primary"]', 'POST', '**/graphql', 1);
    cy.get('[class*="ant-popconfirm"]').should('not.exist');
    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 1);
    cy.validatePillSelectedQuery('Position', ['100000']);
    cy.validateTotalSelectedQuery(/1,4\d{2}/);
    cy.validateTableResultsCount(/1 4\d{2}/);
    cy.validateClearAllButton(false);
  });

  it('Supprimer l\'unique pilule d\'une requête avec le X', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_selected"]').find('button[class*="QueryPill_close"]').click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 1);
    cy.validatePillSelectedQuery('Position', ['100000']);
    cy.validateTotalSelectedQuery(/1,4\d{2}/);
    cy.validateTableResultsCount(/1 4\d{2}/);
    cy.validateClearAllButton(false);
  });

  it('Supprimer toutes les requêtes avec le bouton et annuler', () => {
    cy.get('[id="query-builder-header-tools"]').contains('Tout effacer').click({force: true});
    cy.get('[class*="ant-modal-confirm"]').should('exist');

    cy.get('[class*="ant-modal-confirm"]').find('button[class*="ant-btn-default"]').click({force:true});
    cy.get('[class*="ant-modal-confirm"]').should('not.exist');
    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 2);
    cy.validatePillSelectedQuery('Type de variant', ['SNV']);
    cy.validateTotalSelectedQuery('1.1M');
    cy.validateTableResultsCount(/1 0\d{2} \d{3}/);
    cy.validateClearAllButton(true);
  });

  it('Supprimer toutes les requêtes avec le bouton et supprimer', () => {
    cy.get('[id="query-builder-header-tools"]').contains('Tout effacer').click({force: true});
    cy.get('[class*="ant-modal-confirm"]').should('exist');

    cy.get('[class*="ant-modal-confirm"]').find('button[class*="ant-btn-primary"]').click({force:true});
    cy.get('[class*="ant-modal-confirm"]').should('not.exist');
    cy.get('body').contains('Utiliser les filtres pour créer une requête').should('exist');
    cy.validateTotalSelectedQuery('1.3M');
    cy.validateTableResultsCount(/1 3\d{2} \d{3}/);
    cy.validateClearAllButton(false);
  });
});
