import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Space, Table, Tooltip, Typography } from 'antd';
import { ArrangerEdge } from 'graphql/models';
import {
  BoundType,
  ExternalFrequenciesEntity,
  FrequencyByAnalysisEntity,
} from 'graphql/variants/models';
import { useTabFrequenciesData } from 'graphql/variants/tabActions';
import { isEmpty } from 'lodash';
import NoData from 'views/Snv/Entity/NoData';

import CollapsePanel from 'components/containers/collapse';
import { useGlobals } from 'store/global';
import { GetAnalysisNameByCode } from 'store/global/types';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatNumber } from 'utils/formatNumber';
import { toExponentialNotation } from 'utils/helper';

import styles from './index.module.scss';

interface OwnProps {
  locus: string;
}

const { Text } = Typography;

type ExternalFreqDatum = number | string | null;
type ExternalFreqRow = {
  cohort: {
    cohortName: string;
    link?: string;
  };
  alt?: ExternalFreqDatum;
  altRef?: ExternalFreqDatum;
  homozygotes?: ExternalFreqDatum;
  frequency?: ExternalFreqDatum;
  key: string;
};

const displayDefaultIfNeeded = (datum: ExternalFreqDatum) =>
  datum == null ? TABLE_EMPTY_PLACE_HOLDER : formatNumber(datum);

const formatFractionPercent = (nominator: number, denominator: number, total: number) =>
  `${nominator} / ${denominator} ${
    nominator !== 0 || total !== 0 ? `(${(total * 100).toFixed(1)}%)` : '(0%)'
  }`;

const getFreqByAnalysisColumns = (getAnalysisNameByCode: GetAnalysisNameByCode) => [
  {
    title: intl.get('screen.variant.entity.frequencyTab.analysis'),
    render: (freqByAnalysis: FrequencyByAnalysisEntity) =>
      freqByAnalysis.analysis_code ? (
        <Tooltip title={getAnalysisNameByCode(freqByAnalysis.analysis_code)}>
          {freqByAnalysis.analysis_code}
        </Tooltip>
      ) : (
        freqByAnalysis.analysis_code
      ),
  },
  {
    title: intl.get('screen.variant.entity.frequencyTab.all.patients'),
    children: [
      {
        title: () => intl.get('screen.variant.entity.frequencyTab.frequency.abbv'),
        dataIndex: 'total',
        render: (total: BoundType) => formatFractionPercent(total?.pc, total?.pn, total?.pf),
      },
      {
        title: () => intl.get('screen.variant.entity.frequencyTab.homozygote.abbv'),
        dataIndex: 'total',
        render: (total: BoundType) => total?.hom,
      },
    ],
  },
  {
    title: intl.get('screen.variant.entity.frequencyTab.affected.patients'),
    children: [
      {
        title: intl.get('screen.variant.entity.frequencyTab.frequency.abbv'),
        dataIndex: 'affected',
        render: (affected: BoundType) =>
          formatFractionPercent(affected?.pc, affected?.pn, affected?.pf),
      },
      {
        title: intl.get('screen.variant.entity.frequencyTab.homozygote.abbv'),
        dataIndex: 'affected',
        render: (affected: BoundType) => affected?.hom,
      },
    ],
  },
  {
    title: intl.get('screen.variant.entity.frequencyTab.nonaffected.patients'),
    children: [
      {
        title: intl.get('screen.variant.entity.frequencyTab.frequency.abbv'),
        dataIndex: 'non_affected',
        render: (non_affected: BoundType) =>
          formatFractionPercent(non_affected?.pc, non_affected?.pn, non_affected?.pf),
      },
      {
        title: intl.get('screen.variant.entity.frequencyTab.homozygote.abbv'),
        dataIndex: 'non_affected',
        render: (non_affected: BoundType) => non_affected?.hom,
      },
    ],
  },
];

const makeRows = (freqByAnalysis: ArrangerEdge<FrequencyByAnalysisEntity>[]) =>
  freqByAnalysis.map((analysis) => ({
    key: analysis.node.analysis_code,
    ...analysis.node,
  }));

const externalFreqColumns = [
  {
    title: () => intl.get('screen.variantDetails.frequenciesTab.LDMColumn'),
    dataIndex: 'cohort',
    render: (cohort: { cohortName: string; link?: string }) => {
      const cohortName = cohort.cohortName;
      if (['TopMed', 'gnomAD Genome (v3)'].includes(cohortName)) {
        return <ExternalLink href={cohort.link!}>{cohortName}</ExternalLink>;
      }
      return cohortName;
    },
  },
  {
    title: () => intl.get('screen.variantDetails.frequenciesTab.nbAllelesAlt'),
    dataIndex: 'alt',
    render: displayDefaultIfNeeded,
  },
  {
    title: () => intl.get('screen.variantDetails.frequenciesTab.nbAllelesAltRef'),
    dataIndex: 'altRef',
    render: displayDefaultIfNeeded,
  },
  {
    title: () => intl.get('screen.variantDetails.frequenciesTab.nbHomozygotes'),
    dataIndex: 'homozygotes',
    render: displayDefaultIfNeeded,
  },
  {
    title: () => intl.get('screen.variantDetails.frequenciesTab.frequency'),
    dataIndex: 'frequency',
    render: displayDefaultIfNeeded,
  },
];

const createExternalFreqRow = (
  boundType: BoundType,
  key: string,
  { name, link }: { name?: string; link?: string },
): ExternalFreqRow => {
  const result: ExternalFreqRow = {
    key: key,
    cohort: {
      cohortName: name ?? key,
    },
    alt: boundType.ac,
    altRef: boundType.an,
    homozygotes: boundType.hom,
    frequency: toExponentialNotation(boundType.af),
  };

  if (link) {
    result.cohort.link = link;
  }

  return result;
};

const makeRowForExternalFreq = (
  frequencies: ExternalFrequenciesEntity,
  locus: string,
): ExternalFreqRow[] => {
  if (!frequencies || Object.keys(frequencies).length === 0) {
    return [];
  }

  const topmed = frequencies.topmed_bravo || {};
  const gnomadGenomes3 = frequencies.gnomad_genomes_3_0 || {};
  const gnomadGenomes2_1_1 = frequencies.gnomad_genomes_2_1_1 || {};
  const gnomadExomes2_1_1 = frequencies.gnomad_exomes_2_1_1 || {};
  const oneThousandsGenomes = frequencies.thousand_genomes || {};

  return [
    createExternalFreqRow(topmed, 'TopMed', {
      link: `https://bravo.sph.umich.edu/freeze8/hg38/variant/snv/${locus}`,
    }),
    createExternalFreqRow(gnomadGenomes3, 'Gnomad Genomes (v3)', {
      link: `https://gnomad.broadinstitute.org/variant/${locus}?dataset=gnomad_r3`,
      name: 'gnomAD Genome (v3)',
    }),
    createExternalFreqRow(gnomadGenomes2_1_1, 'Gnomad Genomes (v2.1.1)', {
      name: 'gnomAD Genome (v2.1.1)',
    }),
    createExternalFreqRow(gnomadExomes2_1_1, 'Gnomad Exomes (v2.1.1)', {
      name: 'gnomAD Exome (v2.1.1)',
    }),
    createExternalFreqRow(oneThousandsGenomes, '1000 Genomes', {}),
  ].map((row, index) => ({ ...row, key: `${index}` }));
};

const isExternalFreqTableEmpty = (rows: ExternalFreqRow[]) =>
  rows.every((visibleRow: ExternalFreqRow) => !Object.values(visibleRow).some((e) => e));

const { Title } = Typography;

const FrequencyCard = ({ locus }: OwnProps) => {
  const { loading, data } = useTabFrequenciesData(locus);
  const { getAnalysisNameByCode } = useGlobals();
  const frequencies_by_analysis = makeRows(data.frequencies_by_analysis);
  const externalCohortsRows = makeRowForExternalFreq(data.external_frequencies, data.locus);
  const hasEmptyCohorts = isExternalFreqTableEmpty(externalCohortsRows);

  return (
    <>
      <Title level={3}>{intl.get('screen.variantDetails.summaryTab.frequencyCardTitle')}</Title>
      <Space direction="vertical" className={styles.frequencyCard} size={16}>
        <CollapsePanel
          header={<Title level={4}>{intl.get('screen.variantDetails.summaryTab.rqdmTitle')}</Title>}
          loading={loading}
        >
          {isEmpty(frequencies_by_analysis) ? (
            <NoData />
          ) : (
            <Table
              bordered
              size="small"
              dataSource={frequencies_by_analysis}
              columns={getFreqByAnalysisColumns(getAnalysisNameByCode)}
              pagination={false}
              summary={() => {
                const { total, affected, non_affected } = data.frequency_RQDM;
                return (
                  <>
                    <Table.Summary.Row className={styles.footerRow}>
                      <Table.Summary.Cell index={0}>
                        <Text strong> TOTAL</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <Text strong>{formatFractionPercent(total?.pc, total?.pn, total?.pf)}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2}>
                        <Text strong>{total?.hom}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={3}>
                        <Text strong>
                          {formatFractionPercent(affected?.pc, affected?.pn, affected?.pf)}
                        </Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={4}>
                        <Text strong>{affected.hom}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <Text strong>
                          {formatFractionPercent(
                            non_affected?.pc,
                            non_affected?.pn,
                            non_affected?.pf,
                          )}
                        </Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={6}>
                        <Text strong>{non_affected?.hom}</Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          )}
        </CollapsePanel>
        <CollapsePanel
          header={
            <Title level={4}>{intl.get('screen.variantDetails.summaryTab.cohortTitle')}</Title>
          }
          loading={loading}
        >
          {!hasEmptyCohorts ? (
            <Table
              bordered
              size="small"
              dataSource={externalCohortsRows}
              columns={externalFreqColumns}
              pagination={false}
            />
          ) : (
            <NoData />
          )}
        </CollapsePanel>
      </Space>
    </>
  );
};

export default FrequencyCard;
