// import { ReactElement } from 'react';
import intl from 'react-intl-universal';
import { FilterFilled, UserOutlined } from '@ant-design/icons';
import QueriesSidebar from '@ferlab/ui/core/components/CustomPill/QueriesSidebar/index';
import { ISavedFilter } from '@ferlab/ui/core/components/QueryBuilder/types';
import { IDictionary } from '@ferlab/ui/core/components/QueryBuilder/types';
import { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import { SuggestionType } from 'api/arranger/models';
import { fetchFiltersByCustomPill } from 'api/customPill/customPill.utils';
import { TUserSavedFilter } from 'api/savedFilter/models';
import { INDEXES } from 'graphql/constants';
import { ExtendedMappingResults } from 'graphql/models';
import {
  FilterTypes,
  GeneSearchFieldsMapping,
  QUERY_EDITION_QB_ID,
  VARIANT_RQDM_QB_ID,
} from 'views/Snv/utils/constant';

import GenesUploadIds from 'components/GeneUploadIds';
import DiseaseIcon from 'components/icons/DiseaseIcon';
import FrequencyIcon from 'components/icons/FrequencyIcon';
import GeneIcon from 'components/icons/GeneIcon';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import { TCustomFilterMapper } from 'components/uiKit/FilterList';
import { FilterInfo } from 'components/uiKit/FilterList/types';
import VariantGeneSearch from 'components/VariantGeneSearch';
import { VARIANT_RQDM_QB_ID_FILTER_TAG } from 'utils/queryBuilder';

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
        intervalDecimal: {
          start: 0,
        },
        tooltips: ['donors__transmission'],
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
          'genes__omim__inheritance_code',
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
        facets: ['clinvar__clin_sig', 'consequences__vep_impact'],
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
        tooltips: [
          'consequences__predictions__cadd_phred',
          'consequences__predictions__cadd_score',
          'consequences__predictions__dann_score',
        ],
      },
      {
        title: intl.get('oncology'),
        facets: ['cmc__sample_mutated', 'cmc__sample_ratio', 'cmc__tier', 'hotspot'],
        tooltips: ['cmc__sample_mutated', 'cmc__sample_ratio', 'cmc__tier', 'hotspot'],
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
        tooltips: [
          'frequency_RQDM__total__af',
          'frequency_RQDM__affected__af',
          'frequency_RQDM__non_affected__af',
        ],
      },
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.publiccohorts'),
        facets: [
          'external_frequencies__gnomad_exomes_2_1_1__af',
          'external_frequencies__gnomad_genomes_2_1_1__af',
          'external_frequencies__gnomad_genomes_3_0__af',
          'external_frequencies__gnomad_genomes_3_1_1__af',
          'external_frequencies__gnomad_genomes_3_1_1__ac',
          'external_frequencies__topmed_bravo__af',
          'external_frequencies__thousand_genomes__af',
        ],
        tooltips: [
          'external_frequencies__gnomad_genomes_2_1_1__af',
          'external_frequencies__gnomad_genomes_3_0__af',
          'external_frequencies__gnomad_genomes_3_1_1__af',
          'external_frequencies__topmed_bravo__af',
          'external_frequencies__thousand_genomes__af',
        ],
      },
    ],
  },
};

interface IGetMenuItems {
  variantMappingResults: ExtendedMappingResults;
  customPills: TUserSavedFilter[];
  hasCustomPillError: boolean;
  isLoading: boolean;
  menuItemsEditionPill: ISidebarMenuItem[];
  deleteCustomPill: (id: string, queryBuilderId: string) => any;
  duplicateCustomPill: (queryPill: ISavedFilter) => any;
  editCustomPill: (queryPill: ISavedFilter, tag: string, queryBuilderId: string) => any;
  learnMoreLink?: string;
  filterMapper?: TCustomFilterMapper;
  queryDictionary: IDictionary;
  validateName: (title: string, tag: string) => any;
}

export const getMenuItems = ({
  variantMappingResults,
  customPills,
  hasCustomPillError,
  isLoading,
  menuItemsEditionPill,
  deleteCustomPill,
  duplicateCustomPill,
  editCustomPill,
  validateName,
  learnMoreLink,
  filterMapper,
  queryDictionary,
}: IGetMenuItems) => [
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
    icon: <LineStyleIcon />,
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
    icon: <GeneIcon />,
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
    icon: <FrequencyIcon />,
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
    icon: <DiseaseIcon />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      VARIANT_RQDM_QB_ID,
      filterGroups[FilterTypes.Pathogenicity_germline],
      filterMapper,
    ),
  },
  {
    key: 'custom_pill',
    title: intl.get('screen.patientsnv.category_queries'),
    icon: <FilterFilled className={styles.sideMenuIcon} />,
    panelContent: (
      <QueriesSidebar
        customPills={customPills}
        hasError={hasCustomPillError}
        isLoading={isLoading}
        dictionary={{
          emptyText: intl.get('screen.patientsnv.queriesSidebar.emptyText'),
          learnMore: intl.get('screen.patientsnv.queriesSidebar.learnMore'),
          title: intl.get('screen.patientsnv.queriesSidebar.title'),
          errorText: intl.get('screen.patientsnv.queriesSidebar.errorText'),
          deleteCustomPill: {
            modal: {
              title: intl.get('customPill.delete.modal.title'),
              okText: intl.get('customPill.delete.modal.okText'),
              cancelText: intl.get('customPill.delete.modal.cancelText'),
              message: intl.get('customPill.delete.modal.message'),
              existingFilters: intl.get('customPill.delete.modal.existingFilters'),
              errorMessage: intl.get('customPill.delete.modal.errorMessage'),
            },
          },
          editCustomPill: {
            title: intl.get('customPill.edit.title'),
            cancelText: intl.get('customPill.edit.cancelText'),
            saveText: intl.get('customPill.edit.saveText'),
            nameAlreadyExist: {
              message: intl.get('customPill.edit.nameAlreadyExist.message'),
              description: intl.get('customPill.edit.nameAlreadyExist.description'),
              okText: intl.get('customPill.edit.nameAlreadyExist.okText'),
            },
            save: {
              confirmation: {
                title: intl.get('customPill.edit.save.confirmation.title'),
                message: intl.get('customPill.edit.save.confirmation.message'),
                existingFilters: intl.get('customPill.edit.save.confirmation.existingFilters'),
                existingFiltersError: intl.get(
                  'customPill.edit.save.confirmation.existingFiltersError',
                ),
                cancelText: intl.get('customPill.edit.save.confirmation.cancelText'),
                okText: intl.get('customPill.edit.save.confirmation.okText'),
              },
              emptyQuery: {
                title: intl.get('customPill.edit.save.emptyQuery.title'),
                message: intl.get('customPill.edit.save.emptyQuery.message'),
                closeText: intl.get('customPill.edit.save.emptyQuery.closeText'),
              },
            },
          },
        }}
        learnMoreLink={learnMoreLink}
        queryBuilderId={VARIANT_RQDM_QB_ID}
        queryDictionary={queryDictionary}
        queryEditionQBId={QUERY_EDITION_QB_ID}
        editMenuItems={menuItemsEditionPill}
        tag={VARIANT_RQDM_QB_ID_FILTER_TAG}
        editPill={editCustomPill}
        duplicatePill={duplicateCustomPill}
        deletePill={deleteCustomPill}
        getFiltersByPill={fetchFiltersByCustomPill}
        validateName={validateName}
      />
    ),
  },
];

export const getMenuItemsEditionPill = (
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
      QUERY_EDITION_QB_ID,
      filterGroups[FilterTypes.Patient],
      filterMapper,
    ),
  },
  {
    key: 'category_variant',
    title: intl.get('screen.patientsnv.category_variant'),
    icon: <LineStyleIcon />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      QUERY_EDITION_QB_ID,
      filterGroups[FilterTypes.Variant_germline],
      filterMapper,
    ),
  },
  {
    key: 'category_genomic',
    title: intl.get('screen.patientsnv.category_genomic'),
    icon: <GeneIcon />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      QUERY_EDITION_QB_ID,
      filterGroups[FilterTypes.Gene],
      filterMapper,
    ),
  },
  {
    key: 'category_cohort',
    title: intl.get('screen.patientsnv.category_cohort'),
    icon: <FrequencyIcon />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      QUERY_EDITION_QB_ID,
      filterGroups[FilterTypes.Frequency_germline],
      filterMapper,
    ),
  },
  {
    key: 'category_pathogenicity',
    title: intl.get('screen.patientsnv.category_pathogenicity'),
    icon: <DiseaseIcon />,
    panelContent: filtersContainer(
      variantMappingResults,
      INDEXES.VARIANT,
      QUERY_EDITION_QB_ID,
      filterGroups[FilterTypes.Pathogenicity_germline],
      filterMapper,
    ),
  },
];
