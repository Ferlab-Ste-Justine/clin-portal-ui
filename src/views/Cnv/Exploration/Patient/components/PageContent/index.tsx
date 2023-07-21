import { useEffect, useState } from 'react';
import { tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import { resetSearchAfterQueryConfig } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { Card } from 'antd';
import { useVariants } from 'graphql/cnv/actions';
import { ExtendedMappingResults } from 'graphql/models';
import { cloneDeep } from 'lodash';
import Download from 'views/Cnv/Exploration/components/Download';
import VariantContentLayout from 'views/Cnv/Exploration/components/VariantContentLayout';
import {
  CNV_VARIANT_PATIENT_QB_ID,
  DEFAULT_OFFSET,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_SORT_QUERY,
} from 'views/Cnv/utils/constant';
import { wrapSqonWithPatientIdAndRequestId } from 'views/Cnv/utils/helper';

import { CNV_EXPLORATION_PATIENT_FILTER_TAG } from 'utils/queryBuilder';

import VariantsTable from './components/Variants';

type OwnProps = {
  variantMapping: ExtendedMappingResults;
  patientId?: string;
  prescriptionId?: string;
};

const PageContent = ({ variantMapping, patientId, prescriptionId }: OwnProps) => {
  const { queryList, activeQuery } = useQueryBuilderState(CNV_VARIANT_PATIENT_QB_ID);

  const [variantQueryConfig, setVariantQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    size: DEFAULT_PAGE_SIZE,
  });
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [downloadKeys, setDownloadKeys] = useState<string[]>([]);

  const getVariantResolvedSqon = (query: ISyntheticSqon) => {
    const wrappedQuery = wrapSqonWithPatientIdAndRequestId(
      cloneDeep(resolveSyntheticSqon(queryList, query)),
      patientId,
      prescriptionId,
    );
    return wrappedQuery;
  };

  const queryVariables = {
    first: variantQueryConfig.size,
    offset: DEFAULT_OFFSET,
    searchAfter: variantQueryConfig.searchAfter,
    sqon: getVariantResolvedSqon(activeQuery),
    sort: tieBreaker({
      sort: variantQueryConfig.sort,
      defaultSort: DEFAULT_SORT_QUERY,
      field: 'start',
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

  return (
    <>
      <VariantContentLayout
        queryBuilderId={CNV_VARIANT_PATIENT_QB_ID}
        savedFilterTag={CNV_EXPLORATION_PATIENT_FILTER_TAG}
        variantMapping={variantMapping}
        activeQuery={activeQuery}
        variantResults={variantResults}
        getVariantResolvedSqon={getVariantResolvedSqon}
      >
        <Card>
          <VariantsTable
            results={variantResults}
            setQueryConfig={setVariantQueryConfig}
            queryConfig={variantQueryConfig}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            setDownloadKeys={setDownloadKeys}
          />
        </Card>
      </VariantContentLayout>
      <Download
        downloadKeys={downloadKeys}
        setDownloadKeys={setDownloadKeys}
        queryVariables={queryVariables}
        queryConfig={variantQueryConfig}
        variants={variantResults}
      />
    </>
  );
};

export default PageContent;
