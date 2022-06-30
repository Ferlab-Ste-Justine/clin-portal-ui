import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { MedicineBoxOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Row } from 'antd';
import { extractPatientId } from 'api/fhir/helper';
import { useServiceRequestEntity } from 'graphql/prescriptions/actions';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';

import ContentWithHeader from 'components/Layout/ContentWithHeader';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import NotFound from 'components/Results/NotFound';

import AnalysisCard from './AnalysisCard';
import ClinicalInformationCard from './ClinicalInformationCard';
import ParentCard from './ParentCard';
import PatientCard from './PatientCard';

import styles from './index.module.scss';

interface OwnProps {
  prescriptionId: string;
}

const PrescriptionEntity = ({ prescriptionId }: OwnProps) => {
  const { prescription, loading } = useServiceRequestEntity(prescriptionId);

  if (!loading && !prescription) {
    return <NotFound />;
  }
  const variantMenu = (
    <Menu
      items={[
        {
          label: (
            <Link
              key="snv"
              to={`/variant-exploration/patient/${extractPatientId(
                prescription?.subject?.resource?.id!,
              )}/${prescriptionId}`}
            >
              snv
            </Link>
          ),
          key: 'snv',
        },
        {
          label: (
            <Link
              key="cnv"
              to={`/cnv-exploration/patient/${extractPatientId(
                prescription?.subject?.resource?.id!,
              )}/${prescriptionId}`}
            >
              cnv
            </Link>
          ),
          key: 'cnv',
        },
      ]}
    />
  );

  return (
    <ContentWithHeader
      headerProps={{
        icon: <MedicineBoxOutlined />,
        title: intl.get('screen.prescription.entity.title', { id: prescriptionId }),
        actions: [
          <Dropdown.Button trigger={['click']} key="cnv" type="primary" overlay={variantMenu}>
            {intl.get('screen.prescription.entity.see.variant')}
          </Dropdown.Button>,
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
            <ClinicalInformationCard prescription={prescription} loading={loading} />
          </Col>
          {prescription?.extensions?.map((extension, index) => (
            <Col key={index} span={24}>
              <ParentCard loading={loading} extension={extension} />
            </Col>
          ))}
        </Row>
      </ScrollContentWithFooter>
    </ContentWithHeader>
  );
};

const PrescriptionEntityWrapper = (props: OwnProps) => (
  <ApolloProvider backend={GraphqlBackend.FHIR}>
    <PrescriptionEntity {...props} />
  </ApolloProvider>
);

export default PrescriptionEntityWrapper;
