import React from 'react';
import intl from 'react-intl-universal';
import { CloseOutlined, DownloadOutlined } from '@ant-design/icons';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Button, Descriptions, Divider, Drawer, Space, Tooltip } from 'antd';
import { Rpt } from 'auth/types';
import cx from 'classnames';
import { DonorsEntity } from 'graphql/variants/models';
import capitalize from 'lodash/capitalize';

import ExternalLinkIcon from 'components/icons/ExternalLinkIcon';
import FemaleAffectedIcon from 'components/icons/FemaleAffectedIcon';
import FemaleNotAffectedIcon from 'components/icons/FemaleNotAffectedIcon';
import MaleAffectedIcon from 'components/icons/MaleAffectedIcon';
import MaleNotAffectedIcon from 'components/icons/MaleNotAffectedIcon';
import { ReportNames } from 'store/reports/types';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import ReportButton from '../Report/DownloadButton';

import { HcComplementDescription } from './HcDescription';

import style from './index.module.scss';

interface OwnProps {
  patientId: string;
  opened?: boolean;
  toggle: (opened: boolean) => void;
  loadingRpt: boolean;
  rpt: Rpt;
  donor: DonorsEntity | undefined;
  toggleModal: any;
  modalOpened: boolean;
  variantId: string;
}

const getParentTitle = (who: 'mother' | 'father', id: string, affected: boolean) => {
  let AffectedIcon = null;

  if (affected) {
    AffectedIcon = who === 'mother' ? FemaleAffectedIcon : MaleAffectedIcon;
  } else {
    AffectedIcon = who === 'mother' ? FemaleNotAffectedIcon : MaleNotAffectedIcon;
  }

  return (
    <span className={cx(style.parentStatusTitle, 'parentStatusTitle')}>
      {`${intl.get(`screen.patientvariant.drawer.${who}.genotype`)} ${id ? `(${id})` : ''}`}
      {affected !== null ? (
        <Tooltip
          placement="right"
          title={
            affected
              ? intl.get('screen.patientvariant.drawer.affected')
              : intl.get('screen.patientvariant.drawer.notaffected')
          }
        >
          <span className={cx(style.parentStatusIconWrapper, 'parentStatusIconWrapper')}>
            <AffectedIcon className={cx(style.parentStatusIcon, 'parentStatusIcon')} />
          </span>
        </Tooltip>
      ) : undefined}
    </span>
  );
};

const OccurrenceDrawer = ({
  donor,
  patientId,
  opened = false,
  toggle,
  loadingRpt,
  rpt,
  toggleModal,
  variantId,
}: OwnProps) => (
  <Drawer
    title={<Tooltip title={variantId}>Occurrence</Tooltip>}
    placement="right"
    onClose={() => toggle(!opened)}
    visible={opened}
    closeIcon={<CloseOutlined size={16} />}
    width={500}
    className={cx(style.occurenceDrawer, 'occurenceDrawer')}
  >
    <Space size="large" direction="vertical">
      <Descriptions column={1} className={cx(style.description, 'description')}>
        <Descriptions.Item label={'Variant'}>
          {variantId ?? TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
        <Descriptions.Item label={'Patient'}>
          {patientId ?? TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        column={1}
        className={cx(style.description, 'description')}
        title={capitalize(intl.get('zygosity'))}
      >
        <Descriptions.Item label={capitalize(intl.get('zygosity'))}>
          {donor?.zygosity ?? TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
        <Descriptions.Item label={capitalize(intl.get('compound.heterozygous.abbrev', { num: 0 }))}>
          <HcComplementDescription
            hcComplements={donor?.hc_complement}
            defaultText={TABLE_EMPTY_PLACE_HOLDER}
          />
        </Descriptions.Item>
        <Descriptions.Item
          label={capitalize(intl.get('potential.compound.heterozygous.abbrev', { num: 0 }))}
        >
          <HcComplementDescription
            hcComplements={donor?.possibly_hc_complement}
            defaultText={TABLE_EMPTY_PLACE_HOLDER}
          />
        </Descriptions.Item>
      </Descriptions>
      {(donor?.father_id || donor?.mother_id) && (
        <Descriptions
          title={capitalize(intl.get('family'))}
          column={1}
          className={cx(style.description, 'description')}
        >
          {donor?.mother_id && (
            <Descriptions.Item
              label={getParentTitle('mother', donor?.mother_id!, donor?.mother_affected_status!)}
            >
              {donor?.mother_calls ? donor?.mother_calls.join('/') : TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
          )}
          {donor?.father_id && (
            <Descriptions.Item
              label={getParentTitle('father', donor?.father_id!, donor?.father_affected_status!)}
            >
              {donor?.father_calls ? donor?.father_calls.join('/') : TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
          )}
          <Descriptions.Item label={intl.get('screen.patientvariant.drawer.transmission')}>
            {removeUnderscoreAndCapitalize(donor?.transmission! || '').defaultMessage(
              TABLE_EMPTY_PLACE_HOLDER,
            )}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('screen.patientvariant.drawer.parental.origin')}>
            {donor?.parental_origin
              ? capitalize(intl.get(donor?.parental_origin))
              : TABLE_EMPTY_PLACE_HOLDER}
          </Descriptions.Item>
        </Descriptions>
      )}
      <Descriptions
        title={intl.get('screen.patientvariant.drawer.seq.method')}
        column={1}
        className={cx(style.description, 'description')}
      >
        <Descriptions.Item label={intl.get('screen.patientvariant.drawer.depth.quality')}>
          {donor?.qd ?? TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('screen.patientvariant.drawer.allprof')}>
          {donor?.ad_alt ?? TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('screen.patientvariant.drawer.alltotal')}>
          {donor?.ad_total ?? TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('screen.patientvariant.drawer.allratio')}>
          {donor?.ad_ratio ? donor?.ad_ratio.toFixed(2) : TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('screen.patientvariant.drawer.gq')}>
          {donor?.gq ? donor.gq : TABLE_EMPTY_PLACE_HOLDER}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('screen.patientvariant.drawer.filter')}>
          {donor?.filters}
        </Descriptions.Item>
      </Descriptions>
      <Divider style={{ margin: 0 }} />
      <Space>
        <Button
          loading={loadingRpt}
          disabled={loadingRpt || !rpt}
          type="primary"
          onClick={() => toggleModal(true)}
        >
          {intl.get('open.in.igv')}
          <ExternalLinkIcon height="14" width="14" className="anticon" />
        </Button>
        <ReportButton
          icon={<DownloadOutlined width={'16'} height={'16'} />}
          patientId={patientId}
          variantId={variantId}
          name={ReportNames.transcript}
          tooltipTitle={intl.get('screen.patientvariant.drawer.download.report.tooltip')}
          size={'middle'}
        />
      </Space>
    </Space>
  </Drawer>
);

export default OccurrenceDrawer;
