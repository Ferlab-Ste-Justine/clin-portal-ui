import { useContext, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Button, Card, Descriptions, Select, Space, Typography } from 'antd';
import { FhirApi } from 'api/fhir';
import { isArray } from 'lodash';
import { DocsWithTaskInfo } from 'views/Archives';
import { extractDocsFromTask } from 'views/Archives/helper';

import ContentHeader from 'components/Layout/ContentWithHeader/Header';
import Footer from 'components/Layout/Footer';
import { globalActions } from 'store/global';

import PrescriptionEntityContext from '../../context';
import {
  extractOptionValue,
  formatOptionValue,
  getRequestOptions,
  hasVariantInfo,
} from '../Variants/utils';

import styles from './index.module.scss';

enum QCTabs {
  DRAGEN_CAPTURE_COVERAGE_METRICS = 'DRAGEN_capture_coverage_metrics',
  DRAGEN_MAPPING_METRICS = 'DRAGEN_mapping_metrics',
  PICARD_COLLECTHSMETRICS = 'Picard_CollectHsMetrics',
}

const tabList = [
  {
    tab: removeUnderscoreAndCapitalize(QCTabs.DRAGEN_CAPTURE_COVERAGE_METRICS.toLowerCase()),
    key: QCTabs.DRAGEN_CAPTURE_COVERAGE_METRICS,
  },
  {
    tab: removeUnderscoreAndCapitalize(QCTabs.DRAGEN_MAPPING_METRICS.toLowerCase()),
    key: QCTabs.DRAGEN_MAPPING_METRICS,
  },
  {
    tab: removeUnderscoreAndCapitalize(QCTabs.PICARD_COLLECTHSMETRICS.toLowerCase()),
    key: QCTabs.PICARD_COLLECTHSMETRICS,
  },
];

const getTabsContent = (activeTabs: string, reportFile: any) => {
  if (reportFile && Object.keys(reportFile).length !== 0) {
    const sample: { [key: string]: any } = reportFile[0];
    let info = sample[activeTabs];
    info = isArray(info) ? info[0] : info;
    const keys = Object.keys(info);
    return (
      <Descriptions bordered column={1} size="small" className="label-35">
        {keys.map((k, index) => (
          <Descriptions.Item label={k} key={index}>
            {info[k]}
          </Descriptions.Item>
        ))}
      </Descriptions>
    );
  }
  return <Empty description={intl.get('no.results.found')} />;
};

const PrescriptionQC = () => {
  const [activeTabs, setActiveTabs] = useState<string>(QCTabs.DRAGEN_CAPTURE_COVERAGE_METRICS);
  const [loadingCard, setLoadingCard] = useState(true);
  const [docs, setDocs] = useState<DocsWithTaskInfo[]>([]);
  const [reportFile, setReportFile] = useState<any>({});
  const { prescription, variantInfo, setVariantInfo, loading } =
    useContext(PrescriptionEntityContext);
  const dispatch = useDispatch();
  const [requestID, setRequestID] = useState<string>();
  useEffect(() => {
    if (variantInfo) {
      setRequestID(variantInfo.requestId);
    }
  }, [variantInfo]);

  useEffect(() => {
    if (requestID) {
      const fetchAllFiles = () => {
        setLoadingCard(true);
        FhirApi.searchPatientFiles(requestID).then(({ data }) => {
          if (data?.data.taskList) {
            return setDocs(extractDocsFromTask(data.data.taskList));
          } else {
            return setDocs([]);
          }
        });
      };

      fetchAllFiles();
    }
  }, [requestID]);

  useEffect(() => {
    if (docs) {
      const file = docs.find((f) => f.key.includes('.QC_report.json'));
      if (file) {
        FhirApi.getFileURL(file?.url).then(({ data }) => {
          fetch(data?.url ? data.url : '', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          })
            .then((response) => response.json())
            .then((json) => {
              const allFile = json;
              setReportFile(allFile.SamplesQC);
            })
            .finally(() => {
              setLoadingCard(false);
            });
        });
      } else {
        setLoadingCard(false);
      }
    }
  }, [docs]);

  const downloadFile = async () => {
    const file = docs.find((f) => f.key.includes('.QC_report.json'));
    FhirApi.getFileURL(file?.url ? file.url : '')
      .then(({ data }) => {
        window.open(data?.url, '_blank');
        dispatch(
          globalActions.displayNotification({
            type: 'success',
            message: intl.get('notification.success'),
            description: intl.get('notification.success.file.download'),
          }),
        );
      })
      .catch(() => {
        dispatch(
          globalActions.displayNotification({
            type: 'error',
            message: intl.get('notification.error'),
            description: intl.get('notification.error.file.download'),
          }),
        );
      });
  };

  return (
    <>
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
        ]}
        loading={loading}
      />
      <div className={styles.prescriptionEntityQCWrapper}>
        <div className={styles.content}>
          <Card
            loading={loadingCard}
            bordered
            tabList={tabList}
            activeTabKey={activeTabs}
            onTabChange={(e) => setActiveTabs(e)}
            tabBarExtraContent={
              reportFile && Object.keys(reportFile).length !== 0 ? (
                <Button
                  disabled={!!loadingCard}
                  onClick={downloadFile}
                  size="small"
                  icon={<DownloadOutlined width={'16'} height={'16'} />}
                >
                  {intl.get('download.report')}
                </Button>
              ) : null
            }
          >
            {!loadingCard ? getTabsContent(activeTabs, reportFile) : null}
          </Card>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PrescriptionQC;