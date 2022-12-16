import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { MedicineBoxOutlined, SolutionOutlined } from '@ant-design/icons';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { ISqonGroupFilter, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Input, Space, Tabs } from 'antd';
import { usePrescription, usePrescriptionMapping } from 'graphql/prescriptions/actions';
import {
  setPrescriptionStatusInActiveQuery,
  useSequencingRequests,
} from 'graphql/sequencing/actions';
import { cloneDeep, isEmpty } from 'lodash';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';
import Sidebar from 'views/Prescriptions/Search/components/Sidebar';
import PrescriptionsTable from 'views/Prescriptions/Search/components/table/PrescriptionTable';
import SequencingsTable from 'views/Prescriptions/Search/components/table/SequencingTable';
import { PRESCRIPTION_QB_ID, TableTabs } from 'views/Prescriptions/Search/utils/contstant';
import { commonPrescriptionFilterFields } from 'views/Prescriptions/utils/constant';

import ContentWithHeader from 'components/Layout/ContentWithHeader';
import { useStaticTableHeight } from 'components/Table/StaticTableHeight';
import { IQueryConfig } from 'utils/searchPageTypes';

import { downloadAsTSV } from '../utils/export';

import { prescriptionsColumns } from './components/table/PrescriptionTable/columns';
import { sequencingsColumns } from './components/table/SequencingTable/columns';

import styles from './index.module.scss';

export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE = 1;

const DEFAULT_QUERY_CONFIG: IQueryConfig = {
  pageIndex: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  sort: [],
};

const DEFAULT_SORT = [
  {
    field: 'created_on',
    order: 'desc',
  },
];

const ID_SORT = [
  {
    field: '_id',
    order: 'desc',
  },
];

const adjustSqon = (sqon: ISyntheticSqon) =>
  JSON.parse(JSON.stringify(sqon).replace('sequencing_requests.status', 'status'));

const generateSearchFilter = (search: string) =>
  generateQuery({
    operator: BooleanOperators.or,
    newFilters: commonPrescriptionFilterFields.map((key) =>
      generateValueFilter({
        field: key,
        value: [`${search}*`],
      }),
    ),
  });

const generateMultipleQuery = (searchValue: string, activeQuery: ISyntheticSqon) => {
  const searchQuery = generateSearchFilter(searchValue);
  const newQuery: any = activeQuery;
  newQuery.content = [cloneDeep(searchQuery), cloneDeep(activeQuery)];
  return activeQuery;
};

const PrescriptionSearch = (): React.ReactElement => {
  const extendedMapping = usePrescriptionMapping();
  const { queryList, activeQuery } = useQueryBuilderState(PRESCRIPTION_QB_ID);
  const [prescriptionQueryConfig, setPrescriptionQueryConfig] = useState(DEFAULT_QUERY_CONFIG);
  const [sequencingQueryConfig, setSequencingQueryConfig] = useState(DEFAULT_QUERY_CONFIG);
  const [searchValue, setSearchValue] = useState('');
  const [downloadPrescriptionKeys, setDownloadPrescriptionKeys] = useState<string[]>([]);
  const [downloadSequencingKeys, setDownloadSequencingKeys] = useState<string[]>([]);
  const sequencingActiveQuery = setPrescriptionStatusInActiveQuery(activeQuery);
  const tableHeight = useStaticTableHeight(450);

  const sequencingsSort = isEmpty(sequencingQueryConfig.sort)
    ? [...DEFAULT_SORT, ...ID_SORT]
    : [...sequencingQueryConfig.sort, ...ID_SORT];

  const prescriptionsSort = isEmpty(prescriptionQueryConfig.sort)
    ? [...DEFAULT_SORT, ...ID_SORT]
    : [...prescriptionQueryConfig.sort, ...ID_SORT];

  const sequencings = useSequencingRequests({
    first: sequencingQueryConfig.size,
    offset: sequencingQueryConfig.size * (sequencingQueryConfig.pageIndex - 1),
    sqon: adjustSqon(
      resolveSyntheticSqon(
        queryList,
        searchValue.length === 0
          ? sequencingActiveQuery
          : generateMultipleQuery(searchValue, sequencingActiveQuery),
      ),
    ),
    sort: sequencingsSort,
  });

  const prescriptions = usePrescription({
    first: prescriptionQueryConfig.size,
    offset: prescriptionQueryConfig.size * (prescriptionQueryConfig.pageIndex - 1),
    sqon: resolveSyntheticSqon(
      queryList,
      searchValue.length === 0 ? activeQuery : generateMultipleQuery(searchValue, activeQuery),
    ),
    sort: prescriptionsSort,
  });

  // query is always done, unfortunately but response size is limited if nothing to download
  const prescriptionsToDownload = usePrescription({
    first: downloadPrescriptionKeys.length > 0 ? prescriptions.total : 0,
    offset: 0,
    sqon: resolveSyntheticSqon(
      queryList,
      searchValue.length === 0 ? activeQuery : generateMultipleQuery(searchValue, activeQuery),
    ),
    sort: prescriptionsSort,
  });

  // query is always done, unfortunately but response size is limited if nothing to download
  const sequencingsToDownload = useSequencingRequests({
    first: downloadSequencingKeys.length > 0 ? sequencings.total : 0,
    offset: 0,
    sqon: adjustSqon(
      resolveSyntheticSqon(
        queryList,
        searchValue.length === 0
          ? sequencingActiveQuery
          : generateMultipleQuery(searchValue, sequencingActiveQuery),
      ),
    ),
    sort: sequencingsSort,
  });

  useEffect(() => {
    // download only when both prescriptionsToDownload and something to download
    if (downloadPrescriptionKeys.length > 0 && prescriptionsToDownload.data.length > 0) {
      downloadAsTSV(
        prescriptionsToDownload.data,
        downloadPrescriptionKeys,
        'prescription_id',
        prescriptionsColumns(),
        'PR',
      );
      setDownloadPrescriptionKeys([]); // reset download
    }
  }, [downloadPrescriptionKeys, prescriptionsToDownload.data]);

  useEffect(() => {
    // download only when both sequencingsToDownload and something to download
    if (downloadSequencingKeys.length > 0 && sequencingsToDownload.data.length > 0) {
      downloadAsTSV(
        sequencingsToDownload.data,
        downloadSequencingKeys,
        'request_id',
        sequencingsColumns(),
        'RQ',
      );
      setDownloadSequencingKeys([]); // reset download
    }
  }, [downloadSequencingKeys, sequencingsToDownload.data]);

  const searchPrescription = (value: any) => {
    if (value.target.value) {
      setSearchValue(value.target.value);
    } else {
      setSearchValue('');
    }
  };
  return (
    <ContentWithHeader
      className={styles.prescriptionLayout}
      headerProps={{
        icon: <MedicineBoxOutlined />,
        title: intl.get('screen.patientsearch.title'),
      }}
    >
      <Sidebar
        queryBuilderId={PRESCRIPTION_QB_ID}
        isLoading={prescriptions.loading}
        aggregations={prescriptions.aggregations}
        extendedMapping={extendedMapping}
        filters={activeQuery as ISqonGroupFilter}
      />

      <Space direction="vertical" size="middle" className={styles.patientContentContainer}>
        <div className={styles.patientContentHeader}>
          <ProLabel title={intl.get('home.prescription.search.box.label')} colon />
          <Input onChange={searchPrescription} allowClear />
        </div>
        <Tabs type="card">
          <Tabs.TabPane
            key={TableTabs.Prescriptions}
            tab={
              <>
                <MedicineBoxOutlined />
                {intl.get('screen.patient.tab.prescriptions')}{' '}
                {prescriptions?.total && ` (${prescriptions?.total})`}
              </>
            }
          >
            <PrescriptionsTable
              results={prescriptions}
              queryConfig={prescriptionQueryConfig}
              setQueryConfig={setPrescriptionQueryConfig}
              setDownloadKeys={setDownloadPrescriptionKeys}
              loading={prescriptions.loading}
              tableHeight={tableHeight}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            key={TableTabs.Requests}
            tab={
              <>
                <SolutionOutlined />
                {intl.get('screen.patient.tab.requests')}{' '}
                {sequencings?.total && ` (${sequencings?.total})`}
              </>
            }
          >
            <SequencingsTable
              results={sequencings}
              queryConfig={sequencingQueryConfig}
              setQueryConfig={setSequencingQueryConfig}
              setDownloadKeys={setDownloadSequencingKeys}
              loading={sequencings.loading}
              tableHeight={tableHeight}
            />
          </Tabs.TabPane>
        </Tabs>
      </Space>
    </ContentWithHeader>
  );
};

const PatientSearchWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <PrescriptionSearch />
  </ApolloProvider>
);

export default PatientSearchWrapper;
