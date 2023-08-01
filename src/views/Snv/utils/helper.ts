import { TermOperators } from '@ferlab/ui/core/data/sqon/operators';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';

export const wrapSqonWithDonorIdAndSrId = (
  resolvedSqon: ISqonGroupFilter,
  patientId?: string,
  prescriptionId?: string,
) => {
  if (patientId || prescriptionId) {
    const subContent: any[] = [];

    let donorFilter: any;

    if (patientId) {
      donorFilter = {
        content: { field: 'donors.patient_id', value: [patientId] },
        op: TermOperators.in,
      };
    }

    if (prescriptionId) {
      donorFilter = {
        content: { field: 'donors.service_request_id', value: [prescriptionId] },
        op: TermOperators.in,
      };
    }

    if (resolvedSqon.op === 'or') {
      resolvedSqon.content.forEach((sqon: any) => {
        sqon.content?.push(donorFilter);
        sqon.pivot = 'donors';
      });
      return resolvedSqon;
    } else {
      subContent.push(donorFilter);
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
