import { ArgsProps as MessageArgsProps, NoticeType } from 'antd/lib/message';
import { ArgsProps as NotificationArgsProps } from 'antd/lib/notification';

import { LANG } from 'utils/constants';

export enum GlobalActionsEnum {
  CHANGE_LANG = 'state/global/action/lang',
}

export type MessageArgsPropsCustom = MessageArgsProps & { type: NoticeType };

export type initialState = {
  lang: LANG;
  notification: NotificationArgsProps | undefined;
  message: MessageArgsPropsCustom | undefined;
  messagesToDestroy: string[];
  isFetchingStats: boolean;
  // Fhir
  analysisCodeMapping: AnalysisCodeMapping;
};

export type GetAnalysisNameByCode = (
  code: string,
  withCode?: boolean,
  defaultValue?: string,
) => string;

export type AnalysisCodeMapping = Record<string, FhirAnalysisCodeMap>;

export type FhirAnalysisCodeMap = {
  displayName: string;
  displayNameFr: string;
  displayNameWithCode: string;
  displayNameWithCodeFr: string;
};

export type WeightedAverage = {
  field: string;
  weight: string;
};
