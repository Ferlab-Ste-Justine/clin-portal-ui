import { ApolloError } from '@apollo/client';
import { AnalysisTaskEntity, ServiceRequestEntity } from 'api/fhir/models';
import { ExtendedMappingResults, GqlResults, hydrateResults } from 'graphql/models';
import { AnalysisResult } from 'graphql/prescriptions/models/Prescription';
import { INDEX_EXTENDED_MAPPING, QueryVariable } from 'graphql/queries';
import { useLazyResultQuery, useLazyResultQueryOnLoadOnly } from 'graphql/utils/query';

import {
  ANALYSE_CODESYSTEME,
  ANALYSE_COMPLEX_PARACLINIQUE_OBSERVATION,
  ANALYSE_CON_OBSERVATION,
  ANALYSE_ETH_OBSERVATION,
  ANALYSE_FMH,
  ANALYSE_GENERALOBS_INDICATION_OBSERVATION,
  ANALYSE_PARACLINIQUE_OBSERVATION,
  ANALYSE_PHENOTYPE_OBSERVATION,
  ANALYSIS_ENTITY_QUERY,
  ANALYSIS_TASK_QUERY,
  PRESCRIPTIONS_QUERY,
} from './queries';

export const usePrescription = (variables: QueryVariable): GqlResults<AnalysisResult> => {
  const { loading, result } = useLazyResultQuery<any>(PRESCRIPTIONS_QUERY, {
    variables: variables,
  });
  const prescriptions = result?.Analyses;
  return {
    aggregations: prescriptions?.aggregations || {},
    data: hydrateResults(prescriptions?.hits?.edges || []),
    loading,
    total: prescriptions?.hits.total,
  };
};

export const useCodeSystem = (id: string) => {
  const { data } = useLazyResultQueryOnLoadOnly<any>(ANALYSE_CODESYSTEME(id), {
    variables: {
      id: id,
    },
  });
  return {
    codeInfo: data?.CodeSystem,
  };
};

export const useObservationEthnicityEntity = (id: string) => {
  const { data } = useLazyResultQueryOnLoadOnly<any>(ANALYSE_ETH_OBSERVATION(id), {
    variables: {
      id: id,
    },
  });
  return {
    ethValue: data?.Observation,
  };
};

export const useObservationConsanguinityEntity = (id: string) => {
  const { data } = useLazyResultQueryOnLoadOnly<any>(ANALYSE_CON_OBSERVATION(id), {
    variables: {
      id: id,
    },
  });
  return {
    conValue: data?.Observation,
  };
};

export const useObservationPhenotypeEntity = (ids: string[]) => {
  const { data } = useLazyResultQueryOnLoadOnly<any>(ANALYSE_PHENOTYPE_OBSERVATION(ids), {
    variables: {
      ids: ids,
    },
  });
  return {
    phenotypeValue: data?.Observation,
  };
};

export const useFamilyHistoryEntity = (ids: string[]) => {
  const { data } = useLazyResultQueryOnLoadOnly<any>(ANALYSE_FMH(ids), {
    variables: {
      ids: ids,
    },
  });
  return {
    familyHistory: data?.FamilyMemberHistory,
  };
};

export const useGeneralObservationEntity = (id: string) => {
  const { data } = useLazyResultQueryOnLoadOnly<any>(
    ANALYSE_GENERALOBS_INDICATION_OBSERVATION(id),
    {
      variables: {
        id: id,
      },
    },
  );
  return {
    generalObervationValue: data?.Observation,
  };
};

export const useObservationParacliniqueEntity = (ids: string[] | null) => {
  const { data } = useLazyResultQueryOnLoadOnly<any>(ANALYSE_PARACLINIQUE_OBSERVATION(ids), {
    variables: {
      ids: ids,
    },
  });
  return {
    paracliniqueValue: data?.Observation,
  };
};

export const useObservationComplexParacliniqueEntity = (ids: string[] | null) => {
  const { data } = useLazyResultQueryOnLoadOnly<any>(
    ANALYSE_COMPLEX_PARACLINIQUE_OBSERVATION(ids),
    {
      variables: {
        ids: ids,
      },
    },
  );
  return {
    complexParacliniqueValue: data?.Observation,
  };
};

export const useServiceRequestEntity = (
  id: string,
): {
  prescription: ServiceRequestEntity | undefined;
  loading: boolean;
  error: ApolloError | undefined;
} => {
  const { loading, data, error } = useLazyResultQueryOnLoadOnly<any>(ANALYSIS_ENTITY_QUERY(id), {
    skip: !id,
    variables: {
      requestId: id,
    },
  });

  return {
    prescription: data?.ServiceRequest,
    loading,
    error,
  };
};

export const useTaskEntity = (
  id: string,
): {
  task: AnalysisTaskEntity | undefined;
  loading: boolean;
  error: ApolloError | undefined;
} => {
  const { loading, data, error } = useLazyResultQueryOnLoadOnly<any>(ANALYSIS_TASK_QUERY(id), {
    skip: !id,
    variables: {
      taskId: id,
    },
  });

  return {
    task: data?.Task,
    loading,
    error,
  };
};

export const usePrescriptionMapping = (): ExtendedMappingResults => {
  const { loading, result } = useLazyResultQuery<any>(INDEX_EXTENDED_MAPPING('Analyses'), {
    fetchPolicy: 'no-cache',
    variables: [],
  });

  return {
    data: result?.Analyses.extended || [],
    loading: loading,
  };
};
