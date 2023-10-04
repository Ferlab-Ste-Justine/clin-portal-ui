import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { resetSearchAfterQueryConfig, tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { Tabs } from 'antd';
import { ExtendedMappingResults } from 'graphql/models';
import { useVariants } from 'graphql/variants/actions';
import { VARIANT_QUERY } from 'graphql/variants/queries';
import { cloneDeep } from 'lodash';
import { VariantType } from 'views/Prescriptions/Entity/context';
import { VARIANT_KEY } from 'views/Prescriptions/utils/export';
import VariantContentLayout from 'views/Snv/Exploration/components/VariantContentLayout';
import { getVariantColumns } from 'views/Snv/Exploration/variantColumns';
import {
  DEFAULT_OFFSET,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_SORT_QUERY,
  SNV_VARIANT_PATIENT_QB_ID,
} from 'views/Snv/utils/constant';
import { wrapSqonWithDonorIdAndSrId } from 'views/Snv/utils/helper';

import DownloadTSVWrapper from 'components/Download';
import { SNV_EXPLORATION_PATIENT_FILTER_TAG } from 'utils/queryBuilder';

import VariantsTab from './tabs/Variants';

type OwnProps = {
  variantMapping: ExtendedMappingResults;
  patientId?: string;
  prescriptionId?: string;
};

const PageContent = ({ variantMapping, patientId }: OwnProps) => {
  const { queryList, activeQuery } = useQueryBuilderState(SNV_VARIANT_PATIENT_QB_ID);
  const [variantQueryConfig, setVariantQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    size: DEFAULT_PAGE_SIZE,
  });
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [downloadKeys, setDownloadKeys] = useState<string[]>([]);

  const getVariantResolvedSqon = (query: ISyntheticSqon) =>
    wrapSqonWithDonorIdAndSrId(
      cloneDeep(resolveSyntheticSqon(queryList, query, variantMapping)),
      patientId,
      /** prescriptionId Need to fix bug in ETL */
    );

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

  const variantResults = useVariants(queryVariables, variantQueryConfig.operations);

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

  const activeQuerySnapshot = JSON.stringify(activeQuery);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const [downloadTriggered, setDownloadTriggered] = useState(false);

  useEffect(() => {
    setVariantQueryConfig({
      ...variantQueryConfig,
      searchAfter: undefined,
    });

    setPageIndex(DEFAULT_PAGE_INDEX);
  }, [activeQuerySnapshot]);

  useEffect(() => {
    resetSearchAfterQueryConfig(
      {
        ...DEFAULT_QUERY_CONFIG,
        size: DEFAULT_QUERY_CONFIG.size || DEFAULT_PAGE_SIZE,
      },
      setVariantQueryConfig,
    );
    setPageIndex(DEFAULT_PAGE_INDEX);
  }, [activeQuerySnapshot]);

  const [variantType, setVariantType] = useState<VariantType | null>(null);

  return (
    <VariantContentLayout
      queryBuilderId={SNV_VARIANT_PATIENT_QB_ID}
      savedFilterTag={SNV_EXPLORATION_PATIENT_FILTER_TAG}
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
            queryBuilderId={SNV_VARIANT_PATIENT_QB_ID}
            results={variantResults}
            setQueryConfig={setVariantQueryConfig}
            queryConfig={variantQueryConfig}
            patientId={patientId!}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            setDownloadKeys={setDownloadKeys}
            setVariantType={setVariantType}
            setDownloadTriggered={setDownloadTriggered}
            setSelectedRows={setSelectedRows}
          />
          <DownloadTSVWrapper
            downloadKeys={downloadKeys}
            queryVariables={queryVariables}
            triggered={downloadTriggered}
            setTriggered={setDownloadTriggered}
            total={variantResults.total}
            prefix={'SNV'}
            setDownloadKeys={setDownloadKeys}
            operations={variantQueryConfig.operations}
            query={VARIANT_QUERY}
            maxAllowed={2000}
            data={selectedRows}
            columns={
              variantType
                ? getVariantColumns(SNV_VARIANT_PATIENT_QB_ID, variantType, patientId).filter(
                    (h) => h.key !== 'actions',
                  )
                : []
            }
            queryKey={'Variants'}
            columnKey={VARIANT_KEY}
            patientId={patientId}
          />
        </Tabs.TabPane>
      </Tabs>
    </VariantContentLayout>
  );
};

export default PageContent;
