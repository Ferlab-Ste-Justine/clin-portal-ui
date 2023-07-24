/// <reference types="Cypress" />
import '../../support/commands';

describe('Affichage de la page Login', () => {
  it('Vérifier le texte affiché', () => {
    cy.visit('/');
    cy.contains('Courriel').should('exist', {timeout: 20*1000});
    cy.contains('Mot de passe').should('exist', {timeout: 20*1000});
    cy.contains('Mot de passe oublié ?').should('exist', {timeout: 20*1000});
    cy.contains('Soumettre').should('exist', {timeout: 20*1000});
    cy.contains('Annuler').should('exist', {timeout: 20*1000});
  });

  it.skip('Vérifier les images des partenaires', () => {
    cy.visit('/');
    cy.get('img[alt*="Centre hospitalier universitaire mère-enfant CHU Sainte-Justine"]').should('exist', {timeout: 20*1000});
    cy.get('img[alt*="Centre hospitalier de l\'Université de Montréal"]').should('exist', {timeout: 20*1000});
    cy.get('img[alt*="Hôpital général juif"]').should('exist', {timeout: 20*1000});
    cy.get('img[alt*="CHU du Québec"]').should('exist', {timeout: 20*1000});
    cy.get('img[alt*="Institut de cardiologie de Montréal"]').should('exist', {timeout: 20*1000});
    cy.get('img[alt*="Centre hospitalier universitaire de Sherbrooke"]').should('exist', {timeout: 20*1000});
    cy.get('img[alt*="Hôpital Maisonneuve-Rosemont"]').should('exist', {timeout: 20*1000});
    cy.get('img[alt*="Centre universitaire de santé McGill"]').should('exist', {timeout: 20*1000});
    cy.get('img[alt*="Santé et Services sociaux Québec"]').should('exist', {timeout: 20*1000});
  });
});
