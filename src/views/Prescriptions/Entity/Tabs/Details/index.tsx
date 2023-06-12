import { useContext } from 'react';
import intl from 'react-intl-universal';
import { Card, Col, Row } from 'antd';

import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';

import AnalysisCard from '../../AnalysisCard';
import ClinicalInformation from '../../ClinicalInformationCard';
import PrescriptionEntityContext from '../../context';
import ParentCard from '../../ParentCard';
import PatientCard from '../../PatientCard';

import styles from './index.module.scss';

const PrescriptionDetails = () => {
  const { prescription, loading } = useContext(PrescriptionEntityContext);

  return (
    <ScrollContentWithFooter className={styles.prescriptionEntityWrapper} container>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <AnalysisCard prescription={prescription} loading={loading} />
        </Col>
        <Col span={12}>
          <PatientCard prescription={prescription} loading={loading} />
        </Col>
        {prescription?.note && (
          <Col span={24}>
            <Card title={intl.get('screen.prescription.entity.comment.card.title')}>
              {prescription?.note.text}
            </Card>
          </Col>
        )}
        <Col span={24}>
          <ClinicalInformation prescription={prescription} loading={loading} />
        </Col>
        {prescription?.extensions?.map((extension, index) => (
          <Col key={index} span={24}>
            <ParentCard loading={loading} extension={extension} />
          </Col>
        ))}
      </Row>
    </ScrollContentWithFooter>
  );
};

export default PrescriptionDetails;
