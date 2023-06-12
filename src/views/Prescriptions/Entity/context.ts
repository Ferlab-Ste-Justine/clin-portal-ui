import React from 'react';
import { ServiceRequestEntity } from 'api/fhir/models';

type PrescriptionEntityContextType = {
  prescription: ServiceRequestEntity | undefined;
  loading: boolean;
};

const PrescriptionEntityContext = React.createContext<PrescriptionEntityContextType>({
  prescription: undefined,
  loading: false,
});

export default PrescriptionEntityContext;
