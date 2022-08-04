import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { ITableGeneEntity } from 'graphql/cnv/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatDnaLength, formatNumber, formatRatio } from 'utils/formatNumber';

export const getGeneColumns = (): ProColumnType<ITableGeneEntity>[] => {
  const columns: ProColumnType<ITableGeneEntity>[] = [
    {
      title: intl.get('screen.patientcnv.modal.genes.table.gene'),
      key: 'symbol',
      dataIndex: 'symbol',
      sorter: { multiple: 1 },
      render: (symbol: string) => (
        <ExternalLink href={`https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${symbol}`}>
          {symbol}
        </ExternalLink>
      ),
    },
    {
      title: intl.get('screen.patientcnv.modal.genes.table.panel'),
      tooltip: intl.get('screen.patientcnv.modal.genes.table.panel.tooltip'),
      key: 'panels',
      dataIndex: 'panels',
      render: (panels: string[] | null) => (panels ? panels.join(', ') : TABLE_EMPTY_PLACE_HOLDER),
    },
    {
      title: intl.get('screen.patientcnv.modal.genes.table.length'),
      tooltip: intl.get('screen.patientcnv.modal.genes.table.length.tooltip'),
      key: 'gene_length',
      dataIndex: 'gene_length',
      sorter: { multiple: 1 },
      render: (gene_length: string) => formatDnaLength(gene_length),
    },
    {
      title: intl.get('screen.patientcnv.modal.genes.table.number_bases'),
      tooltip: intl.get('screen.patientcnv.modal.genes.table.number_bases.tooltip'),
      key: 'overlap_bases',
      dataIndex: 'overlap_bases',
      sorter: { multiple: 1 },
      render: (overlap_bases: string) => formatDnaLength(overlap_bases),
    },
    {
      title: intl.get('screen.patientcnv.modal.genes.table.number_exons'),
      tooltip: intl.get('screen.patientcnv.modal.genes.table.number_exons.tooltip'),
      key: 'overlap_exons',
      dataIndex: 'overlap_exons',
      sorter: { multiple: 1 },
      render: (overlap_exons: string) => formatNumber(overlap_exons),
    },
    {
      title: intl.get('screen.patientcnv.modal.genes.table.percent_gene'),
      tooltip: intl.get('screen.patientcnv.modal.genes.table.percent_gene.tooltip'),
      key: 'overlap_gene_ratio',
      dataIndex: 'overlap_gene_ratio',
      sorter: { multiple: 1 },
      render: (overlap_gene_ratio: string) => formatRatio(overlap_gene_ratio),
    },
    {
      title: intl.get('screen.patientcnv.modal.genes.table.percent_cnv'),
      tooltip: intl.get('screen.patientcnv.modal.genes.table.percent_cnv.tooltip'),
      key: 'overlap_cnv_ratio',
      dataIndex: 'overlap_cnv_ratio',
      sorter: { multiple: 1 },
      render: (overlap_cnv_ratio: string) => formatRatio(overlap_cnv_ratio),
    },
  ];
  return columns;
};
