/// <reference types="Cypress" />
import '../../support/commands';

let presc_PAIRED: any;

beforeEach(() => {
  presc_PAIRED = Cypress.env('globalData').presc_PAIRED;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitBioinformaticsAnalysisPage(presc_PAIRED.bioAnalProbId.TNEBA);
});

describe('Page d\'une analyse bioinformatique (paired) - Vérifier les informations affichées', () => {
  it('Panneau Analyse', () => {
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(0).contains(presc_PAIRED.bioAnalProbId.TNEBA).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(1).contains('Analyse bioinformatique des exomes tumoraux et normaux (TNEBA)').should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(2).contains(presc_PAIRED.prescriptionId.TEBA).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(3).contains(presc_PAIRED.stampDate.TEBA).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(4).contains(presc_PAIRED.patientProbId).should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(5).contains('LDM-CHUSJ').should('exist');
    cy.get('[data-cy="AnalysisCard_Card"] [class="ant-descriptions-item-content"]').eq(6).contains('CQGC').should('exist');
  });
  
  it('Panneau Pipeline bioinformatique', () => {
    cy.get('[data-cy="BioInfoPipelineCard_Card"] [class="ant-descriptions-item-content"]').eq(0).contains('Dragen').should('exist');
    cy.get('[data-cy="BioInfoPipelineCard_Card"] [class="ant-descriptions-item-content"]').eq(1).contains('3.10.4').should('exist');
    cy.get('[data-cy="BioInfoPipelineCard_Card"] [class="ant-descriptions-item-content"]').eq(2).contains('GRCh38').should('exist');
  });
  
  it('Panneau Séquençage', () => {
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(0).contains(presc_PAIRED.requestProbId.TEBA).should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(1).contains('WXS').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(2).contains('test_somatic_normal').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(3).contains('A00517_0410').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(4).contains('Illumina').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(5).contains('RocheKapaHyperExome-1.0').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(6).contains('A00516').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(7).contains('2023-04-27').should('exist');
    cy.get('[data-cy="ExperimentCard_Card"] [class="ant-descriptions-item-content"]').eq(8).contains(presc_PAIRED.aliquotProbId.TEBA).should('exist');
  });
  
  it('Panneau Échantillons', () => {
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="0"] [class="ant-table-cell"]').eq(0).contains(presc_PAIRED.sampleProbId.GEBA).should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="0"] [class="ant-table-cell"]').eq(1).contains('DNA').should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="0"] [class="ant-table-cell"]').eq(2).contains(presc_PAIRED.specimenProbId.GEBA).should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="0"] [class="ant-table-cell"]').eq(3).contains('NBL').should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="0"] [class="ant-table-cell"]').eq(4).contains('-').should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="1"] [class="ant-table-cell"]').eq(0).contains(presc_PAIRED.sampleProbId.TEBA).should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="1"] [class="ant-table-cell"]').eq(1).contains('DNA').should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="1"] [class="ant-table-cell"]').eq(2).contains(presc_PAIRED.specimenProbId.TEBA).should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="1"] [class="ant-table-cell"]').eq(3).contains('TUMOR').should('exist');
    cy.get('[data-cy="SamplesCard_Table"] [data-row-key="1"] [class="ant-table-cell"]').eq(4).contains('-').should('exist');
  });
  
  it('Panneau Fichiers de données', () => {
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="T-${presc_PAIRED.aliquotProbId.TEBA}.N-${presc_PAIRED.aliquotProbId.GEBA}.dragen.WES_somatic-tumor_normal.hard-filtered.norm.VEP.vcf.gz"] [class="ant-table-cell"]`).eq(0).contains(`T-${presc_PAIRED.aliquotProbId.TEBA}.N-${presc_PAIRED.aliquotProbId.GEBA}.dragen.WES_somatic-tumor_normal.hard-filtered.norm.VEP.vcf.gz`).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="T-${presc_PAIRED.aliquotProbId.TEBA}.N-${presc_PAIRED.aliquotProbId.GEBA}.dragen.WES_somatic-tumor_normal.hard-filtered.norm.VEP.vcf.gz"] [class="ant-table-cell"]`).eq(1).contains('SSNV').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="T-${presc_PAIRED.aliquotProbId.TEBA}.N-${presc_PAIRED.aliquotProbId.GEBA}.dragen.WES_somatic-tumor_normal.hard-filtered.norm.VEP.vcf.gz"] [class="ant-table-cell"]`).eq(2).contains('VCF').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="T-${presc_PAIRED.aliquotProbId.TEBA}.N-${presc_PAIRED.aliquotProbId.GEBA}.dragen.WES_somatic-tumor_normal.hard-filtered.norm.VEP.vcf.gz"] [class="ant-table-cell"]`).eq(3).contains(presc_PAIRED.sampleProbId.GEBA).should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="T-${presc_PAIRED.aliquotProbId.TEBA}.N-${presc_PAIRED.aliquotProbId.GEBA}.dragen.WES_somatic-tumor_normal.hard-filtered.norm.VEP.vcf.gz"] [class="ant-table-cell"]`).eq(4).contains('1.3 MB').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="T-${presc_PAIRED.aliquotProbId.TEBA}.N-${presc_PAIRED.aliquotProbId.GEBA}.dragen.WES_somatic-tumor_normal.hard-filtered.norm.VEP.vcf.gz"] [class="ant-table-cell"]`).eq(5).contains('https://ferload').should('exist');
    cy.get(`[data-cy="FilesCard_Table"] [data-row-key="T-${presc_PAIRED.aliquotProbId.TEBA}.N-${presc_PAIRED.aliquotProbId.GEBA}.dragen.WES_somatic-tumor_normal.hard-filtered.norm.VEP.vcf.gz"] [class="ant-table-cell"]`).eq(6).contains(/^-$/).should('exist');
  });
  
  it('Panneau Analyses connexes', () => {
    cy.get('[data-cy="RelatedAnalysesCard_Table"] [class*="ant-table-row"]').eq(0).find('[class="ant-table-cell"]').eq(0).contains(presc_PAIRED.bioAnalProbId.GEBA).should('exist');
    cy.get('[data-cy="RelatedAnalysesCard_Table"] [class*="ant-table-row"]').eq(0).find('[class="ant-table-cell"]').eq(1).contains(presc_PAIRED.stampDate.GEBA).should('exist');
    cy.get('[data-cy="RelatedAnalysesCard_Table"] [class*="ant-table-row"]').eq(0).find('[class="ant-table-cell"]').eq(2).contains(presc_PAIRED.prescriptionId.GEBA).should('exist');
    cy.get('[data-cy="RelatedAnalysesCard_Table"] [class*="ant-table-row"]').eq(0).find('[class="ant-table-cell"]').eq(3).contains('Analyse bioinformatique d\'exomes germinales (GEBA)').should('exist');
    cy.get('[data-cy="RelatedAnalysesCard_Table"] [class*="ant-table-row"]').eq(1).find('[class="ant-table-cell"]').eq(0).contains(presc_PAIRED.bioAnalProbId.TEBA).should('exist');
    cy.get('[data-cy="RelatedAnalysesCard_Table"] [class*="ant-table-row"]').eq(1).find('[class="ant-table-cell"]').eq(1).contains(presc_PAIRED.stampDate.TEBA).should('exist');
    cy.get('[data-cy="RelatedAnalysesCard_Table"] [class*="ant-table-row"]').eq(1).find('[class="ant-table-cell"]').eq(2).contains(presc_PAIRED.prescriptionId.TEBA).should('exist');
    cy.get('[data-cy="RelatedAnalysesCard_Table"] [class*="ant-table-row"]').eq(1).find('[class="ant-table-cell"]').eq(3).contains('Analyse bioinformatique d\'exomes tumoraux (TEBA)').should('exist');
  });
});

describe('Page d\'une analyse bioinformatique (paired) - Valider les panneaux masquables', () => {
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

  it('Panneau Analyses connexes', () => {
    cy.get('[data-cy="RelatedAnalysesCard_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="RelatedAnalysesCard_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="RelatedAnalysesCard_CollapsePanel"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="RelatedAnalysesCard_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="RelatedAnalysesCard_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });
});
