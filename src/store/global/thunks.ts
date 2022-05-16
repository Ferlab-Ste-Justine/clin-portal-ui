import { createAsyncThunk } from '@reduxjs/toolkit';
import { FhirApi } from 'api/fhir';
import { SERVICE_REQUEST_CODE_MAP_KEY } from 'utils/constants';
import { AnalysisCodeMapping } from './types';

const fetchFhirServiceRequestCodes = createAsyncThunk<any>('fhir/serviceRequestCodes', async () => {
  const { data } = await FhirApi.fetchServiceRequestCodes();
  let codeDisplayMap: AnalysisCodeMapping = {};

  (data?.concept ?? []).forEach(
    (concept) =>
      (codeDisplayMap[concept.code] = {
        displayName: concept.display,
        displayNameWithCode: `${concept.display} (${concept.code})`,
      }),
  );

  localStorage.setItem(SERVICE_REQUEST_CODE_MAP_KEY, JSON.stringify(codeDisplayMap));

  return codeDisplayMap;
});

export { fetchFhirServiceRequestCodes };
