import intl from 'react-intl-universal';
import { setQueryBuilderState } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SavedFilterApi } from 'api/savedFilter';
import {
  TUserSavedFilter,
  TUserSavedFilterInsert,
  TUserSavedFilterUpdate,
} from 'api/savedFilter/models';
import { isEmpty } from 'lodash';
import { v4 } from 'uuid';

import { globalActions } from 'store/global';
import { FILTER_TAG_QB_ID_MAPPING } from 'utils/queryBuilder';

const fetchSavedFilters = createAsyncThunk<
  TUserSavedFilter[],
  void | string,
  { rejectValue: string }
>('savedfilters/fetch', async (tag, thunkAPI) => {
  const { data, error } = await SavedFilterApi.fetchAll(tag as string);

  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }

  return data!;
});

const fetchSharedSavedFilter = createAsyncThunk<
  TUserSavedFilter | undefined,
  string,
  { rejectValue: string }
>('shared/savedFilters/fetch', async (id, thunkAPI) => {
  const { data, error } = await SavedFilterApi.fetchById(id);

  if (data) {
    setQueryBuilderState(FILTER_TAG_QB_ID_MAPPING[data.tag], {
      active: isEmpty(data.queries) ? v4() : data.queries[0].id,
      state: data.queries ?? [],
    });
  }

  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }

  return data!;
});

const createSavedFilter = createAsyncThunk<
  TUserSavedFilter,
  TUserSavedFilterInsert,
  { rejectValue: string }
>('savedfilters/create', async (filter, thunkAPI) => {
  const { data, error } = await SavedFilterApi.create(filter);

  if (error) {
    if (error.response?.status === 422) {
      thunkAPI.dispatch(
        globalActions.displayMessage({
          type: 'error',
          content: intl.get('api.savedFilter.error.nameAlreadyExists'),
        }),
      );
    } else {
      thunkAPI.dispatch(
        globalActions.displayMessage({
          type: 'error',
          content: intl.get('api.savedFilter.error.messageUpdate'),
        }),
      );
    }
    return thunkAPI.rejectWithValue(error.message);
  }

  thunkAPI.dispatch(
    globalActions.displayMessage({
      type: 'success',
      content: intl.get('api.savedFilter.success.messageSaved'),
    }),
  );

  return data!;
});

const updateSavedFilter = createAsyncThunk<
  TUserSavedFilter,
  TUserSavedFilterUpdate & { id: string },
  { rejectValue: string }
>('savedfilters/update', async (filter, thunkAPI) => {
  const { id, ...filterInfo } = filter;
  const { data, error } = await SavedFilterApi.update(id, filterInfo);

  if (error) {
    if (error.response?.status === 422) {
      thunkAPI.dispatch(
        globalActions.displayMessage({
          type: 'error',
          content: intl.get('api.savedFilter.error.nameAlreadyExists'),
        }),
      );
    } else {
      thunkAPI.dispatch(
        globalActions.displayMessage({
          type: 'error',
          content: intl.get('api.savedFilter.error.messageUpdate'),
        }),
      );
    }
    return thunkAPI.rejectWithValue(error.message);
  }

  thunkAPI.dispatch(
    globalActions.displayMessage({
      type: 'success',
      content: intl.get('api.savedFilter.success.messageSaved'),
    }),
  );

  return data!;
});

const deleteSavedFilter = createAsyncThunk<string, string, { rejectValue: string }>(
  'savedfilters/delete',
  async (id, thunkAPI) => {
    const { data, error } = await SavedFilterApi.destroy(id);

    if (error) {
      thunkAPI.dispatch(
        globalActions.displayNotification({
          type: 'error',
          message: intl.get('api.savedFilter.error.title'),
          description: intl.get('api.savedFilter.error.messageDelete'),
        }),
      );
      return thunkAPI.rejectWithValue(error.message);
    }

    thunkAPI.dispatch(
      globalActions.displayMessage({
        type: 'success',
        content: intl.get('api.savedFilter.success.messageDeleted'),
      }),
    );

    return data!;
  },
);

export {
  fetchSavedFilters,
  createSavedFilter,
  updateSavedFilter,
  deleteSavedFilter,
  fetchSharedSavedFilter,
};
