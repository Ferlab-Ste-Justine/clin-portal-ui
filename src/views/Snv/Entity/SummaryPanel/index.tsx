import { Space } from 'antd';
import cx from 'classnames';
import { ArrangerResultsTree } from 'graphql/models';
import { GeneEntity, VariantEntity } from 'graphql/variants/models';
import SummaryCard from 'views/Snv/Entity/SummaryPanel/Summary';

import ClinicalCard from './Clinical';
import Consequecenses from './Consequences';
import FrequencyCard from './Frequency';

import styles from './index.module.css';

interface OwnProps {
  className?: string;
  locus: string;
  data: {
    loading: boolean;
    variantData: VariantEntity | null;
  };
}

export const shortToLongPrediction: Record<string, string> = {
  'sift.d': 'damaging',
  'sift.t': 'tolerated',
  'polyphen2.p': 'possibily damaging',
  'polyphen2.d': 'damaging',
  'polyphen2.b': 'benign',
  'fathmm.d': 'damaging',
  'fathmm.t': 'tolerated',
  'lrt.d': 'deleterious',
  'lrt.n': 'neutral',
  'lrt.u': 'unknown',
};

const ResumePanel = ({ data, locus, className = '' }: OwnProps) => {
  const variantData = data.variantData;
  const genes = (variantData?.genes as ArrangerResultsTree<GeneEntity>)?.hits.edges;

  return (
    <div className={cx(styles.resumePanelWrapper, className)}>
      <Space direction="vertical" className={styles.resumePanel} size="middle">
        <SummaryCard loading={data.loading} variant={variantData} genes={genes} />
        <Consequecenses data={data} />
        <FrequencyCard locus={locus} />
        <ClinicalCard locus={locus} />
      </Space>
    </div>
  );
};

export default ResumePanel;
