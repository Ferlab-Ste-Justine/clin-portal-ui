import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { IQueryConfig, TQueryConfigCb } from '@ferlab/ui/core/graphql/types';
import { IQueryResults } from 'graphql/models';
import { ITableVariantEntity, VariantEntity, VariantType } from 'graphql/variants/models';
import { findDonorById } from 'graphql/variants/selector';
import { getVariantTypeFromSNVVariantEntity } from 'views/Prescriptions/Entity/Tabs/Variants/utils';
import { VARIANT_KEY } from 'views/Prescriptions/utils/export';
import IGVModal from 'views/Snv/components//IGVModal';
import OccurrenceDrawer from 'views/Snv/components/OccurrenceDrawer';
import { getVariantColumns } from 'views/Snv/Exploration/variantColumns';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_SORT_QUERY,
  SCROLL_WRAPPER_ID,
} from 'views/Snv/utils/constant';

import FixedSizeTable from 'components/Layout/FixedSizeTable';
import { useRpt } from 'hooks/useRpt';
import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { getProTableDictionary } from 'utils/translation';

import style from './index.module.scss';

type OwnProps = {
  results: IQueryResults<VariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  patientId: string;
  pageIndex: number;
  setPageIndex: (value: number) => void;
  queryBuilderId: string;
  setVariantType: (variantType: VariantType) => void;
  setDownloadTriggered: (value: boolean) => void;
  setSelectedRows: (value: any[]) => void;
};

const VariantsTab = ({
  queryBuilderId,
  results,
  setQueryConfig,
  queryConfig,
  patientId,
  pageIndex,
  setPageIndex,
  setVariantType,
  setDownloadTriggered,
  setSelectedRows,
}: OwnProps) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { loading: loadingRpt, rpt } = useRpt();
  const [drawerOpened, toggleDrawer] = useState(false);
  const [modalOpened, toggleModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<VariantEntity | undefined>(undefined);

  const openDrawer = (record: VariantEntity) => {
    setSelectedVariant(record);
    toggleDrawer(true);
  };

  const openIgvModal = (record: VariantEntity) => {
    setSelectedVariant(record);
    toggleModal(true);
  };

  const donor = findDonorById(selectedVariant?.donors, patientId);

  const variantType = getVariantTypeFromSNVVariantEntity(results?.data?.[0]);

  const initialColumnState =
    variantType === VariantType.GERMLINE
      ? user.config.data_exploration?.tables?.patientSnvGermline?.columns
      : user.config.data_exploration?.tables?.patientSnvSomatique?.columns;

  setVariantType(variantType);
  const columns = getVariantColumns(
    queryBuilderId,
    variantType,
    patientId,
    openDrawer,
    openIgvModal,
    undefined,
    results?.data.length === 0 ? true : false,
  );
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
                  variantType === VariantType.GERMLINE
                    ? updateConfig({
                        data_exploration: {
                          tables: {
                            patientSnvGermline: { columns },
                          },
                        },
                      })
                    : updateConfig({
                        data_exploration: {
                          tables: {
                            patientSnvSomatique: { columns },
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
                setPageIndex(page);
                scrollToTop(SCROLL_WRAPPER_ID);
              },
              onViewQueryChange: (viewPerQuery: PaginationViewPerQuery) => {
                dispatch(
                  variantType === VariantType.GERMLINE
                    ? updateConfig({
                        data_exploration: {
                          tables: {
                            patientSnvGermline: {
                              ...user?.config.data_exploration?.tables?.patientSnvGermline,
                              viewPerQuery,
                            },
                          },
                        },
                      })
                    : updateConfig({
                        data_exploration: {
                          tables: {
                            patientSnvSomatique: {
                              ...user?.config.data_exploration?.tables?.patientSnvSomatique,
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
      {results?.data.length > 0 && selectedVariant && (
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
          variantType={variantType}
          locus={selectedVariant.locus}
        />
      )}
    </>
  );
};

export default VariantsTab;
