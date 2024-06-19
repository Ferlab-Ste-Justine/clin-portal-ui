import React from 'react';
import intl from 'react-intl-universal';
import { Button, Descriptions, Modal, Space } from 'antd';
import cx from 'classnames';
import { DonorsEntity } from 'graphql/variants/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import GqLine from '../../GQLine';

import style from './index.module.css';

type Props = {
  donor: DonorsEntity | undefined;
  isModalOpen: boolean;
  handleCancel: () => void;
};

const SequencingMetricModal = ({ donor, isModalOpen, handleCancel }: Props) => (
  <Modal
    title={intl.get('screen.patientsnv.drawer.seq.method.parent')}
    visible={isModalOpen}
    onCancel={handleCancel}
    footer={[
      <Button key="back" onClick={handleCancel} type="primary">
        {intl.get('screen.patientsnv.drawer.modal.close')}
      </Button>,
    ]}
    width={740}
  >
    <Space>
      <Descriptions
        title={intl.get('MTH')}
        layout="horizontal"
        column={1}
        size="small"
        className={cx(style.description, 'description')}
      >
        <Descriptions.Item label={intl.get('screen.patientsnv.drawer.depth.quality')}>
          {donor?.mother_qd ?? TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('screen.patientsnv.drawer.allprof')}>
          {donor?.mother_ad_alt ?? TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('screen.patientsnv.drawer.alltotal')}>
          {donor?.mother_ad_total ?? TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('screen.patientsnv.drawer.allratio')}>
          {donor?.mother_ad_ratio || typeof donor?.mother_ad_ratio === 'number'
            ? donor?.mother_ad_ratio.toFixed(2)
            : TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('screen.patientsnv.drawer.gq')}>
          {<GqLine value={donor?.mother_gq} />}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('screen.patientsnv.drawer.filter')}>
          {donor?.filters}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title={intl.get('FTH')}
        layout="horizontal"
        column={1}
        size="small"
        className={cx(style.description, 'description')}
      >
        <Descriptions.Item label={intl.get('screen.patientsnv.drawer.depth.quality')}>
          {donor?.father_qd ?? TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('screen.patientsnv.drawer.allprof')}>
          {donor?.father_ad_alt ?? TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('screen.patientsnv.drawer.alltotal')}>
          {donor?.father_ad_total ?? TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('screen.patientsnv.drawer.allratio')}>
          {donor?.father_ad_ratio || typeof donor?.father_ad_ratio === 'number'
            ? donor?.father_ad_ratio.toFixed(2)
            : TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('screen.patientsnv.drawer.gq')}>
          {<GqLine value={donor?.father_gq} />}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('screen.patientsnv.drawer.filter')}>
          {donor?.filters}
        </Descriptions.Item>
      </Descriptions>
    </Space>
  </Modal>
);

export default SequencingMetricModal;
