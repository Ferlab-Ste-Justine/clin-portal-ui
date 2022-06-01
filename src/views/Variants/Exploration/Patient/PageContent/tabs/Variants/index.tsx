import { useState } from 'react';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { IQueryResults } from 'graphql/models';
import { ITableVariantEntity, VariantEntity } from 'graphql/variants/models';
import { findDonorById } from 'graphql/variants/selector';
import IGVModal from 'views/Variants/components//IGVModal';
import OccurrenceDrawer from 'views/Variants/components/OccurrenceDrawer';
import { getVariantColumns } from 'views/Variants/Exploration/variantColumns';
import { DEFAULT_PAGE_SIZE } from 'views/Variants/utils/constant';

import { useRpt } from 'hooks/useRpt';
import { formatQuerySortList } from 'utils/helper';
import { IQueryConfig, TQueryConfigCb } from 'utils/searchPageTypes';
import { getProTableDictionary } from 'utils/translation';

import style from './index.module.scss';

type OwnProps = {
  results: IQueryResults<VariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  patientId: string;
};

const VariantsTab = ({ results, setQueryConfig, queryConfig, patientId }: OwnProps) => {
  const [drawerOpened, toggleDrawer] = useState(false);
  const [modalOpened, toggleModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<VariantEntity | undefined>(undefined);
  const { loading: loadingRpt, rpt } = useRpt();

  const openDrawer = (record: VariantEntity) => {
    setSelectedVariant(record);
    toggleDrawer(true);
  };

  const openIgvModal = (record: VariantEntity) => {
    setSelectedVariant(record);
    toggleModal(true);
  };

  const donor = findDonorById(selectedVariant?.donors, patientId);

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
      <ProTable<ITableVariantEntity>
        tableId="variant_table"
        className={style.variantSearchTable}
        wrapperClassName={style.variantTabWrapper}
        columns={getVariantColumns(patientId, openDrawer, openIgvModal)}
        dataSource={results.data.map((i, index) => ({ ...i, key: `${index}` }))}
        loading={results.loading}
        dictionary={getProTableDictionary()}
        onChange={({ current, pageSize }, _, sorter) =>
          setQueryConfig({
            pageIndex: current!,
            size: pageSize!,
            sort: formatQuerySortList(sorter),
          })
        }
        bordered
        headerConfig={{
          itemCount: {
            pageIndex: queryConfig.pageIndex,
            pageSize: queryConfig.size,
            total: results.total || 0,
          },
          enableColumnSort: true,
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
