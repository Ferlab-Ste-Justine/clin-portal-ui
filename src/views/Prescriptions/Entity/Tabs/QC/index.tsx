import { useContext, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { DownloadOutlined } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Button, Card, Descriptions, Radio, Select, Space, Typography } from 'antd';
import { FhirApi } from 'api/fhir';
import { isArray } from 'lodash';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';
import { DocsWithTaskInfo } from 'views/Archives';
import { extractDocsFromTask } from 'views/Archives/helper';
import PrescriptionEntityContext from 'views/Prescriptions/Entity/context';
import GenericCoverage from 'views/Prescriptions/Entity/GenericCoverage';
import {
  extractOptionValue,
  formatOptionValue,
  getRequestOptions,
  hasVariantInfo,
} from 'views/Prescriptions/Entity/Tabs/Variants/utils';

import ContentHeader from 'components/Layout/ContentWithHeader/Header';
import Footer from 'components/Layout/Footer';
import useQueryParams from 'hooks/useQueryParams';
import { globalActions } from 'store/global';

import styles from './index.module.css';
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
    tab: removeUnderscoreAndCapitalize('PICARD_COLLECT_HS_METRICS'.toLowerCase()),
    key: QCTabs.PICARD_COLLECTHSMETRICS,
  },
];

const getTabsContent = (activeTabs: string, reportFile: any) => {
  if (reportFile && Object.keys(reportFile).length !== 0) {
    const sample: { [key: string]: any } = reportFile[0];
    let info = sample[activeTabs];
    if (!info) return <Empty description={intl.get('pages.qc_report.no_data')} />;
    info = isArray(info) ? info[0] : info;
    const keys = Object.keys(info);
    return (
      <ScrollContent className={styles.scrollWrapper}>
        <Descriptions bordered column={1} size="small" className="label-35">
          {keys.map((k, index) => (
            <Descriptions.Item label={k} key={index}>
              {info[k]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </ScrollContent>
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
  const queryParams = useQueryParams();
  const [activeSection, setActiveSection] = useState(queryParams.get('qcSection') || 'General');
  const [requestID, setRequestID] = useState<string>();
  const { push, location } = useHistory();

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
      const file = docs.find((f) => f.format === 'JSON' && f.type === 'QCRUN');
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

  const downloadFile = async (format = 'JSON', type = 'QCRUN') => {
    const file = docs.find((f) => f.format === format && f.type === type);
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

                <Radio.Group
                  key="variant-section"
                  defaultValue={'General'}
                  value={activeSection}
                  className={styles.variantSectionNav}
                  buttonStyle="solid"
                  size="small"
                >
                  <Radio.Button
                    value={'General'}
                    data-cy="RadioButton_General"
                    onClick={() => {
                      push({
                        ...location,
                        search: `?${new URLSearchParams({
                          qcSection: 'General',
                        }).toString()}`,
                      });
                      setActiveSection('General');
                    }}
                  >
                    {intl.get('pages.coverage_genic.general')}
                  </Radio.Button>
                  <Radio.Button
                    value={'CouvertureGenique'}
                    data-cy="RadioButton_CouvertureGenique"
                    onClick={() => {
                      push({
                        ...location,
                        search: `?${new URLSearchParams({
                          qcSection: 'CouvertureGenique',
                        }).toString()}`,
                      });
                      setActiveSection('CouvertureGenique');
                    }}
                  >
                    {intl.get('pages.coverage_genic.coverage_genic')}
                  </Radio.Button>
                </Radio.Group>
              </Space>
            )}
          </>,
        ]}
        loading={loading}
      />
      <div className={styles.prescriptionEntityQCWrapper}>
        <div className={styles.content}>
          {activeSection === 'General' && (
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
                    onClick={() => downloadFile()}
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
          )}
          {activeSection !== 'General' && (
            <ApolloProvider backend={GraphqlBackend.ARRANGER}>
              <GenericCoverage prescription={prescription} downloadFile={downloadFile} />
            </ApolloProvider>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrescriptionQC;
