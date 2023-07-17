import { useContext } from 'react';
import intl from 'react-intl-universal';
import { Select, Space, Spin, Typography } from 'antd';

import ContentHeader from 'components/Layout/ContentWithHeader/Header';
import PatientTags from 'components/Variant/PatientTags';
import useQueryParams from 'hooks/useQueryParams';

import PrescriptionEntityContext from '../../context';

import VariantSectionNav, {
  VariantSection,
  VariantSectionKey,
} from './components/VariantSectionNav';
import CnvPatient from './cnv';
import SnvPatient from './snv';
import { extractOptionValue, formatOptionValue, getRequestOptions, hasVariantInfo } from './utils';

import styles from './index.module.scss';

const PrescriptionVariants = () => {
  const queryParams = useQueryParams();
  const {
    prescription,
    selectedRequest,
    selectedBasedOnRequest,
    variantInfo,
    setVariantInfo,
    loading,
  } = useContext(PrescriptionEntityContext);

  const patientTags = variantInfo.patientId
    ? PatientTags(variantInfo.patientId, selectedRequest, selectedBasedOnRequest)
    : [];

  const variantSection = queryParams.get(VariantSectionKey) || VariantSection.SNV;

  return (
    <div>
      <ContentHeader
        title=""
        extra={[
          <>
            {hasVariantInfo(variantInfo) && (
              <Space key="request">
                <Typography.Text strong>
                  {intl.get('prescription.variants.header.request')} :
                </Typography.Text>
                <Select
                  size="small"
                  value={formatOptionValue(variantInfo.patientId!, variantInfo.requestId!)}
                  defaultValue={formatOptionValue(variantInfo.patientId!, variantInfo.requestId!)}
                  options={getRequestOptions(prescription)}
                  onChange={(value) => setVariantInfo(extractOptionValue(value))}
                />
              </Space>
            )}
          </>,
          <VariantSectionNav key="variant-section-nav" />,
          ...patientTags,
        ]}
        loading={loading}
      />
      {hasVariantInfo(variantInfo) ? (
        variantSection === VariantSection.SNV ? (
          <SnvPatient />
        ) : (
          <CnvPatient />
        )
      ) : (
        <div className={styles.loadingContainer}>
          <Spin spinning />
        </div>
      )}
    </div>
  );
};

export default PrescriptionVariants;
