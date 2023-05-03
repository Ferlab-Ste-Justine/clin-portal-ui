import React from 'react';
import { DocumentNode } from 'graphql';
import { ExtendedMappingResults } from 'graphql/models';

export interface FilterGroup {
  title?: string;
  facets: React.ReactNode[];
}

export interface FilterInfo {
  defaultOpenFacets?: string[];
  customSearches?: () => React.ReactNode[];
  groups: FilterGroup[];
}

export type TAggregationFunction = (
  index: string,
  aggList: string[],
  mappingResults: ExtendedMappingResults,
) => DocumentNode;
