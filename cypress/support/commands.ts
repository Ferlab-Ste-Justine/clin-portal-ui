/// <reference types="Cypress" />
import '@testing-library/cypress/add-commands';

// Add Custom commands here and their types in `./index.d.ts`

Cypress.Commands.add('checkValueFacet', (facetRank: number, value: string|RegExp) => {
    cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(facetRank)
      .find('button').then(($button) => {
        if ($button.hasClass('ant-btn-link')) {
            cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(facetRank)
              .find('button[class*="CheckboxFilter_filtersTypesFooter"]').click({force: true});
        };
    });

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');

    cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(facetRank)
      .find('div[class*="CheckboxFilter_checkboxFilterItem"]').contains(value)
      .find('[type="checkbox"]').check({force: true});

    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
});

Cypress.Commands.add('clickApplyFacet', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    
    cy.get('span[data-key="apply"]', {timeout: 20*1000}).click({force: true});
    
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
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
    cy.exec('npm cache clear --force');
    cy.wait(1000);

    cy.visit('/');
    cy.get('input[type="email"]').should('exist', {timeout: 20*1000});

    cy.get('input[type="email"]').type(user);
    cy.get('input[type="password"]').type(password, {log: false});

    cy.intercept('**/user').as('getUser');
    cy.get('button[type="submit"]').click();
    cy.wait('@getUser', {timeout: 20*1000});
});

Cypress.Commands.add('logout', () => {
    cy.get('div').then(($div) => {
        if ($div.hasClass('App')) {
            cy.get('span[class="ant-page-header-heading-extra"]')
              .find('span[class*="anticon-down"]').click({force: true});
            cy.get('span[class="ant-dropdown-menu-title-content"]').click({force: true});
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

Cypress.Commands.add('visitArchivesPatientPage', (patientId: string) => {
    cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
    
    cy.visit('/archive/exploration?search='+patientId);

    cy.wait('@getPOSTgraphql', {timeout: 5000});
    
    cy.resetColumns(0);
});

Cypress.Commands.add('visitCNVsPatientPage', (patientId: string, prescriptionId: string, nbGraphqlCalls: number) => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    
    cy.visit('/cnv/exploration/patient/'+patientId+'/'+prescriptionId);

    for (let i = 0; i < nbGraphqlCalls; i++) {
        cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    }

    cy.resetColumns(0);
});

Cypress.Commands.add('visitPrescriptionEntityPage', (prescriptionId: string) => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    
    cy.visit('/prescription/entity/'+prescriptionId);

    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
});

Cypress.Commands.add('visitPrescriptionsPage', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');

    cy.visit('/prescription/search');

    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.resetColumns(0);
});

Cypress.Commands.add('visitVariantEntityPage', (locusId: string) => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    
    cy.visit('/variant/entity/'+locusId+'/summary');

    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
});

Cypress.Commands.add('visitVariantsPage', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');

    cy.visit('/snv/exploration');
    
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.resetColumns(0);
});

Cypress.Commands.add('visitVariantsPatientPage', (patientId: string, prescriptionId: string, nbGraphqlCalls: number) => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');

    cy.visit('/snv/exploration/patient/'+patientId+'/'+prescriptionId);

    for (let i = 0; i < nbGraphqlCalls; i++) {
        cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    }

    cy.resetColumns(0);
});