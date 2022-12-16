import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { GqlResults } from 'graphql/models';
import { AnalysisResult, ITableAnalysisResult } from 'graphql/prescriptions/models/Prescription';
import { DEFAULT_PAGE_SIZE } from 'views/Prescriptions/Search';
import { PRESCRIPTION_SCROLL_ID } from 'views/Prescriptions/Search/utils/contstant';
import { ALL_KEYS } from 'views/Prescriptions/utils/export';

import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { IQueryConfig, TDownload, TQueryConfigCb } from 'utils/searchPageTypes';
import { getProTableDictionary } from 'utils/translation';

import { prescriptionsColumns } from './columns';

import styles from './index.module.scss';

interface OwnProps {
  results: GqlResults<AnalysisResult> | null;
  total?: number;
  extra?: React.ReactElement;
  loading?: boolean;
  tableHeight?: number;
  setQueryConfig: TQueryConfigCb;
  setDownloadKeys: TDownload;
  queryConfig: IQueryConfig;
}

const PrescriptionsTable = ({
  results,
  setQueryConfig,
  setDownloadKeys,
  queryConfig,
  loading = false,
  tableHeight,
}: OwnProps): React.ReactElement => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <div className="tablewrapper">
      <ProTable<ITableAnalysisResult>
        tableId="prescription_table"
        columns={prescriptionsColumns()}
        initialColumnState={user.config.data_exploration?.tables?.prescriptions?.columns}
        dataSource={results?.data.map((i) => ({ ...i, key: i.id }))}
        className={styles.prescriptionTableWrapper}
        loading={loading}
        dictionary={getProTableDictionary()}
        showSorterTooltip={false}
        bordered
        onChange={({ current, pageSize }, _, sorter) => {
          setQueryConfig({
            pageIndex: current!,
            size: pageSize!,
            // @ts-ignore
            // mismatched between antd and antd used in ferlab-ui
            sort: formatQuerySortList(sorter),
          });
          scrollToTop(PRESCRIPTION_SCROLL_ID);
        }}
        enableRowSelection
        headerConfig={{
          itemCount: {
            pageIndex: queryConfig.pageIndex,
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
        scroll={{ y: tableHeight }}
        pagination={{
          current: queryConfig.pageIndex,
          pageSize: queryConfig.size,
          defaultPageSize: DEFAULT_PAGE_SIZE,
          total: results?.total ?? 0,
          showSizeChanger: true,
          hideOnSinglePage: true,
        }}
      />
    </div>
  );
};

export default PrescriptionsTable;
