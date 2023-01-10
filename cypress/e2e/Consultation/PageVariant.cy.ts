/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));

  cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
  cy.visitVariantEntityPage('1-45508847-C-T');
  cy.wait('@getPOSTgraphql', {timeout: 5000});
});

afterEach(() => {
  cy.logout();
});

describe('Page d\'un variant', () => {
  describe('Vérifier les informations affichées', () => {
    it('De la section Résumé', () => {
      cy.get('div[class*="Container_container"]').find('span[class*="Summary_infoValue"]').eq(0).contains('1').should('exist');
      cy.get('div[class*="Container_container"]').find('span[class*="Summary_infoValue"]').eq(1).contains('45 508 847').should('exist');
      cy.get('div[class*="Container_container"]').find('span[class*="Summary_infoValue"]').eq(2).contains('T').should('exist');
      cy.get('div[class*="Container_container"]').find('span[class*="Summary_infoValue"]').eq(3).contains('C').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="Summary_resumeContent"]').eq(0).contains('SNV').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="Summary_resumeContent"]').eq(0).contains('1p34.1').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="Summary_resumeContent"]').eq(0).contains('GRCh38').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="Summary_resumeContent"]').eq(1).contains('Pathogenic').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="Summary_resumeContent"]').eq(1).contains('rs370596113').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="Summary_resumeContent"]').eq(2).contains('1 /131').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="Summary_resumeContent"]').eq(2).contains('3.82e-3').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="Summary_resumeContent"]').eq(2).contains(epCHUSJ_ldmCHUSJ.annotationDate).should('exist');
    });
    
    it('De la section Conséquences géniques', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).contains('PRDX1').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).contains('Omim').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).contains('176763').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).contains('protein_coding').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(0).contains('-').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(1).contains('downstream_gene_variant').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(2).contains('-').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(3).contains('MODIFIER').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(4).contains('-').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(5).contains('-').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(6).contains('ENST00000319248').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(6).find('svg[class*="canonicalIcon"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(7).contains('NM_181697.3').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).contains('5 autres transcrits +').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).find('tr[class*="ant-table-row"]').eq(1).should('not.exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).contains('MMACHC').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).contains('Omim').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).contains('609831').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).contains('protein_coding').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(0).contains('p.Arg161Ter').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(1).contains('stop_gained').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(2).contains('c.481C>T').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(3).contains('HIGH').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(4).contains('Cadd (Raw):').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(4).contains('0.96997').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(4).contains('Cadd (Phred):').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(4).contains('36').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(4).contains('Voir plus').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(4).contains('Dann').should('not.exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(5).contains('0.4025').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(6).contains('ENST00000401061').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(6).find('svg[class*="canonicalIcon"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).find('td[class*="ant-table-cell"]').eq(7).contains('NM_015506.3').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).contains('1 autres transcrits +').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(1).should('not.exist');
    });
    
    it('De la section Critères ACMG', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('div[class*="ant-collapse-header"]').contains('Pathogenic').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('div[class*="ant-collapse-header"]').find('svg[class*="anticon"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).contains('PVS1').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(0).contains('Null variant (nonsense) in gene MMACHC, not predicted to cause NMD. Loss-of-function is a known mechanism of disease (gene has 102 reported pathogenic LOF variants). The truncated region contains 38 pathogenic variants. It removes 43.11% of the protein.').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(1).contains('PP5').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(1).contains('ClinVar classifies this variant as Pathogenic, 2 stars (multiple consistent, reviewed May \'22, 8 submissions), citing 5 articles (').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(2).contains('PM2').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(2).contains('GnomAD genomes homozygous allele count = 0 is less than 2 for AD/AR gene MMACHC, good gnomAD genomes coverage = 30.9.').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(2).contains('GnomAD exomes homozygous allele count = 0 is less than 2 for AD/AR gene MMACHC, gnomAD exomes coverage is unavailable.').should('exist');
    });
    
    it('De la section Cohortes du RQDM', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="RGDI"]').find('td[class="ant-table-cell"]').eq(1).contains(/^0 \/ \d{2} \(0%\)$/).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="RGDI"]').find('td[class="ant-table-cell"]').eq(2).contains('0').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="RGDI"]').find('td[class="ant-table-cell"]').eq(3).contains(/^0 \/ \d{2} \(0%\)$/).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="RGDI"]').find('td[class="ant-table-cell"]').eq(4).contains('0').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="RGDI"]').find('td[class="ant-table-cell"]').eq(5).contains(/^0 \/ \d{2} \(0%\)$/).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="RGDI"]').find('td[class="ant-table-cell"]').eq(6).contains('0').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="MYOC"]').find('td[class="ant-table-cell"]').eq(1).contains('1 / 40 (2.5%)').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="MYOC"]').find('td[class="ant-table-cell"]').eq(2).contains('0').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="MYOC"]').find('td[class="ant-table-cell"]').eq(3).contains('1 / 40 (2.5%)').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="MYOC"]').find('td[class="ant-table-cell"]').eq(4).contains('0').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="MYOC"]').find('td[class="ant-table-cell"]').eq(5).contains('0 / 0 (0%)').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="MYOC"]').find('td[class="ant-table-cell"]').eq(6).contains('0').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="HYPM"]').find('td[class="ant-table-cell"]').eq(1).contains('0 / 61 (0%)').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="HYPM"]').find('td[class="ant-table-cell"]').eq(2).contains('0').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="HYPM"]').find('td[class="ant-table-cell"]').eq(3).contains('0 / 61 (0%)').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="HYPM"]').find('td[class="ant-table-cell"]').eq(4).contains('0').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="HYPM"]').find('td[class="ant-table-cell"]').eq(5).contains('0 / 0 (0%)').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[data-row-key="HYPM"]').find('td[class="ant-table-cell"]').eq(6).contains('0').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[class*="Frequency_footerRow"]').find('td[class="ant-table-cell"]').eq(1).contains(/^1 \/ \d{3} \(\d\.\d+%\)$/).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[class*="Frequency_footerRow"]').find('td[class="ant-table-cell"]').eq(2).contains('0').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[class*="Frequency_footerRow"]').find('td[class="ant-table-cell"]').eq(3).contains(/^1 \/ \d{3} \(\d\.\d+%\)$/).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[class*="Frequency_footerRow"]').find('td[class="ant-table-cell"]').eq(4).contains('0').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[class*="Frequency_footerRow"]').find('td[class="ant-table-cell"]').eq(5).contains('0 / 10 (0%)').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('tr[class*="Frequency_footerRow"]').find('td[class="ant-table-cell"]').eq(6).contains('0').should('exist');
    });
    
    it('De la section Cohortes publiques', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('3').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('125 568').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(3).contains('0').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(4).contains('2.39e-5').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains('9').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(2).contains('143 248').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(3).contains('0').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(4).contains('6.28e-5').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(1).contains('2').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(2).contains('31 370').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(3).contains('0').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(4).contains('6.38e-5').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(1).contains('5').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(2).contains('249 386').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(3).contains('0').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(4).contains('2.00e-5').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(4).find('td[class="ant-table-cell"]').eq(1).contains('-').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(4).find('td[class="ant-table-cell"]').eq(2).contains('-').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(4).find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(4).find('td[class="ant-table-cell"]').eq(4).contains('-').should('exist');
    });
    
    it('De la section ClinVar', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('div[class*="ant-collapse-header"]').contains('95703').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('div[class*="ant-collapse-header"]').find('svg[class*="anticon"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('Pathogenic').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('Cobalamin C disease').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(0).contains('Pathogenic').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains('Methylmalonic acidemia with homocystinuria cblC').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(0).contains('Pathogenic').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(1).contains('not provided').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
    });
    
    it('De la section Gène - Phénotype', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('Orphanet').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('MMACHC').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('Methylmalonic acidemia with homocystinuria, type cblC').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(3).contains('Autosomal recessive').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(0).contains('OMIM').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains('MMACHC (MIM:').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(2).contains('Methylmalonic aciduria and homocystinuria, cblC type').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(3).contains('Autosomal recessive').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(0).contains('OMIM').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(1).contains('PRDX1 (MIM:').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(2).contains('Methylmalonic aciduria and homocystinuria, cblC type, digenic').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(3).contains('Autosomal recessive').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(0).contains('HPO').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(1).contains('MMACHC').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(2).contains('Homocystinuria').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(2).contains('Hemolytic-uremic syndrome').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(2).contains('Dementia').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(2).contains('Lethargy').should('not.exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(2).contains('See more').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(4).find('td[class="ant-table-cell"]').eq(0).contains('HPO').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(4).find('td[class="ant-table-cell"]').eq(1).contains('PRDX1').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(4).find('td[class="ant-table-cell"]').eq(2).contains('Abnormality of extrapyramidal motor function').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(4).find('td[class="ant-table-cell"]').eq(2).contains('Dementia').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(4).find('td[class="ant-table-cell"]').eq(2).contains('Homocystinuria').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(4).find('td[class="ant-table-cell"]').eq(2).contains('Muscular hypotonia').should('not.exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(4).find('td[class="ant-table-cell"]').eq(2).contains('See more').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(4).find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(5).find('td[class="ant-table-cell"]').eq(0).contains('DDD').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(5).find('td[class="ant-table-cell"]').eq(1).contains('MMACHC').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(5).find('td[class="ant-table-cell"]').eq(2).contains('METHYLMALONIC ACIDURIA AND HOMOCYSTINURIA, CBLC TYPE').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(5).find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    });
  });
 
  describe('Valider les liens disponibles', () => {
    it('Lien ClinVar de la section Résumé', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="Summary_resumeContent"]').eq(1).find('a[target="_blank"]').eq(0).invoke('removeAttr', 'target').click({force: true});
      cy.get('body').contains(/^95703$/).should('exist');
    });

    it('Lien dbSNP de la section Résumé', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="Summary_resumeContent"]').eq(1).find('a[target="_blank"]').eq(1).invoke('removeAttr', 'target').click({force: true});
      cy.get('body').contains(/^rs370596113$/).should('exist');
    });
    
    it('Lien du gène de la section Conséquences géniques', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).find('a[target="_blank"]').eq(0).invoke('removeAttr', 'target').click({force: true});
      cy.get('body').contains(/^PRDX1$/).should('exist');
    });
    
    it('Lien Omim de la section Conséquences géniques', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).find('a[target="_blank"]').eq(1).invoke('removeAttr', 'target').click({force: true});
      cy.closePopup();
      cy.get('body').contains(/^\*176763$/).should('exist');
    });
    
    it('Lien RefSeq de la section Conséquences géniques', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).find('a[target="_blank"]').eq(2).invoke('removeAttr', 'target').click({force: true});
      cy.get('body').contains(/^NM_181697.3$/).should('exist');
    });
    
    it('Lien \'5 autres transcrits\' de la section Conséquences géniques', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).contains('5 autres transcrits +').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).find('tr[class*="ant-table-row"]').eq(1).should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).contains('Afficher moins -').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="SummaryPanel_consequenceTableWrapper"]').eq(0).find('tr[class*="ant-table-row"]').eq(1).should('not.exist');
    });
    
    it('Lien varsome de la section Critères ACMG', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('div[class*="ant-collapse-header"]').find('a[target="_blank"]').invoke('removeAttr', 'target').click({force: true});
      cy.url().should('include', '10380010455088470004')
    });
    
    it('Lien PubMed de la section Critères ACMG', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('tr[class*="ant-table-row"]').eq(1).find('a[target="_blank"]').eq(0).invoke('removeAttr', 'target').click({force: true});
      cy.get('body').contains(/^23954310$/).should('exist');
    });
    
    it('Lien TopMed de la section Cohortes publiques', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).find('a[href*="45508847"]').should('exist');
    });
    
    it('Lien gnomAD Genome (v3) de la section Cohortes publiques', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(0).find('a[target="_blank"]').invoke('removeAttr', 'target').click({force: true});
      cy.get('body').contains('1-45508847-C-T').should('exist');
    });
    
    it('Lien ClinVar de la section ClinVar', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('div[class*="ant-collapse-header"]').find('a[target="_blank"]').invoke('removeAttr', 'target').click({force: true});
      cy.get('body').contains(/^95703$/).should('exist');
    });
    
    it('Lien de la condition Orphanet de la section Gène - Phénotype', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).find('a[target="_blank"]').invoke('removeAttr', 'target').click({force: true});
      cy.get('body').contains('Methylmalonic acidemia with homocystinuria, type cblC').should('exist');
    });
    
    it('Lien OMIM du gène de la section Gène - Phénotype', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(1).find('a[target="_blank"]').invoke('removeAttr', 'target').click({force: true});
      cy.closePopup();
      cy.get('body').contains(/^\*609831$/).should('exist');
    });
    
    it('Lien OMIM de la condition de la section Gène - Phénotype', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(2).find('a[target="_blank"]').invoke('removeAttr', 'target').click({force: true});
      cy.closePopup();
      cy.get('body').contains(/^\#277400$/).should('exist');
    });
    
    it('Lien HPO de la condition de la section Gène - Phénotype', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(2).find('a[target="_blank"]').eq(0).invoke('removeAttr', 'target').click({force: true});
      cy.get('body').contains(/^HP:0002156$/).should('exist');
    });
    
    it('Lien \'See more\' de la condition de la section Gène - Phénotype', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(2).contains('See more').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(3).contains('Lethargy').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(3).contains('See less').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('tr[class*="ant-table-row"]').eq(3).contains('Lethargy').should('not.exist');
    });
  });
  
  describe('Valider les panneaux masquables', () => {
    it('Panneau Conséquences géniques', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="ant-collapse-content-active"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(0).find('div[class*="ant-collapse-content-active"]').should('exist');
    });

    it('Panneau Critères ACMG', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
    });

    it('Panneau Cohortes du RQDM', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('div[class*="ant-collapse-content-active"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(2).find('div[class*="ant-collapse-content-active"]').should('exist');
    });

    it('Panneau Cohortes publiques', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('div[class*="ant-collapse-content-active"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(3).find('div[class*="ant-collapse-content-active"]').should('exist');
    });

    it('Panneau ClinVar', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('div[class*="ant-collapse-content-active"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(4).find('div[class*="ant-collapse-content-active"]').should('exist');
    });

    it('Panneau Gène - Phénotype', () => {
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('div[class*="ant-collapse-content-active"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('div[class*="Container_container"]').find('div[class*="collapse_collapsePanelWrapper"]').eq(5).find('div[class*="ant-collapse-content-active"]').should('exist');
    });
  });
});