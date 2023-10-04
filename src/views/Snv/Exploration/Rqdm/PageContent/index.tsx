import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import { resetSearchAfterQueryConfig } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { Tabs } from 'antd';
import { ExtendedMappingResults } from 'graphql/models';
import { useVariants } from 'graphql/variants/actions';
import { VARIANT_QUERY, VARIANT_QUERY_NO_DONORS } from 'graphql/variants/queries';
import { VariantType } from 'views/Prescriptions/Entity/context';
import { MAX_VARIANTS_WITH_DONORS_DOWNLOAD, VARIANT_KEY } from 'views/Prescriptions/utils/export';
import VariantContentLayout from 'views/Snv/Exploration/components/VariantContentLayout';
import { getVariantColumns } from 'views/Snv/Exploration/variantColumns';
import {
  DEFAULT_OFFSET,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_SORT_QUERY,
  VARIANT_RQDM_QB_ID,
} from 'views/Snv/utils/constant';

import DownloadTSVWrapper from 'components/Download';
import { VARIANT_RQDM_QB_ID_FILTER_TAG } from 'utils/queryBuilder';

import VariantsTab from './tabs/Variants';

type OwnProps = {
  variantMapping: ExtendedMappingResults;
};

const PageContent = ({ variantMapping }: OwnProps) => {
  const { queryList, activeQuery } = useQueryBuilderState(VARIANT_RQDM_QB_ID);
  const [variantQueryConfig, setVariantQueryConfig] = useState(DEFAULT_QUERY_CONFIG);
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const getVariantResolvedSqon = (query: ISyntheticSqon) =>
    resolveSyntheticSqon(queryList, query, variantMapping);
  const [downloadKeys, setDownloadKeys] = useState<string[]>([]);

  const queryVariables = {
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
  };

  const variantResults = useVariants(
    queryVariables,
    variantQueryConfig.operations,
    VARIANT_QUERY_NO_DONORS,
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

  useEffect(() => {
    resetSearchAfterQueryConfig(
      {
        ...DEFAULT_QUERY_CONFIG,
        size: DEFAULT_QUERY_CONFIG.size || DEFAULT_PAGE_SIZE,
      },
      setVariantQueryConfig,
    );
    setPageIndex(DEFAULT_PAGE_INDEX);
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  const [downloadTriggered, setDownloadTriggered] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  return (
    <>
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
              queryBuilderId={VARIANT_RQDM_QB_ID}
              results={variantResults}
              setQueryConfig={setVariantQueryConfig}
              queryConfig={variantQueryConfig}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              setDownloadKeys={setDownloadKeys}
              setDownloadTriggered={setDownloadTriggered}
              setSelectedRows={setSelectedRows}
            />
          </Tabs.TabPane>
        </Tabs>
      </VariantContentLayout>
      <DownloadTSVWrapper
        maxAllowed={MAX_VARIANTS_WITH_DONORS_DOWNLOAD}
        columnKey={VARIANT_KEY}
        downloadKeys={downloadKeys}
        queryVariables={queryVariables}
        prefix={'SNV'}
        operations={variantQueryConfig.operations}
        query={VARIANT_QUERY}
        setDownloadKeys={setDownloadKeys}
        data={selectedRows}
        columns={getVariantColumns(VARIANT_RQDM_QB_ID, VariantType.GERMLINE)}
        total={variantResults.total}
        setTriggered={setDownloadTriggered}
        triggered={downloadTriggered}
        queryKey={'Variants'}
      />
    </>
  );
};

export default PageContent;
