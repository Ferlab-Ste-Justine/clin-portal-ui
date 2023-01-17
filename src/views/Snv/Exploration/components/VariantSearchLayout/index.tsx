import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';

import LineStyleIcon from 'components/icons/LineStyleIcon';
import ContentWithHeader from 'components/Layout/ContentWithHeader';
import { ContentHeaderProps } from 'components/Layout/ContentWithHeader/Header';
import FixedContentWithFooter from 'components/Layout/FixedContentWithFooter/Index';

import styles from './index.module.scss';

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
    <FixedContentWithFooter>{children}</FixedContentWithFooter>
  </ContentWithHeader>
);

export default VariantSearchLayout;
