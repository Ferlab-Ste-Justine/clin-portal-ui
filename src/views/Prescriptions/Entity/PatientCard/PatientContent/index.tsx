import intl from 'react-intl-universal';
import { Descriptions } from 'antd';
import { extractOrganizationId, extractPatientId } from 'api/fhir/helper';
import { PatientServiceRequestFragment } from 'api/fhir/models';
import { formatName, formatRamq } from 'api/fhir/patientHelper';
import { EMPTY_FIELD } from 'views/Prescriptions/Entity/constants';

import { formatDate } from 'utils/date';

interface OwnProps {
  patient: PatientServiceRequestFragment;
  reference?: string;
  labelClass?: 'label-20' | 'label-25' | 'label-35';
}

const PatientContent = ({ patient, reference, labelClass = 'label-35' }: OwnProps) => {
  let folder = <>{patient.mrn ?? EMPTY_FIELD}</>;
  if (reference) {
    folder = (
      <>
        {folder} &mdash; {extractOrganizationId(reference)}
      </>
    );
  }

  return patient ? (
    <Descriptions column={1} size="small" className={labelClass}>
      <Descriptions.Item label={intl.get('screen.prescription.entity.identifier')}>
        {extractPatientId(patient.id)}
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('screen.prescription.entity.patientContent.folder')}>
        {folder}
      </Descriptions.Item>
      <Descriptions.Item label="RAMQ">
        {patient.person[0].ramq ? formatRamq(patient.person[0].ramq) : EMPTY_FIELD}
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('name')}>
        {formatName(patient.person[0].name[0])}
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('birthdate')}>
        {formatDate(patient.person[0].birthdate)}
      </Descriptions.Item>
      <Descriptions.Item label={intl.get('sex.title')}>
        {intl.get(`sex.${patient.gender?.toLowerCase()}` ?? 'key')}
      </Descriptions.Item>
    </Descriptions>
  ) : null;
};

export default PatientContent;
