import intl from 'react-intl-universal';
import { Card } from 'antd';
import { ServiceRequestEntity } from 'api/fhir/models';

import ParagraphLoader from 'components/uiKit/ParagraphLoader';

import PatientContent from './PatientContent';

interface OwnProps {
  prescription?: ServiceRequestEntity;
  loading: boolean;
}

const PatientCard = ({ prescription, loading }: OwnProps) => (
  <Card title={intl.get('screen.prescription.entity.patient.card.title')} data-cy="PatientCard">
    <ParagraphLoader loading={loading} paragraph={{ rows: 6 }}>
      <PatientContent
        patient={prescription?.subject.resource!}
        reference={prescription?.requester?.organization?.reference}
      />
    </ParagraphLoader>
  </Card>
);

export default PatientCard;
