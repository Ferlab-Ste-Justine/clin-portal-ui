import { useEffect, useState } from 'react';
import { tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import { resetSearchAfterQueryConfig } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { Card } from 'antd';
import { useVariants } from 'graphql/cnv/actions';
import { VARIANT_QUERY } from 'graphql/cnv/queries';
import { ExtendedMappingResults } from 'graphql/models';
import { cloneDeep } from 'lodash';
import VariantContentLayout from 'views/Cnv/Exploration/components/VariantContentLayout';
import { getVariantColumns } from 'views/Cnv/Exploration/variantColumns';
import {
  CNV_VARIANT_PATIENT_QB_ID,
  DEFAULT_OFFSET,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_SORT_QUERY,
} from 'views/Cnv/utils/constant';
import { wrapSqonWithPatientIdAndRequestId } from 'views/Cnv/utils/helper';
import { VariantType } from 'views/Prescriptions/Entity/context';
import { MAX_VARIANTS_DOWNLOAD } from 'views/Prescriptions/utils/export';

import Download from 'components/Download';
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

  const [downloadTriggered, setDownloadTriggered] = useState(false);
  const [variantType, setVariantType] = useState(VariantType.GERMLINE);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
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
            setVariantType={setVariantType}
            setSelectedRows={setSelectedRows}
            setDownloadTriggered={setDownloadTriggered}
          />
        </Card>
      </VariantContentLayout>
      <Download
        downloadKeys={downloadKeys}
        queryVariables={queryVariables}
        prefix="CNV"
        columnKey={'hash'}
        maxAllowed={MAX_VARIANTS_DOWNLOAD}
        setDownloadKeys={setDownloadKeys}
        columns={getVariantColumns(
          variantType,
          () => {},
          () => {},
        )}
        query={VARIANT_QUERY}
        mapping={{
          // mapping of some column keys with query field
          length: 'reflen',
          filter: 'filters',
        }}
        triggered={downloadTriggered}
        setTriggered={setDownloadTriggered}
        total={variantResults.total}
        queryKey={'cnv'}
        data={selectedRows}
      />
    </>
  );
};

export default PageContent;
