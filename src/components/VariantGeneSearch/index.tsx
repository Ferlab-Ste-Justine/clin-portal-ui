import intl from 'react-intl-universal';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter, IValueQuery } from '@ferlab/ui/core/data/sqon/types';
import { ArrangerApi } from 'api/arranger';
import { Suggestion, SuggestionType } from 'api/arranger/models';
import { INDEXES } from 'graphql/constants';
import { VARIANT_SEARCH_QUERY } from 'graphql/variants/queries';

import GlobalSearch, { ICustomSearchProps } from 'components/uiKit/search/GlobalSearch';

import OptionItem from './OptionItem';

type OwnProps = ICustomSearchProps & {
  type: SuggestionType;
  index: INDEXES;
  fields: Record<SuggestionType, string>;
};

export const getValue = (type: SuggestionType, option: Suggestion) =>
  type === SuggestionType.GENES ? option.symbol! : option.locus!;

const VariantGeneSearch = ({ queryBuilderId, index, type, fields }: OwnProps) => {
  const { activeQuery } = useQueryBuilderState(queryBuilderId);
  activeQuery.content = activeQuery.content.filter(
    (sqonContentValue) => !(sqonContentValue as IValueQuery).title,
  );

  return (
    <GlobalSearch<Suggestion>
      queryBuilderId={queryBuilderId}
      field={fields[type]}
      index={index}
      placeholder={intl.get(`global.search.${type}.placeholder`)}
      emptyDescription={intl.get(`global.search.${type}.emptyText`)}
      searchFields={[]}
      tooltipText={intl.get(`global.search.${type}.tooltip`)}
      query={VARIANT_SEARCH_QUERY}
      sqon={activeQuery as ISqonGroupFilter}
      handleSearch={async (searchText: string) => {
        const { data } = await ArrangerApi.searchSuggestions(type, searchText);
        return data!;
      }}
      optionsFormatter={(options) =>
        options.map((option) => ({
          label: <OptionItem type={type} suggestion={option} value={getValue(type, option)} />,
          value: getValue(type, option),
        }))
      }
      title={intl.get(`global.search.${type}.title`)}
      limit={4}
    />
  );
};

export default VariantGeneSearch;
