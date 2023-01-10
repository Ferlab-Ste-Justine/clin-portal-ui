import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { Tabs } from 'antd';
import { ExtendedMappingResults } from 'graphql/models';
import { useVariants } from 'graphql/variants/actions';
import { cloneDeep } from 'lodash';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_QUERY_CONFIG,
  SNV_VARIANT_PATIENT_QB_ID,
} from 'views/Snv/utils/constant';
import { wrapSqonWithDonorIdAndSrId } from 'views/Snv/utils/helper';

import { SNV_EXPLORATION_PATIENT_FILTER_TAG } from 'utils/queryBuilder';

import VariantContentLayout from '../../components/VariantContentLayout';

import VariantsTab from './tabs/Variants';

import styles from './index.module.scss';

type OwnProps = {
  variantMapping: ExtendedMappingResults;
  patientId?: string;
  prescriptionId?: string;
};

const PageContent = ({ variantMapping, patientId }: OwnProps) => {
  const { queryList, activeQuery } = useQueryBuilderState(SNV_VARIANT_PATIENT_QB_ID);
  const [variantQueryConfig, setVariantQueryConfig] = useState(DEFAULT_QUERY_CONFIG);

  const getVariantResolvedSqon = (query: ISyntheticSqon) =>
    wrapSqonWithDonorIdAndSrId(
      cloneDeep(resolveSyntheticSqon(queryList, query, 'donors')),
      patientId,
      /** prescriptionId Need to fix bug in ETL */
    );

  const variantResults = useVariants({
    first: variantQueryConfig.size,
    offset: variantQueryConfig.size * (variantQueryConfig.pageIndex - 1),
    sqon: getVariantResolvedSqon(activeQuery),
    sort: [
      { field: 'max_impact_score', order: 'desc' },
      { field: 'hgvsg', order: 'asc' },
    ],
  });

  useEffect(() => {
    setVariantQueryConfig({
      ...variantQueryConfig,
      pageIndex: DEFAULT_PAGE_INDEX,
    });
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  return (
    <VariantContentLayout
      queryBuilderId={SNV_VARIANT_PATIENT_QB_ID}
      savedFilterTag={SNV_EXPLORATION_PATIENT_FILTER_TAG}
      variantMapping={variantMapping}
      activeQuery={activeQuery}
      variantResults={variantResults}
      getVariantResolvedSqon={getVariantResolvedSqon}
    >
      <Tabs type="card" activeKey={'variants'} className={styles.noScroll}>
        <Tabs.TabPane
          tab={intl.get('screen.patientsnv.results.table.variants') || 'Variants'}
          key="variants"
          className={styles.tabsTableContent}
        >
          <VariantsTab
            results={variantResults}
            setQueryConfig={setVariantQueryConfig}
            queryConfig={variantQueryConfig}
            patientId={patientId!}
          />
        </Tabs.TabPane>
      </Tabs>
    </VariantContentLayout>
  );
};

export default PageContent;
