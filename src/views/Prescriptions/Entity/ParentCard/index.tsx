import intl from 'react-intl-universal';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Descriptions, Divider, Space, Typography } from 'antd';
import { ServiceRequestEntity, ServiceRequestEntityExtension } from 'api/fhir/models';
import { getPatientAffectedStatus } from 'api/fhir/patientHelper';
import { get } from 'lodash';
import { ClinicalSign } from 'views/Prescriptions/Entity/ClinicalInformationCard/components/ClinicalSign';

import CollapsePanel from 'components/containers/collapse';
import ParagraphLoader from 'components/uiKit/ParagraphLoader';

import PatientContent from '../PatientCard/PatientContent';
import RequestTable from '../RequestTable';

const { Title } = Typography;

interface OwnProps {
  extension?: ServiceRequestEntityExtension;
  prescription?: ServiceRequestEntity;
  loading: boolean;
}

const ParentCard = ({ extension, loading, prescription }: OwnProps) => {
  const phenotype: string[] = [];
  const generalObservation =
    extension?.extension?.[1].valueReference?.resource.clinicalImpressions[0].investigation[0].item?.find(
      (item) => get(item, 'item.code.coding.code') === 'OBSG',
    );

  extension?.extension?.[1].valueReference?.resource.clinicalImpressions[0].investigation[0].item
    ?.filter((item) => get(item, 'item.code.coding.code') === 'PHEN')
    .forEach((item) => phenotype.push(item.reference));

  return (
    <ParagraphLoader loading={loading} paragraph={{ rows: 6 }}>
      {extension?.extension?.length && (
        <CollapsePanel
          header={
            <Title level={4}>
              {intl.get(get(extension?.extension[0].valueCoding, 'coding[0].code', ''))}
            </Title>
          }
          datacy={`ParentCard_${intl.get(
            get(extension?.extension[0].valueCoding, 'coding[0].code', ''),
          )}`}
        >
          <Space direction="vertical" size="large">
            <GridCard
              content={
                <>
                  <PatientContent
                    patient={extension?.extension[1].valueReference?.resource!}
                    reference={prescription?.subject?.resource?.managingOrganization?.reference}
                    labelClass="label-20"
                  />
                  <Divider />
                  <Descriptions column={1} size="small" className="label-20">
                    <Descriptions.Item
                      label={intl.get('screen.prescription.entity.parent.affectedStatus')}
                    >
                      {intl.get(getPatientAffectedStatus(extension))}
                    </Descriptions.Item>
                  </Descriptions>
                  {prescription && (phenotype.length > 0 || generalObservation) && (
                    <>
                      <p style={{ marginBottom: '.5em' }} />
                      <ClinicalSign
                        phenotypeIds={phenotype}
                        generalObervationId={generalObservation?.reference}
                        prescriptionCode={prescription.code[0]}
                      />
                    </>
                  )}
                </>
              }
            />
            <RequestTable data={extension?.extension[1].valueReference?.resource?.requests ?? []} />
          </Space>
        </CollapsePanel>
      )}
    </ParagraphLoader>
  );
};

export default ParentCard;
