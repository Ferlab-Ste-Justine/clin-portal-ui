import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Typography } from 'antd';
import { OmimCondition, OmimConditions } from 'graphql/variants/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

interface OwnProps {
  conditions: OmimConditions;
}

const { Text } = Typography;

const OmimConditionCell = ({ conditions }: OwnProps) => (
  <div>
    {conditions.length >= 0 &&
      conditions.map((omimCondition: OmimCondition, index: number) => {
        const geneOmimName = omimCondition.omimName ?? TABLE_EMPTY_PLACE_HOLDER;
        const omimId = omimCondition.omimId;

        return (
          <StackLayout key={index}>
            <Text>{geneOmimName}</Text>&nbsp;(OMIM:
            <ExternalLink key={index} href={`https://www.omim.org/entry/${omimId}`}>
              {omimId}
            </ExternalLink>
            )
          </StackLayout>
        );
      })}
  </div>
);

export default OmimConditionCell;
