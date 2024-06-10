/// <reference types="Cypress" />
import '../../support/commands';

let presc_SOMATIC: any;

beforeEach(() => {
  presc_SOMATIC = Cypress.env('globalData').presc_SOMATIC;
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitVariantsPatientPage(presc_SOMATIC.patientProbId, presc_SOMATIC.prescriptionId, 3);
  cy.get(`[data-cy="SidebarMenuItem_Gène"]`).click({force: true});
  cy.get('button[class*="UploadIdsButton"]').click({force: true});
  cy.get('[class*="UploadModal"] textarea').type('prdx1,nkefa ensg00000117450\nunknown');
});

describe('Page des variants d\'un patient (somatic) - Téléverser une liste de gènes', () => {
  it('Vérifier les informations affichées - Popover', () => {
    cy.get('[class*="UploadModal"] [class*="anticon-info-circle"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});

    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').should('not.have.class', 'ant-popover-hidden');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('Identifiants et formats de fichier acceptés').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('Identifiants').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('Symbole du gène, Alias, Ensembl ID').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('Séparateurs').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('virgule, espace blanc, retour de ligne').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('Formats de fichier').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('.txt, .csv, .tsv').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('Limite').should('exist');
    cy.get('[class*="GeneUploadIds_geneUploadIdsPopover"]').contains('1500 éléments autorisés par téléversement').should('exist');
  });

  it('Valider les fonctionnalités de la modal - Bouton Supprimer', () => {
    cy.get('[class*="UploadModal"] textarea').contains('prdx1').should('exist');
    cy.get('[class*="UploadModal"] button[class*="ant-btn-text"]').click({force: true});

    cy.get('[class*="UploadModal"] textarea').contains('prdx1').should('not.exist');
    cy.get('[class*="UploadModal"] button[class*="ant-btn-text"]').should('not.exist');
  });
  
  it('Valider les fonctionnalités de la modal - Bouton Annuler', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').click({force: true});

    cy.get('body').contains('Utiliser les filtres pour créer une requête').should('exist');
  });

  it('Valider les fonctionnalités de la modal - Section Résumé masquable [CLIN-2624]', () => {
    cy.get('[class*="UploadModal"] [class="ant-collapse-header-text"]').contains('Résumé (3 reconnus, 1 inconnus)').should('exist');

    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[class*="UploadModal"] div[class*="ant-collapse-content-active"]').should('exist');

    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[class*="UploadModal"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
  });

  it('Vérifier les informations affichées - Section Résumé (onglet Reconnus) [CLIN-2624]', () => {
    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});

    cy.get('[class*="UploadModal_tablesMessages"]').contains('4 identifiants soumis correspondant à 1 identifiants système uniques').should('exist');
    cy.get('[data-node-key="matched"]').contains('Reconnus (3)').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Identifiants soumis').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Correspond à').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Ensembl ID').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Symbole').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="0"] td').eq(0).contains('prdx1').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="0"] td').eq(1).contains('ENSG00000117450').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="0"] td').eq(2).contains('PRDX1').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="1"] td').eq(0).contains('nkefa').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="1"] td').eq(1).contains('ENSG00000117450').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="1"] td').eq(2).contains('PRDX1').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="2"] td').eq(0).contains('ensg00000117450').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="2"] td').eq(1).contains('ENSG00000117450').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="2"] td').eq(2).contains('PRDX1').should('exist');
  });

  it('Vérifier les informations affichées - Section Résumé (onglet Inconnus) [CLIN-2904, CLIN-2624]', () => {
    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-node-key="unmatched"]').click({force: true});

    cy.get('[data-node-key="unmatched"]').contains('Inconnus (1)').should('exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Identifiants soumis').should('exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Correspond à').should('not.exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Ensembl ID').should('not.exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Symbole').should('not.exist');
    cy.get('[id*="panel-unmatched"] [data-row-key="0"] td').eq(0).contains('unknown').should('exist');
    cy.get('[id*="panel-unmatched"] [data-row-key="0"] td').eq(1).should('not.exist');
  });
  
  it('Valider les fonctionnalités de la modal - Bouton Téléverser', () => {
    cy.wait(2000);
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/graphql', 3);

    cy.validatePillSelectedQuery('Gènes', ['Liste téléversée']);
    cy.validateTotalSelectedQuery('18');
    cy.validateTableResultsCount('18');
    cy.get('[class*="ant-select-show-search"] [class="ant-tag"]').should('not.exist');

    cy.get('[class*="QueryValues_queryValuesContainer"]').contains('Liste téléversée').click({force:true});
    cy.get('[class*="filtersDropdown"]').should('not.exist');
  });
});
