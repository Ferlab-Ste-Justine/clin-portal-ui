/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

describe('Affichage de toutes les pages et modals', () => {

  beforeEach(() => {
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  });

  afterEach(() => {
    cy.logout();
  });

  it('Accueil', () => {
    cy.contains('Rechercher une prescription').should('exist', {timeout: 20*1000});
    cy.contains('Rechercher par numéro de prescription, requête, dossier, échantillon:').should('exist', {timeout: 20*1000});
    cy.contains('Rechercher un variant').should('exist', {timeout: 20*1000});
    cy.contains('Rechercher par locus, dbSNP, ClinVar:').should('exist', {timeout: 20*1000});
    cy.get('footer[id="footer"]').find('a[href="'+Cypress.env('zeppelin_URL')+'"]').should('exist', {timeout: 20*1000});
    cy.get('footer[id="footer"]').find('a[href="'+Cypress.env('fhir_URL')+'"]').should('exist', {timeout: 20*1000});

    cy.log('Page Prescriptions - Onglet Prescriptions');
    cy.get('body').find('a[href="/prescription/search"]').click();
    cy.contains('Rechercher par numéro de prescription, requête, dossier, échantillon:').should('exist', {timeout: 20*1000});

    cy.log('Page Prescriptions - Onglet Requêtes');
    cy.get('div[id*="tab-requests"]').click({force: true});
    cy.contains('Rechercher par numéro de prescription, requête, dossier, échantillon:').should('exist', {timeout: 20*1000});
    
    cy.log('Page Archives');
    cy.get('body').find('a[href="/archive/exploration"]').click();
    cy.contains('Archives').should('exist', {timeout: 20*1000});
    cy.contains('Rechercher').should('exist', {timeout: 20*1000});
    cy.contains('Entrez une valeur dans la barre de recherche').should('exist', {timeout: 20*1000});
    
    cy.log('Page Variants');
    cy.get('body').find('a[href="/snv/exploration"]').click();
    cy.contains('Banque de variants du RQDM').should('exist', {timeout: 20*1000});
    cy.contains('Patient').should('exist', {timeout: 20*1000});
    cy.contains('Variant').should('exist', {timeout: 20*1000});
    cy.contains('Gène').should('exist', {timeout: 20*1000});
    cy.contains('Fréquence').should('exist', {timeout: 20*1000});
    cy.contains('Pathogénicité').should('exist', {timeout: 20*1000});
    cy.contains('Filtre sans titre').should('exist', {timeout: 20*1000});
    cy.contains('Mes filtres').should('exist', {timeout: 20*1000});
    cy.contains('Utiliser les filtres pour créer une requête').should('exist', {timeout: 20*1000});
  });
 
  it('Prescription', () => {
    cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
    cy.visit('/prescription/entity/'+epCHUSJ_ldmCHUSJ.prescriptionId);
    cy.wait('@getPOSTgraphql', {timeout: 5000});

    cy.contains('Prescription ID : '+epCHUSJ_ldmCHUSJ.prescriptionId).should('exist', {timeout: 20*1000});
    cy.contains('Voir les variants').should('exist', {timeout: 20*1000});
    cy.contains('Analyse').should('exist', {timeout: 20*1000});
    cy.contains('ID prescription').should('exist', {timeout: 20*1000});
    cy.contains('Statut').should('exist', {timeout: 20*1000});
    cy.contains('Approuvée').should('exist', {timeout: 20*1000});
    cy.contains('Analyse demandée').should('exist', {timeout: 20*1000});
    cy.contains('Panel en réflexe').should('exist', {timeout: 20*1000});
    cy.contains('Créée le').should('exist', {timeout: 20*1000});
    cy.contains('Médecin prescripteur').should('exist', {timeout: 20*1000});
    cy.contains('Établissement prescripteur').should('exist', {timeout: 20*1000});
    cy.contains('LDM').should('exist', {timeout: 20*1000});
    cy.contains('Patient').should('exist', {timeout: 20*1000});
    cy.contains('ID patient').should('exist', {timeout: 20*1000});
    cy.contains('Dossier').should('exist', {timeout: 20*1000});
    cy.contains('RAMQ').should('exist', {timeout: 20*1000});
    cy.contains('Nom').should('exist', {timeout: 20*1000});
    cy.contains('Date de naissance').should('exist', {timeout: 20*1000});
    cy.contains('Sexe').should('exist', {timeout: 20*1000});
    cy.contains('Information clinique').should('exist', {timeout: 20*1000});
    cy.contains('Historique familiale').should('exist', {timeout: 20*1000});
    cy.contains('Présence de consanguinité').should('exist', {timeout: 20*1000});
    cy.contains('Ethnicité').should('exist', {timeout: 20*1000});
    cy.contains('Hypothèse diagnostique').should('exist', {timeout: 20*1000});
    cy.contains('ID requête').should('exist', {timeout: 20*1000});
    cy.contains('Statut').should('exist', {timeout: 20*1000});
    cy.contains('Créée le').should('exist', {timeout: 20*1000});
    cy.contains('Requérant').should('exist', {timeout: 20*1000});
    cy.contains('ID échantillon').should('exist', {timeout: 20*1000});
    cy.contains('Liens').should('exist', {timeout: 20*1000});
    cy.contains('Complétée').should('exist', {timeout: 20*1000});
    cy.contains('Fichiers').should('exist', {timeout: 20*1000});
    cy.contains('Variants').should('exist', {timeout: 20*1000});
    cy.contains('Mère').should('exist', {timeout: 20*1000});
    cy.contains('Père').should('exist', {timeout: 20*1000});
    cy.contains('Statut').should('exist', {timeout: 20*1000});
  });
 
  it('Analyse bioinformatique', () => {
    cy.intercept('POST', '**/$graphql').as('getPOSTgraphql');
    cy.visit('/bioinformatics-analysis/'+epCHUSJ_ldmCHUSJ.bioAnalysisId);
    cy.wait('@getPOSTgraphql', {timeout: 5000});

    cy.contains('Analyse bioinformatique : '+epCHUSJ_ldmCHUSJ.bioAnalysisId).should('exist', {timeout: 20*1000});
    cy.contains('ID').should('exist', {timeout: 20*1000});
    cy.contains('Type d\'analyse').should('exist', {timeout: 20*1000});
    cy.contains('Date').should('exist', {timeout: 20*1000});
    cy.contains('Requête').should('exist', {timeout: 20*1000});
    cy.contains('Patient').should('exist', {timeout: 20*1000});
    cy.contains('Requérant (LDM)').should('exist', {timeout: 20*1000});
    cy.contains('Effectuée par').should('exist', {timeout: 20*1000});
    cy.contains('Pipeline bioinformatique').should('exist', {timeout: 20*1000});
    cy.contains('Version').should('exist', {timeout: 20*1000});
    cy.contains('Génome').should('exist', {timeout: 20*1000});
    cy.contains('Séquençage').should('exist', {timeout: 20*1000});
    cy.contains('Stratégie expérimentale').should('exist', {timeout: 20*1000});
    cy.contains('Nom de la run').should('exist', {timeout: 20*1000});
    cy.contains('Alias de la run').should('exist', {timeout: 20*1000});
    cy.contains('Plateforme').should('exist', {timeout: 20*1000});
    cy.contains('Kit de capture').should('exist', {timeout: 20*1000});
    cy.contains('Séquenceur').should('exist', {timeout: 20*1000});
    cy.contains('Aliquot').should('exist', {timeout: 20*1000});
    cy.contains('Échantillons').should('exist', {timeout: 20*1000});
    cy.contains('Échantillon (LDM)').should('exist', {timeout: 20*1000});
    cy.contains('Type d’échantillon').should('exist', {timeout: 20*1000});
    cy.contains('Spécimen (LDM)').should('exist', {timeout: 20*1000});
    cy.contains('Type de spécimen').should('exist', {timeout: 20*1000});
    cy.contains('Tissue').should('exist', {timeout: 20*1000});
    cy.contains('Fichiers de données').should('exist', {timeout: 20*1000});
    cy.contains('Format').should('exist', {timeout: 20*1000});
    cy.contains('Taille').should('exist', {timeout: 20*1000});
    cy.contains('URL').should('exist', {timeout: 20*1000});
    cy.contains('Hash').should('exist', {timeout: 20*1000});
  });
 
  it('Variants d\'un patient', () => {
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

    cy.contains('Variants').should('exist', {timeout: 20*1000});
    cy.contains('SNV').should('exist', {timeout: 20*1000});
    cy.contains('CNV').should('exist', {timeout: 20*1000});
    cy.contains('Patient ID : '+epCHUSJ_ldmCHUSJ.patientProbId).should('exist', {timeout: 20*1000});
    cy.contains('Prescription ID :').should('exist', {timeout: 20*1000});
    cy.contains('Échantillon : ').should('exist', {timeout: 20*1000});
    cy.contains('Cas-index').should('exist', {timeout: 20*1000});
    cy.contains('Panel RQDM').should('exist', {timeout: 20*1000});
    cy.contains('Variant').should('exist', {timeout: 20*1000});
    cy.contains('Gène').should('exist', {timeout: 20*1000});
    cy.contains('Fréquence').should('exist', {timeout: 20*1000});
    cy.contains('Pathogénicité').should('exist', {timeout: 20*1000});
    cy.contains('Occurrence').should('exist', {timeout: 20*1000});
    cy.contains('Filtre sans titre').should('exist', {timeout: 20*1000});
    cy.contains('Mes filtres').should('exist', {timeout: 20*1000});
    cy.contains('Utiliser les filtres pour créer une requête').should('exist', {timeout: 20*1000});

    cy.log('Téléverser une liste de gènes');
    cy.get('body').find('span[class*="SidebarMenu_sidebarMenuItemTitle"]').contains('Gène').click({force: true});
    cy.get('body').find('button[class*="UploadIds_fuiUploadIdsButton"]').click({force: true});
    cy.contains('Téléverser une liste de gènes').should('exist', {timeout: 20*1000});
    cy.contains('Copier-coller une liste d\'identifiants ou téléverser un fichier').should('exist', {timeout: 20*1000});
    cy.contains('Téléverser un fichier').should('exist', {timeout: 20*1000});
    cy.contains('Annuler').should('exist', {timeout: 20*1000});
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');

    cy.log('Enregistrer le filtre');
    cy.get('body').find('button[class*="QueryBuilderHeader_iconBtnAction"]').click({force: true});
    cy.contains('Sauvegarder ce filtre').should('exist', {timeout: 20*1000});
    cy.contains('Nom du filtre').should('exist', {timeout: 20*1000});
    cy.contains('Annuler').should('exist', {timeout: 20*1000});
    cy.contains('Sauvegarder').should('exist', {timeout: 20*1000});
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');

    cy.log('Tiroir d\'occurrence');
    cy.get('body').find('div[role="tabpanel"]').find('tr[data-row-key="0"]').find('td[class*="ant-table-cell-fix-right-first"]').find('svg[class="anticon"]').first().click({force: true});
    cy.contains('Occurrence').should('exist', {timeout: 20*1000});
    cy.contains('Variant').should('exist', {timeout: 20*1000});
    cy.contains('Patient').should('exist', {timeout: 20*1000});
    cy.contains('Zygosité').should('exist', {timeout: 20*1000});
    cy.contains('Hét. composé').should('exist', {timeout: 20*1000});
    cy.contains('Hét. composé potentiel').should('exist', {timeout: 20*1000});
    cy.contains('Famille').should('exist', {timeout: 20*1000});
    cy.contains('Génotype Mère ('+epCHUSJ_ldmCHUSJ.patientMthId+')').should('exist', {timeout: 20*1000});
    cy.contains('Génotype Père ('+epCHUSJ_ldmCHUSJ.patientFthId+')').should('exist', {timeout: 20*1000});
    cy.contains('(détails)').should('exist', {timeout: 20*1000});
    cy.contains('Transmission').should('exist', {timeout: 20*1000});
    cy.contains('Origine parentale').should('exist', {timeout: 20*1000});
    cy.contains('Métriques de séquençage').should('exist', {timeout: 20*1000});
    cy.contains('Qualité de profondeur').should('exist', {timeout: 20*1000});
    cy.contains('Profondeur allélique ALT').should('exist', {timeout: 20*1000});
    cy.contains('Profondeur totale ALT + REF').should('exist', {timeout: 20*1000});
    cy.contains('Ratio allélique ALT / (ALT+REF)').should('exist', {timeout: 20*1000});
    cy.contains('Qualité du génotype').should('exist', {timeout: 20*1000});
    cy.contains('Filtre').should('exist', {timeout: 20*1000});

    cy.log('Métriques de séquençage parental');
    cy.get('body').find('div[class*="ant-drawer-content"]').find('button[class*="ant-btn-sm"]').first().click({force: true});
    cy.contains('Métriques de séquençage parental').should('exist', {timeout: 20*1000});
    cy.contains('Mère').should('exist', {timeout: 20*1000});
    cy.contains('Père').should('exist', {timeout: 20*1000});
    cy.contains('Qualité de profondeur').should('exist', {timeout: 20*1000});
    cy.contains('Profondeur allélique ALT').should('exist', {timeout: 20*1000});
    cy.contains('Profondeur totale ALT + REF').should('exist', {timeout: 20*1000});
    cy.contains('Ratio allélique ALT / (ALT+REF)').should('exist', {timeout: 20*1000});
    cy.contains('Qualité du génotype').should('exist', {timeout: 20*1000});
    cy.contains('Filtre').should('exist', {timeout: 20*1000});
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');
    
    cy.get('body').find('button[class="ant-drawer-close"]').invoke('click');

    cy.log('IGV');
    cy.get('body').find('div[role="tabpanel"]').find('tr[data-row-key="0"]').find('td[class*="ant-table-cell-fix-right-first"]').find('svg[class="anticon"]').last().click({force: true});
    cy.contains('Alignement et variant').should('exist', {timeout: 20*1000});
    cy.contains('proband').should('exist', {timeout: 20*1000});
    cy.contains('mother').should('exist', {timeout: 20*1000});
    cy.contains('father').should('exist', {timeout: 20*1000});
    cy.contains('Refseq Genes').should('exist', {timeout: 20*1000});
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('CNVs d\'un patient', () => {
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

    cy.contains('Variants').should('exist', {timeout: 20*1000});
    cy.contains('SNV').should('exist', {timeout: 20*1000});
    cy.contains('CNV').should('exist', {timeout: 20*1000});
    cy.contains('Patient ID : '+epCHUSJ_ldmCHUSJ.patientProbId).should('exist', {timeout: 20*1000});
    cy.contains('Prescription ID :').should('exist', {timeout: 20*1000});
    cy.contains('Échantillon :').should('exist', {timeout: 20*1000});
    cy.contains('Cas-index').should('exist', {timeout: 20*1000});
    cy.contains('Panel RQDM').should('exist', {timeout: 20*1000});
    cy.contains('Variant').should('exist', {timeout: 20*1000});
    cy.contains('Gène').should('exist', {timeout: 20*1000});
    cy.contains('Occurrence').should('exist', {timeout: 20*1000});
    cy.contains('Filtre sans titre').should('exist', {timeout: 20*1000});
    cy.contains('Mes filtres').should('exist', {timeout: 20*1000});
    cy.contains('Utiliser les filtres pour créer une requête').should('exist', {timeout: 20*1000});

    cy.log('Liste des gènes chevauchants');
    cy.get('body').find('div[class="ant-table-wrapper"]').find('tr[data-row-key="0"]').contains('CLSTN1').click({force: true});
    cy.contains('Liste des gènes chevauchants le CNV').should('exist', {timeout: 20*1000});
    cy.contains('Gène').should('exist', {timeout: 20*1000});
    cy.contains('Panel').should('exist', {timeout: 20*1000});
    cy.contains('Longueur du gène').should('exist', {timeout: 20*1000});
    cy.contains('Chevauchement avec le CNV').should('exist', {timeout: 20*1000});
    cy.contains('# Bases').should('exist', {timeout: 20*1000});
    cy.contains('# Exons').should('exist', {timeout: 20*1000});
    cy.contains('% Gène').should('exist', {timeout: 20*1000});
    cy.contains('% CNV').should('exist', {timeout: 20*1000});
    cy.get('body').find('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Variant', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.visit('/variant/entity/10-1096268-T-C/summary');
    cy.wait('@getPOSTgraphql', {timeout: 5000});
    cy.wait('@getPOSTgraphql', {timeout: 5000});
    cy.wait('@getPOSTgraphql', {timeout: 5000});

    cy.contains('chr10:g.1096268T>C').should('exist', {timeout: 20*1000});
    cy.contains('GERMLINE').should('exist', {timeout: 20*1000});
    cy.contains('HIGH').should('exist', {timeout: 20*1000});
    cy.contains('Likely Benign').should('exist', {timeout: 20*1000});
    cy.contains('Résumé').should('exist', {timeout: 20*1000});
    cy.contains('Chromosome :').should('exist', {timeout: 20*1000});
    cy.contains('Position :').should('exist', {timeout: 20*1000});
    cy.contains('Allèle ALT :').should('exist', {timeout: 20*1000});
    cy.contains('Allèle REF :').should('exist', {timeout: 20*1000});
    cy.contains('Type').should('exist', {timeout: 20*1000});
    cy.contains('Cytobande').should('exist', {timeout: 20*1000});
    cy.contains('Génome de référence').should('exist', {timeout: 20*1000});
    cy.contains('ClinVar').should('exist', {timeout: 20*1000});
    cy.contains('dbSNP').should('exist', {timeout: 20*1000});
    cy.contains('Fréquence allélique').should('exist', {timeout: 20*1000});
    cy.contains('Date d’annotation').should('exist', {timeout: 20*1000});
    cy.contains('Conséquences géniques').should('exist', {timeout: 20*1000});
    cy.contains('AA').should('exist', {timeout: 20*1000});
    cy.contains('ADN codant').should('exist', {timeout: 20*1000});
    cy.contains('VEP').should('exist', {timeout: 20*1000});
    cy.contains('Prédiction').should('exist', {timeout: 20*1000});
    cy.contains('Conservation (PhyloP17Way)').should('exist', {timeout: 20*1000});
    cy.contains('Ensembl ID').should('exist', {timeout: 20*1000});
    cy.contains('RefSeq ID').should('exist', {timeout: 20*1000});
    cy.contains('Critères ACMG').should('exist', {timeout: 20*1000});
    cy.contains('Explications').should('exist', {timeout: 20*1000});
    cy.contains('Fréquences').should('exist', {timeout: 20*1000});
    cy.contains('Cohortes du RQDM').should('exist', {timeout: 20*1000});
    cy.contains('Analyse').should('exist', {timeout: 20*1000});
    cy.contains('Tous les patients').should('exist', {timeout: 20*1000});
    cy.contains('Patients atteints').should('exist', {timeout: 20*1000});
    cy.contains('Patients non atteints').should('exist', {timeout: 20*1000});
    cy.contains('Fréquence').should('exist', {timeout: 20*1000});
    cy.contains('Homo').should('exist', {timeout: 20*1000});
    cy.contains('Cohortes publiques').should('exist', {timeout: 20*1000});
    cy.contains('# Allèles ALT').should('exist', {timeout: 20*1000});
    cy.contains('# Allèles (ALT + REF)').should('exist', {timeout: 20*1000});
    cy.contains('# Homozygotes').should('exist', {timeout: 20*1000});
    cy.contains('Fréquence').should('exist', {timeout: 20*1000});
    cy.contains('TopMed').should('exist', {timeout: 20*1000});
    cy.contains('gnomAD Genome (v3)').should('exist', {timeout: 20*1000});
    cy.contains('gnomAD Genome (v2.1.1)').should('exist', {timeout: 20*1000});
    cy.contains('gnomAD Exome (v2.1.1)').should('exist', {timeout: 20*1000});
    cy.contains('1000 Genomes').should('exist', {timeout: 20*1000});
    cy.contains('Associations cliniques').should('exist', {timeout: 20*1000});
    cy.contains('Interprétation').should('exist', {timeout: 20*1000});
    cy.contains('Gène - Phénotype').should('exist', {timeout: 20*1000});
    cy.contains('Source').should('exist', {timeout: 20*1000});
    cy.contains('Conditions').should('exist', {timeout: 20*1000});
    cy.contains('Héritages').should('exist', {timeout: 20*1000});

    cy.log('Onglet Patient');
    cy.get('body').find('div[id*="rc-tabs-0-tab-patients"]').click({force: true});
    cy.contains('chr10:g.1096268T>C').should('exist', {timeout: 20*1000});
    cy.contains('GERMLINE').should('exist', {timeout: 20*1000});
    cy.contains('HIGH').should('exist', {timeout: 20*1000});
    cy.contains('Likely Benign').should('exist', {timeout: 20*1000});
    cy.contains('Résumé').should('exist', {timeout: 20*1000});
    cy.contains('Patients').should('exist', {timeout: 20*1000});
    cy.contains('Sexe').should('exist', {timeout: 20*1000});
    cy.contains('Analyse').should('exist', {timeout: 20*1000});
    cy.contains('Filtre (Dragen)').should('exist', {timeout: 20*1000});
    cy.contains('Requête').should('exist', {timeout: 20*1000});
    cy.contains('Analyse').should('exist', {timeout: 20*1000});
    cy.contains('Sexe').should('exist', {timeout: 20*1000});
    cy.contains('Statut').should('exist', {timeout: 20*1000});
    cy.contains('Filtre').should('exist', {timeout: 20*1000});
    cy.contains('QP').should('exist', {timeout: 20*1000});
    cy.contains('ALT').should('exist', {timeout: 20*1000});
    cy.contains('ALT+REF').should('exist', {timeout: 20*1000});
    cy.contains('ALT/(ALT+REF)').should('exist', {timeout: 20*1000});
    cy.contains('QG').should('exist', {timeout: 20*1000});
  });
});
