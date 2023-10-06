import intl from 'react-intl-universal';
import { UserOutlined } from '@ant-design/icons';
import { SuggestionType } from 'api/arranger/models';
import { INDEXES } from 'graphql/constants';
import { ExtendedMappingResults } from 'graphql/models';
import { FilterTypes, GeneSearchFieldsMapping, VARIANT_RQDM_QB_ID } from 'views/Snv/utils/constant';

import GenesUploadIds from 'components/GeneUploadIds';
import DiseaseIcon from 'components/icons/DiseaseIcon';
import FrequencyIcon from 'components/icons/FrequencyIcon';
import GeneIcon from 'components/icons/GeneIcon';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import { TCustomFilterMapper } from 'components/uiKit/FilterList';
import { FilterInfo } from 'components/uiKit/FilterList/types';
import VariantGeneSearch from 'components/VariantGeneSearch';

import { filtersContainer } from '../components/filtersContainer';

import styles from '../facets.module.scss';

const filterGroups: {
  [type: string]: FilterInfo;
} = {
  [FilterTypes.Patient]: {
    groups: [
      {
        facets: ['donors__analysis_code', 'donors__affected_status_code', 'donors__gender'],
      },
    ],
  },
  [FilterTypes.Variant_germline]: {
    customSearches: () => [
      <VariantGeneSearch
        key="variants"
        index={INDEXES.VARIANT}
        fields={GeneSearchFieldsMapping}
        type={SuggestionType.VARIANTS}
        queryBuilderId={VARIANT_RQDM_QB_ID}
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
          'donors__zygosity',
          'donors__transmission',
          'donors__is_hc',
        ],
      },
    ],
  },
  [FilterTypes.Gene]: {
    customSearches: () => [
      <VariantGeneSearch
        key="genes"
        index={INDEXES.GENE}
        fields={GeneSearchFieldsMapping}
        type={SuggestionType.GENES}
        queryBuilderId={VARIANT_RQDM_QB_ID}
      />,
      <GenesUploadIds
        key="genes_upload_ids"
        field="consequences.symbol_id_1"
        queryBuilderId={VARIANT_RQDM_QB_ID}
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
  [FilterTypes.Pathogenicity_germline]: {
    groups: [
      {
        facets: [
          'clinvar__clin_sig',
          'varsome__acmg__verdict__verdict',
          'varsome__acmg__classifications__name',
          'consequences__vep_impact',
        ],
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
          'consequences__predictions__revel_score',
        ],
      },
      {
        title: intl.get('oncology'),
        facets: ['cmc__sample_mutated', 'cmc__sample_ratio', 'cmc__tier', 'hotspot'],
      },
    ],
  },
  [FilterTypes.Frequency_germline]: {
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
};

export const getMenuItems = (
  variantMappingResults: ExtendedMappingResults,
  filterMapper?: TCustomFilterMapper,
) => [
  {
    key: 'patient',
    title: intl.get('screen.patientsnv.category_patient'),
    icon: <UserOutlined className={styles.sideMenuIcon} />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      VARIANT_RQDM_QB_ID,
      filterGroups[FilterTypes.Patient],
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
      VARIANT_RQDM_QB_ID,
      filterGroups[FilterTypes.Variant_germline],
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
      VARIANT_RQDM_QB_ID,
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
      VARIANT_RQDM_QB_ID,
      filterGroups[FilterTypes.Frequency_germline],
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
      VARIANT_RQDM_QB_ID,
      filterGroups[FilterTypes.Pathogenicity_germline],
      filterMapper,
    ),
  },
];
