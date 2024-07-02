import { DefaultRawDatum, PieSvgProps, ResponsivePie } from '@nivo/pie';
import { Typography } from 'antd';
import { TitleProps } from 'antd/lib/typography/Title';

import { getCommonColors } from 'utils/charts';

import styles from './index.module.css';

type OwnProps = Omit<PieSvgProps<DefaultRawDatum>, 'width' | 'height'> & {
  title?: string;
  titleSize?: TitleProps['level'];
  height: number;
  width?: number | string;
};

const { Title } = Typography;

const PieChart = ({
  title,
  titleSize = 5,
  height,
  width = 'unset',
  enableArcLabels = false,
  enableArcLinkLabels = false,
  ...rest
}: OwnProps) => (
  <div className={styles.pieChartWrapper}>
    {title && <Title level={titleSize}>{title}</Title>}
    <div className={styles.chartWrapper} style={{ height: height, width: width }}>
      <ResponsivePie
        {...rest}
        colors={rest.colors || getCommonColors()}
        enableArcLabels={enableArcLabels}
        enableArcLinkLabels={enableArcLinkLabels}
        onMouseEnter={(_, e: any) => {
          if (rest.onMouseEnter) {
            rest.onMouseEnter(_, e);
            e.target.style.cursor = 'pointer';
          }
        }}
      />
    </div>
  </div>
);

export default PieChart;
