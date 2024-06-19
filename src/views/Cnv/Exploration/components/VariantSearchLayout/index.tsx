import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import { SCROLL_WRAPPER_ID } from 'views/Cnv/utils/constant';

import LineStyleIcon from 'components/icons/LineStyleIcon';
import ContentWithHeader from 'components/Layout/ContentWithHeader';
import { ContentHeaderProps } from 'components/Layout/ContentWithHeader/Header';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';

import styles from './index.module.css';

interface OwnProps {
  contentHeaderProps: Omit<ContentHeaderProps, 'icon'>;
  menuItems: ISidebarMenuItem[];
  children: React.ReactElement;
}

const VariantSearchLayout = ({ contentHeaderProps, menuItems, children }: OwnProps) => (
  <ContentWithHeader
    headerProps={{
      ...contentHeaderProps,
      icon: <LineStyleIcon />,
    }}
    className={styles.variantLayout}
  >
    <SidebarMenu className={styles.sideMenu} menuItems={menuItems} />
    <ScrollContentWithFooter scrollId={SCROLL_WRAPPER_ID}>{children}</ScrollContentWithFooter>
  </ContentWithHeader>
);

export default VariantSearchLayout;
