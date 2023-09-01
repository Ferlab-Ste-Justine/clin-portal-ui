/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.visit('/');
  cy.get('button[class*="ant-btn-primary ant-btn-lg"]').should('exist', {timeout: 60*1000});
  cy.get('button[class*="ant-btn-primary ant-btn-lg"]').click();
});

describe('Affichage de la page Login', () => {
  it('Vérifier le texte affiché', () => {
    cy.contains('Courriel').should('exist', {timeout: 20*1000});
    cy.contains('Mot de passe').should('exist', {timeout: 20*1000});
    cy.contains('Mot de passe oublié ?').should('exist', {timeout: 20*1000});
    cy.contains('Soumettre').should('exist', {timeout: 20*1000});
    cy.contains('Annuler').should('exist', {timeout: 20*1000});
    cy.contains('EN').should('exist', {timeout: 20*1000});
  });
});
