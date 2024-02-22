/// <reference types="Cypress" />
import '@testing-library/cypress/add-commands';

export interface Replacement {
  placeholder: string;
  value: string;
}

Cypress.Commands.add('checkAndClickApplyFacet', (section: string, facetTitle: string, value: string, isRqdmExpand: boolean = false) => {
  cy.get(`[data-cy="SidebarMenuItem_${section}"]`).click({force: true});

  if (isRqdmExpand) {
    cy.get('[data-cy="FilterContainer_Panel RQDM"]').click({force: true});
  }

  if (section !== 'Panel RQDM') {
    cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).click({force: true});
    cy.wait(1000);
  }

  cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).parentsUntil('.FilterContainer_filterContainer__O6v-O')
    .find('button').then(($button) => {
      if ($button.hasClass('ant-btn-link')) {
        cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).parentsUntil('.FilterContainer_filterContainer__O6v-O')
          .find('button[class*="CheckboxFilter_filtersTypesFooter"]').click({force: true});
        cy.waitWhileSpin(1000);
      };
  });

  cy.get(`[data-cy="Checkbox_${facetTitle}_${value}"]`).check({force: true});
  cy.clickAndIntercept(`[data-cy="Apply_${facetTitle}"]`, 'POST', '**/graphql', 4);
});

Cypress.Commands.add('checkValueFacet', (facetTitle: string, valueBack: string) => {
  cy.get(`[aria-expanded="true"] [data-cy="FilterContainer_${facetTitle}"]`).should('exist');
  cy.waitWhileSpin(1000);
  cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).parentsUntil('.FilterContainer_filterContainer__O6v-O')
    .find('button').then(($button) => {
      if ($button.hasClass('ant-btn-link')) {
        cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).parentsUntil('.FilterContainer_filterContainer__O6v-O')
          .find('button[class*="CheckboxFilter_filtersTypesFooter"]').click({force: true});
        cy.waitWhileSpin(1000);
      };
  });

  cy.clickAndIntercept(`[data-cy="Checkbox_${facetTitle}_${valueBack}"]`, 'POST', '**/graphql', 2);
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

Cypress.Commands.add('closePopup', () => {
  cy.get('body')
    .find('button').then(($button) => {
      if ($button.hasClass('close')) {
          cy.get('body').find('button[class="close"]').click({force: true});
      };
  });
});

Cypress.Commands.add('login', (user: string, password: string, restoreSession: boolean = true) => {
  const strUserSession = restoreSession ? user : Math.random();
  cy.session([strUserSession], () => {
    cy.visit('/');
    cy.get('button[class*="ant-btn-primary ant-btn-lg"]').should('exist', {timeout: 60*1000});
    cy.get('button[class*="ant-btn-primary ant-btn-lg"]').click();

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
  cy.exec(`/bin/rm ${folder}/*`, {failOnNonZeroExit: false});
});

Cypress.Commands.add('resetColumns', (eq: number) => {
  cy.get('svg[data-icon="setting"]').eq(eq).click({force: true});
  cy.wait(1000);
  cy.get('button[class*="ProTablePopoverColumnResetBtn"]').eq(eq)
  .then(($button) => {
    cy.wrap($button).click({force: true});
    cy.wait(1000);
    cy.wrap($button).click({force: true});
    cy.wait(1000);
  });
  
  cy.get('button[class*="ProTablePopoverColumnResetBtn"]').eq(eq).should('be.disabled', {timeout: 20*1000});
  cy.get('svg[data-icon="setting"]').eq(eq).click({force: true});
  cy.get('div[class*="Header_ProTableHeader"]').click({force: true, multiple: true});
});

Cypress.Commands.add('showColumn', (column: string|RegExp, eq: number) => {
  cy.intercept('PUT', '**/user').as('getPOSTuser');

  cy.get('div[class="ant-popover-inner"]').eq(eq)
    .find('div[class="ant-space-item"]').contains(column)
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getPOSTuser', {timeout: 20*1000});
  cy.get('div[class*="Header_ProTableHeader"]').click({force: true, multiple: true});
});

Cypress.Commands.add('sortTableAndIntercept', (column: string|RegExp, nbCalls: number, eq: number = 0) => {
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

Cypress.Commands.add('validateClearAllButton', (shouldExist: boolean) => {
  const strExist = shouldExist ? 'exist' : 'not.exist';
  cy.get('[id="query-builder-header-tools"]').contains('Tout effacer').should(strExist);
});

Cypress.Commands.add('validateDictionnaryNewValues', (section: string, facetTitle: string, dictionnary: (string|RegExp)[], moreButton: boolean = false) => {
  cy.get(`[data-cy="SidebarMenuItem_${section}"]`).click({force: true});

  if (section !== 'Panel RQDM') {
    cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).click({force: true});
  }
  
  cy.get(`[data-cy="Button_Dict_${facetTitle}"]`).click({force: true});
  cy.wait(1000);

  if (moreButton) {
    cy.get('[data-cy="FilterContainer_' + facetTitle + '"]').parentsUntil('.FilterContainer_filterContainer__O6v-O')
      .find('button[class*="CheckboxFilter_filtersTypesFooter"]').click({force: true});
    cy.wait(1000);
  }
    
  // Aucune nouvelle valeur n'est présente dans la facette
  cy.get('[id="query-builder-header-tools"]').find('[data-icon="plus"]').click({force: true});
  cy.waitWhileSpin(2000);
  cy.get(`[data-cy*="Checkbox_${facetTitle}_"]`).its('length').should('eq', dictionnary.length);
});

Cypress.Commands.add('validateDictionnaryPresetValues', (section: string, facetTitle: string, dictionnary: (string|RegExp)[], moreButton: boolean = false) => {
  cy.get(`[data-cy="SidebarMenuItem_${section}"]`).click({force: true});

  if (section !== 'Panel RQDM') {
    cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).click({force: true});
  }
  
  cy.get(`[data-cy="Button_Dict_${facetTitle}"]`).click({force: true});
  cy.wait(1000);

  if (moreButton) {
    cy.get('[data-cy="FilterContainer_' + facetTitle + '"]').parentsUntil('.FilterContainer_filterContainer__O6v-O')
      .find('button[class*="CheckboxFilter_filtersTypesFooter"]').click({force: true});
    cy.wait(1000);
  }

  // Toutes les valeurs du dictionnaire sont présentes dans la facette
  for (let i = 0; i < dictionnary.length; i++) {
    cy.get(`[data-cy*="Checkbox_${facetTitle}_"]`).parents('label').contains(dictionnary[i]).should('exist');
    }
});

Cypress.Commands.add('validateExpandCollapse', (section: string, isRqdmExpand: boolean = false) => {
  const eq = isRqdmExpand ? 1 : 0;

  cy.get(`[data-cy="SidebarMenuItem_${section}"]`).click({force: true});

  if (section !== 'Panel RQDM') {
    cy.get('div[class="FilterContainer_filterContainer__O6v-O"]').eq(eq).find('[aria-expanded="false"]').should('exist');
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Tout ouvrir').should('exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true});
  }
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Tout fermer').should('exist');
  cy.get('div[class="FilterContainer_filterContainer__O6v-O"]').eq(eq).find('[aria-expanded="true"]').should('exist');

  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true});
  cy.get('div[class="FilterContainer_filterContainer__O6v-O"]').eq(eq).find('[aria-expanded="false"]').should('exist');
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Tout ouvrir').should('exist');
});

Cypress.Commands.add('validateFacetFilter', (section: string, facetTitle: string, valueFront: string, valueBack: string, expectedCount: string|RegExp, isRqdmExpand: boolean = false) => {
  cy.checkAndClickApplyFacet(section, facetTitle, valueBack, isRqdmExpand);

  cy.validatePillSelectedQuery(facetTitle, [valueFront]);
  cy.get('body').contains(expectedCount).should('exist');
});

Cypress.Commands.add('validateFacetNumFilter', (section: string, facetTitle: string, value: string, expectedCount: string|RegExp) => {
  cy.get(`[data-cy="SidebarMenuItem_${section}"]`).click({force: true});
  cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).click({force: true});
  cy.get(`[data-cy="InputNumber_Max_${facetTitle}"]`).type(value, {force: true});
  cy.get(`[data-cy="Checkbox_NoData_${facetTitle}"]`).check({force: true});
  cy.get(`[data-cy="Button_Apply_${facetTitle}"]`).click({force: true});

  cy.validatePillSelectedQuery(facetTitle, [value, 'No Data']);
  cy.get('body').contains(expectedCount).should('exist');
});

Cypress.Commands.add('validateFacetRank', (facetRank: number, facetTitle: string) => {
  cy.log(facetTitle);
  cy.get('div[class*="Filters_customFilterContainer"]').eq(facetRank).contains(facetTitle).should('exist');
});

Cypress.Commands.add('validateFileContent', (fixture: string, replacements?: Replacement[]) => {
  const arrReplacements = replacements !== undefined ? replacements : [];
  cy.fixture(fixture).then((expectedData) => {
    cy.exec(`/bin/ls ${Cypress.config('downloadsFolder')}/*`).then((result) => {
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
    cy.exec(`/bin/ls ${Cypress.config('downloadsFolder')}/*`).then((result) => {
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
  cy.exec(`/bin/ls ${Cypress.config('downloadsFolder')}/`+namePattern).then((result) => {
    const filename = result.stdout.trim();
    cy.readFile(`${filename}`).should('exist');
  });
});

Cypress.Commands.add('validateOperatorSelectedQuery', (expectedOperator: string) => {
  cy.get('[class*="QueryBar_selected"]').find('[class*="Combiner_operator"]').contains(expectedOperator).should('exist');
});

Cypress.Commands.add('validatePaging', (total: string|RegExp, eqSelect: number, eqTab: number = 0) => {
  if (typeof total === 'string') {
    total = new RegExp(total);
  }

  cy.get('span[class*="ant-select-selection-item"]').eq(eqSelect).click({force: true});
  cy.get('div[class*="ant-select-item-option-content"]').contains('100').click({force: true});
  cy.waitWhileSpin(20*1000);
  cy.validateTableResultsCount(new RegExp('Résultats 1 - 100 de '+total.source));

  cy.get('span[class*="ant-select-selection-item"]').eq(eqSelect).click({force: true});
  cy.get('div[class*="ant-select-item-option-content"]').contains('20 ').click({force: true});
  cy.waitWhileSpin(20*1000);
  cy.wait(2000);
  cy.validateTableResultsCount(new RegExp('Résultats 1 - 20 de '+total.source));
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Début').parent('button').should('be.disabled');

  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Suivant').click({force: !!eqSelect});
  cy.waitWhileSpin(20*1000);
  cy.wait(2000);
  cy.validateTableResultsCount(new RegExp('Résultats 21 - 40 de '+total.source));
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');

  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Suivant').click({force: true});
  cy.waitWhileSpin(20*1000);
  cy.wait(2000);
  cy.validateTableResultsCount(new RegExp('Résultats 41 - 60 de '+total.source));
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');

  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Précédent').click({force: true});
  cy.waitWhileSpin(20*1000);
  cy.wait(2000);
  cy.validateTableResultsCount(new RegExp('Résultats 21 - 40 de '+total.source));
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Précédent').parent('button').should('not.be.disabled');
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Début').parent('button').should('not.be.disabled');

  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Début').click({force: true});
  cy.waitWhileSpin(20*1000);
  cy.wait(2000);
  cy.validateTableResultsCount(new RegExp('Résultats 1 - 20 de '+total.source));
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Précédent').parent('button').should('be.disabled');
  cy.get('div[class*="Pagination"]').eq(eqTab).find('button[type="button"]').contains('Début').parent('button').should('be.disabled');
});

Cypress.Commands.add('validatePillSelectedQuery', (facetTitle: string, values: (string|RegExp)[], eq: number = 0) => {
  if (facetTitle == '') {
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').should('not.exist');
  }
  else {
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').eq(eq).contains(facetTitle).should('exist');
  }

  for (let i = 0; i < values.length; i++) {
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_queryValuesContainer"]').eq(eq).contains(values[i]).should('exist');
    }
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

Cypress.Commands.add('validateTableResultsCount', (expectedCount: string|RegExp, shouldExist: boolean = true) => {
  const strExist = shouldExist ? 'exist' : 'not.exist';
  cy.get('div[class*="ProTableHeader"]').contains(expectedCount).should(strExist);
});

Cypress.Commands.add('validateTotalSelectedQuery', (expectedCount: string|RegExp) => {
  cy.get('[class*="QueryBar_selected"]').find('[class*="QueryBar_total"]').contains(expectedCount).should('exist');
});

Cypress.Commands.add('visitAndIntercept', (url: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.visit(url);

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: 20*1000});
  };
});

Cypress.Commands.add('visitArchivesPatientPage', (patientId: string) => {
  cy.visitAndIntercept(`/archive/exploration?search=${patientId}`,
                       'POST',
                       '**/$graphql*',
                       1);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitBioinformaticsAnalysisPage', (bioAnalProbId: string) => {
  cy.visitAndIntercept(`/bioinformatics-analysis/${bioAnalProbId}`,
                       'POST',
                       '**/$graphql*',
                       1);
});

Cypress.Commands.add('visitCNVsPatientPage', (patientId: string, prescriptionId: string, nbGraphqlCalls: number, sharedFilterOption?: string) => {
  const strSharedFilterOption = sharedFilterOption !== undefined ? sharedFilterOption+'&variantSection=cnv#variants' : '?variantSection=cnv#variants';
  cy.visitAndIntercept(`/prescription/entity/${prescriptionId}${strSharedFilterOption}`,
                       'POST',
                       '**/graphql',
                       nbGraphqlCalls);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitCQPatientPage', (prescriptionId: string) => {
  cy.visitAndIntercept(`/prescription/entity/${prescriptionId}#qc`,
                       'POST',
                       '**/$graphql*',
                       3);
});

Cypress.Commands.add('visitFilesPatientPage', (prescriptionId: string) => {
  cy.visitAndIntercept(`/prescription/entity/${prescriptionId}#files`,
                       'POST',
                       '**/$graphql*',
                       7);
  cy.resetColumns(0);
});

Cypress.Commands.add('visitPrescriptionEntityPage', (prescriptionId: string) => {
  cy.visitAndIntercept(`/prescription/entity/${prescriptionId}#details`,
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
  cy.visitAndIntercept(`/variant/entity/${locusId}/summary`,
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
  cy.visitAndIntercept(`/prescription/entity/${prescriptionId}${strSharedFilterOption}#variants`,
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