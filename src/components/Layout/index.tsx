import React from 'react';
import { Link } from 'react-router-dom';
import WidgetTourButton from '@ferlab/ui/core/components/WidgetTourButton';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { Layout as AntLayout, MenuProps } from 'antd';

import Header from 'components/Layout/Header';
import { MAIN_SCROLL_WRAPPER_ID } from 'utils/constants';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

interface OwnProps {
  children: React.ReactElement;
}

const items: MenuProps['items'] = [
  {
    children: [
      {
        key: '1',
        label: <Link to={STATIC_ROUTES.SNV_EXPLORATION_RQDM}>Query Builder</Link>,
      },
    ],
    key: '1',
    label: 'Data Explorer',
    type: 'group',
  },
  {
    key: '2',
    type: 'divider',
  },
  {
    children: [
      {
        key: '3',
        label: 'Query Builder',
      },
      {
        key: '4',
        label: 'Facettes',
      },
    ],
    key: '3',
    label: 'Variant Explorer',
    type: 'group',
  },
  {
    key: '4',
    type: 'divider',
  },
  {
    children: [
      {
        key: '5',
        label: 'Saved Filters',
      },
      {
        key: '6',
        label: 'Saved Sets',
      },
    ],
    key: '5',
    label: 'Dashboard',
    type: 'group',
  },
  {
    key: '6',
    type: 'divider',
  },
  {
    children: [
      {
        key: '7',
        label: 'Query Builder',
      },
      {
        key: '8',
        label: 'Facettes',
      },
    ],
    key: '7',
    label: 'Studies Explorer',
    type: 'group',
  },
];

const PageLayout = ({ children }: OwnProps) => (
  <AntLayout className={styles.mainLayout}>
    <Header />
    <ScrollContent id={MAIN_SCROLL_WRAPPER_ID} className={styles.mainContent}>
      <div id="content">{children}</div>
    </ScrollContent>
    <WidgetTourButton items={items} />
  </AntLayout>
);

export default PageLayout;
