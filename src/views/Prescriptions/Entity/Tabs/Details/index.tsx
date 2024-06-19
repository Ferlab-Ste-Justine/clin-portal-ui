import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import { downloadDocuments } from '@ferlab/core/core/utils';
import { Button, Card, Col, Row } from 'antd';
import { FhirApi, FORM_API_URL } from 'api/fhir';
import { extractServiceRequestId } from 'api/fhir/helper';
import { TFormConfig } from 'api/fhir/models';
import { RptManager } from 'auth/rpt';
import AbsentParentCard from 'views/Prescriptions/Entity/AbsentParentCard';
import AnalysisCard from 'views/Prescriptions/Entity/AnalysisCard';
import ClinicalInformation from 'views/Prescriptions/Entity/ClinicalInformationCard';
import { usePrescriptionEntityContext } from 'views/Prescriptions/Entity/context';
import ParentCard from 'views/Prescriptions/Entity/ParentCard';
import PatientCard from 'views/Prescriptions/Entity/PatientCard';

import ContentHeader from 'components/Layout/ContentWithHeader/Header';
import Footer from 'components/Layout/Footer';
import { globalActions, useLang } from 'store/global';
import { MIME_TYPES } from 'utils/constants';

import styles from '../index.module.css';

const getRtp = async () => (await RptManager.readRpt()).access_token;

const PrescriptionDetails = () => {
  const { prescription, loading } = usePrescriptionEntityContext();
  const id = extractServiceRequestId(prescription?.id!);
  const [downloadingDocuments, setDownloadingDocuments] = useState(false);
  const [perscriptionFormConfig, setPerscriptionFormConfig] = useState<TFormConfig>();
  const [rptToken, setRptToken] = useState<string | undefined>();
  const dispatch = useDispatch();
  const lang = useLang();

  useEffect(() => {
    getRtp().then((token) => {
      setRptToken(token);
    });
  }, []);

  useEffect(() => {
    if (prescription?.code[0]) {
      FhirApi.fetchPrescriptionFormConfig(prescription?.code[0]).then(({ data }) => {
        setPerscriptionFormConfig(data?.config);
      });
    }
  }, [prescription]);

  const errorNotification = () => {
    dispatch(
      globalActions.displayNotification({
        type: 'error',
        message: intl.get('notification.error'),
        description: intl.get('notification.error.file.download'),
      }),
    );
  };
  const config = {
    token: rptToken,
    url: `${FORM_API_URL}/render/${id}?format=pdf&lang=${lang}`,
    type: MIME_TYPES.APPLICATION_PDF,
    format: 'pdf',
  };
  return (
    <>
      <ContentHeader
        title=""
        actions={[
          <Button
            key="downloadDocumentsBt"
            type="primary"
            disabled={!!loading}
            loading={downloadingDocuments}
            onClick={() =>
              downloadDocuments(id, setDownloadingDocuments, config, errorNotification)
            }
            icon={<DownloadOutlined width={'16'} height={'16'} />}
          >
            {intl.get('download.documents')}
          </Button>,
        ]}
        loading={loading}
      />
      <div className={styles.prescriptionEntityWrapper}>
        <div className={styles.content}>
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
              <ClinicalInformation
                prescription={prescription}
                prescriptionFormConfig={perscriptionFormConfig}
                loading={loading}
              />
            </Col>
            {prescription?.extensions?.map((extension, index) => (
              <Col key={index} span={24}>
                <ParentCard prescription={prescription} loading={loading} extension={extension} />
              </Col>
            ))}
            {prescription?.observation.investigation.item
              .filter(
                (item) =>
                  item.resourceType === 'Observation' &&
                  ['MMTH', 'MFTH'].indexOf(item.coding.code) > -1,
              )
              .map((item, index) => (
                <Col key={index} span={24}>
                  <AbsentParentCard
                    observationId={item.id[0]}
                    loading={loading}
                    code={item.coding.code}
                  />
                </Col>
              ))}
          </Row>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PrescriptionDetails;
