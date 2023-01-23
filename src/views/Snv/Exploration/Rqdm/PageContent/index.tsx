import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { Tabs } from 'antd';
import { ExtendedMappingResults } from 'graphql/models';
import { useVariants } from 'graphql/variants/actions';
import {
  DEFAULT_OFFSET,
  DEFAULT_PAGE_INDEX,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_SORT_QUERY,
  VARIANT_RQDM_QB_ID,
} from 'views/Snv/utils/constant';

import { VARIANT_RQDM_QB_ID_FILTER_TAG } from 'utils/queryBuilder';

import VariantContentLayout from '../../components/VariantContentLayout';

import VariantsTab from './tabs/Variants';

type OwnProps = {
  variantMapping: ExtendedMappingResults;
};

const PageContent = ({ variantMapping }: OwnProps) => {
  const { queryList, activeQuery } = useQueryBuilderState(VARIANT_RQDM_QB_ID);
  const [variantQueryConfig, setVariantQueryConfig] = useState(DEFAULT_QUERY_CONFIG);
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const getVariantResolvedSqon = (query: ISyntheticSqon) =>
    resolveSyntheticSqon(queryList, query, 'donors');

  const variantResults = useVariants(
    {
      first: variantQueryConfig.size,
      offset: DEFAULT_OFFSET,
      searchAfter: variantQueryConfig.searchAfter,
      sqon: getVariantResolvedSqon(activeQuery),
      sort: tieBreaker({
        sort: variantQueryConfig.sort,
        defaultSort: DEFAULT_SORT_QUERY,
        field: 'hgvsg',
        order: variantQueryConfig.operations?.previous ? SortDirection.Desc : SortDirection.Asc,
      }),
    },
    variantQueryConfig.operations,
  );
  useEffect(() => {
    if (
      variantQueryConfig.firstPageFlag !== undefined ||
      variantQueryConfig.searchAfter === undefined
    ) {
      return;
    }

    setVariantQueryConfig({
      ...variantQueryConfig,
      firstPageFlag: variantQueryConfig.searchAfter,
    });
  }, [variantQueryConfig]);

  useEffect(() => {
    setVariantQueryConfig({
      ...variantQueryConfig,
      searchAfter: undefined,
    });

    setPageIndex(DEFAULT_PAGE_INDEX);
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  return (
    <VariantContentLayout
      queryBuilderId={VARIANT_RQDM_QB_ID}
      savedFilterTag={VARIANT_RQDM_QB_ID_FILTER_TAG}
      variantMapping={variantMapping}
      activeQuery={activeQuery}
      variantResults={variantResults}
      getVariantResolvedSqon={getVariantResolvedSqon}
    >
      <Tabs type="card" activeKey={'variants'}>
        <Tabs.TabPane
          tab={intl.get('screen.patientsnv.results.table.variants') || 'Variants'}
          key="variants"
        >
          <VariantsTab
            results={variantResults}
            setQueryConfig={setVariantQueryConfig}
            queryConfig={variantQueryConfig}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </Tabs.TabPane>
      </Tabs>
    </VariantContentLayout>
  );
};

export default PageContent;
