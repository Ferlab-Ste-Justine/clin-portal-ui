import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { CloseOutlined, DownloadOutlined } from '@ant-design/icons';
import ProTable from '@ferlab/ui/core/components/ProTable/index';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { resetSearchAfterQueryConfig } from '@ferlab/ui/core/components/ProTable/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { IQueryConfig, ISort } from '@ferlab/ui/core/graphql/types';
import { Button, Card, Divider, Input, Select, Space, Typography } from 'antd';
import { useCoverage } from 'graphql/prescriptions/actions';
import { GeneCoverage } from 'graphql/prescriptions/models/Prescription';
import { COVERAGES_QUERY } from 'graphql/prescriptions/queries';
import IGVModal from 'views/Cnv/Exploration/components/IGVModal';
import { VARIANT_KEY } from 'views/Prescriptions/utils/export';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_QUERY_CONFIG,
  SCROLL_WRAPPER_ID,
} from 'views/Snv/utils/constant';

import DownloadTSVWrapper from 'components/Download';
import FixedSizeTable from 'components/Layout/FixedSizeTable';
import { useRpt } from 'hooks/useRpt';
import { useGlobals } from 'store/global';
import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { getProTableDictionary } from 'utils/translation';

import { usePrescriptionEntityContext } from '../context';

import { getGeneCoverageTableColumns } from './columns';

const DEFAULT_COVERAGE_SORT = [{ field: 'size', order: SortDirection.Asc }] as ISort[];

export type ITableGeneCoverage = GeneCoverage & {
  id?: string;
  key: string;
};

const Index = ({ downloadFile }: any) => {
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [geneSearch, setGeneSearch] = useState<string | null>(null);
  const [selectedGene, setSelectedGene] = useState<any | null>(null);
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [modalOpened, toggleModal] = useState(false);

  const getOptions = ({ panels }: any) =>
    panels?.buckets.map((bucket: any) => ({
      label: getAnalysisNameByCode(bucket.key),
      value: bucket.key,
      'data-cy': bucket.key,
    }));
  const { rpt } = useRpt();

  const [queryConfig, setQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    size: 200,
    sort: DEFAULT_COVERAGE_SORT,
  });

  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const history = useHistory();

  const { variantInfo } = usePrescriptionEntityContext();

  const handleClear = () => {
    setGeneSearch(null);
    setSelectedPanel(null);
  };

  const content = [
    {
      op: 'in',
      content: {
        field: 'service_request_id',
        value: [variantInfo.requestId],
      },
    },
    {
      op: 'in',
      content: {
        field: 'patient_id',
        value: [variantInfo.patientId],
      },
    },
    geneSearch && {
      op: 'in',
      content: {
        field: 'gene',
        value: [`${geneSearch}*`],
      },
    },
    selectedPanel && {
      op: 'in',
      content: {
        field: 'panels',
        value: [`${selectedPanel}*`],
      },
    },
  ].filter((a) => !!a);

  const variables = {
    sqon: {
      op: 'and',
      content: content as any,
    },
    sort: queryConfig.sort,
    first: queryConfig.size,
    searchAfter: queryConfig.searchAfter,
    weightedAverages: [{ field: 'average_coverage', weight: 'size' }],
  };

  const { data, loading, total, aggregations, searchAfter } = useCoverage(variables, undefined);

  useEffect(() => {
    if (queryConfig.firstPageFlag !== undefined || queryConfig.searchAfter === undefined) {
      return;
    }

    setQueryConfig({
      ...queryConfig,
      firstPageFlag: queryConfig.searchAfter,
    });
  }, [queryConfig]);

  const openIgvModal = (record: any) => {
    setSelectedGene(record);
    toggleModal(true);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeneSearch(event.target.value.toUpperCase());
    setPageIndex(1);
  };

  const handleSelection = (value: any) => {
    setSelectedPanel(value);
    setPageIndex(1);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (pageIndex === 1) {
      resetSearchAfterQueryConfig(
        {
          ...DEFAULT_QUERY_CONFIG,
          sort: DEFAULT_COVERAGE_SORT,
          size: queryConfig.size,
        },
        setQueryConfig,
      );
    }
  }, [pageIndex]);

  const { user } = useUser();
  const [downloadReady, setDownloadReady] = useState(false);

  const initialColumnState = user.config.data_exploration?.tables?.genes?.columns;
  const { getAnalysisNameByCode } = useGlobals();

  return (
    <div>
      {modalOpened && (
        <IGVModal
          rpt={rpt}
          variantEntity={
            {
              chromosome: selectedGene.chromosome,
              start: selectedGene.start,
              end: selectedGene.end,
              patient_id: variantInfo.patientId,
              id: selectedGene.id,
              variant_type: VARIANT_KEY,
            } as any
          }
          isOpen={modalOpened}
          toggleModal={toggleModal}
        />
      )}
      <Card bordered>
        <Space>
          <Typography.Text strong>
            {intl.get('pages.coverage_genic.gene_filter_label')}:
          </Typography.Text>
          <Input
            style={{ minWidth: 245 }}
            size="middle"
            value={geneSearch || ''}
            onChange={handleInput}
            placeholder={intl.get('pages.coverage_genic.gene_filter_placeholder')}
            data-cy="SearchBox"
            allowClear
          ></Input>
          <Typography.Text strong style={{ marginLeft: 24 }}>
            {intl.get('pages.coverage_genic.panel_filter_label')}:
          </Typography.Text>
          <Select
            showSearch
            size="middle"
            data-cy={'SelectPanel'}
            style={{ minWidth: 480 }}
            value={selectedPanel ? getAnalysisNameByCode(selectedPanel) : null}
            placeholder={intl.get('pages.coverage_genic.panel_filter_placeholder')}
            options={getOptions(aggregations)}
            onChange={handleSelection}
            allowClear
          />
          {(geneSearch || selectedPanel) && (
            <Space style={{ marginLeft: 24 }}>
              <Typography.Link onClick={handleClear}>
                <CloseOutlined style={{ marginRight: 8 }} />
                {intl.get('pages.coverage_genic.clear_filters')}
              </Typography.Link>
            </Space>
          )}
        </Space>
        <Divider style={{ marginTop: 16 }} />
        <FixedSizeTable
          numberOfColumn={[]}
          fixedProTable={(dimension) => (
            <ProTable<ITableGeneCoverage>
              tableId="general-coverage-genes"
              columns={getGeneCoverageTableColumns(
                openIgvModal,
                history,
                data.length === 0 ? true : false,
              )}
              initialColumnState={initialColumnState}
              scroll={dimension}
              dataSource={data.map((i) => ({ ...i, key: `${i[VARIANT_KEY]}` }))}
              enableRowSelection
              loading={loading}
              showSorterTooltip={false}
              size="small"
              style={{ minHeight: dimension.y }}
              bordered
              pagination={{
                current: pageIndex,
                queryConfig,
                setQueryConfig,
                customPagination: [10, 20, 50, 100, 200],
                onChange: (page: number) => {
                  scrollToTop(SCROLL_WRAPPER_ID);
                  setPageIndex(page);
                },
                onViewQueryChange: (viewPerQuery: PaginationViewPerQuery) => {
                  dispatch(
                    updateConfig({
                      data_exploration: {
                        tables: {
                          genes: {
                            ...user?.config.data_exploration?.tables?.genes,
                            viewPerQuery,
                          },
                        },
                      },
                    }),
                  );
                },
                searchAfter: searchAfter,
                defaultViewPerQuery: queryConfig.size,
              }}
              headerConfig={{
                enableColumnSort: true,
                tableExportDisabled: data.length === 0,
                onColumnSortChange: (columns) => {
                  dispatch(
                    updateConfig({
                      data_exploration: {
                        tables: {
                          genes: { columns },
                        },
                      },
                    }),
                  );
                },
                enableTableExport: true,
                extraCountInfo: [
                  <>
                    <Typography.Text>
                      {intl.get('pages.coverage_genic.average_coverage_weighted_label')}
                    </Typography.Text>
                    <Typography.Text strong data-cy={'AverageCoverage'}>
                      {aggregations && aggregations.average_coverage
                        ? ` ${(aggregations.average_coverage as any)['weighted_avg'].value.toFixed(
                            2,
                          )}`
                        : ` N/A`}
                    </Typography.Text>
                  </>,
                ],
                extra: [
                  <Button
                    key={'downloadFile'}
                    disabled={data.length === 0}
                    onClick={() => downloadFile('CSV', 'COVGENE')}
                    size="small"
                    icon={<DownloadOutlined width={'16'} height={'16'} />}
                  >
                    {intl.get('download.report')}
                  </Button>,
                ],
                onTableExportClick: () => {
                  setDownloadReady(true);
                },
                onSelectedRowsChange: (key, row) => {
                  setSelectedRows(row);
                },
                onSelectAllResultsChange: () => {
                  setSelectedRows([]);
                },
                itemCount: {
                  pageIndex: pageIndex,
                  pageSize: queryConfig.size,
                  total: total,
                },
              }}
              onChange={(pagination, __, sorter) => {
                setPageIndex(DEFAULT_PAGE_INDEX);
                setQueryConfig({
                  pageIndex: DEFAULT_PAGE_INDEX,
                  size: queryConfig.size,
                  sort: formatQuerySortList(sorter, DEFAULT_COVERAGE_SORT),
                } as IQueryConfig);
              }}
              dictionary={getProTableDictionary()}
            />
          )}
        />
        <DownloadTSVWrapper
          maxAllowed={2000}
          prefix={'GC'}
          columnKey={'key'}
          data={selectedRows}
          queryVariables={variables}
          columns={getGeneCoverageTableColumns(openIgvModal, history)}
          triggered={downloadReady}
          setTriggered={setDownloadReady}
          total={total}
          queryKey={'Coverages'}
          operations={queryConfig.operations}
          query={COVERAGES_QUERY.loc!.source.body.replaceAll(' $weightedAverages: JSON\\n', '')}
        />
      </Card>
    </div>
  );
};

export default Index;
