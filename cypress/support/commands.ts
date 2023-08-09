/// <reference types="Cypress" />
import '@testing-library/cypress/add-commands';

export interface Replacement {
  placeholder: string;
  value: string;
}

Cypress.Commands.add('checkValueFacet', (facetRank: number, value: string|RegExp) => {
  cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(facetRank)
    .find('[aria-expanded="true"]').should('exist');
  cy.waitWhileSpin(1000);
  cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(facetRank)
    .find('button').then(($button) => {
      if ($button.hasClass('ant-btn-link')) {
        cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(facetRank)
          .find('button[class*="CheckboxFilter_filtersTypesFooter"]').click({force: true});
        cy.waitWhileSpin(1000);
      };
  });

  cy.intercept('POST', '**/graphql').as('getPOSTgraphql');

  cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(facetRank)
    .find('div[class*="CheckboxFilter_checkboxFilterItem"]').contains(value)
    .find('[type="checkbox"]').check({force: true});

  cy.wait('@getPOSTgraphql', {timeout: 20*1000});
  cy.wait('@getPOSTgraphql', {timeout: 20*1000});
});

Cypress.Commands.add('clickAndIntercept', (selector: string, methodHTTP: string, routeMatcher: string, nbCalls: number, eq?: number) => {
  if (!eq) {
    eq = 0;
  }

  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.get(selector).eq(eq).click({force: true});

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
    cy.get('input[id="username"]').should('exist', {timeout: 60*1000});

    cy.get('input[id="username"]').type(user);
    cy.get('input[id="password"]').type(password, {log: false});
    cy.get('button[type="submit"]').click();
  });
});

Cypress.Commands.add('logout', () => {
    cy.visit('/');
    cy.waitWhileSpin(5*1000);

    cy.get('div').then(($div) => {
        if ($div.hasClass('App')) {
            cy.get('span[class="anticon anticon-down"]').click({force: true});
            cy.get('[data-menu-id*="logout"]').click({force: true});
        };
    });

  cy.exec('npm cache clear --force');
  cy.wait(1000);
});

Cypress.Commands.add('removeFilesFromFolder', (folder: string) => {
  cy.exec(`rm ${folder}/*`, {failOnNonZeroExit: false});
});

Cypress.Commands.add('resetColumns', (eq: number) => {
  cy.get('svg[data-icon="setting"]').eq(eq).click({force: true});
  cy.wait(1000);
  cy.get('button[class*="ProTablePopoverColumnResetBtn"]').eq(eq)
  .then(($button) => {
    cy.wrap($button).click({force: true});
    cy.wait(1000);
  });
  
  cy.get('button[class*="ProTablePopoverColumnResetBtn"]').eq(eq).should('be.disabled', {timeout: 20*1000});
});

Cypress.Commands.add('showColumn', (column: string, eq: number) => {
  cy.intercept('PUT', '**/user').as('getPOSTuser');

  cy.get('div[class="ant-popover-inner"]').eq(eq)
    .find('div[class="ant-space-item"]').contains(column)
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getPOSTuser', {timeout: 20*1000});
});

Cypress.Commands.add('sortTableAndIntercept', (column: string, nbCalls: number, eq: number = 0) => {
  cy.intercept('POST', '**/graphql').as('getPOSTgraphql');

  cy.get('thead[class="ant-table-thead"]').eq(eq).contains(column).click({force: true});

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getPOSTgraphql', {timeout: 60*1000});
  };

  cy.waitWhileSpin(1000);
});

Cypress.Commands.add('sortTableAndWait', (column: string, eq: number = 0) => {
  cy.get('thead[class="ant-table-thead"]').eq(eq).contains(column).click({force: true});
  cy.waitWhileSpin(1000);
});

Cypress.Commands.add('typeAndIntercept', (selector: string, text: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.get(selector).type(text, {force: true});

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: 60*1000});
  };
});

Cypress.Commands.add('validateDictionnary', (section: string, facetTitle: RegExp, facetRank: number, dictionnary: (string|RegExp)[]) => {
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
      .find('div[class*="CheckboxFilter_checkboxFilterItem"]').find('label').contains(dictionnary[i])
      .should('exist');
    }
    
  // Aucune nouvelle valeur n'est présente dans la facette
  cy.get('div[class="FilterContainer_filterContainer__O6v-O"]').eq(facetRank)
    .find('div[class*="CheckboxFilter_checkboxFilterItem"]')
    .its('length').should('eq', dictionnary.length);
});

Cypress.Commands.add('validateFileContent', (fixture: string, replacements?: Replacement[]) => {
  const arrReplacements = replacements !== undefined ? replacements : [];
  cy.fixture(fixture).then((expectedData) => {
    cy.exec(`ls ${Cypress.config('downloadsFolder')}/*`).then((result) => {
      const filename = result.stdout.trim();
      cy.readFile(`${filename}`).then((file) => {
        let fileWithData = file;
        arrReplacements.forEach((replacement) => {
          fileWithData = fileWithData.replace(replacement.placeholder, replacement.value);
        });
        expectedData.content.forEach((value: any) => {
          let valueWithData = value
          arrReplacements.forEach((replacement) => {
            valueWithData = valueWithData.replace(replacement.placeholder, replacement.value);
          });
          expect(fileWithData).to.include(valueWithData);
        });
      });
    });
  });
});

Cypress.Commands.add('validateFileHeaders', (fixture: string) => {
  cy.fixture(fixture).then((expectedData) => {
    cy.exec(`ls ${Cypress.config('downloadsFolder')}/*`).then((result) => {
      const filename = result.stdout.trim();
      cy.readFile(`${filename}`).then((file) => {
        expectedData.headers.forEach((header: any) => {
          expect(file).to.include(header);
        });
      });
    });
  });
});

Cypress.Commands.add('validateFileName', (namePattern: string) => {
  cy.exec(`ls ${Cypress.config('downloadsFolder')}/`+namePattern).then((result) => {
    const filename = result.stdout.trim();
    cy.readFile(`${filename}`).should('exist');
  });
});

Cypress.Commands.add('validatePaging', (total: string, eq: number) => {
  cy.get('body').find('span[class*="ant-select-selection-item"]').eq(eq).click({force: true});
  cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('100').click({force: true});
  cy.waitWhileSpin(20*1000);
  cy.get('div[class*="ProTableHeader"]').contains('Résultats 1 - 100 de '+total).should('exist');

  cy.get('body').find('span[class*="ant-select-selection-item"]').eq(eq).click({force: true});
  cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('20').click({force: true});
  cy.waitWhileSpin(20*1000);
  cy.get('div[class*="ProTableHeader"]').contains('Résultats 1 - 20 de '+total).should('exist');
  cy.get('body').find('button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
  cy.get('body').find('button[type="button"]').contains('Début').parent('button').should('be.disabled');

  cy.get('body').find('button[type="button"]').contains('Suivant').click({force: !!eq});
  cy.waitWhileSpin(20*1000);
  cy.get('div[class*="ProTableHeader"]').contains('Résultats 21 - 40 de '+total).should('exist');
  cy.get('body').find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
  cy.get('body').find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');

  cy.get('body').find('button[type="button"]').contains('Suivant').click({force: true});
  cy.waitWhileSpin(20*1000);
  cy.get('div[class*="ProTableHeader"]').contains('Résultats 41 - 60 de '+total).should('exist');
  cy.get('body').find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
  cy.get('body').find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');

  cy.get('body').find('button[type="button"]').contains('Précédent').click({force: true});
  cy.waitWhileSpin(20*1000);
  cy.get('div[class*="ProTableHeader"]').contains('Résultats 21 - 40 de '+total).should('exist');
  cy.get('body').find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
  cy.get('body').find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');

  cy.get('body').find('button[type="button"]').contains('Début').click({force: true});
  cy.waitWhileSpin(20*1000);
  cy.get('div[class*="ProTableHeader"]').contains('Résultats 1 - 20 de '+total).should('exist');
  cy.get('body').find('button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
  cy.get('body').find('button[type="button"]').contains('Début').parent('button').should('be.disabled');
});

Cypress.Commands.add('validateTableDataRowKeyAttr', (dataRowKey: string, eq: number, expectedAttr: string, expectedValue: string) => {
  cy.get('tr[data-row-key="'+dataRowKey+'"]').find('td').eq(eq).find('['+expectedAttr+'="'+expectedValue+'"]').should('exist');
});

Cypress.Commands.add('validateTableDataRowKeyClass', (dataRowKey: string, eq: number, expectedClass: string) => {
  cy.get('tr[data-row-key="'+dataRowKey+'"]').find('td').eq(eq).find('[class*="'+expectedClass+'"]').should('exist');
});

Cypress.Commands.add('validateTableDataRowKeyContent', (dataRowKey: string, eq: number, expectedContent: string|RegExp) => {
  cy.get('tr[data-row-key="'+dataRowKey+'"]').find('td').eq(eq).contains(expectedContent).should('exist');
});

Cypress.Commands.add('validateTableFirstRow', (expectedValue: string|RegExp, eq: number, selector: string = '') => {
  cy.get('.ant-spin-container').should('not.have.class', 'ant-spin-blur', {timeout: 5*1000});
  cy.get(selector+' tr[class*="ant-table-row"]').eq(0)
  .then(($firstRow) => {
    cy.wrap($firstRow).find('td').eq(eq).contains(expectedValue).should('exist');
  });
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

Cypress.Commands.add('visitBioinformaticsAnalysisPage', (bioAnalProbId: string) => {
  cy.visitAndIntercept('/bioinformatics-analysis/' + bioAnalProbId,
                       'POST',
                       '**/$graphql*',
                       1);
});

Cypress.Commands.add('visitCNVsPatientPage', (patientId: string, prescriptionId: string, nbGraphqlCalls: number) => {
  cy.visitAndIntercept('/prescription/entity/' + prescriptionId + '?variantSection=cnv#variants',
                       'POST',
                       '**/graphql',
                       nbGraphqlCalls);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitFilesPatientPage', (prescriptionId: string) => {
  cy.visitAndIntercept('/prescription/entity/' + prescriptionId + '#files',
                       'POST',
                       '**/$graphql*',
                       7);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitPrescriptionEntityPage', (prescriptionId: string) => {
  cy.visitAndIntercept('/prescription/entity/' + prescriptionId + '#details',
                       'POST',
                       '**/$graphql*',
                       3);
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

Cypress.Commands.add('visitVariantsPage', (sharedFilterOption?: string) => {
  const strSharedFilterOption = sharedFilterOption !== undefined ? sharedFilterOption : '';
  cy.visitAndIntercept('/snv/exploration'+strSharedFilterOption,
                       'POST',
                       '**/graphql',
                       3);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitVariantsPatientPage', (patientId: string, prescriptionId: string, nbGraphqlCalls: number, sharedFilterOption?: string) => {
  const strSharedFilterOption = sharedFilterOption !== undefined ? '?sharedFilterId='+sharedFilterOption+'&variantSection=snv' : '';
  cy.visitAndIntercept('/prescription/entity/' + prescriptionId + strSharedFilterOption + '#variants',
                       'POST',
                       '**/graphql',
                       nbGraphqlCalls,);
  cy.resetColumns(0);
});

Cypress.Commands.add('waitWhileSpin', (ms: number) => {
  cy.get('body').should(($body) => {
    if ($body.hasClass('ant-spin-container')) {
      cy.get('.ant-spin-container').should('not.have.class', 'ant-spin-blur', {timeout: ms});
    }
  });
});

Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));