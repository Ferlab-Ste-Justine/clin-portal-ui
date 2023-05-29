import { useState } from 'react';
import intl from 'react-intl-universal';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { Button, Layout, Space, Typography } from 'antd';
import cx from 'classnames';
import { ExtendedMappingResults } from 'graphql/models';

import CustomFilterContainer from './CustomFilterContainer';
import { FilterGroup, FilterInfo } from './types';

import styles from './Filters.module.scss';

export type TCustomFilterMapper = (filters: ISqonGroupFilter) => ISqonGroupFilter;

type OwnProps = {
  index: string;
  queryBuilderId: string;
  extendedMappingResults: ExtendedMappingResults;
  filterInfo: FilterInfo;
  filterMapper?: TCustomFilterMapper;
  showExpandBtn?: boolean;
};

const { Text } = Typography;

const isAllFacetOpen = (filterInfo: FilterInfo) => {
  const allOpen = concatAllFacets(filterInfo).every((facet) =>
    typeof facet === 'string' ? filterInfo.defaultOpenFacets?.includes(facet) : true,
  );
  return allOpen ? true : undefined;
};

const concatAllFacets = (filterInfo: FilterInfo) => {
  const allFacets: any[] = [];
  filterInfo.groups.forEach(({ facets }) => allFacets.push(...facets));
  return allFacets;
};

const FilterList = ({
  index,
  queryBuilderId,
  extendedMappingResults,
  filterInfo,
  filterMapper,
  showExpandBtn = true,
}: OwnProps) => {
  const [filtersOpen, setFiltersOpen] = useState<boolean | undefined>(isAllFacetOpen(filterInfo));
  const customSearch =
    (filterInfo && filterInfo?.customSearches && filterInfo?.customSearches()) || [];
  return (
    <>
      {customSearch?.length > 0 && (
        <Space direction="vertical" size={16} className={styles.customSearchesWrapper}>
          {customSearch?.map((search, index) => (
            <div key={index}>{search}</div>
          ))}
        </Space>
      )}
      {showExpandBtn && (
        <div className={styles.filterExpandBtnWrapper}>
          <Button onClick={() => setFiltersOpen(!filtersOpen)} type="link">
            {filtersOpen
              ? intl.get('components.filterList.collapseAll')
              : intl.get('components.filterList.expandAll')}
          </Button>
        </div>
      )}
      <Layout className={styles.filterWrapper}>
        {filterInfo.groups.map((group: FilterGroup, i) => (
          <div key={i} className={styles.filtersGroup}>
            {group.title ? (
              <Text type="secondary" className={styles.filterGroupTitle}>
                {intl.get(group.title)}
              </Text>
            ) : null}
            {group.facets.map((facet, ii) =>
              typeof facet === 'string' ? (
                <CustomFilterContainer
                  key={facet}
                  index={index}
                  queryBuilderId={queryBuilderId}
                  classname={cx(styles.customFilterContainer, styles.filter)}
                  filterKey={facet}
                  extendedMappingResults={extendedMappingResults}
                  filterOpen={filtersOpen}
                  defaultOpen={filterInfo.defaultOpenFacets?.includes(facet) ? true : undefined}
                  filterMapper={filterMapper}
                />
              ) : (
                <div key={i + ii} className={cx(styles.customFilterWrapper, styles.filter)}>
                  {facet}
                </div>
              ),
            )}
          </div>
        ))}
      </Layout>
    </>
  );
};

export default FilterList;
