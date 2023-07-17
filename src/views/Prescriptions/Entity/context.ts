import React, { useContext } from 'react';
import { ServiceRequestEntity } from 'api/fhir/models';

export type PrescriptionEntityContextType = {
  patientId: string | undefined;
  prescription: ServiceRequestEntity | undefined;
  prescriptionId: string | undefined;

  selectedRequest: ServiceRequestEntity | undefined;
  selectedBasedOnRequest: ServiceRequestEntity | undefined;
  loading: boolean;
  variantInfo: PrescriptionEntityVariantInfo<undefined>;
  setVariantInfo(variantInfo: PrescriptionEntityVariantInfo): void;
};

export type PrescriptionEntityVariantInfo<T = string> = {
  patientId: string | T;
  requestId: string | T;
};

const PrescriptionEntityContext = React.createContext<PrescriptionEntityContextType>({
  loading: false,

  patientId: undefined,
  prescription: undefined,
  prescriptionId: undefined,

  selectedRequest: undefined,
  selectedBasedOnRequest: undefined,

  setVariantInfo: () => {},
  variantInfo: {
    patientId: undefined,
    requestId: undefined,
  },
});

export const usePrescriptionEntityContext = () => useContext(PrescriptionEntityContext);

export default PrescriptionEntityContext;
