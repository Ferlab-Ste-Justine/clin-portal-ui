import { TermOperators } from '@ferlab/ui/core/data/sqon/operators';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';

export const wrapSqonWithDonorIdAndSrId = (
  resolvedSqon: ISqonGroupFilter,
  patientId?: string,
  prescriptionId?: string,
) => {
  if (patientId || prescriptionId) {
    const subContent: any[] = [];

    const prescriptionFilter = {
      content: { field: 'donors.service_request_id', value: [prescriptionId] },
      op: TermOperators.in,
    };

    const patientFilter = {
      content: { field: 'donors.patient_id', value: [patientId] },
      op: TermOperators.in,
    };

    if (patientId) {
      subContent.push(patientFilter);
    }

    if (prescriptionId) {
      subContent.push(prescriptionFilter);
    }

    if (resolvedSqon.op === 'or') {
      resolvedSqon.content.forEach((sqon: any) => {
        if (prescriptionId) {
          sqon.content?.push(prescriptionFilter);
        }
        if (patientId) {
          sqon.content?.push(patientFilter);
        }

        sqon.pivot = 'donors';
      });
      return resolvedSqon;
    }
    return {
      content: [
        {
          content: subContent,
          op: 'and',
        },
        { ...resolvedSqon },
      ],
      op: 'and',
      pivot: 'donors',
    };
  }

  return resolvedSqon;
};
