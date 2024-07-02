import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { getPractitionnerName } from '@ferlab/ui/core/components/Assignments/AssignmentsFilter';
import AssignmentsSelect from '@ferlab/ui/core/components/Assignments/AssignmentsSelect';
import AssignmentsTag from '@ferlab/ui/core/components/Assignments/AssignmentsTag';
import { TPractitionnerInfo } from '@ferlab/ui/core/components/Assignments/types';
import { Card, Descriptions, Space, Tag } from 'antd';
import { FhirApi } from 'api/fhir';
import { extractOrganizationId, extractServiceRequestId } from 'api/fhir/helper';
import { PractitionerRole, RequesterType, ServiceRequestEntity } from 'api/fhir/models';
import PriorityTag from 'views/Prescriptions/components/PriorityTag';
import StatusTag from 'views/Prescriptions/components/StatusTag';
import { EMPTY_FIELD } from 'views/Prescriptions/Entity/constants';
import {
  getPrescriptionStatusDictionnary,
  prescriptionPriorityDictionnary,
} from 'views/Prescriptions/utils/constant';
import { getPractitionerInfoList, putUserFirst } from 'views/Prescriptions/utils/export';

import { Roles, validate } from 'components/Roles/Rules';
import ParagraphLoader from 'components/uiKit/ParagraphLoader';
import { useRpt } from 'hooks/useRpt';
import { useGlobals } from 'store/global';
import { useUser } from 'store/user';
import { formatDate } from 'utils/date';
import { getAssignmentDictionary } from 'utils/translation';

import { formatServiceRequestTag } from '../Tabs/Variants/utils';

import styles from './index.module.css';

interface OwnProps {
  prescription?: ServiceRequestEntity;
  loading: boolean;
}

const getPractionnerName = (requester: RequesterType) => {
  const practitionerName = `${requester.practitioner?.name.family.toLocaleUpperCase()}
  ${requester.practitioner?.name?.given?.join(' ')}`;

  const practitionerIdentifier = requester.practitioner?.identifier?.value;
  return `${practitionerName} ${practitionerIdentifier ? `- ${practitionerIdentifier}` : ''}`;
};

const renderTagList = (
  selectedAssignment: string[],
  practitionerInfoList: TPractitionnerInfo[],
) => {
  if (selectedAssignment.length > 0) {
    const assignedPractionnerRoles = practitionerInfoList.filter((p) =>
      selectedAssignment.includes(p.practitionerRoles_Id),
    );
    return assignedPractionnerRoles.map((info) => (
      <div className={styles.assigmentItem} key={info.practitionerRoles_Id}>
        <AssignmentsTag
          email={info.email ? info.email : ''}
          name={getPractitionnerName(info?.name)}
          organization={info?.ldm}
        />
      </div>
    ));
  } else {
    return (
      <AssignmentsTag dictionary={getAssignmentDictionary()} background={false} unAssign={true} />
    );
  }
};

const AnalysisCard = ({ prescription, loading }: OwnProps) => {
  const { getAnalysisNameByCode } = useGlobals();
  const [loadingSelect, setLoadingSelect] = useState<boolean>();
  const [selectedAssignment, setSelectedAssignment] = useState<string[]>([]);

  useEffect(() => {
    if (!loading && prescription?.performer) {
      const performerPactitionerRoles = prescription?.performer.filter((r) =>
        r.reference.includes('PractitionerRole'),
      );

      const performerPactitionerRolesID = performerPactitionerRoles.map(
        (p) => p.reference.split('/')[1],
      );
      setSelectedAssignment(performerPactitionerRolesID);
    }
  }, [loading, prescription?.performer]);

  const { user } = useUser();
  const practitionerRolesBundle = user.practitionerRolesBundle;

  const { decodedRpt } = useRpt();
  const canAssign = decodedRpt ? validate([Roles.Variants], decodedRpt, false) : false;
  let practitionerInfoList = getPractitionerInfoList(practitionerRolesBundle);
  if (decodedRpt) {
    const userPractitionerId = decodedRpt.fhir_practitioner_id;
    const userPractionnerRoles: PractitionerRole | undefined = practitionerRolesBundle?.find(
      (p) => {
        if (p.resourceType === 'PractitionerRole') {
          const pr = p as PractitionerRole;
          return pr.practitioner?.reference.split('/')[1] === userPractitionerId;
        }
      },
    ) as PractitionerRole;

    if (userPractionnerRoles) {
      practitionerInfoList = putUserFirst(practitionerInfoList, userPractionnerRoles);
    }
  }

  const handleSelect = (practitionerRoles_ids: string[]) => {
    if (
      [...(practitionerRoles_ids || [])]?.sort().toString() !==
      [...(selectedAssignment || [])]?.sort().toString()
    ) {
      setLoadingSelect(true);
      FhirApi.prescriptionAssignment(
        prescription?.id ? extractServiceRequestId(prescription?.id) : '',
        practitionerRoles_ids,
      )
        .then(({ data }) => {
          setSelectedAssignment(data?.assignments ? data.assignments : []);
        })
        .finally(() => {
          setLoadingSelect(false);
        });
    }
  };
  const getOrganizationReference = prescription?.performer.find((r) =>
    r.reference.includes('Organization'),
  );

  const analysisCode = prescription?.code?.[0] || '';
  const sequencingCode = prescription?.code?.[1] || '';

  return (
    <Card title={intl.get(`screen.prescription.entity.analyse.card.title`)} data-cy="AnalysisCard">
      <ParagraphLoader loading={loading} paragraph={{ rows: 5 }}>
        {prescription && (
          <Descriptions column={1} size="small" className="label-35">
            <Descriptions.Item label={intl.get('screen.prescription.entity.identifier')}>
              {extractServiceRequestId(prescription?.id)}
            </Descriptions.Item>
            {
              <Descriptions.Item label={intl.get('assignment.title')}>
                {canAssign ? (
                  <AssignmentsSelect
                    dictionary={getAssignmentDictionary()}
                    options={practitionerInfoList}
                    handleSelect={handleSelect}
                    assignedPractionnerRoles={selectedAssignment}
                    loading={loadingSelect}
                  />
                ) : (
                  <div className={styles.assigmentList}>
                    <Space size={4} wrap>
                      {renderTagList(selectedAssignment, practitionerInfoList)}
                    </Space>
                  </div>
                )}
              </Descriptions.Item>
            }
            <Descriptions.Item label={intl.get('screen.prescription.entity.analysisCard.priority')}>
              {prescription?.priority ? (
                <PriorityTag
                  dictionaries={prescriptionPriorityDictionnary()}
                  priority={prescription?.priority}
                />
              ) : (
                '--'
              )}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('status')}>
              <StatusTag
                dictionary={getPrescriptionStatusDictionnary()}
                status={prescription?.status}
              />
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.get('screen.prescription.entity.analysisCard.askedAnalysis')}
            >
              <Tag color="geekblue">
                {formatServiceRequestTag(getAnalysisNameByCode(analysisCode), sequencingCode)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.get('screen.prescription.entity.analysisCard.reflexpanel')}
            >
              {prescription.orderDetail ? prescription.orderDetail.text.split(':')[1] : EMPTY_FIELD}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('screen.patientsearch.table.createdOn')}>
              {formatDate(prescription?.authoredOn)}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.get('screen.prescription.entity.patient.card.requester')}
            >
              {prescription?.requester ? getPractionnerName(prescription.requester) : EMPTY_FIELD}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('prescribing.institution')}>
              {extractOrganizationId(
                prescription?.subject.resource?.managingOrganization?.reference
                  ? prescription.subject.resource.managingOrganization.reference
                  : EMPTY_FIELD,
              )}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('screen.patientsearch.table.ldm')}>
              {extractOrganizationId(
                getOrganizationReference?.reference ? getOrganizationReference.reference : '--',
              )}
            </Descriptions.Item>
          </Descriptions>
        )}
      </ParagraphLoader>
    </Card>
  );
};

export default AnalysisCard;
