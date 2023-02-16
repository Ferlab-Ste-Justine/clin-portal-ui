import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { IQueryConfig, TQueryConfigCb } from '@ferlab/ui/core/graphql/types';
import { IQueryResults } from 'graphql/models';
import { ITableVariantEntity, VariantEntity } from 'graphql/variants/models';
import { ALL_KEYS, VARIANT_KEY } from 'views/Prescriptions/utils/export';
import { getVariantColumns } from 'views/Snv/Exploration/variantColumns';
import { DEFAULT_PAGE_INDEX, SCROLL_WRAPPER_ID } from 'views/Snv/utils/constant';

import FixedSizeTable from 'components/Layout/FixedSizeTable';
import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { formatQuerySortList } from 'utils/helper';
import { TDownload } from 'utils/searchPageTypes';
import { getProTableDictionary } from 'utils/translation';

import style from './index.module.scss';

type OwnProps = {
  results: IQueryResults<VariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  pageIndex: number;
  setPageIndex: (value: number) => void;
  setDownloadKeys: TDownload;
};

export const scrollToTop = (scrollContentId: string) =>
  document
    .getElementById(scrollContentId)
    ?.querySelector('.simplebar-content-wrapper')
    ?.scrollTo(0, 0);

const VariantsTab = ({
  results,
  setQueryConfig,
  queryConfig,
  pageIndex,
  setPageIndex,
  setDownloadKeys,
}: OwnProps) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const initialColumnState = user.config.data_exploration?.tables?.snv?.columns;

  return (
    <FixedSizeTable
      numberOfColumn={initialColumnState || []}
      fixedProTable={(dimension) => (
        <ProTable<ITableVariantEntity>
          tableId="varirant_table"
          className={style.variantSearchTable}
          wrapperClassName={style.variantTabWrapper}
          columns={getVariantColumns()}
          initialColumnState={initialColumnState}
          dataSource={results.data.map((i) => ({ ...i, key: `${i[VARIANT_KEY]}` }))}
          loading={results.loading}
          dictionary={getProTableDictionary()}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onChange={({ current }, _, sorter) => {
            setPageIndex(DEFAULT_PAGE_INDEX);
            setQueryConfig({
              pageIndex: DEFAULT_PAGE_INDEX,
              size: queryConfig.size!,
              // @ts-ignore
              sort: formatQuerySortList(sorter),
            });
          }}
          bordered
          enableRowSelection
          headerConfig={{
            enableTableExport: true,
            itemCount: {
              pageIndex: pageIndex,
              pageSize: queryConfig.size,
              total: results.total,
            },
            enableColumnSort: true,
            onSelectedRowsChange: setSelectedKeys,
            onSelectAllResultsChange: () => {
              setSelectedKeys([ALL_KEYS]);
            },
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
                      snv: { columns },
                    },
                  },
                }),
              );
            },
          }}
          size="small"
          scroll={{ x: 'max-content', y: dimension.y }}
          pagination={{
            current: pageIndex,
            queryConfig,
            setQueryConfig,
            onChange: (page: number) => {
              scrollToTop(SCROLL_WRAPPER_ID);
              setPageIndex(page);
            },
            searchAfter: results.searchAfter,
            defaultViewPerQuery: queryConfig.size,
          }}
        />
      )}
    />
  );
};

export default VariantsTab;
