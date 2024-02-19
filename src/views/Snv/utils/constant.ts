import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { IQueryConfig, ISort } from '@ferlab/ui/core/graphql/types';
import { SuggestionType } from 'api/arranger/models';

import { WeightedAverage } from 'store/global/types';

export const SNV_VARIANT_PATIENT_QB_ID = 'patient-variant-repo';
export const VARIANT_RQDM_QB_ID = 'rqdm-variant-repo';
export const QUERY_EDITION_QB_ID = 'query-edition';

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 20;

export const DEFAULT_OFFSET = 0;

export const SCROLL_WRAPPER_ID = 'ant-table-body';

export const DEFAULT_PAGING_CONFIG = {
  index: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
};

export const DEFAULT_SORT_QUERY = [
  { field: 'donors.exomiser.gene_combined_score', order: SortDirection.Desc },
  { field: 'max_impact_score', order: SortDirection.Desc },
  { field: 'hgvsg', order: SortDirection.Asc },
] as ISort[];

export const DEFAULT_QUERY_CONFIG: IQueryConfig & { weightedAverages?: WeightedAverage[] } = {
  pageIndex: DEFAULT_OFFSET,
  size: DEFAULT_PAGE_SIZE,
  sort: DEFAULT_SORT_QUERY,
  searchAfter: undefined,
  firstPageFlag: undefined,
  operations: undefined,
  weightedAverages: [],
};

export enum FilterTypes {
  Rqdm,
  Variant_germline,
  Variant_somatic,
  Gene,
  Pathogenicity_germline,
  Pathogenicity_somatic,
  Frequency_germline,
  Frequency_somatic,
  Occurrence_germline,
  Occurrence_somatic,
  Patient,
}

export const GeneSearchFieldsMapping = {
  [SuggestionType.GENES]: 'consequences.symbol',
  [SuggestionType.VARIANTS]: 'locus',
};

export const ZygosityValue: Record<any, string> = {
  HET: '0/1',
  HOM: '1/1',
  HEM: '1',
};
