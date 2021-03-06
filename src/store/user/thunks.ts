import { createAsyncThunk } from '@reduxjs/toolkit';
import { FhirApi } from 'api/fhir';
import { PractitionerRole } from 'api/fhir/models';
import { UsersApi } from 'api/user';
import { TUserConfig } from 'api/user/models';
import keycloak from 'auth/keycloak';
import { DecodedIdToken } from 'auth/types';
import { cloneDeep, merge } from 'lodash';

const fetchPractitionerRole = createAsyncThunk<PractitionerRole[]>(
  'user/searchPractitionerRole',
  async () => {
    const { data } = await FhirApi.searchPractitionerRole();

    return data ? (data.entry ?? []).map((entry) => entry.resource!) : [];
  },
);

const fetchConfig = createAsyncThunk<TUserConfig>('user/fetchConfig', async () => {
  const fetch = await UsersApi.fetch();
  if (fetch.response.status === 404) {
    const decodedIdToken = keycloak.idTokenParsed as DecodedIdToken;
    const create = await UsersApi.create({
      keycloak_id: decodedIdToken.sub,
      email: decodedIdToken.email,
      first_name: decodedIdToken.given_name,
      last_name: decodedIdToken.family_name,
      completed_registration: true,
      config: {},
    });
    return create.data?.config || {};
  } else {
    return fetch.data?.config || {};
  }
});

const updateConfig = createAsyncThunk<TUserConfig, TUserConfig>(
  'user/updateConfig',
  async (config, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const mergedConfig = merge(cloneDeep(state.user.user.config), cloneDeep(config));
    await UsersApi.update({ config: mergedConfig });

    return mergedConfig;
  },
  {
    condition: (config) => Object.keys(config).length > 0,
  },
);

export { fetchPractitionerRole, fetchConfig, updateConfig };
