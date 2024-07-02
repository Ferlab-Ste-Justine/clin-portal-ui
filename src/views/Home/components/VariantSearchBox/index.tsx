import { useState } from 'react';
import intl from 'react-intl-universal';
import { Link, useHistory } from 'react-router-dom';
import { ArrangerApi } from 'api/arranger';
import { GenomicFeatureType, Suggestion, SuggestionType } from 'api/arranger/models';
import { isEmpty } from 'lodash';

import LineStyleIcon from 'components/icons/LineStyleIcon';
import OptionItem from 'components/VariantGeneSearch/OptionItem';
import { filterByTypeAndWeight } from 'utils/suggestions';

import SearchBox from '../SearchBox';

import styles from './index.module.css';

const VariantSearchBox = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const history = useHistory();

  const formatUrl = (locus: string) => `/variant/entity/${locus}`;

  return (
    <SearchBox
      icon={<LineStyleIcon />}
      title={intl.get('home.variant.search.box.title')}
      searchPlaceholder={intl.get('home.variant.search.box.placeholder')}
      searchLabel={intl.get('home.variant.search.box.label')}
      autoCompleteProps={{
        onChange: async (value) => {
          if (value) {
            const { data } = await ArrangerApi.searchSuggestions(SuggestionType.VARIANTS, value);
            setSuggestions(
              filterByTypeAndWeight(value, data?.suggestions ?? [], GenomicFeatureType.VARIANT, 4),
            );
          }
        },
        onKeyDown: (e) => {
          if (e.code.toLowerCase() === 'enter' && !isEmpty(suggestions)) {
            history.push(formatUrl(suggestions[0].locus!));
          }
        },
        options: suggestions.map((suggestion) => ({
          label: (
            <Link
              className={styles.variantSearchBoxLink}
              to={formatUrl(suggestion.locus!)}
              data-cy={suggestion.locus!}
            >
              <OptionItem
                type={SuggestionType.VARIANTS}
                suggestion={suggestion}
                value={suggestion.locus!}
              />
            </Link>
          ),
          value: suggestion.locus,
        })),
      }}
    />
  );
};

export default VariantSearchBox;
