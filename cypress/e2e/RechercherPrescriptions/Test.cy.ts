/// <reference types="Cypress" />
import '../../support/commands';

describe('Page des prescriptions', () => {
  it('Rechercher des prescriptions', () => {
    // Se connecter
    cy.visit('/');
    cy.wait(2000);
    cy.get('input[type="email"]').type(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'));
    cy.get('input[type="password"]').type(Cypress.env('password'), { log: false });
    cy.get('button[type="submit"]').click();

    cy.visit('/prescription/search');
    cy.wait(2000);

    //Entrer un numéro de dossier
    cy.get('input[type="text"]').type('MRN-283773', {force: true});

    //Vérifier que le prénom a été modifié
    cy.get('body').contains('Prescriptions (1)').should('exist');

    cy.logout();
  });
});
