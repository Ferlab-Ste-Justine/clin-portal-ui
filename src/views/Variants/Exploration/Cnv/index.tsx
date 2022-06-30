import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { Card, Dropdown, Menu, Space, Tag } from 'antd';
import { FhirApi } from 'api/fhir';
import { ServiceRequestEntity } from 'api/fhir/models';
//import { useCnv } from 'graphql/cnv/actions';
import { ITableCnvEntity } from 'graphql/cnv/models';
import { getPositionTag } from 'graphql/prescriptions/helper';

import LineStyleIcon from 'components/icons/LineStyleIcon';
import ContentWithHeader from 'components/Layout/ContentWithHeader';
import { useGlobals } from 'store/global';

import { getCnvColumns } from './cnvColumns';

import style from './index.module.scss';

const CnvExplorationPatient = () => {
  const { patientid, prescriptionid } = useParams<{ patientid: string; prescriptionid: string }>();
  const [headerLoading, setHeaderLoading] = useState(false);
  const [prescription, setPrescription] = useState<ServiceRequestEntity>();
  const { getAnalysisNameByCode } = useGlobals();

  useEffect(() => {
    setHeaderLoading(true);
    FhirApi.fetchServiceRequestEntity(prescriptionid)
      .then(({ data }) => setPrescription(data?.data.ServiceRequest))
      .finally(() => setHeaderLoading(false));
  }, []);

  // TODO ajouter donnée
  /*   const CnvResults = useCnv({
    first: 20,
    offset: 0,
    sqon: {
      content: [
        {
          content: {
            field: 'patient_id',
            value: ['482684'],
          },
          op: 'in',
        },
      ],
      op: 'and',
    },
  });

  console.log('CnvResults', CnvResults); */

  const variantMenu = (
    <Menu
      items={[
        {
          label: (
            <Link key="snv" to={`/snv-exploration/patient/${patientid}/${prescriptionid}`}>
              snv
            </Link>
          ),
          key: 'snv',
        },
        {
          label: (
            <Link key="cnv" to={`/cnv-exploration/patient/${patientid}/${prescriptionid}`}>
              cnv
            </Link>
          ),
          key: 'cnv',
        },
      ]}
    />
  );
  return (
    <ContentWithHeader
      headerProps={{
        icon: <LineStyleIcon />,
        title: intl.get('screen.cnvsearch.title'),
        extra: [
          <Tag color="blue" key="patient-prescription-id">
            <Space align="center">
              {`Patient ID : ${patientid}`} | {`Prescription ID : ${prescriptionid}`}
            </Space>
          </Tag>,
          <div key="analsysis-name">
            {prescription && <Tag color="geekblue">{getAnalysisNameByCode(prescription.code)}</Tag>}
          </div>,
          getPositionTag(prescription, patientid),
        ],
        loading: headerLoading,
        actions: [
          <Dropdown.Button trigger={['click']} key="cnv" type="primary" overlay={variantMenu}>
            {intl.get('screen.prescription.entity.see.variant')}
          </Dropdown.Button>,
        ],
      }}
    >
      {/*             <Sidebar
        queryBuilderId={PRESCRIPTION_QB_ID}
        isLoading={prescriptions.loading}
        aggregations={prescriptions.aggregations}
        extendedMapping={extendedMapping}
        filters={activeQuery as ISqonGroupFilter}
      /> */}
      <Card>
        <ProTable<ITableCnvEntity>
          tableId="variant_table"
          className={style.variantSearchTable}
          wrapperClassName={style.variantTabWrapper}
          columns={getCnvColumns()}
          bordered
          headerConfig={{
            itemCount: {
              pageIndex: 1,
              pageSize: 1,
              total: 0,
            },
            enableColumnSort: true,
          }}
          size="small"
        />
      </Card>
    </ContentWithHeader>
  );
};

export default CnvExplorationPatient;
