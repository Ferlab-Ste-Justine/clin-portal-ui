import intl from 'react-intl-universal';
import { InfoCircleOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Card, Col, Divider, Row, Spin, Tooltip, Typography } from 'antd';
import { ArrangerEdge } from 'graphql/models';
import { GeneEntity, VariantEntity } from 'graphql/variants/models';
import capitalize from 'lodash/capitalize';

import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatNumber } from 'utils/formatNumber';
import { formatTimestampToISODate } from 'utils/helper';

import styles from './index.module.scss';

interface OwnProps {
  loading: boolean;
  variant: VariantEntity | null;
  genes: ArrangerEdge<GeneEntity>[];
}

const { Text } = Typography;

const SummaryCard = ({ loading, variant, genes }: OwnProps) => (
  <Card className={styles.summaryCard}>
    <Spin spinning={loading}>
      <Row>
        <Col>
          <Card className={styles.infoCard}>
            <Row className={styles.row}>
              <Text className={styles.infoTitle}>
                {intl.get('screen.variantDetails.summaryTab.summaryTable.chromosome')}
              </Text>
              <Text className={styles.infoValue}>
                {variant ? formatNumber(variant.chromosome) : TABLE_EMPTY_PLACE_HOLDER}
              </Text>
            </Row>
            <Row className={styles.row}>
              <Text className={styles.infoTitle}>
                {intl.get('screen.variantDetails.summaryTab.summaryTable.start')}
              </Text>
              <Text className={styles.infoValue}>
                {variant ? formatNumber(variant?.start) : TABLE_EMPTY_PLACE_HOLDER}
              </Text>
            </Row>
            <Row className={styles.row}>
              <Text className={styles.infoTitle}>
                {intl.get('screen.variantDetails.summaryTab.summaryTable.alleleAlt')}
              </Text>
              <Text className={styles.infoValue}>{variant?.alternate}</Text>
            </Row>
            <Row className={styles.row}>
              <Text className={styles.infoTitle}>
                {intl.get('screen.variantDetails.summaryTab.summaryTable.alleleRef')}
              </Text>
              <Text className={styles.infoValue}>{variant?.reference}</Text>
            </Row>
          </Card>
        </Col>
        <Col className={styles.resumeContent}>
          <Row className={styles.row}>
            <Text className={styles.contentTitle}>
              {intl.get('screen.variantDetails.summaryTab.summaryTable.type')}
            </Text>
            <Text className={styles.contentValue}>
              {variant?.variant_class
                ? intl.get(variant.variant_class).defaultMessage(capitalize(variant.variant_class))
                : TABLE_EMPTY_PLACE_HOLDER}
            </Text>
          </Row>
          <Row className={styles.row}>
            <Text className={styles.contentTitle}>
              {intl.get('screen.variantDetails.summaryTab.summaryTable.cytoband')}
            </Text>
            <Text className={styles.contentValue}>
              {genes?.[0]?.node?.location || TABLE_EMPTY_PLACE_HOLDER}
            </Text>
          </Row>
          <Row className={styles.row}>
            <Text className={styles.contentTitle}>
              {intl.get('screen.variantDetails.summaryTab.summaryTable.genomeRef')}
            </Text>
            <Text className={styles.contentValue}>{variant?.assembly_version}</Text>
          </Row>
        </Col>
        <Divider className={styles.divider} type="vertical" />
        <Col className={styles.resumeContent}>
          <Row className={styles.row}>
            <Text className={styles.contentTitle}>ClinVar</Text>
            <Text className={styles.contentValue}>
              {variant?.clinvar?.clin_sig && variant?.clinvar.clinvar_id ? (
                <ExternalLink
                  href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${variant?.clinvar.clinvar_id}`}
                >
                  {variant?.clinvar.clin_sig.join(', ')}
                </ExternalLink>
              ) : (
                TABLE_EMPTY_PLACE_HOLDER
              )}
            </Text>
          </Row>
          <Row className={styles.row}>
            <Text className={styles.contentTitle}>dbSNP</Text>
            <Text className={styles.contentValue}>
              {variant?.rsnumber ? (
                <ExternalLink href={`https://www.ncbi.nlm.nih.gov/snp/${variant?.rsnumber}`}>
                  {variant?.rsnumber}
                </ExternalLink>
              ) : (
                TABLE_EMPTY_PLACE_HOLDER
              )}
            </Text>
          </Row>
        </Col>
        <Divider className={styles.divider} type="vertical" />
        <Col className={styles.resumeContent}>
          <Row className={styles.row}>
            <Text className={styles.contentTitle}>
              Patients{' '}
              <Tooltip
                title={intl.get('screen.variantDetails.summaryTab.patientTable.patient.tootltip')}
              >
                <InfoCircleOutlined />
              </Tooltip>
            </Text>
            <Text className={styles.contentValue}>
              {variant?.frequency_RQDM ? (
                <>{`${variant?.frequency_RQDM?.total.pc} /${variant?.frequency_RQDM?.total.pn}`}</>
              ) : (
                TABLE_EMPTY_PLACE_HOLDER
              )}
            </Text>
          </Row>
          <Row className={styles.row}>
            <Text className={styles.contentTitle}>
              {intl.get('screen.variantDetails.summaryTab.patientTable.frequency')}
            </Text>
            <Text className={styles.contentValue}>
              {variant?.frequency_RQDM
                ? variant?.frequency_RQDM.total?.af.toExponential(2)
                : TABLE_EMPTY_PLACE_HOLDER}
            </Text>
          </Row>
          <Row className={styles.row}>
            <Text className={styles.contentTitle}>{intl.get('annotationUpdate')}</Text>
            <Text className={styles.contentValue}>
              {variant?.last_annotation_update
                ? formatTimestampToISODate(variant?.last_annotation_update)
                : TABLE_EMPTY_PLACE_HOLDER}
            </Text>
          </Row>
        </Col>
      </Row>
    </Spin>
  </Card>
);

export default SummaryCard;
