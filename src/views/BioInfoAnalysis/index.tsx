import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import { FileTextOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useTaskEntity } from 'graphql/prescriptions/actions';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';

import ContentWithHeader from 'components/Layout/ContentWithHeader';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import NotFound from 'components/Results/NotFound';
import ServerError from 'components/Results/ServerError';

import AnalysisCard from './AnalysisCard';
import BioInfoPipelineCard from './BioInfoPipeline';
import ExperimentCard from './ExperimentCard';
import FilesCard from './FilesCard';
import RelatedAnalysesCard from './RelatedAnalysesCard';
import SamplesCard from './SamplesCard';

import styles from './index.module.css';

const BioInfoAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const results = useTaskEntity(id);

  if (!results.task && !results.loading) {
    return <NotFound />;
  }

  if (results.error) {
    return <ServerError />;
  }
  const samples = results.task?.sample
    ? Array.isArray(results.task?.sample)
      ? [...results.task.sample]
      : [results.task?.sample]
    : [];

  const docs = results.task?.docs
    ? Array.isArray(results.task.docs)
      ? [...results.task.docs]
      : [results.task.docs]
    : [];

  const relatedTask = results.task?.relatedTask
    ? Array.isArray(results.task.relatedTask)
      ? [...results.task.relatedTask]
      : [results.task.relatedTask]
    : [];

  return (
    <ContentWithHeader
      headerProps={{
        icon: <FileTextOutlined />,
        title: intl.get('screen.bioinfo.analysis.title', { id }),
      }}
    >
      <ScrollContentWithFooter className={styles.bioInfoAnalysisWrapper} dynamic={true} container>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <AnalysisCard analysis={results.task} loading={results.loading} />
          </Col>
          <Col span={12}>
            <BioInfoPipelineCard workflow={results.task?.workflow} loading={results.loading} />
          </Col>
          <Col span={12}>
            <ExperimentCard task={results.task} loading={results.loading} />
          </Col>
          <Col span={24}>
            <SamplesCard samples={samples} loading={results.loading} />
          </Col>
          <Col span={24}>
            <FilesCard files={docs} loading={results.loading} />
          </Col>
          <Col span={24}>
            <RelatedAnalysesCard relatedAnalyses={relatedTask} loading={results.loading} />
          </Col>
        </Row>
      </ScrollContentWithFooter>
    </ContentWithHeader>
  );
};

const BioInfoAnalysisWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.FHIR}>
    <BioInfoAnalysis />
  </ApolloProvider>
);

export default BioInfoAnalysisWrapper;
