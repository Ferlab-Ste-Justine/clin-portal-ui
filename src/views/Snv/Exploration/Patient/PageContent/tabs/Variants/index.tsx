import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { IQueryConfig, TQueryConfigCb } from '@ferlab/ui/core/graphql/types';
import { IQueryResults } from 'graphql/models';
import { ITableVariantEntity, VariantEntity } from 'graphql/variants/models';
import { findDonorById } from 'graphql/variants/selector';
import { ALL_KEYS, VARIANT_KEY } from 'views/Prescriptions/utils/export';
import IGVModal from 'views/Snv/components//IGVModal';
import OccurrenceDrawer from 'views/Snv/components/OccurrenceDrawer';
import { getVariantColumns } from 'views/Snv/Exploration/variantColumns';
import { DEFAULT_PAGE_INDEX, SCROLL_WRAPPER_ID } from 'views/Snv/utils/constant';

import FixedSizeTable from 'components/Layout/FixedSizeTable';
import { useRpt } from 'hooks/useRpt';
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
  patientId: string;
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
  patientId,
  pageIndex,
  setPageIndex,
  setDownloadKeys,
}: OwnProps) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { loading: loadingRpt, rpt } = useRpt();
  const [drawerOpened, toggleDrawer] = useState(false);
  const [modalOpened, toggleModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<VariantEntity | undefined>(undefined);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const openDrawer = (record: VariantEntity) => {
    setSelectedVariant(record);
    toggleDrawer(true);
  };

  const openIgvModal = (record: VariantEntity) => {
    setSelectedVariant(record);
    toggleModal(true);
  };

  const donor = findDonorById(selectedVariant?.donors, patientId);
  const initialColumnState = user.config.data_exploration?.tables?.patientSnv?.columns;
  const columns = getVariantColumns(patientId, openDrawer, openIgvModal);

  return (
    <>
      {donor && selectedVariant && (
        <IGVModal
          rpt={rpt}
          donor={donor}
          variantEntity={selectedVariant}
          isOpen={modalOpened}
          toggleModal={toggleModal}
        />
      )}
      <FixedSizeTable
        numberOfColumn={initialColumnState || []}
        fixedProTable={(dimension) => (
          <ProTable<ITableVariantEntity>
            tableId="variant_table"
            className={style.variantSearchTable}
            wrapperClassName={style.variantTabWrapper}
            columns={columns}
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
                        patientSnv: { columns },
                      },
                    },
                  }),
                );
              },
            }}
            size="small"
            scroll={{ x: dimension.x, y: dimension.y }}
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
                        patientSnv: {
                          ...user?.config.data_exploration?.tables?.patientSnv,
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
      {results.data.length > 0 && selectedVariant && (
        <OccurrenceDrawer
          patientId={patientId}
          opened={drawerOpened}
          toggle={toggleDrawer}
          rpt={rpt}
          donor={donor}
          loadingRpt={loadingRpt}
          toggleModal={toggleModal}
          modalOpened={modalOpened}
          variantId={selectedVariant?.hgvsg}
        />
      )}
    </>
  );
};

export default VariantsTab;
