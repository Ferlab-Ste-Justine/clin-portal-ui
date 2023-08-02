/// <reference types="Cypress" />
import '@testing-library/cypress/add-commands';

export interface Replacement {
  placeholder: string;
  value: string;
}

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

Cypress.Commands.add('clickAndIntercept', (selector: string, methodHTTP: string, routeMatcher: string, nbCalls: number, eq?: number) => {
  if (eq == undefined) {
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
  cy.wait(1000);
  cy.get('button[class*="ProTablePopoverColumnResetBtn"]').eq(eq)
  .then(($button) => {
    cy.wrap($button).click({force: true});
    cy.wait(1000);
  });
  
  cy.get('button[class*="ProTablePopoverColumnResetBtn"]').eq(eq).should('be.disabled', {timeout: 20*1000});
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
    cy.exec(`ls cypress/downloads/*`).then((result) => {
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
    cy.exec(`ls cypress/downloads/*`).then((result) => {
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
  cy.exec(`ls cypress/downloads/`+namePattern).then((result) => {
    const filename = result.stdout.trim();
    cy.readFile(`${filename}`).should('exist');
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

Cypress.Commands.add('visitBioinformaticsAnalysisPage', (bioAnalysisId: string) => {
  cy.visitAndIntercept('/bioinformatics-analysis/' + bioAnalysisId,
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

Cypress.Commands.add('visitVariantsPatientPage', (patientId: string, prescriptionId: string, nbGraphqlCalls: number) => {
  cy.visitAndIntercept('/prescription/entity/' + prescriptionId + '#variants',
                       'POST',
                       '**/graphql',
                       nbGraphqlCalls,);
  cy.resetColumns(0);
});

Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));