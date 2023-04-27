import { useState } from 'react';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { ArrangerApi } from 'api/arranger';
import { ISuggestionPayload } from 'api/arranger/models';
import { DocumentNode } from 'graphql';
import { INDEXES } from 'graphql/constants';
import { get } from 'lodash';

import SearchAutocomplete, {
  ISearchAutocomplete,
  OptionsType,
} from 'components/uiKit/search/GlobalSearch/Search/SearchAutocomplete';

interface IGlobalSearch<T> {
  query: DocumentNode;
  index: INDEXES;
  searchKey: string[];
  setCurrentOptions: (result: T[], search: string) => OptionsType[];
  searchValueTransformer?: (search: string) => string;
  onSelect: (values: string[]) => void;
  customHandleSearch?: TCustomHandleSearch<T>;
}

export type TCustomHandleSearch<T> = (searchText: string) => Promise<ISuggestionPayload<T>>;

type TGlobalSearch<T> = IGlobalSearch<T> &
  Omit<ISearchAutocomplete, 'onClose' | 'onSearch' | 'onSelect' | 'options'>;

const Search = <T,>({
  onSelect,
  query,
  index,
  searchKey,
  selectedItems = [],
  setCurrentOptions,
  searchValueTransformer,
  customHandleSearch,
  tooltipText,
  title,
  ...props
}: TGlobalSearch<T>) => {
  const [options, setOptions] = useState<OptionsType[]>([]);

  const handleSearch = async (search: string) => {
    if (customHandleSearch) {
      if (search) {
        const results = await customHandleSearch(search);
        setOptions(setCurrentOptions(results.suggestions, search));
      }
    } else {
      const searchFilter = generateQuery({
        operator: BooleanOperators.or,
        newFilters: searchKey.map((key) =>
          generateValueFilter({
            field: key,
            value: [`${search}*`],
            index,
          }),
        ),
      });

      const { data } = await ArrangerApi.graphqlRequest<any>({
        query: query.loc?.source.body,
        variables: {
          sqon: {
            op: searchFilter.op,
            content: searchFilter.content,
          },
        },
      });

      setOptions(
        setCurrentOptions(
          get(data.data, `${index}.hits.edges`, []).map(({ node }: any) => ({
            ...node,
          })),
          search,
        ),
      );
    }
  };

  return (
    <SearchAutocomplete
      onSearch={(value) =>
        handleSearch(searchValueTransformer ? searchValueTransformer(value) : value)
      }
      onSelect={onSelect}
      options={options}
      selectedItems={selectedItems}
      title={title}
      tooltipText={tooltipText}
      {...props}
    />
  );
};

export default Search;
