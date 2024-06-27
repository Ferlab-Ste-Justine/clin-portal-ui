import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import Empty from '@ferlab/ui/core/components/Empty';
import { Table, TableColumnType, Tag, Tooltip } from 'antd';
import { FhirApi } from 'api/fhir';
import { extractServiceRequestId, extractTaskId } from 'api/fhir/helper';
import { PatientTaskResults } from 'graphql/patients/models/Patient';

import { Roles, validate } from 'components/Roles/Rules';
import { useRpt } from 'hooks/useRpt';
import { formatDate } from 'utils/date';

import Links from '../components/Links';
import { TaskColorMap } from '../utils/constant';

interface OwnProps {
  requestId?: string;
}

const getTaskColumns = (authorizedUser: boolean): TableColumnType<any>[] => {
  const columns: TableColumnType<any>[] = [
    {
      key: 'id',
      dataIndex: 'id',
      title: intl.get('screen.prescription.entity.tasks.analysis'),
      render: (id) => (
        <Link to={`/bioinformatics-analysis/${extractTaskId(id)}`}>{extractTaskId(id)}</Link>
      ),
    },
    {
      key: 'type',
      dataIndex: 'type',
      title: intl.get('screen.prescription.entity.tasks.type'),
      render: (value: string) => (
        <Tooltip
          key={value}
          placement="topLeft"
          title={intl.get(`filters.options.tasks.${value}.tooltip`)}
        >
          <Tag color={TaskColorMap[value]}>{intl.get(`filters.options.tasks.${value}`)}</Tag>
        </Tooltip>
      ),
    },
    {
      key: 'request',
      dataIndex: 'request',
      title: intl.get('screen.prescription.entity.tasks.request'),
      render: (request) => extractServiceRequestId(request.id),
    },
    {
      key: 'authoredOn',
      dataIndex: 'authoredOn',
      title: intl.get('screen.prescription.entity.tasks.date'),
      render: (authoredOn) => formatDate(authoredOn),
    },
  ];

  authorizedUser &&
    columns.push({
      key: 'request',
      dataIndex: 'request',
      title: intl.get('screen.prescription.entity.tasks.links'),
      render: (request) => <Links prescriptionId={request.id} />,
    });
  return columns;
};

const TaskTable = ({ requestId }: OwnProps) => {
  const { decodedRpt } = useRpt();
  const authorizedUser = validate([Roles.Download], decodedRpt, false);
  const [task, setTask] = useState<PatientTaskResults>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (requestId) {
      setLoading(true);
      FhirApi.searchRequestTask(requestId).then(({ data }) => {
        if (data?.data.taskList) {
          setTask(data.data.taskList);
        } else {
          setTask([]);
        }
        setLoading(false);
      });
    }
  }, [requestId]);
  if (task?.length === 0) {
    return null;
  }
  return (
    <Table
      loading={loading}
      size="small"
      columns={getTaskColumns(authorizedUser)}
      dataSource={task?.map((data, index) => ({ ...data, key: index }))}
      bordered
      locale={{
        emptyText: <Empty description="Aucune requêtes" />,
      }}
      pagination={{
        hideOnSinglePage: true,
      }}
    />
  );
};

export default TaskTable;
