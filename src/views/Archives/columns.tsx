import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Space } from 'antd';
import { extractTaskId } from 'api/fhir/helper';
import { isEmpty } from 'lodash';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import DownloadFileButton from './components/DownloadFileButton';
import { DocsWithTaskInfo } from '.';

export const getAchivesTableColumns = (): ProColumnType<DocsWithTaskInfo>[] => [
  {
    key: 'url',
    dataIndex: 'url',
    title: intl.get('screen.archives.table.column.url'),
    defaultHidden: true,
  },
  {
    key: 'title',
    dataIndex: 'title',
    title: intl.get('screen.archives.table.column.filename'),
  },
  {
    key: 'type',
    dataIndex: 'type',
    title: intl.get('screen.archives.table.column.type'),
  },
  {
    key: 'format',
    dataIndex: 'format',
    title: intl.get('screen.archives.table.column.format'),
  },
  {
    key: 'patientId',
    dataIndex: 'patientId',
    title: intl.get('screen.archives.table.column.patient'),
  },
  {
    key: 'request',
    title: intl.get('screen.archives.table.column.request'),
    render: (record: DocsWithTaskInfo) => (
      <Link to={`/prescription/entity/${extractTaskId(record.srRef)}`}>{record.srRef}</Link>
    ),
  },
  {
    key: 'sampleldm',
    dataIndex: ['sample', 'value'],
    title: intl.get('screen.archives.table.column.sampleldm'),
  },
  {
    key: 'analysis',
    title: intl.get('screen.archives.table.column.analysis'),
    render: (doc: DocsWithTaskInfo) => (
      <Link to={`/bioinformatics-analysis/${extractTaskId(doc.taskId)}`}>
        {extractTaskId(doc.taskId)}
      </Link>
    ),
  },
  {
    key: 'date',
    dataIndex: 'taskAuthoredOn',
    title: intl.get('screen.archives.table.column.date'),
  },
  {
    key: 'size',
    dataIndex: 'size',
    title: intl.get('screen.archives.table.column.size'),
    defaultHidden: true,
  },
  {
    key: 'hash',
    dataIndex: 'hash',
    title: intl.get('screen.archives.table.column.hash'),
    render: (hash: string) => hash ?? TABLE_EMPTY_PLACE_HOLDER,
    defaultHidden: true,
  },
  {
    key: 'run',
    dataIndex: 'taskRunAlias',
    title: intl.get('screen.archives.table.column.run'),
    defaultHidden: true,
  },
  {
    key: 'downloadActions',
    icon: <DownloadOutlined />,
    title: intl.get('screen.archives.table.column.download'),
    render: (doc: DocsWithTaskInfo) => (
      <Space size={12}>
        <DownloadFileButton fileUrl={doc.action.urls.file} displayName="Fichier" />
        {!isEmpty(doc.action.urls.index) && (
          <DownloadFileButton fileUrl={doc.action.urls.index} displayName="Index" />
        )}
      </Space>
    ),
  },
];
