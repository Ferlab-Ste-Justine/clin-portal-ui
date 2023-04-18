import { Space } from 'antd';

import QgBadgeIcon from 'components/icons/QgBadgeIcon';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import style from './index.module.scss';

interface OwnProps {
  value?: number;
}

const GqLine = ({ value }: OwnProps) =>
  value || typeof value === 'number' ? (
    <Space align="center">
      {value < 20 ? <QgBadgeIcon svgClass={style.low} /> : <QgBadgeIcon svgClass={style.high} />}
      {value}
    </Space>
  ) : (
    <>{TABLE_EMPTY_PLACE_HOLDER}</>
  );

export default GqLine;
