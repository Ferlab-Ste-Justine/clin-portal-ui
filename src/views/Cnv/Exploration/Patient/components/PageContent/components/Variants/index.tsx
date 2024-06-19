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
import { DEFAULT_PAGE_INDEX, DEFAULT_SORT_QUERY } from 'views/Cnv/utils/constant';
import { getVariantTypeFromCNVVariantEntity } from 'views/Prescriptions/Entity/Tabs/Variants/utils';
import { VARIANT_KEY } from 'views/Prescriptions/utils/export';
import { SCROLL_WRAPPER_ID } from 'views/Snv/utils/constant';

import FixedSizeTable from 'components/Layout/FixedSizeTable';
import { useRpt } from 'hooks/useRpt';
import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { getProTableDictionary } from 'utils/translation';

import style from './index.module.css';

type OwnProps = {
  results: IQueryResults<VariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  pageIndex: number;
  setPageIndex: (value: number) => void;
  setDownloadTriggered: any;
  setVariantType: any;
  setSelectedRows: any;
};

const VariantsTable = ({
  results,
  setQueryConfig,
  queryConfig,
  pageIndex,
  setPageIndex,
  setDownloadTriggered,
  setVariantType,
  setSelectedRows,
}: OwnProps) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { rpt } = useRpt();
  const [selectedVariant, setSelectedVariant] = useState<VariantEntity | undefined>(undefined);
  const [genesModalOpened, toggleGenesModal] = useState(false);
  const [modalOpened, toggleModal] = useState(false);
  const openGenesModal = (record: VariantEntity) => {
    setSelectedVariant(record);
    toggleGenesModal(true);
  };

  const openIgvModal = (record: VariantEntity) => {
    setSelectedVariant(record);
    toggleModal(true);
  };

  const initialColumnState = user.config.data_exploration?.tables?.patientCnv?.columns;

  const variantType = getVariantTypeFromCNVVariantEntity(results?.data?.[0]);
  setVariantType(variantType);

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
            columns={getVariantColumns(
              variantType,
              openGenesModal,
              openIgvModal,
              results?.data.length === 0,
            )}
            initialColumnState={initialColumnState}
            dataSource={results?.data.map((i) => ({ ...i, key: `${i[VARIANT_KEY]}` }))}
            loading={results?.loading}
            dictionary={getProTableDictionary()}
            showSorterTooltip={false}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onChange={(_, __, sorter) => {
              setPageIndex(DEFAULT_PAGE_INDEX);
              setQueryConfig({
                pageIndex: DEFAULT_PAGE_INDEX,
                size: queryConfig.size!,
                // @ts-ignore
                sort: formatQuerySortList(sorter, DEFAULT_SORT_QUERY),
              });
            }}
            bordered
            enableRowSelection
            headerConfig={{
              enableTableExport: true,
              tableExportDisabled: (results?.total || 0) === 0,
              itemCount: {
                pageIndex: pageIndex,
                pageSize: queryConfig.size,
                total: results?.total || 0,
              },
              enableColumnSort: true,

              onSelectedRowsChange: (key, row) => {
                setSelectedRows(row);
              },
              onSelectAllResultsChange: () => {
                setSelectedRows([]);
              },
              onTableExportClick: () => {
                setDownloadTriggered(true);
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
              searchAfter: results?.searchAfter,
              defaultViewPerQuery: queryConfig.size,
            }}
          />
        )}
      />
    </>
  );
};

export default VariantsTable;
