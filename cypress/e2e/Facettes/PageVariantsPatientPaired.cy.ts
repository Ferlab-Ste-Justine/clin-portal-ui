/// <reference types="Cypress" />
import '../../support/commands';

const presc_PAIRED = JSON.parse(Cypress.env('presc_PAIRED'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants d\'un patient (paired) - Filtrer avec les facettes', () => {

  beforeEach(() => {
    cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId, 3);
  });

  it('Variant - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Variant');
  });

  it('Variant - Analyse bioinformatique', () => {
    cy.validateFacetFilter('Variant', 'Analyse bioinformatique', 'TO', 'TO', /^1 559$/);
    cy.validateFacetRank(1, 'Analyse bioinformatique');
  });

  it('Pathogénicité - Hotspot', () => {
    cy.validateFacetFilter('Pathogénicité', 'Hotspot', 'True', 'true', /^8$/);
    cy.validateFacetRank(14, 'Hotspot');
  });

  it('Occurrence - Qualité somatique', () => {
    cy.validateFacetNumFilter('Occurrence', 'Qualité somatique', '0.01', /^1 073$/);
    cy.validateFacetRank(6, 'Qualité somatique');
  });
});
