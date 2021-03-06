import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Checkbox, Form, Input, Radio, Space } from 'antd';
import { isEmpty } from 'lodash';

import {
  checkShouldUpdate,
  getNamePath,
  setFieldValue,
  setInitialValues,
} from 'components/Prescription/utils/form';
import { formatRamq, RAMQ_PATTERN } from 'components/Prescription/utils/ramq';
import { IAnalysisFormPart, IGetNamePathParams } from 'components/Prescription/utils/type';
import RadioDateFormItem from 'components/uiKit/form/RadioDateFormItem';
import RadioGroupSex from 'components/uiKit/form/RadioGroupSex';
import { calculateGestationalAgeFromDDM, calculateGestationalAgeFromDPA } from 'utils/age';
import { SexValue } from 'utils/commonTypes';

import GestationalAge from './GestationalAge';

import styles from './index.module.scss';

type OwnProps = IAnalysisFormPart & {
  showNewBornSection?: boolean;
  initialData?: IAddInfoDataType;
};

enum GestationalAgeValues {
  DDM = 'ddm',
  DPA = 'dpa',
  DEAD_FOETUS = 'dead_foetus',
}

export enum ADD_INFO_FI_KEY {
  GESTATIONAL_AGE = 'additional_info_gestational_age',
  GESTATIONAL_AGE_DDM = 'additional_info_gestational_age_ddm',
  GESTATIONAL_AGE_DPA = 'additional_info_gestational_age_dpa',
  PRENATAL_DIAGNOSIS = 'additional_info_prenatal_diagnosis',
  FOETUS_SEX = 'additional_info_foetus_sex',
  NEW_BORN = 'additional_info_new_born',
  MOTHER_RAMQ_NUMBER = 'additional_info_mother_ramq_number',
}

export interface IAddInfoDataType {
  [ADD_INFO_FI_KEY.GESTATIONAL_AGE]: string;
  [ADD_INFO_FI_KEY.GESTATIONAL_AGE_DDM]: string;
  [ADD_INFO_FI_KEY.GESTATIONAL_AGE_DPA]: string;
  [ADD_INFO_FI_KEY.PRENATAL_DIAGNOSIS]: boolean;
  [ADD_INFO_FI_KEY.FOETUS_SEX]: SexValue;
  [ADD_INFO_FI_KEY.NEW_BORN]: boolean;
  [ADD_INFO_FI_KEY.MOTHER_RAMQ_NUMBER]: string;
}

const AdditionalInformation = ({
  form,
  parentKey,
  showNewBornSection = false,
  initialData,
}: OwnProps) => {
  const [localShowNewBorn, setLocalShowNewBorn] = useState(showNewBornSection);
  const [gestationalAgeDPA, setGestationalAgeDPA] = useState<number | undefined>(undefined);
  const [gestationalAgeDDM, setGestationalAgeDDM] = useState<number | undefined>(undefined);

  const getName = (...key: IGetNamePathParams) => getNamePath(parentKey, key);

  useEffect(() => {
    if (localShowNewBorn !== showNewBornSection) {
      setLocalShowNewBorn(showNewBornSection);
    }
    // eslint-disable-next-line
  }, [showNewBornSection]);

  useEffect(() => {
    if (initialData && !isEmpty(initialData)) {
      if (initialData.additional_info_gestational_age_ddm) {
        setGestationalAgeDDM(
          calculateGestationalAgeFromDDM(new Date(initialData.additional_info_gestational_age_ddm)),
        );
      }

      if (initialData.additional_info_gestational_age_dpa) {
        setGestationalAgeDPA(
          calculateGestationalAgeFromDPA(new Date(initialData.additional_info_gestational_age_dpa)),
        );
      }

      setInitialValues(form, getName, initialData, ADD_INFO_FI_KEY);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.patientAddInfoWrapper}>
      <Form.Item
        label={intl.get('prescription.patient.identification.prenatal.diagnosis')}
        name={getName(ADD_INFO_FI_KEY.PRENATAL_DIAGNOSIS)}
        valuePropName="checked"
      >
        <Checkbox disabled={form.getFieldValue(getName(ADD_INFO_FI_KEY.NEW_BORN))}>Oui</Checkbox>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prev, next) =>
          checkShouldUpdate(prev, next, [getName(ADD_INFO_FI_KEY.PRENATAL_DIAGNOSIS)])
        }
      >
        {({ getFieldValue }) =>
          getFieldValue(getName(ADD_INFO_FI_KEY.PRENATAL_DIAGNOSIS)) ? (
            <>
              <Form.Item
                name={getName(ADD_INFO_FI_KEY.FOETUS_SEX)}
                label={intl.get('prescription.patient.identification.sexe.foetus')}
                rules={[{ required: true }]}
              >
                <RadioGroupSex />
              </Form.Item>
              <Form.Item
                label={intl.get('prescription.patient.identification.gestational.age')}
                name={getName(ADD_INFO_FI_KEY.GESTATIONAL_AGE)}
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Space direction="vertical" className={styles.verticalRadioWrapper}>
                    <RadioDateFormItem
                      title={intl.get('prescription.patient.identification.last.ddm.date')}
                      radioProps={{
                        value: GestationalAgeValues.DDM,
                        name: GestationalAgeValues.DDM,
                      }}
                      dateInputProps={{
                        formItemProps: {
                          name: getName(ADD_INFO_FI_KEY.GESTATIONAL_AGE_DDM),
                          required: true,
                        },
                        extra: <GestationalAge value={gestationalAgeDDM} />,
                        onValidate: (valid, value) => {
                          if (!valid && gestationalAgeDDM) {
                            setGestationalAgeDDM(undefined);
                          } else {
                            setGestationalAgeDDM(calculateGestationalAgeFromDDM(value));
                          }
                        },
                      }}
                      parentFormItemName={getName(ADD_INFO_FI_KEY.GESTATIONAL_AGE)}
                    />
                    <RadioDateFormItem
                      title={intl.get('prescription.patient.identification.last.dpa.date')}
                      radioProps={{
                        value: GestationalAgeValues.DPA,
                        name: GestationalAgeValues.DPA,
                      }}
                      dateInputProps={{
                        formItemProps: {
                          name: getName(ADD_INFO_FI_KEY.GESTATIONAL_AGE_DPA),
                          required: true,
                        },
                        extra: <GestationalAge value={gestationalAgeDPA} />,
                        onValidate: (valid, value) => {
                          if (!valid && gestationalAgeDPA) {
                            setGestationalAgeDPA(undefined);
                          } else {
                            setGestationalAgeDPA(calculateGestationalAgeFromDPA(value));
                          }
                        },
                      }}
                      parentFormItemName={getName(ADD_INFO_FI_KEY.GESTATIONAL_AGE)}
                    />
                    <Radio value={GestationalAgeValues.DEAD_FOETUS}>Foetus d??c??d??</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </>
          ) : null
        }
      </Form.Item>
      {localShowNewBorn && (
        <>
          <Form.Item
            label={intl.get('prescription.patient.identification.new.born')}
            name={getName(ADD_INFO_FI_KEY.NEW_BORN)}
            valuePropName="checked"
          >
            <Checkbox disabled={form.getFieldValue(getName(ADD_INFO_FI_KEY.PRENATAL_DIAGNOSIS))}>
              Oui
            </Checkbox>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prev, next) =>
              checkShouldUpdate(prev, next, [getName(ADD_INFO_FI_KEY.NEW_BORN)])
            }
          >
            {({ getFieldValue }) =>
              getFieldValue(getName(ADD_INFO_FI_KEY.NEW_BORN)) ? (
                <Form.Item
                  label={intl.get('prescription.patient.identification.mother.ramq')}
                  name={getName(ADD_INFO_FI_KEY.MOTHER_RAMQ_NUMBER)}
                  rules={[{ type: 'regexp', pattern: RAMQ_PATTERN }]}
                  wrapperCol={{ span: 10, sm: 12, xxl: 6 }}
                >
                  <Input
                    placeholder="AAAA 0000 0000"
                    onChange={(e) =>
                      setFieldValue(
                        form,
                        getName(ADD_INFO_FI_KEY.MOTHER_RAMQ_NUMBER),
                        formatRamq(e.currentTarget.value),
                      )
                    }
                  />
                </Form.Item>
              ) : null
            }
          </Form.Item>
        </>
      )}
    </div>
  );
};

export default AdditionalInformation;
