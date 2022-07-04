import React from 'react';
import { useDispatch } from 'react-redux';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { GqlResults } from 'graphql/models';
import { ITableSequencingResult, SequencingResult } from 'graphql/sequencing/models';
import { DEFAULT_PAGE_SIZE } from 'views/Prescriptions/Search';
import { SEQUENCING_SCROLL_ID } from 'views/Prescriptions/Search/utils/contstant';

import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { IQueryConfig, TQueryConfigCb } from 'utils/searchPageTypes';
import { getProTableDictionary } from 'utils/translation';

import { sequencingsColumns } from './columns';

import styles from './index.module.scss';

interface OwnProps {
  results: GqlResults<SequencingResult> | null;
  total?: number;
  extra?: React.ReactElement;
  loading?: boolean;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
}

const SequencingsTable = ({
  results,
  setQueryConfig,
  queryConfig,
  loading = false,
}: OwnProps): React.ReactElement => {
  const dispatch = useDispatch();
  const { user } = useUser();
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
      onChange={({ current, pageSize }, _, sorter) => {
        setQueryConfig({
          pageIndex: current!,
          size: pageSize!,
          sort: formatQuerySortList(sorter),
        });
        scrollToTop(SEQUENCING_SCROLL_ID);
      }}
      headerConfig={{
        itemCount: {
          pageIndex: queryConfig.pageIndex,
          pageSize: queryConfig.size,
          total: results?.total || 0,
        },
        enableColumnSort: true,
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
        current: queryConfig.pageIndex,
        pageSize: queryConfig.size,
        defaultPageSize: DEFAULT_PAGE_SIZE,
        total: results?.total ?? 0,
        showSizeChanger: true,
        hideOnSinglePage: true,
      }}
    />
  );
};

export default SequencingsTable;
