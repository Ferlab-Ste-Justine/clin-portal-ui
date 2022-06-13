import React, { Fragment } from 'react';
import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Space, Table, Tag, Typography } from 'antd';
import { VariantEntity } from 'graphql/variants/models';
import NoData from 'views/Variants/Entity/NoData';

import CollapsePanel from 'components/containers/collapse';

const { Text, Title } = Typography;

const getCriteriaTagColor = (criteria: string) => {
  switch (criteria.toLowerCase().substring(0, 2)) {
    case 'pv':
    case 'ps':
      return 'red';
    case 'pm':
      return 'volcano';
    case 'pp':
      return 'gold';
    case 'bs':
    case 'ba':
      return 'green';
    case 'bp':
      return 'blue';
    default:
      return 'default';
  }
};

const REGEX_PUBMED = /(%%PUBMED:\d+%%)/g;
const REGEX_EXTRACT_PUBMED_ID = /^\D+|%/g;

const columns = [
  {
    title: () => intl.get('screen.variantDetails.summaryTab.acmgCriteriaTable.criteriaColumn'),
    dataIndex: 'name',
    width: '18%',
    render: (name: string) => <Tag color={getCriteriaTagColor(name)}>{name}</Tag>,
  },
  {
    title: () => intl.get('screen.variantDetails.summaryTab.acmgCriteriaTable.explanationColumn'),
    dataIndex: 'user_explain',
    render: (userExplain: string[]) => (
      <Space direction="vertical" size={4}>
        {userExplain.map((explanationText, indexOfExplanation) => {
          const textChunks = explanationText.split(REGEX_PUBMED);
          return (
            <span key={indexOfExplanation}>
              {textChunks.map((e, indexOfCutText) => {
                const pubmedId = e.startsWith('%%PUBMED:')
                  ? e.replace(REGEX_EXTRACT_PUBMED_ID, '')
                  : '';
                return (
                  <Fragment key={indexOfCutText}>
                    {pubmedId ? (
                      <ExternalLink href={`https://pubmed.ncbi.nlm.nih.gov/${pubmedId}/`}>
                        PUBMED: {pubmedId}
                      </ExternalLink>
                    ) : (
                      e
                    )}
                  </Fragment>
                );
              })}
            </span>
          );
        })}
      </Space>
    ),
  },
];

const formatData = (data: VariantEntity | null) =>
  (data?.varsome?.acmg?.classifications?.hits?.edges || []).map((c) => ({
    key: c.node.name,
    name: c.node.name,
    criteria: c.node.met_criteria,
    user_explain: c.node.user_explain,
  }));

type Props = {
  data: {
    loading: boolean;
    variantData: VariantEntity | null;
  };
};

const ACMGCriteria = ({ data }: Props) => {
  const formattedData = formatData(data.variantData) || [];
  const varsome = data.variantData?.varsome;
  const verdict = varsome?.acmg.verdict;

  return (
    <CollapsePanel
      header={
        <>
          <Title level={4}>
            {`${intl.get('screen.variantDetails.summaryTab.acmgCriteriaTitle')}`}
          </Title>
          <Space size={4} style={{ marginLeft: '20px' }}>
            {verdict && (
              <>
                <Text>{`${intl.get('variant.acmg.verdict.label')}: `}</Text>
                <ExternalLink
                  onClick={(e) => e.stopPropagation()}
                  href={`https://varsome.com/variant/${varsome.variant_id}`}
                >
                  {verdict.verdict}
                </ExternalLink>
              </>
            )}
          </Space>
        </>
      }
      loading={data.loading}
    >
      {formattedData.length > 0 ? (
        <Table
          bordered={true}
          dataSource={formattedData}
          columns={columns}
          pagination={false}
          size="small"
        />
      ) : (
        <NoData />
      )}
    </CollapsePanel>
  );
};

export default ACMGCriteria;
