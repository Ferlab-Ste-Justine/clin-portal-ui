import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { SorterResult } from 'antd/lib/table/interface';
import { isArray } from 'lodash';

import { GENDER, PARENT_TYPE, PATIENT_POSITION, UNKNOWN_TAG } from 'utils/constants';

export const toExponentialNotation = (numberCandidate?: number, fractionDigits = 2) =>
  numberCandidate ? numberCandidate.toExponential(fractionDigits) : numberCandidate;

// STRING
export const appendBearerIfToken = (token?: string) => (token ? `Bearer ${token}` : '');

const KEBAB_REGEX = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
export const toKebabCase = (str: string) => {
  const match: string[] = (str && str.match(KEBAB_REGEX)) || [];
  return match.map((x: string) => x.toLowerCase()).join('-');
};

// DATE

export const formatTimestampToISODate = (timestamp: number) =>
  new Date(timestamp).toISOString().split('T')[0];

export const downloadText = (text: string, filename: string, contentType = 'text/plain') => {
  if (text && text.length > 0) {
    const byteArray = new TextEncoder().encode(text);
    const blob = new Blob([byteArray], { type: contentType });
    downloadFile(blob, filename);
  }
};

export const downloadFile = (blob: Blob, filename: string) => {
  const downloadLinkElement = document.createElement('a');
  downloadLinkElement.href = window.URL.createObjectURL(blob);
  downloadLinkElement.download = filename;
  document.body.appendChild(downloadLinkElement);
  downloadLinkElement.click();
  document.body.removeChild(downloadLinkElement);
  URL.revokeObjectURL(downloadLinkElement.href);
};

export const getPatientPosition = (gender: string, position: string) => {
  const loweredPosition = position.toLowerCase() || UNKNOWN_TAG;
  const loweredSex = gender.toLowerCase() || UNKNOWN_TAG;
  if (loweredPosition === PATIENT_POSITION.PARENT && loweredSex !== UNKNOWN_TAG) {
    return loweredSex === GENDER.FEMALE ? PARENT_TYPE.MOTHER : PARENT_TYPE.FATHER;
  }
  return loweredPosition;
};

export const formatLocus = (start: number, chromosome: string, bound?: number, end?: number) =>
  `chr${chromosome}:${bound ? `${start - bound}-${end ? end + bound : start + bound}` : start}`;

export const isBoolTrue = (value: number | boolean | string | null) =>
  !!value || 'true' === value?.toString().toLowerCase();

export const scrollToTop = (scrollContentId: string) =>
  document
    .getElementById(scrollContentId)
    ?.querySelector('.simplebar-content-wrapper')
    ?.scrollTo(0, 0);

export const getOrderFromAntdValue = (order: string): SortDirection =>
  order === 'ascend' ? SortDirection.Asc : SortDirection.Desc;

export const formatQuerySortList = (sorter: SorterResult<any> | SorterResult<any>[]) => {
  const sorters = (isArray(sorter) ? sorter : [sorter]).filter(
    (sorter) => !!sorter.column || !!sorter.order,
  );

  const r = sorters.map((sorter) => {
    let field = (sorter.field?.toString()! || sorter.columnKey?.toString()!)?.replaceAll('__', '.');
    if (sorter.columnKey !== sorter.field) {
      field = sorter.columnKey ? sorter.columnKey.toString() : sorter.field?.toString()!;
    }

    return {
      field,
      order: getOrderFromAntdValue(sorter.order!),
    };
  });

  return r;
};

export const getPositionAt = (value: string, subString: string, index: number) =>
  value.split(subString, index).join(subString).length;

export const getCurrentUrl = () =>
  window.location.protocol + '//' + window.location.host + window.location.pathname;
