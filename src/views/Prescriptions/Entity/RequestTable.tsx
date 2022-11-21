import Empty from '@ferlab/ui/core/components/Empty';
import { Table, TableColumnType } from 'antd';
import { extractServiceRequestId } from 'api/fhir/helper';
import { PatientRequest } from 'api/fhir/models';

import { EMPTY_FIELD } from 'components/Prescription/Analysis/AnalysisForm/ReusableSteps/constant';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatDate } from 'utils/date';

import Links from '../components/Links';
import StatusTag from '../components/StatusTag';
import { getPrescriptionStatusDictionnary } from '../utils/constant';

interface OwnProps {
  patientId: string;
  data: PatientRequest[];
  loading?: boolean;
}

const getRequestColumns = (patientId: string): TableColumnType<Record<string, any>>[] => [
  {
    key: 'id',
    dataIndex: 'id',
    title: 'ID requête',
    render: (id) => extractServiceRequestId(id),
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: 'Statut',
    render: (value: string) =>
      value ? <StatusTag dictionary={getPrescriptionStatusDictionnary()} status={value} /> : null,
  },
  {
    key: 'created',
    dataIndex: 'authoredOn',
    title: 'Créée le',
    render: (authoredOn) => formatDate(authoredOn),
  },
  {
    key: 'requester',
    dataIndex: 'requester',
    title: 'Requérant',
    render: (requester) =>
      requester
        ? `${requester.practitioner?.name.family.toLocaleUpperCase()} 
      ${requester.practitioner?.name?.given?.join(' ')}`
        : EMPTY_FIELD,
  },
  {
    key: 'specimen_id',
    title: 'ID échantillon',
    render: (data: PatientRequest) => {
      const specimen = data.specimen?.find((specimen) => !('parent' in specimen.resource));
      return specimen ? specimen?.resource.accessionIdentifier.value : TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    key: 'links',
    title: 'Liens',
    render: (data: PatientRequest) => <Links patientId={patientId} prescriptionId={data.id} />,
  },
];

const RequestTable = ({ patientId, loading = false, data = [] }: OwnProps) => (
  <Table
    loading={loading}
    size="small"
    columns={getRequestColumns(patientId)}
    dataSource={data.map((data, index) => ({ ...data, key: index }))}
    bordered
    locale={{
      emptyText: <Empty description="Aucune requêtes" />,
    }}
    pagination={{
      hideOnSinglePage: true,
    }}
  />
);

export default RequestTable;
