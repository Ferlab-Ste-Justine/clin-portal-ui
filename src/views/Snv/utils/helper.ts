import { BooleanOperators, TermOperators } from '@ferlab/ui/core/data/sqon/operators';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';

export const wrapSqonWithDonorIdAndSrId = (
  resolvedSqon: ISqonGroupFilter,
  patientId?: string,
  prescriptionId?: string,
  withFlags?: string,
) => {
  const cleanSqon = (sqon: any, keyToRemove = 'pivot') => {
    if (typeof sqon !== 'object' || sqon === null) {
      throw new Error('Input is not a valid JSON object.');
    }

    if (keyToRemove in sqon) {
      delete sqon[keyToRemove];
    }

    for (const key in sqon) {
      if (typeof sqon[key] === 'object') {
        cleanSqon(sqon[key], keyToRemove);
      }
    }

    return sqon;
  };

  const addFilters = (
    content: any,
    patientFilter: any,
    prescriptionFilter: any,
    withFlagsFilter: any,
  ) => {
    if (patientFilter) content.push(patientFilter);
    if (prescriptionFilter) content.push(prescriptionFilter);
    if (withFlagsFilter) content.push(withFlagsFilter);
    return content;
  };
  const handleContent = (
    sqon: any,
    patientFilter: any,
    prescriptionFilter: any,
    withFlagsFilter: any,
  ): any => {
    // @ts-ignore
    const explodeOrCondition = (toExplode: any) => {
      toExplode.content = toExplode.content.map((item: any) => ({
        content: addFilters(
          Array.isArray(item.content) ? item.content : [item],
          patientFilter,
          prescriptionFilter,
          withFlagsFilter,
        ),
        op: 'and',
        pivot: 'donors',
      }));

      return toExplode;
    };

    if (sqon && JSON.stringify(sqon).includes('"op":"or"')) {
      // go recursive to update it
      if (
        (sqon.op === BooleanOperators.or || sqon.op === BooleanOperators.and) &&
        !JSON.stringify(sqon.content).includes('"op":"or"')
      ) {
        return explodeOrCondition(sqon);
      } else if (Array.isArray(sqon.content)) {
        sqon.content = sqon.content.map((item: any) =>
          handleContent(item, patientFilter, prescriptionFilter, withFlagsFilter),
        );
      }
    } else if (sqon && Array.isArray(sqon.content) && sqon.content.length > 1) {
      return explodeOrCondition(sqon);
    } else if (sqon && Array.isArray(sqon.content) && sqon.content.length <= 1) {
      return {
        ...sqon,
        content: addFilters(sqon.content, patientFilter, prescriptionFilter, withFlagsFilter),
        pivot: 'donors',
      };
    } else {
      return {
        ...sqon,
        content: addFilters([sqon], patientFilter, prescriptionFilter, withFlagsFilter),
        pivot: 'donors',
        op: 'and',
      };
    }
    return sqon;
  };

  const prescriptionFilter = prescriptionId
    ? {
        content: { field: 'donors.service_request_id', value: [prescriptionId] },
        op: TermOperators.in,
      }
    : null;

  const patientFilter = patientId
    ? { content: { field: 'donors.patient_id', value: [patientId] }, op: TermOperators.in }
    : null;

  const withFlagsFilter = withFlags
    ? { content: { field: 'withFlags', value: [withFlags] }, op: TermOperators.in }
    : null;

  if (patientId || prescriptionId || withFlags) {
    const cleanedSqon = cleanSqon(resolvedSqon);
    return handleContent(cleanedSqon, patientFilter, prescriptionFilter, withFlagsFilter);
  }

  return resolvedSqon;
};
