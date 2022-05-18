import { ARRANGER_API, ARRANGER_API_PROJECT_URL } from 'providers/ApolloProvider';
import { sendRequestWithRpt } from 'api';
import { ISuggestionPayload, Suggestion, SuggestionType } from './models';

const graphqlRequest = <T = any>(data: { query: any; variables: any }) =>
  sendRequestWithRpt<T>({
    method: 'POST',
    url: ARRANGER_API_PROJECT_URL,
    data,
  });

const searchSuggestions = (type: SuggestionType, value: string) =>
  sendRequestWithRpt<ISuggestionPayload<Suggestion>>({
    method: 'GET',
    url: `${ARRANGER_API}/${type}Feature/suggestions/${value}`,
  });

export const ArrangerApi = {
  graphqlRequest,
  searchSuggestions,
};
