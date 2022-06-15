import { PatientFileResults } from 'graphql/patients/models/Patient';
import { useLazyResultQueryOnLoadOnly } from 'graphql/utils/query';

import { PATIENT_FILES_QUERY } from './queries';

export const usePatientFilesData = (
  patientId: string,
  skip?: boolean,
): {
  loading: boolean;
  results: PatientFileResults;
  error: any;
} => {
  const { loading, data, error } = useLazyResultQueryOnLoadOnly<any>(
    PATIENT_FILES_QUERY(patientId),
    {
      variables: {
        patientId: patientId,
      },
      skip: skip,
    },
  );

  return {
    loading,
    results: data?.Patient,
    error,
  };
};
