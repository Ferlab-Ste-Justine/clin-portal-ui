import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Space } from 'antd';

import AcmgNoVerdictCheck from 'components/icons/AcmgNoVerdictCheck';
import AcmgVerdictCheck from 'components/icons/AcmgVerdictCheck';

interface OwnProps {
  verdict?: string;
  locus: string;
}

const AcmgVerdict = ({ verdict, locus }: OwnProps) => (
  <Space>
    {verdict ? <AcmgVerdictCheck /> : <AcmgNoVerdictCheck />}
    <ExternalLink href={`https://varsome.com/variant/${encodeURIComponent(locus)}`}>
      {verdict || intl.get('screen.patientvariant.results.table.noVerdict')}
    </ExternalLink>
  </Space>
);

export default AcmgVerdict;
