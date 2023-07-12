import { ISavedFilter } from '@ferlab/ui/core/components/QueryBuilder/types';

import { CustomPillApi } from '.';

export const fetchFiltersByCustomPill = async (id: string) => {
  const { data, error } = await CustomPillApi.fetchFilterByPill(id);
  return { data, error };
};

export const fetchSavedFilterById = async (id: string) => {
  const { data, error } = await CustomPillApi.fetchById(id);

  if (error) return undefined;

  if (data) {
    const savedFilter: ISavedFilter = {
      id: data.id,
      title: data.title,
      favorite: data.favorite,
      type: data.type,
      queries: data.queries,
    };
    return savedFilter;
  }

  return undefined;
};
