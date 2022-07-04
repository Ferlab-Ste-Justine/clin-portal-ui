import { sendRequestWithRpt } from 'api';
import { TUser, TUserCreate, TUserUpdate } from 'api/user/models';
import EnvironmentVariables from 'utils/EnvVariables';

const USERS_API_URL = `${EnvironmentVariables.configFor('USERS_API_URL')}/user`;

const headers = {
  'Content-Type': 'application/json',
};

const fetch = () =>
  sendRequestWithRpt<TUser>({
    method: 'GET',
    url: USERS_API_URL,
    headers,
  });

const create = (data: TUserCreate) =>
  sendRequestWithRpt<TUser>({
    method: 'POST',
    url: USERS_API_URL,
    headers,
    data,
  });

const update = (data: TUserUpdate) =>
  sendRequestWithRpt<TUser>({
    method: 'PUT',
    url: USERS_API_URL,
    headers,
    data,
  });

export const UsersApi = {
  fetch,
  create,
  update,
};
