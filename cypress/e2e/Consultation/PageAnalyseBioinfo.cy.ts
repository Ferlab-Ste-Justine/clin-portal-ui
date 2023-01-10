/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

  cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
  cy.visit('/bioinformatics-analysis/'+epCHUSJ_ldmCHUSJ.bioAnalysisId);
  cy.wait('@getPOSTgraphql', {timeout: 5000});
});

afterEach(() => {
  cy.logout();
});

describe('Page d\'une analyse bioinformatique', () => {
  describe('Vérifier les informations affichées', () => {
    it('De la section Analyse', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(0).contains(epCHUSJ_ldmCHUSJ.bioAnalysisId).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(0).contains('GEBA').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(0).contains(epCHUSJ_ldmCHUSJ.stampDate).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(0).contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(0).contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(0).contains('LDM-CHUSJ').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(0).contains('CQGC').should('exist');
    });
    
    it('De la section Pipeline bioinformatique', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(1).contains('Dragen').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(1).contains('3.8.4').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(1).contains('GRCh38').should('exist');
    });
    
    it('De la section Séquençage', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(2).contains('WXS').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(2).contains('201106_A00516_0169_AHFM3HDSXY').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(2).contains('A00516_0169').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(2).contains('Illumina NovaSeq').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(2).contains('RocheKapaHyperExome').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(2).contains('A00516').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(2).contains('2020-11-06').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="ant-card-bordered"]').eq(2).contains(epCHUSJ_ldmCHUSJ.aliquotProbId).should('exist');
    });
    
    it('De la section Échantillons', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).contains(new RegExp("^" + epCHUSJ_ldmCHUSJ.sampleProbId + "$")).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).contains('DNA').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).contains('SP_'+epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).contains('NBL').should('exist');
    });
    
    it('De la section Fichiers de données', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.cram').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('ALIR').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('CRAM').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains(epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('3.11 GB').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('https://ferload').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.hard-filtered.gvcf.gz').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('SNV').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('VCF').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('162.01 MB').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.cnv.vcf.gz').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('GCNV').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('9.15 KB').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains(epCHUSJ_ldmCHUSJ.aliquotProbId+'.QC.tgz').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('SSUP').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('TGZ').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).contains('23.3 MB').should('exist');
    });
  });
 
  describe('Valider les panneaux masquables', () => {
    it('Panneau Échantillons', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="ant-collapse-content-active"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="ant-collapse-content-active"]').should('exist');
    });

    it('Panneau Fichiers de données', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
    });
  });
});