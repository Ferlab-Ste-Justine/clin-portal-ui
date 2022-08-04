import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { extractOrganizationId } from 'api/fhir/helper';
import { ITableAnalysisResult } from 'graphql/prescriptions/models/Prescription';
import StatusTag from 'views/Prescriptions/components/StatusTag';
import { getPrescriptionStatusDictionnary } from 'views/Prescriptions/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatDate } from 'utils/date';

export const prescriptionsColumns = (): ProColumnType<ITableAnalysisResult>[] =>
  [
    {
      name: ['prescription_id'],
      render: (prescription_id: string) => (
        <Link to={`/prescription/entity/${prescription_id}`}>{prescription_id}</Link>
      ),
      title: intl.get('screen.patientsearch.table.prescription'),
    },
    {
      name: ['patient_id'],
      render: (patient_id: string) => patient_id,
      summary: false,
      title: intl.get('screen.patientsearch.table.patient'),
    },
    {
      name: 'status',
      render: (value: string) =>
        value ? <StatusTag dictionary={getPrescriptionStatusDictionnary()} status={value} /> : null,
      summary: false,
      title: intl.get('screen.patientsearch.table.status'),
      sorter: { multiple: 1 },
    },
    {
      name: 'created_on',
      render: (date: string) => formatDate(date),
      summary: false,
      title: intl.get('screen.patientsearch.table.createdOn'),
      tooltip: intl.get('screen.patientsearch.table.createdOn.tooltip'),
      sorter: { multiple: 1 },
    },
    {
      name: 'timestamp',
      render: (date: string) => formatDate(date),
      summary: false,
      title: intl.get('screen.patientsearch.table.updatedOn'),
      tooltip: intl.get('screen.patientsearch.table.updatedOn.tooltip'),
      sorter: { multiple: 1 },
      defaultHidden: true,
    },
    {
      name: ['analysis_code'],
      summary: true,
      title: intl.get('screen.patientsearch.table.test'),
      tooltip: intl.get('screen.patientsearch.table.test.tooltip'),
      sorter: { multiple: 1 },
    },
    {
      name: ['ldm'],
      summary: false,
      render: (labo: string) => extractOrganizationId(labo),
      title: intl.get('screen.patientsearch.table.ldm'),
      tooltip: intl.get('screen.patientsearch.table.ldm.tooltip'),
      sorter: { multiple: 1 },
    },
    {
      name: ['ep'],
      summary: true,
      title: intl.get('screen.patientsearch.table.ep'),
      tooltip: intl.get('screen.patientsearch.table.ep.tooltip'),
      sorter: { multiple: 1 },
    },
    {
      name: ['requester'],
      summary: true,
      title: intl.get('screen.patientsearch.table.requester'),
      tooltip: intl.get('screen.patientsearch.table.requester.tooltip'),
      render: (requester: string) => requester ?? TABLE_EMPTY_PLACE_HOLDER,
      sorter: { multiple: 1 },
      defaultHidden: true,
    },
    {
      name: ['prenatal'],
      summary: true,
      title: intl.get('screen.patientsearch.table.prenatal'),
      tooltip: intl.get('screen.patientsearch.table.prenatal.tooltip'),
      sorter: { multiple: 1 },
      render: (prenatal: boolean) => intl.get(prenatal ? 'yes' : 'no'),
      defaultHidden: true,
    },
    {
      name: 'patient_mrn',
      summary: true,
      title: intl.get('screen.patientsearch.table.mrn'),
      tooltip: intl.get('screen.patientsearch.table.mrn.tooltip'),
      defaultHidden: true,
    },
  ].map((c) => ({
    ...c,
    dataIndex: c.name,
    key: Array.isArray(c.name) ? c.name.join('.') : c.name,
  }));
