import { ServiceRequestEntity } from 'api/fhir/models';

import PositionTag from 'components/uiKit/PositionTag';

export const getFamilyCode = (
  prescription: ServiceRequestEntity | undefined,
  patientid: string,
) => {
  const familyReference = prescription?.extensions?.find(function (o) {
    return o.extension?.[1].valueReference?.reference.includes(patientid);
  });
  return familyReference?.extension?.[0].valueCoding?.coding?.[0].code;
};

export const getPositionTag = (
  prescription: ServiceRequestEntity | undefined,
  patientid: string,
) => <PositionTag key="type-tag" familyCode={getFamilyCode(prescription, patientid)} />;
