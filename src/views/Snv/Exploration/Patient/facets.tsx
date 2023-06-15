import intl from 'react-intl-universal';
import { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import { SuggestionType } from 'api/arranger/models';
import { INDEXES } from 'graphql/constants';
import { ExtendedMappingResults } from 'graphql/models';
import {
  FilterTypes,
  GeneSearchFieldsMapping,
  SNV_VARIANT_PATIENT_QB_ID,
} from 'views/Snv/utils/constant';

import GenesUploadIds from 'components/GeneUploadIds';
import DiseaseIcon from 'components/icons/DiseaseIcon';
import FrequencyIcon from 'components/icons/FrequencyIcon';
import GeneIcon from 'components/icons/GeneIcon';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import OccurenceIcon from 'components/icons/OccurenceIcon';
import RqdmIcon from 'components/icons/RqdmIcon';
import { TCustomFilterMapper } from 'components/uiKit/FilterList';
import { FilterInfo } from 'components/uiKit/FilterList/types';
import VariantGeneSearch from 'components/VariantGeneSearch';

import { filtersContainer } from '../components/filtersContainer';

import styles from '../facets.module.scss';

const filterGroups: {
  [type: string]: FilterInfo;
} = {
  [FilterTypes.Rqdm]: {
    defaultOpenFacets: ['panels'],
    groups: [
      {
        facets: ['panels'],
      },
    ],
  },
  [FilterTypes.Variant]: {
    customSearches: () => [
      <VariantGeneSearch
        key="variants"
        index={INDEXES.VARIANT}
        fields={GeneSearchFieldsMapping}
        type={SuggestionType.VARIANTS}
        queryBuilderId={SNV_VARIANT_PATIENT_QB_ID}
      />,
    ],
    groups: [
      {
        facets: [
          'variant_class',
          'consequences__consequences',
          'variant_external_reference',
          'chromosome',
          'start',
        ],
      },
    ],
  },
  [FilterTypes.Gene]: {
    customSearches: () => [
      <VariantGeneSearch
        key="genes"
        index={INDEXES.VARIANT}
        fields={GeneSearchFieldsMapping}
        type={SuggestionType.GENES}
        queryBuilderId={SNV_VARIANT_PATIENT_QB_ID}
      />,
      <GenesUploadIds
        key="geneIds"
        field="consequences.symbol_id_1"
        queryBuilderId={SNV_VARIANT_PATIENT_QB_ID}
      />,
    ],
    groups: [
      {
        facets: [
          'consequences__biotype',
          'gene_external_reference',
          'genes__gnomad__pli',
          'genes__gnomad__loeuf',
        ],
      },
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.genepanel'),
        facets: [
          'panels',
          'genes__hpo__hpo_term_label',
          'genes__orphanet__panel',
          'genes__omim__name',
          'genes__ddd__disease_name',
          'genes__cosmic__tumour_types_germline',
        ],
      },
    ],
  },
  [FilterTypes.Pathogenicity]: {
    groups: [
      {
        facets: [
          'clinvar__clin_sig',
          'consequences__vep_impact',
          'donors__exomiser__gene_combined_score',
          'donors__exomiser__acmg_classification',
          'donors__exomiser__acmg_evidence',
        ],
      },
      {
        title: intl.get('varsome'),
        facets: ['varsome__acmg__verdict__verdict', 'varsome__acmg__classifications__name'],
      },
      {
        title: intl.get('predictions'),
        facets: [
          'consequences__predictions__cadd_phred',
          'consequences__predictions__cadd_score',
          'consequences__predictions__dann_score',
          'consequences__predictions__fathmm_pred',
          'consequences__predictions__lrt_pred',
          'consequences__predictions__polyphen2_hvar_pred',
          'consequences__predictions__sift_pred',
          'genes__spliceai__ds',
          'consequences__predictions__revel_rankscore',
        ],
      },
    ],
  },
  [FilterTypes.Frequency]: {
    groups: [
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.rqdmpatient'),
        facets: [
          'frequency_RQDM__total__af',
          'frequency_RQDM__affected__af',
          'frequency_RQDM__non_affected__af',
        ],
      },
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.publiccohorts'),
        facets: [
          'external_frequencies__gnomad_genomes_2_1_1__af',
          'external_frequencies__gnomad_genomes_3_0__af',
          'external_frequencies__gnomad_genomes_3_1_1__af',
          'external_frequencies__gnomad_exomes_2_1_1__af',
          'external_frequencies__topmed_bravo__af',
          'external_frequencies__thousand_genomes__af',
        ],
      },
    ],
  },
  [FilterTypes.Occurrence]: {
    groups: [
      {
        facets: ['donors__zygosity'],
      },
      {
        title: intl.get('screen.patientsnv.category_parental_analysis'),
        facets: [
          'donors__mother_zygosity',
          'donors__father_zygosity',
          'donors__parental_origin',
          'donors__transmission',
          'donors__is_hc',
          'donors__is_possibly_hc',
        ],
      },
      {
        title: intl.get('screen.patientsnv.category_metric'),
        facets: [
          'donors__filters',
          'donors__qd',
          'donors__ad_alt',
          'donors__ad_total',
          'donors__ad_ratio',
          'donors__gq',
        ],
      },
    ],
  },
};

export const getMenuItems = (
  variantMappingResults: ExtendedMappingResults,
  filterMapper: TCustomFilterMapper,
): ISidebarMenuItem[] => [
  {
    key: 'rqdm',
    title: intl.get('screen.patientsnv.category_rqdm'),
    icon: <RqdmIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      SNV_VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Rqdm],
      filterMapper,
    ),
  },
  {
    key: 'category_variant',
    title: intl.get('screen.patientsnv.category_variant'),
    icon: <LineStyleIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      SNV_VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Variant],
      filterMapper,
    ),
  },
  {
    key: 'category_genomic',
    title: intl.get('screen.patientsnv.category_genomic'),
    icon: <GeneIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      SNV_VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Gene],
      filterMapper,
    ),
  },
  {
    key: 'category_cohort',
    title: intl.get('screen.patientsnv.category_cohort'),
    icon: <FrequencyIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      SNV_VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Frequency],
      filterMapper,
    ),
  },
  {
    key: 'category_pathogenicity',
    title: intl.get('screen.patientsnv.category_pathogenicity'),
    icon: <DiseaseIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      SNV_VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Pathogenicity],
      filterMapper,
    ),
  },
  {
    key: 'category_occurrence',
    title: intl.get('screen.patientsnv.category_occurrence'),
    icon: <OccurenceIcon className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      SNV_VARIANT_PATIENT_QB_ID,
      filterGroups[FilterTypes.Occurrence],
      filterMapper,
    ),
  },
];
