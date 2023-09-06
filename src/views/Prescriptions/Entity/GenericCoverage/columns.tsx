import React from 'react';
import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Button, Space, Tooltip, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';
import { CNV_VARIANT_PATIENT_QB_ID } from 'views/Cnv/utils/constant';
import {
  VariantSection,
  VariantSectionKey,
} from 'views/Prescriptions/Entity/Tabs/Variants/components/VariantSectionNav';
import { SNV_VARIANT_PATIENT_QB_ID } from 'views/Snv/utils/constant';

import LineStyleIcon from 'components/icons/LineStyleIcon';

import { PrescriptionEntityTabs } from '..';

import { ITableGeneCoverage } from './index';

import style from 'views/Snv/Exploration/variantColumns.module.scss';

const handleRedirection = (
  record: ITableGeneCoverage,
  target: string,
  { replace, location }: any,
) => {
  const queryBuilderId =
    target === VariantSection.SNV ? SNV_VARIANT_PATIENT_QB_ID : CNV_VARIANT_PATIENT_QB_ID;
  addQuery({
    queryBuilderId,
    query: generateQuery({
      newFilters: [
        generateValueFilter({
          field: 'consequences.symbol',
          value: [record.gene],
          index: INDEXES.VARIANT,
        }),
      ],
    }),
    setAsActive: true,
  });
  replace({
    ...location,
    hash: PrescriptionEntityTabs.VARIANTS,
    search: `?${new URLSearchParams({
      [VariantSectionKey]: target,
    }).toString()}`,
  });
};

export const getGeneCoverageTableColumns = (
  igvModalCb: (record: ITableGeneCoverage) => void,
  history: any,
): ProColumnType<ITableGeneCoverage>[] => [
  {
    className: style.userAffectedBtnCell,
    key: 'actions',
    title: intl.get('screen.patientsnv.results.table.actions'),
    fixed: 'left',
    render: (record: ITableGeneCoverage) => (
      <Space align={'center'}>
        <Tooltip title={intl.get('open.in.igv')}>
          <Button
            onClick={() => {
              if (igvModalCb) {
                igvModalCb(record);
              }
            }}
            icon={<LineStyleIcon width={'100%'} height={'16px'} />}
            type={'link'}
            size={'small'}
          />
        </Tooltip>
        <Tooltip>
          <Typography.Link>
            <a id={'snv'} onClick={() => handleRedirection(record, VariantSection.SNV, history)}>
              {VariantSection.SNV.toUpperCase()}
            </a>
          </Typography.Link>
        </Tooltip>
        <Tooltip>
          <Typography.Link>
            <a id={'cnv'} onClick={() => handleRedirection(record, VariantSection.CNV, history)}>
              {VariantSection.CNV.toUpperCase()}
            </a>
          </Typography.Link>
        </Tooltip>
      </Space>
    ),
    align: 'center',
    width: 102,
  },
  {
    key: 'gene',
    title: intl.get('pages.coverage_genic.columns.gene'),
    width: 150,
    sorter: {
      compare: (a: ITableGeneCoverage, b: ITableGeneCoverage) =>
        (a.gene || '').localeCompare(b.gene || ''),
      multiple: 1,
    },
    render: (record: ITableGeneCoverage) => (
      <Typography.Link>
        <a
          target={'_blank'}
          href={`https://www.omim.org/entry/${record.omim_gene_id}`}
          rel="noreferrer"
        >
          {record.gene}
        </a>
      </Typography.Link>
    ),
  },
  {
    key: 'size',
    dataIndex: 'size',
    width: 100,
    title: intl.get('pages.coverage_genic.columns.size'),
    sorter: {
      compare: (a, b) => a.size - b.size,
      multiple: 1,
    },
    render: (record) => record.thousandFormat(intl.get('numbers.separator')),
  },
  {
    key: 'average_coverage',
    dataIndex: 'average_coverage',
    title: intl.get('pages.coverage_genic.columns.averageCoverage'),
    width: 100,
    tooltip: intl.get('pages.coverage_genic.columns.tooltips.average'),
    sorter: {
      compare: (a, b) => a.average_coverage - b.average_coverage,
      multiple: 1,
    },
    render: (record) => (record > 1 ? record.toFixed(2) : '< 1'),
  },
  {
    key: 'coverage5',
    dataIndex: 'coverage5',
    title: '5x',
    tooltip: intl.get('pages.coverage_genic.columns.tooltips.proportion', { value: 5 }),
    width: 100,
    sorter: {
      compare: (a, b) => a.coverage5 - b.coverage5,
      multiple: 1,
    },
    render: (record) => record.toPercentSignificative(),
  },
  {
    key: 'coverage15',
    dataIndex: 'coverage15',
    width: 100,
    tooltip: intl.get('pages.coverage_genic.columns.tooltips.proportion', { value: 15 }),
    title: '15x',
    sorter: {
      compare: (a, b) => a.coverage15 - b.coverage15,
      multiple: 1,
    },
    render: (record) => record.toPercentSignificative(),
  },
  {
    key: 'coverage30',
    dataIndex: 'coverage30',
    width: 100,
    title: '30x',
    tooltip: intl.get('pages.coverage_genic.columns.tooltips.proportion', { value: 30 }),
    sorter: {
      compare: (a, b) => a.coverage30 - b.coverage30,
      multiple: 1,
    },
    render: (record) => record.toPercentSignificative(),
  },
  {
    key: 'coverage50',
    dataIndex: 'coverage50',
    width: 100,
    title: '50x',
    tooltip: intl.get('pages.coverage_genic.columns.tooltips.proportion', { value: 50 }),
    sorter: {
      compare: (a, b) => a.coverage50 - b.coverage50,
      multiple: 1,
    },
    render: (record) => record.toPercentSignificative(),
  },
  {
    key: 'coverage100',
    dataIndex: 'coverage100',
    width: 100,
    title: '100x',
    tooltip: intl.get('pages.coverage_genic.columns.tooltips.proportion', { value: 100 }),
    sorter: {
      compare: (a, b) => a.coverage100 - b.coverage100,
      multiple: 1,
    },
    render: (record) => record.toPercentSignificative(),
  },
  {
    key: 'coverage200',
    dataIndex: 'coverage200',
    width: 100,
    title: '200x',
    tooltip: intl.get('pages.coverage_genic.columns.tooltips.proportion', { value: 200 }),
    sorter: {
      compare: (a, b) => a.coverage200 - b.coverage200,
      multiple: 1,
    },
    render: (record) => record.toPercentSignificative(),
  },
  {
    key: 'coverage300',
    dataIndex: 'coverage300',
    width: 100,
    title: '300x',
    tooltip: intl.get('pages.coverage_genic.columns.tooltips.proportion', { value: 300 }),
    sorter: {
      compare: (a, b) => a.coverage300 - b.coverage300,
      multiple: 1,
    },
    render: (record) => record.toPercentSignificative(),
  },
  {
    key: 'coverage500',
    dataIndex: 'coverage500',
    width: 100,
    title: '500x',
    tooltip: intl.get('pages.coverage_genic.columns.tooltips.proportion', { value: 500 }),
    sorter: {
      compare: (a, b) => a.coverage500 - b.coverage500,
      multiple: 1,
    },
    render: (record) => record.toPercentSignificative(),
  },
  {
    key: 'coverage1000',
    dataIndex: 'coverage1000',
    width: 100,
    title: '1000x',
    tooltip: intl.get('pages.coverage_genic.columns.tooltips.proportion', { value: 1000 }),
    sorter: {
      compare: (a, b) => a.coverage1000 - b.coverage1000,
      multiple: 1,
    },
    render: (record) => record.toPercentSignificative(),
  },
];
