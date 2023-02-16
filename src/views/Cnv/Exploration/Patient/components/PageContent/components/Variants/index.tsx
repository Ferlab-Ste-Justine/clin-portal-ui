import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ITableVariantEntity, VariantEntity } from 'graphql/cnv/models';
import { IQueryResults } from 'graphql/models';
import GenesModal from 'views/Cnv/Exploration/components/GenesModal';
import IGVModal from 'views/Cnv/Exploration/components/IGVModal';
import { getVariantColumns } from 'views/Cnv/Exploration/variantColumns';
import { DEFAULT_PAGE_SIZE } from 'views/Cnv/utils/constant';
import { ALL_KEYS, VARIANT_KEY } from 'views/Prescriptions/utils/export';

import { useRpt } from 'hooks/useRpt';
import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { formatQuerySortList } from 'utils/helper';
import { IQueryConfig, TDownload, TQueryConfigCb } from 'utils/searchPageTypes';
import { getProTableDictionary } from 'utils/translation';

import style from './index.module.scss';

type OwnProps = {
  results: IQueryResults<VariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  setDownloadKeys: TDownload;
};

const VariantsTable = ({ results, setQueryConfig, queryConfig, setDownloadKeys }: OwnProps) => {
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
      <ProTable<ITableVariantEntity>
        tableId="variant_table"
        wrapperClassName={style.variantTableWrapper}
        columns={getVariantColumns(openGenesModal, openIgvModal)}
        initialColumnState={user.config.data_exploration?.tables?.patientCnv?.columns}
        dataSource={results.data.map((i) => ({ ...i, key: `${i[VARIANT_KEY]}` }))}
        loading={results.loading}
        dictionary={getProTableDictionary()}
        showSorterTooltip={false}
        onChange={({ current, pageSize }, _, sorter) =>
          setQueryConfig({
            pageIndex: current!,
            size: pageSize!,
            // @ts-ignore
            sort: formatQuerySortList(sorter),
          })
        }
        bordered
        enableRowSelection
        headerConfig={{
          enableTableExport: true,
          itemCount: {
            pageIndex: queryConfig.pageIndex,
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
        pagination={{
          current: queryConfig.pageIndex,
          pageSize: queryConfig.size,
          defaultPageSize: DEFAULT_PAGE_SIZE,
          total: results.total ?? 0,
          hideOnSinglePage: true,
        }}
      />
    </>
  );
};

export default VariantsTable;
