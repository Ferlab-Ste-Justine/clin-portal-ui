/// <reference types="Cypress" />
import '../../support/commands';

const presc_PAIRED = JSON.parse(Cypress.env('presc_PAIRED'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPairedPatientPage(presc_PAIRED.patientProbId, presc_PAIRED.prescriptionId, 3);

  cy.showColumn('gnomAD ALT', 0);
  cy.showColumn('QP', 0);
  cy.showColumn(/^A$/, 0);
  cy.showColumn('A+R', 0);
  cy.showColumn('A/(A+R)', 0);
  cy.showColumn('Filtre', 0);
  cy.showColumn('CADD', 0);
  cy.showColumn('REVEL', 0);
});

describe('Page des variants d\'un patient (paired) - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 2, 'chr10:g.17617338A>C');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 3, 'SNV');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 4, 'TN');
    cy.validateTableDataRowKeyClass('2f53f2ed574a720853172ff224c608efc5e3b623', 4, 'ant-tag-red');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 5, '-');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 6, 'HACD1');
    cy.validateTableDataRowKeyAttr('2f53f2ed574a720853172ff224c608efc5e3b623', 6, 'data-icon', 'plus');
    cy.validateTableDataRowKeyClass('2f53f2ed574a720853172ff224c608efc5e3b623', 7, 'ConsequencesCell_highImpact');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 7, 'Start Lost p.Met1Arg');
    cy.get('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"]').find('td').eq(8).find('path[d*="M16.7732"]').should('exist'); // C
    cy.get('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"]').find('td').eq(8).find('path[d*="M8.98279"]').should('exist'); // M
    cy.get('tr[data-row-key="2f53f2ed574a720853172ff224c608efc5e3b623"]').find('td').eq(8).find('path[d*="M10.9335"]').should('not.exist'); // P
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 9, 'AR');
    cy.validateTableDataRowKeyClass('2f53f2ed574a720853172ff224c608efc5e3b623', 9, 'ant-tag-blue');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 10, /^VUS$/);
    cy.validateTableDataRowKeyClass('2f53f2ed574a720853172ff224c608efc5e3b623', 10, 'ant-tag-orange');
    cy.validateTableDataRowKeyClass('2f53f2ed574a720853172ff224c608efc5e3b623', 11, 'hotspotOutlined');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 12, '-');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 13, '-');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 14, '-');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 15, '-');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 16, /^0$/);
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 16, '(0.00e+0)');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 17, '14.62');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 18, '0/1');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 19, '-');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 20, '9');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 21, '136');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 22, '0.07');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 23, 'Weak Evidence');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 24, '2.25e+1');
    cy.validateTableDataRowKeyContent('2f53f2ed574a720853172ff224c608efc5e3b623', 25, '2.30e-1');
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.checkAndClickApplyFacet('Variant', 'Type de variant', 'SNV');
    cy.get('[class*="QueryBar_selected"]').find('[class*="anticon-save"]').should('not.exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="anticon-copy"]').should('exist');
  });
});
