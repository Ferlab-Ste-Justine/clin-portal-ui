import { Space, Typography } from 'antd';
import { Suggestion, SuggestionType } from 'api/arranger/models';
import cx from 'classnames';

import SquareLabel from 'components/uiKit/search/GlobalSearch/SquareLabel';

import styles from './index.module.css';

interface OwnProps {
  type: SuggestionType;
  suggestion: Suggestion;
  value: string;
}

enum OptionLabel {
  VARIANT = 'VR',
  GENE = 'GN',
}

const OptionItem = ({ type, suggestion, value }: OwnProps) => {
  const getLabel = () => (type === SuggestionType.GENES ? OptionLabel.GENE : OptionLabel.VARIANT);

  return (
    <Space size={12}>
      <SquareLabel label={getLabel()} className={cx(styles.searchLabel, styles[type])} />
      <Space direction="vertical" size={0}>
        <Typography.Text className={styles.variantSearchLocus}>{value}</Typography.Text>
        {suggestion.rsnumber || suggestion.ensembl_gene_id || '--'}
      </Space>
    </Space>
  );
};

export default OptionItem;
