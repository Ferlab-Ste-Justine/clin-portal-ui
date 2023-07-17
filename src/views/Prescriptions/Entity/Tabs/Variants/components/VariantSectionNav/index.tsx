import { useHistory } from 'react-router';
import { Radio } from 'antd';

import { VariantType } from 'components/Variant/TypeNav';
import useQueryParams from 'hooks/useQueryParams';

import styles from './index.module.scss';

export enum VariantSection {
  SNV = 'snv',
  CNV = 'cnv',
}

export const VariantSectionKey = 'variantSection';

const VariantSectionNav = () => {
  const queryParams = useQueryParams();
  const { push, location } = useHistory();

  const variantSection = queryParams.get(VariantSectionKey) || VariantSection.SNV;

  return (
    <Radio.Group
      key="variant-section"
      defaultValue={VariantSection.SNV}
      value={variantSection}
      className={styles.variantSectionNav}
      buttonStyle="solid"
      size="small"
    >
      <Radio.Button
        value={VariantType.SNV}
        onClick={() =>
          push({
            ...location,
            search: `?${new URLSearchParams({
              [VariantSectionKey]: VariantSection.SNV,
            }).toString()}`,
          })
        }
      >
        SNV
      </Radio.Button>
      <Radio.Button
        value={VariantType.CNV}
        onClick={() =>
          push({
            ...location,
            search: `?${new URLSearchParams({
              [VariantSectionKey]: VariantSection.CNV,
            }).toString()}`,
          })
        }
      >
        CNV
      </Radio.Button>
    </Radio.Group>
  );
};

export default VariantSectionNav;
