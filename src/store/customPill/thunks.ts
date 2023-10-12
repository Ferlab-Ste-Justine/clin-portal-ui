import intl from 'react-intl-universal';
import {
  getQueryBuilderState,
  removePillFromQueryBuilder,
  setQueryBuilderState,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import {
  ISyntheticSqon,
  IValueQuery,
  TSyntheticSqonContentValue,
} from '@ferlab/ui/core/data/sqon/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CustomPillApi } from 'api/customPill';
import {
  TUserSavedFilter,
  TUserSavedFilterInsert,
  TUserSavedFilterUpdate,
} from 'api/savedFilter/models';
import { v4 as getUUID } from 'uuid';

import { globalActions } from 'store/global';
import { fetchSavedFilters } from 'store/savedFilter/thunks';

const fetchCustomPills = createAsyncThunk<
  Record<string, TUserSavedFilter[]>,
  void | string,
  { rejectValue: string }
>('customPills/fetch', async (tag, thunkAPI) => {
  const { data, error } = await CustomPillApi.fetchAll(tag as string);

  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
  const result: Record<string, any> = {};
  result[tag as string] = data;
  return result;
});

interface ICreateError {
  error: {
    message?: string;
    translationKey?: string;
    name?: string;
  };
}

const createCustomPill = createAsyncThunk<TUserSavedFilter, TUserSavedFilterInsert>(
  'customPills/create',
  async (customPill, thunkAPI) => {
    const { data, error } = await CustomPillApi.create(customPill);

    if (error) {
      // TODO need to be fix in back response
      if (
        error.response?.status === 422 &&
        (error.response?.data as ICreateError)?.error?.translationKey
      ) {
        throw new Error('Already exists');
      }
      if (error.response?.status === 422) {
        throw new Error('Invalid format');
      }
      thunkAPI.dispatch(
        globalActions.displayNotification({
          type: 'error',
          message: intl.get('querybuilder.actions.saveCustomPill.modal.errorNotification.message'),
          description: intl.get(
            'querybuilder.actions.saveCustomPill.modal.errorNotification.description',
          ),
        }),
      );
      throw new Error(
        error.message || intl.get('querybuilder.actions.saveCustomPill.error.defaultMessage'),
      );
    }

    thunkAPI.dispatch(
      globalActions.displayMessage({
        type: 'success',
        content: intl.get('querybuilder.actions.saveCustomPill.modal.successNotification'),
      }),
    );
    return data!;
  },
);

const updateCustomPill = createAsyncThunk<
  TUserSavedFilter | any,
  TUserSavedFilterUpdate & { id: string; queryBuilderId: string },
  { rejectValue: string }
>('customPills/update', async (customPill, thunkAPI) => {
  const { id, queryBuilderId, ...customPillInfo } = customPill;
  const { data, error } = await CustomPillApi.update(id, customPillInfo);

  if (error) {
    thunkAPI.dispatch(
      globalActions.displayNotification({
        type: 'error',
        message: intl.get('customPill.edit.notification.error.message'),
        description: intl.get('customPill.edit.notification.error.description'),
      }),
    );
    return thunkAPI.rejectWithValue(error.message);
  }

  thunkAPI.dispatch(
    globalActions.displayMessage({
      type: 'success',
      content: intl.get('customPill.edit.notification.success'),
    }),
  );

  thunkAPI.dispatch(fetchSavedFilters());

  if (data) {
    const qbState = getQueryBuilderState(queryBuilderId);
    const newState = qbState?.state?.map((query: ISyntheticSqon) => {
      const newContent = query.content.map((filter: TSyntheticSqonContentValue) => {
        if ((filter as IValueQuery).id === data.id) {
          const newFilter: IValueQuery = {
            id: data.id,
            content: data.queries,
            op: (filter as IValueQuery).op,
            title: data.title,
          };
          return newFilter;
        }
        return filter;
      });
      return { ...query, content: newContent };
    });
    setQueryBuilderState(queryBuilderId, { ...qbState, state: newState });
  }

  return data!;
});

const deleteCustomPill = createAsyncThunk<
  { id: string; tag: string },
  { id: string; queryBuilderId: string; tag: string },
  { rejectValue: string }
>('customPills/delete', async ({ id, queryBuilderId, tag }, thunkAPI) => {
  const { data, error } = await CustomPillApi.destroy(id);

  if (error) {
    thunkAPI.dispatch(
      globalActions.displayNotification({
        type: 'error',
        message: intl.get('customPill.delete.notification.error.message'),
        description: intl.get('customPill.delete.notification.error.description'),
      }),
    );
    return thunkAPI.rejectWithValue(error.message);
  }

  thunkAPI.dispatch(
    globalActions.displayMessage({
      type: 'success',
      content: intl.get('customPill.delete.notification.success'),
    }),
  );
  removePillFromQueryBuilder(id, queryBuilderId);
  thunkAPI.dispatch(fetchSavedFilters());

  return { id: data!, tag };
});

const getNewTitle = (
  title: string,
  existingTitles: string[] | undefined,
  count?: number,
): string => {
  let countCopy = count || 1;
  if (!existingTitles || !existingTitles.includes(title)) return title;

  const duplicatedTitle = `${title} ${intl.get('customPill.duplicate.duplicateTitleSuffix')}`;
  if (!count && !existingTitles.includes(duplicatedTitle)) {
    return duplicatedTitle;
  }

  if (!existingTitles.includes(`${duplicatedTitle} ${countCopy}`)) {
    return `${duplicatedTitle} ${countCopy}`;
  } else {
    countCopy++;
    return getNewTitle(title, existingTitles, countCopy);
  }
};

const duplicateCustomPill = createAsyncThunk<TUserSavedFilter, TUserSavedFilterInsert>(
  'customPills/duplicate',
  async (customPillOriginal, thunkAPI) => {
    const allCustomPills = await CustomPillApi.fetchAll(customPillOriginal.tag);
    const allExistingTitle = allCustomPills.data?.map((pill) => pill.title);
    const copiedTitle = await getNewTitle(customPillOriginal.title, allExistingTitle);
    const customPillDuplicated = {
      ...customPillOriginal,
      title: copiedTitle!,
      id: getUUID(),
    };

    const { data, error } = await CustomPillApi.create(customPillDuplicated);

    if (error) {
      thunkAPI.dispatch(
        globalActions.displayNotification({
          type: 'error',
          message: intl.get('customPill.duplicate.notification.error.message'),
          description: intl.get('customPill.duplicate.notification.error.description'),
        }),
      );
      return thunkAPI.rejectWithValue(error.message);
    }
    return data!;
  },
);

export {
  createCustomPill,
  deleteCustomPill,
  duplicateCustomPill,
  fetchCustomPills,
  updateCustomPill,
};
