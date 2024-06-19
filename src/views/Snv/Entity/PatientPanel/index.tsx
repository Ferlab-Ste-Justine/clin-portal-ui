import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import ProTable from '@ferlab/ui/core/components/ProTable';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { ComputedDatum, DefaultRawDatum } from '@nivo/pie';
import { BasicTooltip } from '@nivo/tooltip';
import { Col, Row, Space } from 'antd';
import cx from 'classnames';
import { ArrangerEdge, ArrangerHits, ArrangerResultsTree } from 'graphql/models';
import { DonorsEntity, TTableDonorEntity } from 'graphql/variants/models';
import { useTabPatientData } from 'graphql/variants/tabActions';
import { isEmpty } from 'lodash';

import ServerError from 'components/Results/ServerError';
import PieChart from 'components/uiKit/charts/Pie';
import { useGlobals } from 'store/global';
import { formatTimestampToISODate } from 'utils/helper';
import { getProTableDictionary } from 'utils/translation';

import { getPatientPanelColumns } from './columns';

import styles from './index.module.css';

interface OwnProps {
  className?: string;
  locus: string;
}

const DEFAULT_PAGE_SIZE = 20;

const makeRows = (donors: ArrangerEdge<DonorsEntity>[]): TTableDonorEntity[] =>
  donors?.map((donor, index) => ({
    key: donor.node.patient_id + index,
    id: donor.node.id,
    service_request_id: donor.node.service_request_id,
    analysis_service_request_id: donor.node.analysis_service_request_id,
    aliquot_id: donor.node.aliquot_id,
    patient_id: donor.node.patient_id,
    organization_id: donor.node.organization_id,
    gender: donor.node.gender.toLowerCase(),
    is_proband: donor.node.is_proband,
    analysis_code: donor.node.analysis_code,
    family_id: donor.node.family_id,
    last_update: formatTimestampToISODate(donor.node.last_update as number),
    qd: donor.node.qd,
    gq: donor.node.gq,
    sq: donor.node.sq,
    variant_type: donor.node.variant_type,
    bioinfo_analysis_code: donor.node.bioinfo_analysis_code,
    filters: donor.node.filters,
    ad_alt: donor.node.ad_alt,
    ad_total: donor.node.ad_total,
    ad_ratio: donor.node.ad_ratio,
    affected_status: donor.node.affected_status,
    affected_status_code: donor.node.affected_status_code,
  }));

interface DataSourceState {
  nbRows: number;
  hits: ArrangerHits<any>;
}

type PieSlices = {
  gender: DefaultRawDatum[];
  filter: DefaultRawDatum[];
  code: DefaultRawDatum[];
};

const graphSetting: any = {
  height: 150,
  margin: {
    top: 12,
    bottom: 12,
    left: 12,
    right: 12,
  },
};

const PieTooltip = <RawDatum,>({ datum }: { datum: ComputedDatum<RawDatum> }) => (
  <BasicTooltip id={datum.label} value={datum.formattedValue} />
);

const updateSlices = (id: string, slices: DefaultRawDatum[]) =>
  id
    ? [
        ...slices.filter((s) => s.id !== id),
        {
          id,
          label: intl.get(`sex.${id.toLowerCase()}`),
          value: (slices.find((s) => s.id === id)?.value ?? 0) + 1,
        },
      ]
    : slices;

const computePieSlices = (data: DataSourceState) =>
  (data?.hits?.edges || []).reduce(
    (xs: PieSlices, x) => {
      const gender = x.node?.gender;
      const code = x.node?.analysis_code;
      const filter = x.node?.filters?.[0];
      return {
        gender: updateSlices(gender, xs.gender),
        code: updateSlices(code, xs.code),
        filter: updateSlices(filter, xs.filter),
      };
    },
    { gender: [], code: [], filter: [] },
  );

const PatientPanel = ({ locus, className = '' }: OwnProps) => {
  const { getAnalysisNameByCode } = useGlobals();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { loading, data, error } = useTabPatientData(locus);
  const [dataSource, setDataSource] = useState<DataSourceState>({
    nbRows: 0,
    hits: { edges: [] },
  });

  useEffect(() => {
    if (!isEmpty(data)) {
      const donorsHits = (data?.donors as ArrangerResultsTree<DonorsEntity>)?.hits;
      setDataSource({
        nbRows: donorsHits?.edges.length,
        hits: donorsHits,
      });
    }
  }, [data]);

  if (error) {
    return <ServerError />;
  }

  const { gender: sexData, filter: dragenData, code: analyseData } = computePieSlices(dataSource);

  return (
    <div className={cx(styles.patientPanel, className)}>
      <Space direction="vertical" size={16} className={styles.space}>
        <GridCard
          content={
            <Row gutter={[12, 24]}>
              <Col sm={12} md={12} lg={8} data-cy="PieChart_Gender">
                <PieChart
                  title={intl.get('filters.group.donors.gender')}
                  data={sexData}
                  tooltip={PieTooltip}
                  {...graphSetting}
                />
              </Col>
              <Col sm={12} md={12} lg={8} data-cy="PieChart_Code">
                <PieChart
                  title={intl.get('filters.group.donors.analysis_code')}
                  data={analyseData}
                  {...graphSetting}
                />
              </Col>
              <Col sm={12} md={12} lg={8} data-cy="PieChart_Filter">
                <PieChart
                  title={intl.get('filters.group.donors.filters')}
                  data={dragenData}
                  {...graphSetting}
                />
              </Col>
            </Row>
          }
          loadingType="spinner"
          loading={loading}
        />
        <GridCard
          data-cy="VariantPatient_GridCard"
          content={
            <ProTable<TTableDonorEntity>
              tableId="patient_panel_table"
              columns={getPatientPanelColumns(dataSource.hits, getAnalysisNameByCode)}
              dataSource={makeRows(dataSource.hits?.edges) ?? []}
              loading={loading}
              showSorterTooltip={false}
              dictionary={getProTableDictionary()}
              onChange={({ current, pageSize }, filters, sorter, extra) => {
                if (extra.currentDataSource.length !== dataSource.nbRows) {
                  setDataSource({
                    ...dataSource,
                    nbRows: extra.currentDataSource.length,
                  });
                }

                if (currentPage !== current || currentPageSize !== pageSize) {
                  setCurrentPage(current!);
                  setCurrentPageSize(pageSize || DEFAULT_PAGE_SIZE);
                }
              }}
              headerConfig={{
                itemCount: {
                  pageIndex: currentPage,
                  pageSize: currentPageSize,
                  total: dataSource.nbRows || 0,
                },
              }}
              size="small"
              bordered
              pagination={{
                current: currentPage,
                pageSize: currentPageSize,
                defaultPageSize: DEFAULT_PAGE_SIZE,
                total: dataSource.nbRows ?? 0,
                className: styles.patientPagination,
              }}
            />
          }
        ></GridCard>
      </Space>
    </div>
  );
};

export default PatientPanel;
