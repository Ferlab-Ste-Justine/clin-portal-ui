import { hydrateResults, IQueryResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { CNV_QUERY } from './queries';

export const useCnv = (variables?: QueryVariable): IQueryResults<any[]> => {
  const { loading, result } = useLazyResultQuery<any>(CNV_QUERY, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.cnv?.hits?.edges || []),
    total: result?.cnv?.hits?.total || 0,
  };
};
