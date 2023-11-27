/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitBioinformaticsAnalysisPage(epCHUSJ_ldmCHUSJ.bioAnalProbId);
});

describe('Page d\'une analyse bioinformatique - Vérifier les informations affichées', () => {
  it('Panneau Analyse', () => {
    cy.get('[data-cy="AnalysisCard_Card"]').contains(epCHUSJ_ldmCHUSJ.bioAnalProbId).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"]').contains('GEBA').should('exist');
    cy.get('[data-cy="AnalysisCard_Card"]').contains(epCHUSJ_ldmCHUSJ.stampDate).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"]').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"]').contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"]').contains('LDM-CHUSJ').should('exist');
    cy.get('[data-cy="AnalysisCard_Card"]').contains('CQGC').should('exist');
  });
  
  it('Panneau Pipeline bioinformatique', () => {
    cy.get('[data-cy="BioInfoPipelineCard_Card"]').contains('Dragen').should('exist');
    cy.get('[data-cy="BioInfoPipelineCard_Card"]').contains('3.8.4').should('exist');
    cy.get('[data-cy="BioInfoPipelineCard_Card"]').contains('GRCh38').should('exist');
  });
  
  it('Panneau Séquençage', () => {
    cy.get('[data-cy="ExperimentCard_Card"]').contains('WXS').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"]').contains('201106_A00516_0169_AHFM3HDSXY').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"]').contains('A00516_0169').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"]').contains('Illumina NovaSeq').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"]').contains('RocheKapaHyperExome').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"]').contains('A00516').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"]').contains('2020-11-03').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"]').contains(epCHUSJ_ldmCHUSJ.aliquotProbId).should('exist');
  });
  
  it('Panneau Échantillons', () => {
    cy.get('[data-cy="SamplesCard_Table"]').contains(new RegExp(`^${epCHUSJ_ldmCHUSJ.sampleProbId}$`)).should('exist');
    cy.get('[data-cy="SamplesCard_Table"]').contains('DNA').should('exist');
    cy.get('[data-cy="SamplesCard_Table"]').contains('SP_'+epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
    cy.get('[data-cy="SamplesCard_Table"]').contains('NBL').should('exist');
  });
  
  it('Panneau Fichiers de données', () => {
    cy.get('[data-cy="FilesCard_Table"]').contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.cram').should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains('ALIR').should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains('CRAM').should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains(epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains('3.11 GB').should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains('https://ferload').should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.hard-filtered.gvcf.gz').should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains('SNV').should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains('VCF').should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains('162.01 MB').should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.cnv.vcf.gz').should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains('GCNV').should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains('9.15 KB').should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.QC.tgz').should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains('SSUP').should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains('TGZ').should('exist');
    cy.get('[data-cy="FilesCard_Table"]').contains('23.3 MB').should('exist');
  });
});

describe('Page d\'une analyse bioinformatique - Valider les panneaux masquables', () => {
  it('Panneau Échantillons', () => {
    cy.get('[data-cy="SamplesCard_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="SamplesCard_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="SamplesCard_CollapsePanel"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="SamplesCard_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="SamplesCard_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Fichiers de données', () => {
    cy.get('[data-cy="FilesCard_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="FilesCard_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="FilesCard_CollapsePanel"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="FilesCard_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="FilesCard_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });
});
  