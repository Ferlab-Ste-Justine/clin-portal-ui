import React, { useState } from 'react';
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

import ContentWithHeader from 'components/Layout/ContentWithHeader';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import { IQueryConfig } from 'utils/searchPageTypes';

import Sidebar from './components/Sidebar';
import PrescriptionsTable from './components/table/PrescriptionTable';
import SequencingsTable from './components/table/SequencingTable';
import { PRESCRIPTION_QB_ID, PRESCRIPTION_SCROLL_ID, TableTabs } from './utils/contstant';

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

const adjustSqon = (sqon: ISyntheticSqon) =>
  JSON.parse(JSON.stringify(sqon).replace('sequencing_requests.status', 'status'));

const generateSearchFilter = (search: string) =>
  generateQuery({
    operator: BooleanOperators.or,
    newFilters: [
      'prescription_id',
      'patient_mrn',
      'patient_id',
      'sequencing_requests.request_id',
    ].map((key) =>
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
  const sequencingActiveQuery = setPrescriptionStatusInActiveQuery(activeQuery);
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
    sort: isEmpty(sequencingQueryConfig.sort) ? DEFAULT_SORT : sequencingQueryConfig.sort,
  });

  const prescriptions = usePrescription({
    first: prescriptionQueryConfig.size,
    offset: prescriptionQueryConfig.size * (prescriptionQueryConfig.pageIndex - 1),
    sqon: resolveSyntheticSqon(
      queryList,
      searchValue.length === 0 ? activeQuery : generateMultipleQuery(searchValue, activeQuery),
    ),
    sort: isEmpty(prescriptionQueryConfig.sort) ? DEFAULT_SORT : prescriptionQueryConfig.sort,
  });
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
      <ScrollContentWithFooter scrollId={PRESCRIPTION_SCROLL_ID}>
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
                loading={prescriptions.loading}
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
                loading={sequencings.loading}
              />
            </Tabs.TabPane>
          </Tabs>
        </Space>
      </ScrollContentWithFooter>
    </ContentWithHeader>
  );
};

const PatientSearchWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <PrescriptionSearch />
  </ApolloProvider>
);

export default PatientSearchWrapper;
