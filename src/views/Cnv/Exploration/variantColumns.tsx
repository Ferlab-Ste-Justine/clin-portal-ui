import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Tooltip } from 'antd';
import cx from 'classnames';
import { ITableVariantEntity, VariantEntity } from 'graphql/cnv/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatGenotype } from 'utils/formatGenotype';
import { formatDnaLength, formatNumber } from 'utils/formatNumber';

import style from './variantColumns.module.scss';

export const getVariantColumns = (
  openGenesModal: (record: VariantEntity) => void,
): ProColumnType<ITableVariantEntity>[] => {
  const columns: ProColumnType<ITableVariantEntity>[] = [
    {
      displayTitle: intl.get('screen.patientcnv.results.table.variant'),
      title: intl.get('screen.patientcnv.results.table.variant'),
      key: 'name',
      dataIndex: 'name',
      fixed: 'left',
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (name: string) => {
        const value = name.split(':').slice(1).join(':');
        return (
          <Tooltip placement="topLeft" title={value}>
            {value}
          </Tooltip>
        );
      },
    },
    {
      displayTitle: intl.get('screen.patientcnv.results.table.chromosome'),
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.chromosome.tooltip')}>
          {intl.get('screen.patientcnv.results.table.chromosome')}
        </Tooltip>
      ),
      key: 'chromosome',
      dataIndex: 'sort_chromosome',
      sorter: { multiple: 1 },
      render: (sort_chromosome: number, variant: VariantEntity) => variant.chromosome,
    },
    {
      displayTitle: intl.get('screen.patientcnv.results.table.start'),
      title: intl.get('screen.patientcnv.results.table.start'),
      key: 'start',
      dataIndex: 'start',
      sorter: { multiple: 1 },
      render: (start: number) => (start ? formatNumber(start) : TABLE_EMPTY_PLACE_HOLDER),
    },
    {
      displayTitle: intl.get('screen.patientcnv.results.table.end'),
      title: intl.get('screen.patientcnv.results.table.end'),
      key: 'end',
      dataIndex: 'end',
      render: (end: number) => (end ? formatNumber(end) : TABLE_EMPTY_PLACE_HOLDER),
    },
    {
      displayTitle: intl.get('screen.patientcnv.results.table.type'),
      title: intl.get('screen.patientcnv.results.table.type'),
      key: 'type',
      dataIndex: 'type',
      render: (type: string) => type,
    },
    {
      displayTitle: intl.get('screen.patientcnv.results.table.length'),
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.length.tooltip')}>
          {intl.get('screen.patientcnv.results.table.length')}
        </Tooltip>
      ),
      key: 'length',
      dataIndex: 'reflen',
      render: (length: number) => formatDnaLength(length),
    },
    {
      displayTitle: intl.get('screen.patientcnv.results.table.copy_number'),
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.copy_number.tooltip')}>
          {intl.get('screen.patientcnv.results.table.copy_number')}
        </Tooltip>
      ),
      key: 'cn',
      dataIndex: 'cn',
      sorter: { multiple: 1 },
      render: (cn: number) => cn,
    },
    {
      displayTitle: intl.get('screen.patientcnv.results.table.number_genes'),
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.number_genes.tooltip')}>
          {intl.get('screen.patientcnv.results.table.number_genes')}
        </Tooltip>
      ),
      key: 'number_genes',
      dataIndex: 'number_genes',
      render: (number_genes: number, variant: VariantEntity) =>
        number_genes > 0 ? (
          <a
            onClick={(e) => {
              e.preventDefault();
              openGenesModal(variant);
            }}
          >
            {variant.genes.hits.edges
              .slice(0, 3)
              .map((gene) => gene.node.symbol)
              .join(', ')}
            {variant.genes.hits.edges.length > 3 ? '...' : ''}
          </a>
        ) : (
          { TABLE_EMPTY_PLACE_HOLDER }
        ),
    },
    {
      displayTitle: intl.get('screen.patientcnv.results.table.genotype'),
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.genotype.tooltip')}>
          {intl.get('screen.patientcnv.results.table.genotype')}
        </Tooltip>
      ),
      key: 'calls',
      dataIndex: 'calls',
      defaultHidden: true,
      render: (calls: number[]) => formatGenotype(calls),
    },
    {
      displayTitle: intl.get('screen.patientcnv.results.table.dragen_filter'),
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.dragen_filter.tooltip')}>
          {intl.get('screen.patientcnv.results.table.dragen_filter')}
        </Tooltip>
      ),
      key: 'filter',
      dataIndex: 'filters',
      defaultHidden: true,
      render: (filters: string[]) => filters.join(', '),
    },
    {
      displayTitle: intl.get('screen.patientcnv.results.table.quality'),
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.quality.tooltip')}>
          {intl.get('screen.patientcnv.results.table.quality')}
        </Tooltip>
      ),
      key: 'qual',
      dataIndex: 'qual',
      sorter: { multiple: 1 },
      defaultHidden: true,
      render: (qual: number) => qual,
    },
    {
      displayTitle: intl.get('screen.patientcnv.results.table.segment_mean'),
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.segment_mean.tooltip')}>
          {intl.get('screen.patientcnv.results.table.segment_mean')}
        </Tooltip>
      ),
      key: 'sm',
      dataIndex: 'sm',
      sorter: { multiple: 1 },
      defaultHidden: true,
      render: (sm: string) => sm,
    },
    {
      displayTitle: intl.get('screen.patientcnv.results.table.bins_count'),
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.bins_count.tooltip')}>
          {intl.get('screen.patientcnv.results.table.bins_count')}
        </Tooltip>
      ),
      key: 'bc',
      dataIndex: 'bc',
      defaultHidden: true,
      render: (bc: string) => bc,
    },
    {
      displayTitle: intl.get('screen.patientcnv.results.table.paired_end'),
      title: (
        <Tooltip title={intl.get('screen.patientcnv.results.table.paired_end.tooltip')}>
          {intl.get('screen.patientcnv.results.table.paired_end')}
        </Tooltip>
      ),
      key: 'pe',
      dataIndex: 'pe',
      defaultHidden: true,
      render: (pe: string[]) => pe.join(', '),
    },
  ];
  return columns;
};
