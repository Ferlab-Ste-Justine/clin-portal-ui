import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { MedicineBoxOutlined, SolutionOutlined } from '@ant-design/icons';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { ISqonGroupFilter, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { Input, Space, Tabs } from 'antd';
import { usePrescription, usePrescriptionMapping } from 'graphql/prescriptions/actions';
import {
  setPrescriptionStatusInActiveQuery,
  useSequencingRequests,
} from 'graphql/sequencing/actions';
import { cloneDeep } from 'lodash';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';
import Sidebar from 'views/Prescriptions/Search/components/Sidebar';
import PrescriptionsTable from 'views/Prescriptions/Search/components/table/PrescriptionTable';
import SequencingsTable from 'views/Prescriptions/Search/components/table/SequencingTable';
import {
  DEFAULT_OFFSET,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_SORT_QUERY,
  PRESCRIPTION_QB_ID,
  PRESCRIPTION_SCROLL_ID,
  TableTabs,
} from 'views/Prescriptions/Search/utils/contstant';
import { commonPrescriptionFilterFields } from 'views/Prescriptions/utils/constant';

import ContentWithHeader from 'components/Layout/ContentWithHeader';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import { resolveSyntheticSqonWithReferences } from 'utils/query';

import { downloadAsTSV } from '../utils/export';

import { prescriptionsColumns } from './components/table/PrescriptionTable/columns';
import { sequencingsColumns } from './components/table/SequencingTable/columns';

import styles from './index.module.css';

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
  const [prescriptionPageIndex, setPrescriptionPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [sequencingPageIndex, setSequencingPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [prescriptionQueryConfig, setPrescriptionQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    size: DEFAULT_PAGE_SIZE,
  });
  const [sequencingQueryConfig, setSequencingQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    size: DEFAULT_PAGE_SIZE,
  });
  const [searchValue, setSearchValue] = useState('');
  const [downloadPrescriptionKeys, setDownloadPrescriptionKeys] = useState<string[]>([]);
  const [downloadSequencingKeys, setDownloadSequencingKeys] = useState<string[]>([]);
  const sequencingActiveQuery = setPrescriptionStatusInActiveQuery(activeQuery);

  const sequencingsQueryVariables = {
    first: sequencingQueryConfig.size,
    offset: DEFAULT_OFFSET,
    searchAfter: sequencingQueryConfig.searchAfter,
    sqon: adjustSqon(
      resolveSyntheticSqonWithReferences(
        queryList,
        searchValue.length === 0
          ? sequencingActiveQuery
          : generateMultipleQuery(searchValue, sequencingActiveQuery),
      ),
    ),
    sort: tieBreaker({
      sort: sequencingQueryConfig.sort,
      defaultSort: DEFAULT_SORT_QUERY,
      field: '_id',
      order: sequencingQueryConfig.operations?.previous ? SortDirection.Asc : SortDirection.Desc,
    }),
  };

  const sequencings = useSequencingRequests(
    sequencingsQueryVariables,
    sequencingQueryConfig.operations,
  );

  const prescriptionsQueryVariables = {
    first: prescriptionQueryConfig.size,
    offset: DEFAULT_OFFSET,
    searchAfter: prescriptionQueryConfig.searchAfter,
    sqon: resolveSyntheticSqonWithReferences(
      queryList,
      searchValue.length === 0 ? activeQuery : generateMultipleQuery(searchValue, activeQuery),
    ),
    sort: tieBreaker({
      sort: prescriptionQueryConfig.sort,
      defaultSort: DEFAULT_SORT_QUERY,
      field: '_id',
      order: prescriptionQueryConfig.operations?.previous ? SortDirection.Asc : SortDirection.Desc,
    }),
  };

  const prescriptions = usePrescription(
    prescriptionsQueryVariables,
    prescriptionQueryConfig.operations,
  );

  // query is always done, unfortunately but response size is limited if nothing to download
  const prescriptionsToDownload = usePrescription({
    ...prescriptionsQueryVariables,
    searchAfter: undefined,
    first: downloadPrescriptionKeys.length > 0 ? prescriptions.total : 0,
  });

  // query is always done, unfortunately but response size is limited if nothing to download
  const sequencingsToDownload = useSequencingRequests({
    ...sequencingsQueryVariables,
    searchAfter: undefined,
    first: downloadSequencingKeys.length > 0 ? sequencings.total : 0,
  });

  useEffect(() => {
    if (
      prescriptionQueryConfig.firstPageFlag !== undefined ||
      prescriptionQueryConfig.searchAfter === undefined
    ) {
      return;
    }

    setPrescriptionQueryConfig({
      ...prescriptionQueryConfig,
      firstPageFlag: prescriptionQueryConfig.searchAfter,
    });
  }, [prescriptionQueryConfig]);

  useEffect(() => {
    if (
      sequencingQueryConfig.firstPageFlag !== undefined ||
      sequencingQueryConfig.searchAfter === undefined
    ) {
      return;
    }

    setSequencingQueryConfig({
      ...sequencingQueryConfig,
      firstPageFlag: sequencingQueryConfig.searchAfter,
    });
  }, [sequencingQueryConfig]);

  useEffect(() => {
    setPrescriptionQueryConfig({
      ...prescriptionQueryConfig,
      sort: DEFAULT_SORT_QUERY,
      searchAfter: undefined,
      firstPageFlag: undefined,
      operations: undefined,
    });
    setPrescriptionPageIndex(DEFAULT_PAGE_INDEX);
    setSequencingQueryConfig({
      ...sequencingQueryConfig,
      sort: DEFAULT_SORT_QUERY,
      searchAfter: undefined,
      firstPageFlag: undefined,
      operations: undefined,
    });
    setSequencingPageIndex(DEFAULT_PAGE_INDEX);
  }, [searchValue]);

  useEffect(() => {
    // download only when both prescriptionsToDownload and something to download
    if (
      downloadPrescriptionKeys.length > 0 &&
      !prescriptionsToDownload.loading &&
      prescriptionsToDownload.data.length > 0
    ) {
      downloadAsTSV(
        prescriptionsToDownload.data,
        downloadPrescriptionKeys,
        'prescription_id',
        prescriptionsColumns(),
        'PR',
        {},
        undefined,
        true,
      );
      setDownloadPrescriptionKeys([]); // reset download
    }
  }, [downloadPrescriptionKeys, prescriptionsToDownload]);

  useEffect(() => {
    // download only when both sequencingsToDownload and something to download
    if (
      downloadSequencingKeys.length > 0 &&
      !sequencingsToDownload.loading &&
      sequencingsToDownload.data.length > 0
    ) {
      downloadAsTSV(
        sequencingsToDownload.data,
        downloadSequencingKeys,
        'request_id',
        sequencingsColumns(),
        'RQ',
        {},
        undefined,
        true,
      );
      setDownloadSequencingKeys([]); // reset download
    }
  }, [downloadSequencingKeys, sequencingsToDownload]);

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
            <Input onChange={searchPrescription} data-cy="PrescriptionsSearch" allowClear />
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
                pageIndex={prescriptionPageIndex}
                setPageIndex={setPrescriptionPageIndex}
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
                pageIndex={sequencingPageIndex}
                setPageIndex={setSequencingPageIndex}
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
