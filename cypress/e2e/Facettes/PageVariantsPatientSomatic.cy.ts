/// <reference types="Cypress" />
import '../../support/commands';

const presc_SOMATIC = JSON.parse(Cypress.env('presc_SOMATIC'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des variants d\'un patient (somatic) - Filtrer avec les facettes', () => {

  beforeEach(() => {
    cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  });

  it('Variant - Expand all/Collapse all', () => {
    cy.validateExpandCollapse('Variant');
  });

  it('Variant - Analyse bioinformatique [CLIN-2954]', () => {
    cy.validateFacetFilter('Variant', 'Analyse bioinformatique', 'TO', 'TO', /^195 065$/);
    cy.validateFacetRank(1, 'Analyse bioinformatique');
  });

  it('Pathogénicité - Hotspot', () => {
    cy.validateFacetFilter('Pathogénicité', 'Hotspot', 'True', 'true', /^27$/);
    cy.validateFacetRank(14, 'Hotspot');
  });

  it('Occurrence - Qualité somatique [CLIN-2954]', () => {
    cy.validateFacetNumFilter('Occurrence', 'Qualité somatique', '0.01', /^11 865$/);
    cy.validateFacetRank(6, 'Qualité somatique');
  });
});
