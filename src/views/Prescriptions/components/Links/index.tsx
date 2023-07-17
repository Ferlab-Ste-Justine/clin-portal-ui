import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { FileTextOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { extractServiceRequestId } from 'api/fhir/helper';

import { LimitTo, Roles } from 'components/Roles/Rules';
import { STATIC_ROUTES } from 'utils/routes';

interface OwnProps {
  prescriptionId: string;
  withDownload?: boolean;
}

const Links = ({ prescriptionId, withDownload = true }: OwnProps) => (
  <Space size="middle">
    {withDownload && (
      <LimitTo roles={[Roles.Download]}>
        <Link
          to={`${STATIC_ROUTES.ARCHIVE_EXPLORATION}?search=${extractServiceRequestId(
            prescriptionId,
          )}`}
          data-cy={`ArchiveLink_${extractServiceRequestId(prescriptionId)}`}
        >
          <Space size={4}>
            <FileTextOutlined />
            {intl.get('links.files')}
          </Space>
        </Link>
      </LimitTo>
    )}
  </Space>
);

export default Links;
