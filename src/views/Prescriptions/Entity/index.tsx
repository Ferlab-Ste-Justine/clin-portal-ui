import { DownloadOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import ContentWithHeader from 'components/Layout/ContentWithHeader';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import intl from 'react-intl-universal';
import ApolloProvider from 'providers/ApolloProvider';
import { GraphqlBackend } from 'providers';
import { usePrescriptionEntity } from 'graphql/prescriptions/actions';
import ParagraphLoader from 'components/uiKit/ParagraphLoader';
import AnalysisCard from './AnalysisCard';
import PatientCard from './PatientCard';
import { Link } from 'react-router-dom';
import NotFound from 'components/Results/NotFound';
import ClinicalInformation from './ClinicalInformation';

import styles from './index.module.scss';

interface OwnProps {
  prescriptionId: string;
}

const PrescriptionEntity = ({ prescriptionId }: OwnProps) => {
  const { prescription, loading } = usePrescriptionEntity(prescriptionId);

  if (!loading && !prescription) {
    return <NotFound />;
  }

  return (
    <ContentWithHeader
      headerProps={{
        icon: <MedicineBoxOutlined />,
        title: intl.get('screen.prescription.entity.title', { id: prescriptionId }),
        actions: [
          <Button key="documents" icon={<DownloadOutlined />}>
            {intl.get('screen.prescription.entity.download.documents')}
          </Button>,
          <Link
            key="variants"
            to={`/variant-exploration/patient/${prescription?.patientInfo?.cid}/${prescriptionId}`}
          >
            <Button type="primary" icon={<LineStyleIcon height="14" width="14" />}>
              {intl.get('screen.prescription.entity.see.variant')}
            </Button>
          </Link>,
        ],
      }}
    >
      <ScrollContentWithFooter className={styles.prescriptionEntityWrapper} container>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <AnalysisCard prescription={prescription} loading={loading} />
          </Col>
          <Col span={12}>
            <PatientCard prescription={prescription} loading={loading} />
          </Col>
          <Col span={24}>
            <Card title={intl.get('screen.prescription.entity.comment.card.title')}>
              <ParagraphLoader loading={loading} paragraph={{ rows: 2 }}>
                Purus sit mauris nam porttitor elit, ut. Nulla porttitor sed volutpat vitae sed
                sodales enim, nisi.
              </ParagraphLoader>
            </Card>
          </Col>
          <Col span={24}>
            <ClinicalInformation loading={loading} />
          </Col>
        </Row>
      </ScrollContentWithFooter>
    </ContentWithHeader>
  );
};

const PrescriptionEntityWrapper = (props: OwnProps) => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <PrescriptionEntity {...props} />
  </ApolloProvider>
);

export default PrescriptionEntityWrapper;
