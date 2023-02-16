import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { IQueryConfig, TQueryConfigCb } from '@ferlab/ui/core/graphql/types';
import { GqlResults } from 'graphql/models';
import { ITableSequencingResult, SequencingResult } from 'graphql/sequencing/models';
import {
  DEFAULT_PAGE_INDEX,
  SEQUENCING_SCROLL_ID,
} from 'views/Prescriptions/Search/utils/contstant';
import { ALL_KEYS } from 'views/Prescriptions/utils/export';

import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { TDownload } from 'utils/searchPageTypes';
import { getProTableDictionary } from 'utils/translation';

import { sequencingsColumns } from './columns';

import styles from './index.module.scss';

interface OwnProps {
  results: GqlResults<SequencingResult>;
  total?: number;
  extra?: React.ReactElement;
  loading?: boolean;
  setQueryConfig: TQueryConfigCb;
  setDownloadKeys: TDownload;
  queryConfig: IQueryConfig;
  pageIndex: number;
  setPageIndex: (value: number) => void;
}

const SequencingsTable = ({
  results,
  setQueryConfig,
  setDownloadKeys,
  queryConfig,
  loading = false,
  pageIndex,
  setPageIndex,
}: OwnProps): React.ReactElement => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  return (
    <ProTable<ITableSequencingResult>
      tableId="sequencing_table"
      columns={sequencingsColumns()}
      initialColumnState={user.config.data_exploration?.tables?.requests?.columns}
      dataSource={results?.data.map((i) => ({ ...i, key: i.id }))}
      className={styles.sequencingTableWrapper}
      loading={loading}
      dictionary={getProTableDictionary()}
      showSorterTooltip={false}
      bordered
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onChange={({ current }, _, sorter) => {
        setPageIndex(DEFAULT_PAGE_INDEX);
        setQueryConfig({
          pageIndex: DEFAULT_PAGE_INDEX,
          size: queryConfig.size!,
          // @ts-ignore
          sort: formatQuerySortList(sorter),
        });
        scrollToTop(SEQUENCING_SCROLL_ID);
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
                  requests: { columns },
                },
              },
            }),
          );
        },
      }}
      size="small"
      pagination={{
        current: pageIndex,
        queryConfig,
        setQueryConfig,
        onChange: (page: number) => {
          scrollToTop(SEQUENCING_SCROLL_ID);
          setPageIndex(page);
        },
        onViewQueryChange: (viewPerQuery: PaginationViewPerQuery) => {
          dispatch(
            updateConfig({
              data_exploration: {
                tables: {
                  requests: {
                    ...user?.config.data_exploration?.tables?.requests,
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
  );
};

export default SequencingsTable;
