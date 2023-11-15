import { SavedFilterTypeEnum } from '@ferlab/ui/core/components/QueryBuilder/types';
import { sendRequestWithRpt } from 'api';
import {
  TUserSavedFilter,
  TUserSavedFilterInsert,
  TUserSavedFilterUpdate,
} from 'api/savedFilter/models';

import EnvironmentVariables from 'utils/EnvVariables';

const SAVED_FILTER_API_URL = `${EnvironmentVariables.configFor('USERS_API_URL')}/saved-filters`;

const headers = () => ({
  'Content-Type': 'application/json',
});

// TODO update when back will be ready
const fetchAll = (tag?: string) =>
  sendRequestWithRpt<TUserSavedFilter[]>({
    method: 'GET',
    url: `${SAVED_FILTER_API_URL}${tag ? '/tag/' + tag : ''}`,
    headers: headers(),
    params: { type: SavedFilterTypeEnum.Query },
  });

const fetchById = (id: string) =>
  sendRequestWithRpt<TUserSavedFilter>({
    method: 'GET',
    url: `${SAVED_FILTER_API_URL}/${id}`,
    headers: headers(),
  });

const fetchFilterByPill = (id: string) =>
  sendRequestWithRpt<TUserSavedFilter[]>({
    method: 'GET',
    url: `${SAVED_FILTER_API_URL}/withQueryId/${id}`,
    headers: headers(),
  });

const create = (body: TUserSavedFilterInsert) =>
  sendRequestWithRpt<TUserSavedFilter>({
    method: 'POST',
    url: SAVED_FILTER_API_URL,
    headers: headers(),
    data: body,
  });

const update = (id: string, body: TUserSavedFilterUpdate) =>
  sendRequestWithRpt<TUserSavedFilter>({
    method: 'PUT',
    url: `${SAVED_FILTER_API_URL}/${id}`,
    headers: headers(),
    data: body,
  });

const destroy = (id: string) =>
  sendRequestWithRpt<string>({
    method: 'DELETE',
    url: `${SAVED_FILTER_API_URL}/${id}`,
    headers: headers(),
    params: { type: SavedFilterTypeEnum.Query },
  });

const validateName = (title: string, tag: string) =>
  sendRequestWithRpt<TUserSavedFilter>({
    method: 'POST',
    url: `${SAVED_FILTER_API_URL}/validate-name`,
    headers: headers(),
    data: { title, tag, type: SavedFilterTypeEnum.Query },
  });

export const CustomPillApi = {
  fetchAll,
  fetchById,
  fetchFilterByPill,
  create,
  update,
  destroy,
  validateName,
};
