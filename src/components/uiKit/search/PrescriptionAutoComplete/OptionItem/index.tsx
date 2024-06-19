import { Descriptions, Space, Typography } from 'antd';
import { AnalysisResult } from 'graphql/prescriptions/models/Prescription';

import { useGlobals } from 'store/global';
import { formatDate } from 'utils/date';

import styles from './index.module.css';

interface OwnProps {
  data: AnalysisResult;
}

const OptionItem = ({ data }: OwnProps) => {
  const { getAnalysisNameByCode } = useGlobals();

  return (
    <Space direction="vertical" size={0} className={styles.prescriptionOptionItem}>
      <Typography.Text strong>{getAnalysisNameByCode(data.analysis_code)}</Typography.Text>
      <Descriptions size="small" column={1}>
        <Descriptions.Item label={'Prescription'}>
          <Typography.Text type="secondary">{`${data.prescription_id} (${formatDate(
            data.timestamp,
          )})`}</Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item label={'Patient'}>
          <Typography.Text type="secondary">{data.patient_id}</Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item label={'Dossier'}>
          <Typography.Text type="secondary">{data.patient_mrn}</Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item label={'LDM'}>
          <Typography.Text type="secondary">{data.ldm}</Typography.Text>
        </Descriptions.Item>
      </Descriptions>
    </Space>
  );
};

export default OptionItem;
