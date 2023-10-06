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

  it('Variant - Analyse bioinformatique [CLIN-2156]', () => {
    cy.validateFacetFilter('category_variant', 'Analyse bioinformatique', 1, 'Tumor Only', /^195 065$/);
  });

  it('Pathogénicité - Hotspot', () => {
    cy.validateFacetFilter('category_pathogenicity', 'Hotspot', 19, 'True', /^27$/);
  });
});
