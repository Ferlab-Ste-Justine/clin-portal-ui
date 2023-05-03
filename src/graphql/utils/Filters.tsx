import intl from 'react-intl-universal';
import FilterContainer from '@ferlab/ui/core/components/filters/FilterContainer';
import FilterSelector from '@ferlab/ui/core/components/filters/FilterSelector';
import { IFilter, IFilterGroup, VisualType } from '@ferlab/ui/core/components/filters/types';
import { updateActiveQueryFilters } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { keyEnhance, underscoreToDot } from '@ferlab/ui/core/data/arranger/formatting';
import { getFilterType } from '@ferlab/ui/core/data/filters/utils';
import { getSelectedFilters } from '@ferlab/ui/core/data/sqon/utils';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Aggregations, ExtendedMapping, ExtendedMappingResults } from 'graphql/models';

import EnvironmentVariables from 'utils/EnvVariables';
import { getFiltersDictionary } from 'utils/translation';

import { dictionaries } from './dictionaries';
import { transformNameIfNeeded } from './nameTransformer';

export interface RangeAggs {
  stats: {
    max: number;
    min: number;
  };
}

export interface TermAggs {
  buckets: TermAgg[];
}

export interface TermAgg {
  doc_count: number;
  key: string;
}

export interface IGenerateFilter {
  queryBuilderId: string;
  aggregations: Aggregations;
  extendedMapping: ExtendedMappingResults;
  className?: string;
  filtersOpen?: boolean;
  filterFooter?: boolean;
  showSearchInput?: boolean;
  useFilterSelector?: boolean;
  index?: string;
}

const isTermAgg = (obj: TermAggs) => !!obj.buckets;
const isRangeAgg = (obj: RangeAggs) => !!obj.stats;

export const generateFilters = ({
  queryBuilderId,
  aggregations,
  extendedMapping,
  className = '',
  filtersOpen = true,
  filterFooter = false,
  showSearchInput = false,
  useFilterSelector = false,
  index,
}: IGenerateFilter) =>
  Object.keys(aggregations || [])
    .filter((key) => key != '__typename')
    .map((key) => {
      const found = (extendedMapping?.data || []).find(
        (f: ExtendedMapping) => f.field === underscoreToDot(key),
      );

      const filterGroup = getFilterGroup(found, aggregations[key], [], filterFooter, index);
      const filters = getFilters(aggregations, key);
      const selectedFilters = getSelectedFilters({
        queryBuilderId,
        filters,
        filterGroup,
      });
      const FilterComponent = useFilterSelector ? FilterSelector : FilterContainer;

      return (
        <div className={className} key={`${key}_${filtersOpen}`}>
          <FilterComponent
            dictionary={getFiltersDictionary()}
            maxShowing={5}
            isOpen={filtersOpen}
            filterGroup={filterGroup}
            filters={filters}
            collapseProps={{
              headerBorderOnly: true,
            }}
            onChange={(fg, f) =>
              updateActiveQueryFilters({
                queryBuilderId,
                filterGroup: fg,
                selectedFilters: f,
                index,
              })
            }
            searchInputVisible={showSearchInput}
            selectedFilters={selectedFilters}
          />
        </div>
      );
    });

const translateWhenNeeded = (group: string, key: string) =>
  intl
    .get(`filters.options.${underscoreToDot(group)}.${keyEnhance(key)}`)
    .defaultMessage(removeUnderscoreAndCapitalize(keyEnhanceBooleanOnlyExcept(group, key)));

const keyEnhanceBooleanOnlyExcept = (field: string, fkey: string) => {
  if (['1', 'true'].includes(fkey)) return 'True';
  if (['0', 'false'].includes(fkey)) return 'False';
  return ['chromosome'].includes(field) ? fkey : keyEnhance(fkey);
};

export const getFilters = (aggregations: Aggregations | null, key: string): IFilter[] => {
  if (!aggregations || !key) return [];
  if (isTermAgg(aggregations[key])) {
    return aggregations[key!].buckets
      .map((f: any) => {
        const enhanceKey = f.key_as_string ?? f.key;
        const translatedKey = translateWhenNeeded(key, enhanceKey);
        const name = translatedKey ? translatedKey : enhanceKey;
        return {
          data: {
            count: f.doc_count,
            key: enhanceKey,
          },
          id: f.key,
          name: transformNameIfNeeded(key, enhanceKey, name),
        };
      })
      .filter((f: any) => !(f.name === ''));
  } else if (aggregations[key]?.stats) {
    return [
      {
        data: { max: 1, min: 0 },
        id: key,
        name: translateWhenNeeded(key, key),
      },
    ];
  }
  return [];
};

const exceptions: string = EnvironmentVariables.configFor(
  'FILTER_BOOLEAN_TO_DICTIONARY_EXCEPTIONS',
);
export const getFilterGroup = (
  extendedMapping: ExtendedMapping | undefined,
  aggregation: any,
  rangeTypes: string[],
  filterFooter: boolean,
  index: string | undefined,
): IFilterGroup => {
  const title = intl
    .get(`${index}.filters.group.${extendedMapping?.field}`)
    .defaultMessage(
      intl
        .get(`filters.group.${extendedMapping?.field}`)
        .defaultMessage(extendedMapping?.displayName || ''),
    );

  if (isRangeAgg(aggregation)) {
    return {
      field: extendedMapping?.field || '',
      title,
      type: getFilterType(extendedMapping?.type || ''),
      config: {
        min: aggregation.stats.min,
        max: aggregation.stats.max,
        rangeTypes: rangeTypes.map((r) => ({
          name: r,
          key: r,
        })),
      },
    };
  }

  let extraFilterDictionary = extendedMapping?.field ? dictionaries[extendedMapping?.field] : null;
  let type = getFilterType(extendedMapping?.type || '');
  if (
    EnvironmentVariables.configFor('FORCE_FILTER_BOOLEAN_TO_DICTIONARY') === 'true' &&
    extendedMapping?.type === 'boolean'
  ) {
    type = VisualType.Checkbox;
    if (!exceptions.includes(extendedMapping?.field)) {
      if (aggregation && aggregation.buckets) {
        const { buckets } = aggregation;
        const existingKey = buckets.map((bucket: any) => bucket.key_as_string);
        if (existingKey.length < 2) {
          // add opposite values
          extraFilterDictionary = existingKey.map((key: any) => String(!++key));
        }
      } else {
        extraFilterDictionary = ['true', 'false'];
      }
    }
  }
  return {
    field: extendedMapping?.field || '',
    title,
    type,
    config: {
      nameMapping: [],
      withFooter: filterFooter,
      extraFilterDictionary,
      facetTranslate: (value: string) => {
        const name = translateWhenNeeded(extendedMapping?.field!, value);
        return transformNameIfNeeded(extendedMapping?.field?.replaceAll('.', '__')!, value, name);
      },
    },
  };
};
