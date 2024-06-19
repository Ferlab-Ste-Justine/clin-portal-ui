import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { updateQueryByTableFilter } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { IQueryConfig, TQueryConfigCb } from '@ferlab/ui/core/graphql/types';
import { GqlResults } from 'graphql/models';
import { AnalysisResult, ITableAnalysisResult } from 'graphql/prescriptions/models/Prescription';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_SORT_QUERY,
  PRESCRIPTION_QB_ID,
  PRESCRIPTION_SCROLL_ID,
} from 'views/Prescriptions/Search/utils/contstant';
import { ALL_KEYS } from 'views/Prescriptions/utils/export';

import FixedSizeTable from 'components/Layout/FixedSizeTable';
import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { TDownload } from 'utils/searchPageTypes';
import { getProTableDictionary } from 'utils/translation';

import { prescriptionsColumns } from './columns';

import styles from './index.module.css';

interface OwnProps {
  results: GqlResults<AnalysisResult>;
  total?: number;
  extra?: React.ReactElement;
  loading?: boolean;
  setQueryConfig: TQueryConfigCb;
  setDownloadKeys: TDownload;
  queryConfig: IQueryConfig;
  pageIndex: number;
  setPageIndex: (value: number) => void;
}

const PrescriptionsTable = ({
  results,
  setQueryConfig,
  setDownloadKeys,
  queryConfig,
  pageIndex,
  setPageIndex,
  loading = false,
}: OwnProps): React.ReactElement => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const initialColumns = user.config.data_exploration?.tables?.prescriptions?.columns;
  const practitionerRoles = user.practitionerRolesBundle;
  //Reset assignements filter on resfresh
  useEffect(() => {
    updateQueryByTableFilter({
      queryBuilderId: PRESCRIPTION_QB_ID,
      field: 'assignments',
      selectedFilters: [],
    });
  }, []);
  return (
    <FixedSizeTable
      numberOfColumn={initialColumns || []}
      fixedProTable={(dimension) => (
        <ProTable<ITableAnalysisResult>
          tableId="prescription_table"
          columns={prescriptionsColumns(practitionerRoles)}
          initialColumnState={initialColumns}
          dataSource={results?.data.map((i) => ({ ...i, key: i.id }))}
          className={styles.prescriptionTableWrapper}
          loading={loading}
          dictionary={getProTableDictionary()}
          showSorterTooltip={false}
          bordered
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
          onChange={({ current }, _, sorter, action) => {
            setPageIndex(DEFAULT_PAGE_INDEX);
            setQueryConfig({
              pageIndex: DEFAULT_PAGE_INDEX,
              size: queryConfig.size!,
              sort:
                action.action === 'sort'
                  ? formatQuerySortList(sorter, DEFAULT_SORT_QUERY)
                  : queryConfig.sort,
            });
            scrollToTop(PRESCRIPTION_SCROLL_ID);
          }}
          enableRowSelection
          headerConfig={{
            itemCount: {
              pageIndex: pageIndex,
              pageSize: queryConfig.size,
              total: results?.total || 0,
            },
            enableColumnSort: true,
            onSelectedRowsChange: setSelectedKeys,
            onSelectAllResultsChange: () => {
              setSelectedKeys([ALL_KEYS]);
            },
            enableTableExport: true,
            onTableExportClick: () => {
              if (selectedKeys.length === 0) {
                setDownloadKeys([ALL_KEYS]);
              } else {
                setDownloadKeys(selectedKeys);
              }
            },
            onColumnSortChange: (columns) => {
              dispatch(
                updateConfig({
                  data_exploration: {
                    tables: {
                      prescriptions: { columns },
                    },
                  },
                }),
              );
            },
          }}
          size="small"
          scroll={{ x: dimension.x, y: 'max-content' }}
          pagination={{
            current: pageIndex,
            queryConfig,
            setQueryConfig,
            onChange: (page: number) => {
              scrollToTop(PRESCRIPTION_SCROLL_ID);
              setPageIndex(page);
            },
            onViewQueryChange: (viewPerQuery: PaginationViewPerQuery) => {
              dispatch(
                updateConfig({
                  data_exploration: {
                    tables: {
                      prescriptions: {
                        ...user?.config.data_exploration?.tables?.prescriptions,
                        viewPerQuery,
                      },
                    },
                  },
                }),
              );
            },
            searchAfter: results?.searchAfter,
            defaultViewPerQuery: queryConfig.size,
          }}
        />
      )}
    />
  );
};

export default PrescriptionsTable;
