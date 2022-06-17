import { ApolloError } from '@apollo/client';
import { AnalysisTaskEntity, ServiceRequestEntity } from 'api/fhir/models';
import { ExtendedMappingResults, GqlResults, hydrateResults } from 'graphql/models';
import { AnalysisResult } from 'graphql/prescriptions/models/Prescription';
import { INDEX_EXTENDED_MAPPING, QueryVariable } from 'graphql/queries';
import { useLazyResultQuery, useLazyResultQueryOnLoadOnly } from 'graphql/utils/query';

import { ANALYSIS_ENTITY_QUERY, ANALYSIS_TASK_QUERY, PRESCRIPTIONS_QUERY } from './queries';

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
