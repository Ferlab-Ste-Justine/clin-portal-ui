/// <reference types="Cypress" />
import '@testing-library/cypress/add-commands';

// Add Custom commands here and their types in `./index.d.ts`

Cypress.Commands.add('checkValueFacet', (facetRank: number, value: string|RegExp) => {
  cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(facetRank)
    .find('[aria-expanded="true"]').should('exist');
  cy.wait(1000);
  cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(facetRank)
    .find('button').then(($button) => {
      if ($button.hasClass('ant-btn-link')) {
        cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(facetRank)
          .find('button[class*="CheckboxFilter_filtersTypesFooter"]').click({force: true});
        cy.wait(1000);
      };
  });

  cy.intercept('POST', '**/graphql').as('getPOSTgraphql');

  cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(facetRank)
    .find('div[class*="CheckboxFilter_checkboxFilterItem"]').contains(value)
    .find('[type="checkbox"]').check({force: true});

  cy.wait('@getPOSTgraphql', {timeout: 20*1000});
  cy.wait('@getPOSTgraphql', {timeout: 20*1000});
});

Cypress.Commands.add('clickAndIntercept', (selector: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.get(selector).click({force: true});

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: 20*1000});
  };
});

Cypress.Commands.add('clickApplyFacet', () => {
  cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
  
  cy.get('span[data-key="apply"]', {timeout: 20*1000}).click({force: true});
  
  cy.wait('@getPOSTgraphql', {timeout: 20*1000});
  cy.wait('@getPOSTgraphql', {timeout: 20*1000});
  cy.wait('@getPOSTgraphql', {timeout: 20*1000});
  cy.wait('@getPOSTgraphql', {timeout: 20*1000});
});

Cypress.Commands.add('closePopup', () => {
  cy.get('body')
    .find('button').then(($button) => {
      if ($button.hasClass('close')) {
          cy.get('body').find('button[class="close"]').click({force: true});
      };
  });
});

Cypress.Commands.add('login', (user: string, password: string) => {
  cy.session([user], () => {
    cy.visit('/');
    cy.get('input[type="email"]').should('exist', {timeout: 60*1000});

    cy.get('input[type="email"]').type(user);
    cy.get('input[type="password"]').type(password, {log: false});
    cy.get('button[type="submit"]').click();
  });
});

Cypress.Commands.add('logout', () => {
    cy.visit('/');
    cy.wait(5*1000);

    cy.get('div').then(($div) => {
        if ($div.hasClass('App')) {
            cy.get('span[class="anticon anticon-down"]').click({force: true});
            cy.get('[data-menu-id*="logout"]').click({force: true});
        };
    });

  cy.exec('npm cache clear --force');
  cy.wait(1000);
});

Cypress.Commands.add('resetColumns', (eq: number) => {
  cy.get('svg[data-icon="setting"]').eq(eq).click({force: true});
  cy.get('button[class*="ProTablePopoverColumnResetBtn"]').eq(eq).click({force: true});

  cy.get('button[class*="ProTablePopoverColumnResetBtn"]').should('be.disabled', {timeout: 20*1000});
});

Cypress.Commands.add('typeAndIntercept', (selector: string, text: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.get(selector).type(text, {force: true});

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: 60*1000});
  };
});

Cypress.Commands.add('validateDictionnary', (section: string, facetTitle: string, facetRank: number, dictionnary: string[]) => {
  cy.get('li[data-key="' + section + '"]').click({force: true});

  if (section !== 'rqdm') {
    cy.get('span[class*="FilterContainer_title"]').contains(facetTitle, {timeout: 5000}).click({force: true});
  }
  
  cy.get('div[class="FilterContainer_filterContainer__O6v-O"]').eq(facetRank)
    .then(($facet) => {
      if ($facet.has('Dictionnaire')) {
        cy.get('div[class="FilterContainer_filterContainer__O6v-O"]').eq(facetRank)
          .find('button[role="switch"]', {timeout: 5000}).eq(0).click({force: true});
        cy.wait(1000);
      };
    });

  // Toutes les valeurs du dictionnaire sont présentes dans la facette
  for (let i = 0; i < dictionnary.length; i++) {
    cy.get('div[class="FilterContainer_filterContainer__O6v-O"]').eq(facetRank)
      .find('div[class*="CheckboxFilter_checkboxFilterItem"]').contains(dictionnary[i])
      .should('exist');
    }
    
  // Aucune nouvelle valeur n'est présente dans la facette
  cy.get('div[class="FilterContainer_filterContainer__O6v-O"]').eq(facetRank)
    .find('div[class*="CheckboxFilter_checkboxFilterItem"]')
    .its('length').should('eq', dictionnary.length);
});

Cypress.Commands.add('visitAndIntercept', (url: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.visit(url);

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: 20*1000});
  };
});

Cypress.Commands.add('visitArchivesPatientPage', (patientId: string) => {
  cy.visitAndIntercept('/archive/exploration?search=' + patientId,
                       'POST',
                       '**/$graphql*',
                       1);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitBioinformaticsAnalysisPage', (bioAnalysisId: string) => {
  cy.visitAndIntercept('/bioinformatics-analysis/' + bioAnalysisId,
                       'POST',
                       '**/$graphql*',
                       1);
});

Cypress.Commands.add('visitCNVsPatientPage', (patientId: string, prescriptionId: string, nbGraphqlCalls: number) => {
  cy.visitAndIntercept('/cnv/exploration/patient/' + patientId + '/' + prescriptionId,
                       'POST',
                       '**/graphql',
                       nbGraphqlCalls);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitPrescriptionEntityPage', (prescriptionId: string) => {
  cy.visitAndIntercept('/prescription/entity/' + prescriptionId,
                       'POST',
                       '**/$graphql*',
                       1);
});

Cypress.Commands.add('visitPrescriptionsPage', () => {
  cy.visitAndIntercept('/prescription/search',
                       'POST',
                       '**/graphql',
                       3);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitVariantEntityPage', (locusId: string, nbGraphqlCalls: number) => {
  cy.visitAndIntercept('/variant/entity/' + locusId + '/summary',
                       'POST',
                       '**/graphql',
                       nbGraphqlCalls);
});

Cypress.Commands.add('visitVariantsPage', () => {
  cy.visitAndIntercept('/snv/exploration',
                       'POST',
                       '**/graphql',
                       3);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitVariantsPatientPage', (patientId: string, prescriptionId: string, nbGraphqlCalls: number) => {
  cy.visitAndIntercept('/snv/exploration/patient/' + patientId + '/' + prescriptionId,
                       'POST',
                       '**/graphql',
                       nbGraphqlCalls,);
  cy.resetColumns(0);
});

Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));