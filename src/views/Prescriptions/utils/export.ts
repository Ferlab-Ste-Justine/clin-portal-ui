import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { findDonorById } from 'graphql/variants/selector';
import get from 'lodash/get';
import { renderCNVToString } from 'views/Cnv/Exploration/variantColumns';
import { renderToString as renderConsequencesToString } from 'views/Snv/components/ConsequencesCell/index';
import { renderToString as renderAcmgVerdictToString } from 'views/Snv/Exploration/components/AcmgVerdict';
import {
  getAcmgRuleContent,
  renderClinvarToString,
  renderDonorToString,
  renderGeneToString,
  renderOmimToString,
} from 'views/Snv/Exploration/variantColumns';

import { downloadText } from 'utils/helper';

export const ALL_KEYS = '*';
export const MAX_VARIANTS_DOWNLOAD = 10000;
export const MAX_VARIANTS_WITH_DONORS_DOWNLOAD = 1000;
export const VARIANT_KEY = 'hash';
export const JOIN_SEP = ' ';

const valueToStr = (value: any): string => {
  if (value) {
    if (Array.isArray(value)) {
      return value.join(JOIN_SEP);
    } else if (typeof value === 'object') {
      return getLeafNodes(value);
    }
    return String(value);
  }
  return '';
};

function getLeafNodes(obj: any): string {
  function traverse(acc: any, value: any) {
    if (value) {
      if (typeof value == 'object') {
        Object.entries(value).forEach(([, v]) => {
          traverse(acc, v);
        });
      } else if (Array.isArray(value)) {
        acc.push(...value);
      } else {
        const str = new String(value);
        if (!str.startsWith('Variants') && !str.startsWith('cnv')) {
          acc.push(str);
        }
      }
    }
    return acc;
  }
  return String(Array.from(new Set(traverse([], obj))).join(JOIN_SEP));
}

export const buildVariantsDownloadCount = (
  keys: Array<string>,
  expectedTotal: number,
  maxAllowed: number,
): number => {
  if (keys?.length > 0) {
    if (keys[0] === ALL_KEYS) {
      if (expectedTotal <= maxAllowed) {
        return expectedTotal;
      } else {
        return 0;
      }
    } else if (keys.length <= maxAllowed) {
      return keys.length;
    }
    return 0;
  }
  return 0;
};

export const buildVariantsDownloadSqon = (
  keys: Array<string>,
  key: string,
  filteredSqon: ISyntheticSqon,
  patientId?: string,
): ISyntheticSqon => {
  if (keys?.[0] === ALL_KEYS) {
    return addPatientIdContent(filteredSqon, patientId);
  } else {
    return addPatientIdContent(
      {
        op: 'and',
        content: [
          {
            content: {
              field: key,
              value: keys || [],
            },
            op: 'in',
          },
        ],
      },
      patientId,
    );
  }
};

const addPatientIdContent = (sqon: ISyntheticSqon, patientId?: string): ISyntheticSqon => {
  if (patientId && sqon?.content) {
    return {
      ...sqon,
      content: [
        ...sqon.content,
        {
          content: {
            field: 'donors.patient_id',
            value: [patientId],
          },
          op: 'in',
        },
      ],
    };
  }
  return sqon;
};

export const convertToPlain = (html: string) => html.replace(/<[^>]+>/g, '');

export const customMapping = (prefix: string, key: string, row: any, patientId: string = '') => {
  if (prefix === 'SNV') {
    if (key === 'acmgVerdict') {
      return convertToPlain(renderAcmgVerdictToString(row));
    } else if (key === 'gene') {
      return convertToPlain(renderGeneToString(row));
    } else if (key === 'clinvar') {
      return convertToPlain(renderClinvarToString(row));
    } else if (key === 'omim') {
      return convertToPlain(renderOmimToString(row));
    } else if (key === 'acmgcriteria') {
      return getAcmgRuleContent(row.varsome);
    } else if (key === 'consequence') {
      return convertToPlain(renderConsequencesToString(row));
    } else if (
      [
        'donors.exomiser.gene_combined_score',
        'donors.exomiser.acmg_classification',
        'donors.exomiser.acmg_evidence',
        'donors.gq',
        'donors.zygosity',
        'donors_genotype',
        'ch',
        'pch',
        'transmission',
        'qd',
        'po',
        'alt',
        'alttotal',
        'altratio',
        'filter',
      ].includes(key)
    ) {
      return convertToPlain(renderDonorToString(key, findDonorById(row.donors, patientId)));
    }
  } else if (prefix === 'CNV') {
    if (['calls'].includes(key)) {
      return renderCNVToString(key, row);
    }
  }
  return null;
};

export const exportAsTSV = (
  data: any[],
  headers: string[],
  mapping: any = {},
  prefix: string,
  patientId?: string,
): string => {
  let tsv = '';
  if (data && headers && headers.length > 0) {
    tsv += headers.join('\t');
    tsv += '\n';
    data.forEach((row) => {
      const values: string[] = [];
      headers.forEach((header) => {
        const value =
          customMapping(prefix, header, row, patientId) ||
          valueToStr(get(row, get(mapping, header, header), ''));
        values.push(value);
      });
      tsv += values.join('\t');
      tsv += '\n';
    });
  }
  return tsv;
};

export const downloadAsTSV = (
  data: any[],
  dataKeys: string[],
  key: string,
  columns: any[],
  prefix: string,
  mapping: any = {},
  patientId?: string,
) => {
  const filtered = extractSelectionFromResults(data, dataKeys, key);
  const headers = columns.map((c) => c.key);
  const tsv = exportAsTSV(filtered, headers, mapping, prefix, patientId);
  downloadText(tsv, `${prefix}_${makeFilenameDatePart()}.tsv`, 'text/csv');
};

export const extractSelectionFromResults = (
  data: any[],
  dataKeys: string[],
  key: string,
): any[] => {
  if (dataKeys.length === 0) {
    return [];
  } else if (dataKeys.length === 1 && dataKeys[0] === ALL_KEYS) {
    return data;
  }
  return data.filter((row) => dataKeys.includes(row[key]));
};

const joinWithPadding = (l: number[]) => l.reduce((xs, x) => xs + `${x}`.padStart(2, '0'), '');

export const makeFilenameDatePart = (date = new Date()) => {
  const prefixes = joinWithPadding([
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
  ]);
  const suffixes = joinWithPadding([
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  ]);
  return `${prefixes}T${suffixes}Z`;
};
