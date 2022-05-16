import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Descriptions, Divider, Typography } from 'antd';
import CollapsePanel from 'components/containers/collapse';
import ParagraphLoader from 'components/uiKit/ParagraphLoader';
import { PrescriptionResult } from 'graphql/prescriptions/models/Prescription';

const { Title } = Typography;

interface OwnProps {
  prescription?: PrescriptionResult;
  loading: boolean;
}

const ClinicalInformation = ({ loading }: OwnProps) => (
  <CollapsePanel header={<Title level={4}>Information clinique</Title>}>
    <GridCard
      content={
        <div>
          <ParagraphLoader loading={loading} paragraph={{ rows: 3 }}>
            <Descriptions className="label-20" size="small" column={1}>
              <Descriptions.Item label="Signes observés">Don't</Descriptions.Item>
              <Descriptions.Item label="Signes non observés">Match</Descriptions.Item>
              <Descriptions.Item label="Remarque">Current data model</Descriptions.Item>
            </Descriptions>
          </ParagraphLoader>
          <Divider />
          <ParagraphLoader loading={loading} paragraph={{ rows: 3 }}>
            <Descriptions className="label-20" size="small" column={1}>
              <Descriptions.Item label="Créatine kinase sérique">Don't</Descriptions.Item>
              <Descriptions.Item label="IRM Musculaire">Match</Descriptions.Item>
              <Descriptions.Item label="Biopsie musculaire">Current data model</Descriptions.Item>
            </Descriptions>
          </ParagraphLoader>
        </div>
      }
    />
  </CollapsePanel>
);

export default ClinicalInformation;
