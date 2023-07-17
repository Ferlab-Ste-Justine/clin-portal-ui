import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Space } from 'antd';
import { extractTaskId } from 'api/fhir/helper';
import { isEmpty } from 'lodash';
import { DocsWithTaskInfo } from 'views/Archives';
import DownloadFileButton from 'views/Archives/components/DownloadFileButton';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

export const getFileTableColumns = (): ProColumnType<DocsWithTaskInfo>[] => [
  {
    key: 'title',
    dataIndex: 'title',
    title: intl.get('screen.prescription.entity.file.table.column.filename'),
  },
  {
    key: 'format',
    dataIndex: 'format',
    title: intl.get('screen.prescription.entity.file.table.column.format'),
    sorter: {
      compare: (a, b) => (a.format || '').localeCompare(b.format || ''),
      multiple: 1,
    },
  },
  {
    key: 'patientId',
    dataIndex: 'patientId',
    title: intl.get('screen.prescription.entity.file.table.column.patient'),
    sorter: {
      compare: (a, b) => (a.patientId || '').localeCompare(b.patientId || ''),
      multiple: 1,
    },
    defaultSortOrder: 'ascend',
  },
  {
    key: 'request',
    title: intl.get('screen.prescription.entity.file.table.column.request'),
    render: (record: DocsWithTaskInfo) => (
      <Link to={`/prescription/entity/${extractTaskId(record.basedOnSrRef)}`}>{record.srRef}</Link>
    ),
    sorter: {
      compare: (a, b) => parseInt(a.srRef) - parseInt(b.srRef),
      multiple: 1,
    },
  },
  {
    key: 'sampleldm',
    dataIndex: ['sample', 'value'],
    title: intl.get('screen.prescription.entity.file.table.column.sampleldm'),
    sorter: {
      compare: (a, b) => a.sample.value.localeCompare(b.sample.value),
      multiple: 1,
    },
  },
  {
    key: 'analysis',
    title: intl.get('screen.prescription.entity.file.table.column.analysis'),
    render: (doc: DocsWithTaskInfo) => (
      <Link to={`/bioinformatics-analysis/${extractTaskId(doc.taskId)}`}>
        {extractTaskId(doc.taskId)}
      </Link>
    ),
    sorter: {
      compare: (a, b) =>
        (extractTaskId(a.taskId) || '').localeCompare(extractTaskId(b.taskId) || ''),
      multiple: 1,
    },
  },
  {
    key: 'date',
    dataIndex: 'taskAuthoredOn',
    title: intl.get('screen.prescription.entity.file.table.column.date'),
    sorter: {
      compare: (a, b) =>
        new Date(a.taskAuthoredOn).getTime() - new Date(b.taskAuthoredOn).getTime(),
      multiple: 1,
    },
  },
  {
    key: 'downloadActions',
    icon: <DownloadOutlined />,
    title: intl.get('screen.prescription.entity.file.table.column.actions'),
    render: (doc: DocsWithTaskInfo) => (
      <Space size={12}>
        <DownloadFileButton fileUrl={doc.action.urls.file} displayName={intl.get('links.file')} />
        {!isEmpty(doc.action.urls.index) && (
          <DownloadFileButton fileUrl={doc.action.urls.index} displayName="Index" />
        )}
      </Space>
    ),
  },
  {
    key: 'size',
    dataIndex: 'size',
    title: intl.get('screen.prescription.entity.file.table.column.size'),
    defaultHidden: true,
    sorter: {
      compare: (a, b) => a.originalSize - b.originalSize,
      multiple: 1,
    },
  },
  {
    key: 'hash',
    dataIndex: 'hash',
    title: intl.get('screen.prescription.entity.file.table.column.hash'),
    render: (hash: string) => hash ?? TABLE_EMPTY_PLACE_HOLDER,
    defaultHidden: true,
  },
  {
    key: 'run',
    dataIndex: 'taskRunAlias',
    title: intl.get('screen.prescription.entity.file.table.column.run'),
    defaultHidden: true,
    sorter: {
      compare: (a, b) => (a.taskRunAlias || '').localeCompare(b.taskRunAlias || ''),
      multiple: 1,
    },
  },
  {
    key: 'type',
    dataIndex: 'type',
    title: intl.get('screen.prescription.entity.file.table.column.type'),
    defaultHidden: true,
    sorter: {
      compare: (a, b) => (a.type || '').localeCompare(b.type || ''),
      multiple: 1,
    },
  },
];
