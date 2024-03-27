/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

describe('Affichage de toutes les pages et modals', () => {

  beforeEach(() => {
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  });

  it('Accueil', () => {
    cy.visit('/');
    cy.contains('Rechercher une prescription').should('exist', {timeout: 20*1000});
    cy.contains('Rechercher par numéro de prescription, requête, échantillon, dossier et numéro de patient:').should('exist', {timeout: 20*1000});
    cy.contains('Rechercher un variant').should('exist', {timeout: 20*1000});
    cy.contains('Rechercher par locus, dbSNP, ClinVar:').should('exist', {timeout: 20*1000});
    cy.get('[data-cy="ZeppelinLink"]').should('have.attr', 'href', Cypress.env('zeppelin_URL'));
    cy.get('[data-cy="FhirLink"]').should('have.attr', 'href', Cypress.env('fhir_URL'));

    // Page Prescriptions - Onglet Prescriptions
    cy.get('[data-cy="HeaderLinkPrescriptions"]').click();
    cy.contains('Rechercher par numéro de prescription, requête, échantillon, dossier et numéro de patient:').should('exist', {timeout: 20*1000});

    // Page Prescriptions - Onglet Requêtes
    cy.get('div[id*="tab-requests"]').click({force: true});
    cy.contains('Rechercher par numéro de prescription, requête, échantillon, dossier et numéro de patient:').should('exist', {timeout: 20*1000});
    
    // Page Archives
    cy.get('[data-cy="HeaderLinkArchives"]').click();
    cy.contains('Archives').should('exist', {timeout: 20*1000});
    cy.contains('Rechercher').should('exist', {timeout: 20*1000});
    cy.contains('Entrez une valeur dans la barre de recherche').should('exist', {timeout: 20*1000});
    
    // Page Variants
    cy.get('[data-cy="HeaderLinkVariants"]').click();
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
    cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);

    cy.get('div[role="tablist"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist', {timeout: 20*1000});
    cy.contains('Détails').should('exist', {timeout: 20*1000});
    cy.contains('CQ').should('exist', {timeout: 20*1000});
    cy.contains('Variants').should('exist', {timeout: 20*1000});
    cy.contains('Fichiers').should('exist', {timeout: 20*1000});
    cy.contains('Analyse').should('exist', {timeout: 20*1000});
    cy.contains('Identifiant').should('exist', {timeout: 20*1000});
    cy.contains('Statut').should('exist', {timeout: 20*1000});
    cy.contains('Approuvée').should('exist', {timeout: 20*1000});
    cy.contains('Analyse demandée').should('exist', {timeout: 20*1000});
    cy.contains('Panel en réflexe').should('exist', {timeout: 20*1000});
    cy.contains('Créée le').should('exist', {timeout: 20*1000});
    cy.contains('Médecin prescripteur').should('exist', {timeout: 20*1000});
    cy.contains('Établissement prescripteur').should('exist', {timeout: 20*1000});
    cy.contains('LDM').should('exist', {timeout: 20*1000});
    cy.contains('Patient').should('exist', {timeout: 20*1000});
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
    cy.contains('Requête').should('exist', {timeout: 20*1000});
    cy.contains('Statut').should('exist', {timeout: 20*1000});
    cy.contains('Créée le').should('exist', {timeout: 20*1000});
    cy.contains('Requérant').should('exist', {timeout: 20*1000});
    cy.contains('Échantillon').should('exist', {timeout: 20*1000});
    cy.contains('Liens').should('exist', {timeout: 20*1000});
    cy.contains('Complétée').should('exist', {timeout: 20*1000});
    cy.contains('Fichiers').should('exist', {timeout: 20*1000});
    cy.contains('Variants').should('exist', {timeout: 20*1000});
    cy.contains('Mère').should('exist', {timeout: 20*1000});
    cy.contains('Père').should('exist', {timeout: 20*1000});
    cy.contains('Statut').should('exist', {timeout: 20*1000});
  });
 
  it('Analyse bioinformatique', () => {
    cy.visitBioinformaticsAnalysisPage(epCHUSJ_ldmCHUSJ.bioAnalProbId);

    cy.contains('Analyse bioinformatique : '+epCHUSJ_ldmCHUSJ.bioAnalProbId).should('exist', {timeout: 20*1000});
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
 
  it('Rapports CQ d\'un patient', () => {
    cy.visitCQPatientPage(epCHUSJ_ldmCHUSJ.prescriptionId);

    // Rapport général
    cy.contains('Détails').should('exist', {timeout: 20*1000});
    cy.contains('CQ').should('exist', {timeout: 20*1000});
    cy.contains('Variants').should('exist', {timeout: 20*1000});
    cy.contains('Fichiers').should('exist', {timeout: 20*1000});
    cy.contains('Requête :').should('exist', {timeout: 20*1000});
    cy.contains('Cas-index ('+epCHUSJ_ldmCHUSJ.requestProbId+')').should('exist', {timeout: 20*1000});
    cy.contains('Général').should('exist', {timeout: 20*1000});
    cy.contains('Couverture génique').should('exist', {timeout: 20*1000});
    cy.contains('Dragen Capture Coverage Metrics').should('exist', {timeout: 20*1000});
    cy.contains('Dragen Mapping Metrics').should('exist', {timeout: 20*1000});
//    cy.contains('Picard Collect Hs Metrics').should('exist', {timeout: 20*1000});
    cy.contains('Télécharger le rapport').should('exist', {timeout: 20*1000});

    // Couverture génique
    cy.get('[data-cy="RadioButton_CouvertureGenique"]').click({force: true});
    cy.contains('Détails').should('exist', {timeout: 20*1000});
    cy.contains('CQ').should('exist', {timeout: 20*1000});
    cy.contains('Variants').should('exist', {timeout: 20*1000});
    cy.contains('Fichiers').should('exist', {timeout: 20*1000});
    cy.contains('Requête :').should('exist', {timeout: 20*1000});
    cy.contains('Cas-index ('+epCHUSJ_ldmCHUSJ.requestProbId+')').should('exist', {timeout: 20*1000});
    cy.contains('Général').should('exist', {timeout: 20*1000});
    cy.contains('Couverture génique').should('exist', {timeout: 20*1000});
    cy.contains('Gène').should('exist', {timeout: 20*1000});
    cy.contains('Panel').should('exist', {timeout: 20*1000});
    cy.contains('Télécharger le rapport').should('exist', {timeout: 20*1000});
    cy.contains('200 / écran').should('exist', {timeout: 20*1000});
  });
 
  it('Variants d\'un patient', () => {
    cy.visitVariantsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

    cy.contains('Détails').should('exist', {timeout: 20*1000});
    cy.contains('CQ').should('exist', {timeout: 20*1000});
    cy.contains('Variants').should('exist', {timeout: 20*1000});
    cy.contains('Fichiers').should('exist', {timeout: 20*1000});
    cy.contains('Requête :').should('exist', {timeout: 20*1000});
    cy.contains('Cas-index ('+epCHUSJ_ldmCHUSJ.requestProbId+')').should('exist', {timeout: 20*1000});
    cy.contains('SNV').should('exist', {timeout: 20*1000});
    cy.contains('CNV').should('exist', {timeout: 20*1000});
    cy.contains('Panel RQDM').should('exist', {timeout: 20*1000});
    cy.contains('Variant').should('exist', {timeout: 20*1000});
    cy.contains('Gène').should('exist', {timeout: 20*1000});
    cy.contains('Fréquence').should('exist', {timeout: 20*1000});
    cy.contains('Pathogénicité').should('exist', {timeout: 20*1000});
    cy.contains('Occurrence').should('exist', {timeout: 20*1000});
    cy.contains('Filtre sans titre').should('exist', {timeout: 20*1000});
    cy.contains('Mes filtres').should('exist', {timeout: 20*1000});
    cy.contains('Utiliser les filtres pour créer une requête').should('exist', {timeout: 20*1000});

    // Téléverser une liste de gènes
    cy.get('[data-cy="SidebarMenuItem_Gène"]').click({force: true});
    cy.get('button[class*="UploadIdsButton"]').click({force: true});
    cy.contains('Téléverser une liste de gènes').should('exist', {timeout: 20*1000});
    cy.contains('Copier-coller une liste d\'identifiants ou téléverser un fichier').should('exist', {timeout: 20*1000});
    cy.contains('Téléverser un fichier').should('exist', {timeout: 20*1000});
    cy.contains('Annuler').should('exist', {timeout: 20*1000});
    cy.get('button[class="ant-modal-close"]').invoke('click');

    // Enregistrer le filtre
    cy.get('button[class*="Header_iconBtnAction"]').click({force: true});
    cy.contains('Sauvegarder ce filtre').should('exist', {timeout: 20*1000});
    cy.contains('Nom du filtre').should('exist', {timeout: 20*1000});
    cy.contains('Annuler').should('exist', {timeout: 20*1000});
    cy.contains('Sauvegarder').should('exist', {timeout: 20*1000});
    cy.get('button[class="ant-modal-close"]').invoke('click');

    // Gérer les filtres
    cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').click({force: true});
    cy.get('[data-menu-id*="manage-my-filters"]').click({force: true});
    cy.contains('Gérer les filtres').should('exist', {timeout: 20*1000});
    cy.contains('Fermer').should('exist', {timeout: 20*1000});
    cy.get('button[class="ant-modal-close"]').invoke('click');

    // Tiroir d'occurrence
    cy.get('[data-cy="drawerCb_chr10:g.1096268T>C"]').click({force: true});
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

    // Métriques de séquençage parental
    cy.get('[data-cy="OpenSeqMetricModal"]').click({force: true});
    cy.contains('Métriques de séquençage parental').should('exist', {timeout: 20*1000});
    cy.contains('Mère').should('exist', {timeout: 20*1000});
    cy.contains('Père').should('exist', {timeout: 20*1000});
    cy.contains('Qualité de profondeur').should('exist', {timeout: 20*1000});
    cy.contains('Profondeur allélique ALT').should('exist', {timeout: 20*1000});
    cy.contains('Profondeur totale ALT + REF').should('exist', {timeout: 20*1000});
    cy.contains('Ratio allélique ALT / (ALT+REF)').should('exist', {timeout: 20*1000});
    cy.contains('Qualité du génotype').should('exist', {timeout: 20*1000});
    cy.contains('Filtre').should('exist', {timeout: 20*1000});
    cy.get('button[class="ant-modal-close"]').invoke('click');
    
    cy.get('button[class="ant-drawer-close"]').invoke('click');

    // IGV
    cy.get('[data-cy="igvModalCb_chr10:g.1096268T>C"]').click({force: true});
    cy.contains('Alignement et variant').should('exist', {timeout: 20*1000});
    cy.contains('proband').should('exist', {timeout: 20*1000});
    cy.contains('mother').should('exist', {timeout: 20*1000});
    cy.contains('father').should('exist', {timeout: 20*1000});
    cy.contains('Refseq Genes').should('exist', {timeout: 20*1000});
    cy.contains('ERROR').should('not.exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('CNVs d\'un patient', () => {
    cy.visitCNVsPatientPage(epCHUSJ_ldmCHUSJ.patientProbId, epCHUSJ_ldmCHUSJ.prescriptionId, 3);

    cy.contains('Détails').should('exist', {timeout: 20*1000});
    cy.contains('CQ').should('exist', {timeout: 20*1000});
    cy.contains('Variants').should('exist', {timeout: 20*1000});
    cy.contains('Fichiers').should('exist', {timeout: 20*1000});
    cy.contains('Requête :').should('exist', {timeout: 20*1000});
    cy.contains('Cas-index ('+epCHUSJ_ldmCHUSJ.requestProbId+')').should('exist', {timeout: 20*1000});
    cy.contains('SNV').should('exist', {timeout: 20*1000});
    cy.contains('CNV').should('exist', {timeout: 20*1000});
    cy.contains('Panel RQDM').should('exist', {timeout: 20*1000});
    cy.contains('Variant').should('exist', {timeout: 20*1000});
    cy.contains('Gène').should('exist', {timeout: 20*1000});
    cy.contains('Occurrence').should('exist', {timeout: 20*1000});
    cy.contains('Filtre sans titre').should('exist', {timeout: 20*1000});
    cy.contains('Mes filtres').should('exist', {timeout: 20*1000});
    cy.contains('Utiliser les filtres pour créer une requête').should('exist', {timeout: 20*1000});

    // Liste des gènes chevauchants
    cy.get('[data-cy="openGenesModal_LOSS:chr1:9823628-9823687"]').click({force: true});
    cy.contains('Liste des gènes chevauchants le CNV').should('exist', {timeout: 20*1000});
    cy.contains('Gène').should('exist', {timeout: 20*1000});
    cy.contains('Panel').should('exist', {timeout: 20*1000});
    cy.contains('Longueur du gène').should('exist', {timeout: 20*1000});
    cy.contains('Chevauchement avec le CNV').should('exist', {timeout: 20*1000});
    cy.contains('# Bases').should('exist', {timeout: 20*1000});
    cy.contains('# Exons').should('exist', {timeout: 20*1000});
    cy.contains('% Gène').should('exist', {timeout: 20*1000});
    cy.contains('% CNV').should('exist', {timeout: 20*1000});
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Variant', () => {
    cy.visitVariantEntityPage('10-1096268-T-C', 3);

    cy.contains('chr10:g.1096268T>C').should('exist', {timeout: 20*1000});
    cy.contains('GERMLINE').should('exist', {timeout: 20*1000});
    cy.contains('HIGH').should('exist', {timeout: 20*1000});
    cy.contains('Benign').should('exist', {timeout: 20*1000});
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
    cy.contains('Conservation').should('exist', {timeout: 20*1000});
    cy.contains('Ensembl ID').should('exist', {timeout: 20*1000});
    cy.contains('RefSeq ID').should('exist', {timeout: 20*1000});
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

    // Onglet Patient
    cy.get('div[id*="rc-tabs-0-tab-patients"]').click({force: true});
    cy.contains('chr10:g.1096268T>C').should('exist', {timeout: 20*1000});
    cy.contains('GERMLINE').should('exist', {timeout: 20*1000});
    cy.contains('HIGH').should('exist', {timeout: 20*1000});
    cy.contains('Benign').should('exist', {timeout: 20*1000});
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
