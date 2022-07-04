import { TColumnStates } from '@ferlab/ui/core/components/ProTable/types';

export type TUser = {
  id: string;
  creation_date: Date;
  updated_date: Date;
  keycloak_id: string;
  email: string;
  first_name: string;
  last_name: string;
  completed_registration: boolean;
  config: TUserConfig;
};

export type TUserTableConfig = {
  columns: TColumnStates;
};

export type TUserConfig = {
  data_exploration?: {
    tables?: {
      prescriptions?: TUserTableConfig;
      requests?: TUserTableConfig;
      variants?: TUserTableConfig;
    };
  };
};

export type TUserCreate = Omit<TUser, 'id' | 'creation_date' | 'updated_date'>;
export type TUserUpdate = Partial<TUserCreate>;
