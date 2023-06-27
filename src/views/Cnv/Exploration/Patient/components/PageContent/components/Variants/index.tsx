import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { IQueryConfig, TQueryConfigCb } from '@ferlab/ui/core/graphql/types';
import { ITableVariantEntity, VariantEntity } from 'graphql/cnv/models';
import { IQueryResults } from 'graphql/models';
import GenesModal from 'views/Cnv/Exploration/components/GenesModal';
import IGVModal from 'views/Cnv/Exploration/components/IGVModal';
import { getVariantColumns } from 'views/Cnv/Exploration/variantColumns';
import { DEFAULT_PAGE_INDEX, SCROLL_WRAPPER_ID } from 'views/Cnv/utils/constant';
import { ALL_KEYS, VARIANT_KEY } from 'views/Prescriptions/utils/export';

import FixedSizeTable from 'components/Layout/FixedSizeTable';
import { useRpt } from 'hooks/useRpt';
import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { TDownload } from 'utils/searchPageTypes';
import { getProTableDictionary } from 'utils/translation';

import style from './index.module.scss';

type OwnProps = {
  results: IQueryResults<VariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  setDownloadKeys: TDownload;
  pageIndex: number;
  setPageIndex: (value: number) => void;
};

const VariantsTable = ({
  results,
  setQueryConfig,
  queryConfig,
  pageIndex,
  setPageIndex,
  setDownloadKeys,
}: OwnProps) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { rpt } = useRpt();
  const [selectedVariant, setSelectedVariant] = useState<VariantEntity | undefined>(undefined);
  const [genesModalOpened, toggleGenesModal] = useState(false);
  const [modalOpened, toggleModal] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const openGenesModal = (record: VariantEntity) => {
    setSelectedVariant(record);
    toggleGenesModal(true);
  };

  const openIgvModal = (record: VariantEntity) => {
    setSelectedVariant(record);
    toggleModal(true);
  };

  const initialColumnState = user.config.data_exploration?.tables?.patientCnv?.columns;

  return (
    <>
      {selectedVariant && (
        <IGVModal
          rpt={rpt}
          variantEntity={selectedVariant}
          isOpen={modalOpened}
          toggleModal={toggleModal}
        />
      )}
      <GenesModal
        variantEntity={selectedVariant}
        isOpen={genesModalOpened}
        toggleModal={toggleGenesModal}
      />
      <FixedSizeTable
        numberOfColumn={initialColumnState || []}
        fixedProTable={(dimension) => (
          <ProTable<ITableVariantEntity>
            tableId="variant_table"
            wrapperClassName={style.variantTableWrapper}
            columns={getVariantColumns(openGenesModal, openIgvModal)}
            initialColumnState={initialColumnState}
            dataSource={results.data.map((i) => ({ ...i, key: `${i[VARIANT_KEY]}` }))}
            loading={results.loading}
            dictionary={getProTableDictionary()}
            showSorterTooltip={false}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onChange={(_, __, sorter) => {
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
                total: results.total || 0,
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
                        patientCnv: { columns },
                      },
                    },
                  }),
                );
              },
            }}
            size="small"
            scroll={dimension}
            pagination={{
              current: pageIndex,
              queryConfig,
              setQueryConfig,
              onChange: (page: number) => {
                scrollToTop(SCROLL_WRAPPER_ID);
                setPageIndex(page);
              },
              onViewQueryChange: (viewPerQuery: PaginationViewPerQuery) => {
                dispatch(
                  updateConfig({
                    data_exploration: {
                      tables: {
                        patientCnv: {
                          ...user?.config.data_exploration?.tables?.patientCnv,
                          viewPerQuery,
                        },
                      },
                    },
                  }),
                );
              },
              searchAfter: results.searchAfter,
              defaultViewPerQuery: queryConfig.size,
            }}
          />
        )}
      />
    </>
  );
};

export default VariantsTable;
