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
    <ExternalLink href={`https://varsome.com/variant/hg38/${encodeURIComponent(locus)}`}>
      {verdict || 'No Verdict'}
    </ExternalLink>
  </Space>
);

export default AcmgVerdict;
