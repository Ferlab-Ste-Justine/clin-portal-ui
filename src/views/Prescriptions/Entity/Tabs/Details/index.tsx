import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import { FhirApi } from 'api/fhir';
import { extractServiceRequestId } from 'api/fhir/helper';

import ContentHeader from 'components/Layout/ContentWithHeader/Header';
import Footer from 'components/Layout/Footer';
import { globalActions } from 'store/global';
import { HTTP_HEADERS, MIME_TYPES } from 'utils/constants';
import { downloadFile, extractFilename } from 'utils/helper';

import AnalysisCard from '../../AnalysisCard';
import ClinicalInformation from '../../ClinicalInformationCard';
import { usePrescriptionEntityContext } from '../../context';
import ParentCard from '../../ParentCard';
import PatientCard from '../../PatientCard';

import styles from './index.module.scss';

const PrescriptionDetails = () => {
  const { prescription, loading } = usePrescriptionEntityContext();
  const [downloadingDocuments, setDownloadingDocuments] = useState(false);
  const dispatch = useDispatch();

  const downloadDocuments = () => {
    const id = extractServiceRequestId(prescription?.id!);
    FhirApi.downloadDocuments(id)
      .then(({ data, error, response }) => {
        if (error) {
          dispatch(
            globalActions.displayNotification({
              type: 'error',
              message: intl.get('notification.error'),
              description: intl.get('notification.error.file.download'),
            }),
          );
        } else {
          const fileName = extractFilename(
            response.headers[HTTP_HEADERS.CONTENT_DISPOSITION],
            `${id}.pdf`,
          );
          const blob = new Blob([data as BlobPart], {
            type: MIME_TYPES.APPLICATION_PDF,
          });
          downloadFile(blob, fileName);
        }
      })
      .finally(() => {
        setDownloadingDocuments(false);
      });
    setDownloadingDocuments(true);
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
            onClick={downloadDocuments}
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
              <ClinicalInformation prescription={prescription} loading={loading} />
            </Col>
            {prescription?.extensions?.map((extension, index) => (
              <Col key={index} span={24}>
                <ParentCard loading={loading} extension={extension} />
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
