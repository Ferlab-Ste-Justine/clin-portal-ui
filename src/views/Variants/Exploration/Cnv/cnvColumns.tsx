import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Tooltip } from 'antd';
import { ITableCnvEntity } from 'graphql/cnv/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

export const getCnvColumns = (): ProColumnType<ITableCnvEntity>[] => {
  const columns: ProColumnType<ITableCnvEntity>[] = [
    {
      title: 'CNV',
      key: 'id',
      dataIndex: 'id',
      render: (id) => id,
    },
    {
      key: 'chr',
      title: 'chr.',
      dataIndex: 'chromosome',
      render: (chromosome) => chromosome,
    },
    {
      key: 'start',
      title: 'Début',
      dataIndex: 'start',
      render: (start) => start,
    },
    {
      key: 'end',
      title: 'fin',
      dataIndex: 'end',
      render: (end) => (end ? end : TABLE_EMPTY_PLACE_HOLDER),
    },
    {
      key: 'type',
      title: 'Type',
      dataIndex: 'type',
      render: (type) => type,
    },
    {
      key: 'length',
      displayTitle: 'Longeur',
      dataIndex: 'length',
      title: <Tooltip title="Longueur en bases du CNV">Longeur</Tooltip>,
      render: (length) => length,
    },
    {
      key: 'cn',
      displayTitle: 'CN',
      title: <Tooltip title="Nombre de copies (estimation)">CN</Tooltip>,
      dataIndex: 'cn',
      render: (cn) => cn,
    },
    {
      key: 'gene',
      displayTitle: '#Gene',
      title: <Tooltip title="Nombre de gènes chevauchant le CNV">#Gene</Tooltip>,
      dataIndex: 'number_gene',
      render: (number_gene) => number_gene,
    },
    {
      key: 'igv',
      title: 'Igv',
      dataIndex: 'igv',
      render: (igv) => igv,
    },
    {
      key: 'gt',
      displayTitle: 'Gt',
      title: <Tooltip title="Génotype">Gt</Tooltip>,
      dataIndex: 'gt',
      render: (gt) => gt,
      defaultHidden: true,
    },
    {
      key: 'filter',
      displayTitle: 'Filtre',
      title: <Tooltip title="Filtre DRAGEN">Filtre</Tooltip>,
      dataIndex: 'filter',
      render: (filters) => (filters ? filters[0] : TABLE_EMPTY_PLACE_HOLDER),
      defaultHidden: true,
    },
    {
      key: 'qual',
      displayTitle: 'Qual',
      title: <Tooltip title="Qualité du CNV">Qual</Tooltip>,
      dataIndex: 'qual',
      render: (qual) => qual,
      defaultHidden: true,
    },
    {
      key: 'sm',
      displayTitle: 'SM',
      title: <Tooltip title="Taux de copie linéaire de la moyenne du segment">SM</Tooltip>,
      dataIndex: 'sm',
      render: (sm) => sm,
      defaultHidden: true,
    },
    {
      key: 'bc',
      displayTitle: 'BC',
      title: <Tooltip title="Nombre de bins dans la région">BC</Tooltip>,
      dataIndex: 'bc',
      render: (bc) => bc,
      defaultHidden: true,
    },
    {
      key: 'pe',
      displayTitle: 'PE',
      title: (
        <Tooltip title="Nombre de fragments incorrectement appariés au début et à la fin des points de cassure">
          PE
        </Tooltip>
      ),
      dataIndex: 'pe',
      render: (pe) => pe,
      defaultHidden: true,
    },
  ];

  return columns;
};
