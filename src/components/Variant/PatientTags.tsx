import React from 'react';
import { Tag } from 'antd';
import { PatientServiceRequestFragment, ServiceRequestEntity } from 'api/fhir/models';

import { useGlobals } from 'store/global';
import SpecimenIcon from 'components/icons/SpecimenIcon';

// specimen with parent is the sample
const extractSampleValue = (resource?: PatientServiceRequestFragment): string | undefined =>
  resource?.requests?.[0].specimen?.find((specimen) => 'parent' in specimen.resource)?.resource
    .accessionIdentifier.value;

export const getSpecimen = (
  patientId: string,
  prescription?: ServiceRequestEntity,
  basedOnPrescription?: ServiceRequestEntity,
) => {
  const isParent = basedOnPrescription
    ? basedOnPrescription.extensions?.some((p) =>
        p.extension?.[1]?.valueReference?.reference.includes(patientId),
      )
    : false;

  if (basedOnPrescription) {
    if (isParent) {
      const parentInfo = basedOnPrescription.extensions?.find((p) =>
        p.extension?.[1]?.valueReference?.reference.includes(patientId),
      );
      return extractSampleValue(parentInfo?.extension?.[1]?.valueReference?.resource);
    } else {
      return extractSampleValue(basedOnPrescription?.subject?.resource);
    }
  } else {
    return extractSampleValue(prescription?.subject?.resource);
  }
};

export default (
  patientId: string,
  prescription?: ServiceRequestEntity,
  basedOnPrescription?: ServiceRequestEntity,
): React.ReactNode[] => {
  const tags: React.ReactNode[] = [];
  const { getAnalysisNameByCode } = useGlobals();

  const specimen = getSpecimen(patientId, prescription, basedOnPrescription);

  if (specimen) {
    tags.push(
      <Tag icon={<SpecimenIcon height="12" width="12" />} key="patient-prescription-id">
        {specimen}
      </Tag>,
    );
  }

  if (prescription) {
    tags.push(
      <div key="analsysis-name">
        {<Tag color="geekblue">{getAnalysisNameByCode(prescription.code)}</Tag>}
      </div>,
    );
  }

  return tags;
};
