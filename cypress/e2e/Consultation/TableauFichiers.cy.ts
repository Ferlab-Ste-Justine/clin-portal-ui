/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
});

describe('Page des fichiers d\'un patient - Consultation du tableau', () => {

  beforeEach(() => {
    cy.visitFilesPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);

    cy.showColumn('Taille', 0);
    cy.showColumn('Hash', 0);
    cy.showColumn('Run', 0);
    cy.showColumn('Type', 0);
  });

  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 0, '16776.hard-filtered.gvcf.gz');
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 1, 'VCF');
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 2, epCHUSJ_ldmCHUSJ.patientFthId);
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 3, epCHUSJ_ldmCHUSJ.requestFthId);
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 4, epCHUSJ_ldmCHUSJ.sampleFthId);
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 5, epCHUSJ_ldmCHUSJ.bioAnalFthId);
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 6, epCHUSJ_ldmCHUSJ.stampDate);
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 7, 'Fichier');
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 7, 'Index');
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 8, '156.52 MB');
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 9, 'ZDgwMThjMjkxYjA2OTM1NzQzMzMxM2Q1ZTY1YmM4YjM=');
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 10, 'A00516_0169_16776');
    cy.validateTableDataRowKeyContent('16776.hard-filtered.gvcf.gz', 11, 'SNV');
  });
 
  it('Valider les liens disponibles Lien Requête', () => {
    cy.get('tr[data-row-key="16776.hard-filtered.gvcf.gz"]').contains(epCHUSJ_ldmCHUSJ.requestFthId).click({force: true});

    cy.get('div[role="tablist"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist', {timeout: 20*1000});
    cy.get('div[aria-selected="true"]').contains('Détails').should('exist');
  });
 
  it('Valider les liens disponibles Lien Analyse bioinfo', () => {
    cy.intercept('POST', '**/$graphql*').as('getPOSTgraphql');
    cy.get('tr[data-row-key="16776.hard-filtered.gvcf.gz"]').contains(epCHUSJ_ldmCHUSJ.bioAnalFthId).click({force: true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.contains('Analyse bioinformatique : '+epCHUSJ_ldmCHUSJ.bioAnalFthId).should('exist', {timeout: 20*1000});
  });
  
  it('Valider les fonctionnalités du tableau - Tris', () => {
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.patientProbId, 2);
    cy.sortTableAndWait('Patient');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.patientFthId, 2);
    cy.sortTableAndWait('Patient');

    cy.sortTableAndWait('Format');
    cy.validateTableFirstRow('BED', 1);
    cy.sortTableAndWait('Format');
    cy.validateTableFirstRow('VCF', 1);
    cy.sortTableAndWait('Format');

    cy.sortTableAndWait('Requête');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestProbId, 3);
    cy.sortTableAndWait('Requête');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.requestFthId, 3);
    cy.sortTableAndWait('Requête');

    cy.sortTableAndWait('Analyse bioinfo');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.bioAnalProbId, 5);
    cy.sortTableAndWait('Analyse bioinfo');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.bioAnalFthId, 5);
    cy.sortTableAndWait('Analyse bioinfo');

    cy.sortTableAndWait('Date');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.stampDate, 6);
    cy.sortTableAndWait('Date');
    cy.validateTableFirstRow(epCHUSJ_ldmCHUSJ.stampDate, 6);
    cy.sortTableAndWait('Date');

    cy.sortTableAndWait('Taille');
    cy.validateTableFirstRow('242 B', 8);
    cy.sortTableAndWait('Taille');
    cy.validateTableFirstRow('3.11 GB', 8);
    cy.sortTableAndWait('Taille');

    cy.sortTableAndWait('Run');
    cy.validateTableFirstRow('A00516_0169_16774', 10);
    cy.sortTableAndWait('Run');
    cy.validateTableFirstRow('A00516_0169_16776', 10);
    cy.sortTableAndWait('Run');

    cy.sortTableAndWait('Type');
    cy.validateTableFirstRow('ALIR', 11);
    cy.sortTableAndWait('Type');
    cy.validateTableFirstRow('SSUP', 11);
    cy.sortTableAndWait('Type');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndWait('Patient');
    cy.sortTableAndWait('Taille');
    cy.validateTableFirstRow('374 B', 8);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('div[class*="ProTableHeader"]').contains('Résultats 1 - ').should('not.exist');
  });
});