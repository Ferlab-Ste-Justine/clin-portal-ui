import { wrapSqonWithDonorIdAndSrId } from '../helper';

describe('wrapSqonWithDonorIdAndSrId', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-undef
    global.structuredClone = (v) => ({ ...v });
  });

  test('Should wrap patientId', () => {
    const resolvedSqon = {
      content: [],
      op: 'and',
      pivot: 'donors',
    };
    const expected = {
      content: [{ content: { field: 'donors.patient_id', value: ['foo'] }, op: 'in' }],
      op: 'and',
      pivot: 'donors',
    };
    expect(wrapSqonWithDonorIdAndSrId(resolvedSqon, 'foo', null)).toEqual(expected);
  });
  test('Should wrap prescriptionId', () => {
    const resolvedSqon = {
      content: [],
      op: 'and',
      pivot: 'donors',
    };
    const expected = {
      content: [
        {
          content: { field: 'donors.service_request_id', value: ['bar'] },
          op: 'in',
        },
      ],
      op: 'and',
      pivot: 'donors',
    };
    expect(wrapSqonWithDonorIdAndSrId(resolvedSqon, null, 'bar')).toEqual(expected);
  });
  test('Should wrap both patient and prescription', () => {
    const resolvedSqon = {
      content: [],
      op: 'and',
      pivot: 'donors',
    };
    const expected = {
      content: [
        { content: { field: 'donors.patient_id', value: ['foo'] }, op: 'in' },
        { content: { field: 'donors.service_request_id', value: ['bar'] }, op: 'in' },
      ],
      op: 'and',
      pivot: 'donors',
    };
    expect(wrapSqonWithDonorIdAndSrId(resolvedSqon, 'foo', 'bar')).toEqual(expected);
  });

  test('should wrap patientID with empty content', () => {
    const resolvedSqon = {
      content: [],
      op: 'and',
      pivot: 'donors',
    };
    const expected = {
      content: [{ content: { field: 'donors.patient_id', value: ['foo'] }, op: 'in' }],
      op: 'and',
      pivot: 'donors',
    };
    expect(wrapSqonWithDonorIdAndSrId(resolvedSqon, 'foo', null)).toEqual(expected);
  });

  test('wrap or', () => {
    const initialSqon = {
      content: [
        {
          content: {
            field: 'consequences.biotype',
            index: 'Variants',
            value: ['processed_pseudogene'],
          },
          op: 'in',
        },
        {
          content: {
            field: 'gene_external_reference',
            index: 'Variants',
            value: ['HPO'],
          },
          op: 'in',
        },
      ],
      op: 'or',
    };

    const expected = {
      content: [
        {
          content: [
            {
              content: {
                field: 'consequences.biotype',
                index: 'Variants',
                value: ['processed_pseudogene'],
              },
              op: 'in',
            },
            { content: { field: 'donors.patient_id', value: ['foo'] }, op: 'in' },
          ],
          op: 'and',
          pivot: 'donors',
        },
        {
          content: [
            {
              content: {
                field: 'gene_external_reference',
                index: 'Variants',
                value: ['HPO'],
              },
              op: 'in',
            },
            { content: { field: 'donors.patient_id', value: ['foo'] }, op: 'in' },
          ],
          op: 'and',
          pivot: 'donors',
        },
      ],
      op: 'or',
    };
    expect(wrapSqonWithDonorIdAndSrId(initialSqon, 'foo', null)).toEqual(expected);
  });

  test('unique query', () => {
    const initialSqon = {
      content: [
        {
          content: {
            field: 'donors.gq',
            index: 'Variants',
            value: ['__missing__'],
          },
          op: 'in',
        },
      ],
      op: 'and',
      pivot: 'donors',
    };
    const expected = {
      content: [
        {
          content: {
            field: 'donors.gq',
            index: 'Variants',
            value: ['__missing__'],
          },
          op: 'in',
        },
        { content: { field: 'donors.patient_id', value: ['foo'] }, op: 'in' },
      ],
      op: 'and',
      pivot: 'donors',
    };
    expect(wrapSqonWithDonorIdAndSrId(initialSqon, 'foo', null)).toEqual(expected);
  });

  test('combined or queries', () => {
    const initialSqon = {
      content: [
        {
          content: [
            { content: { field: 'donors.gq', index: 'Variants', value: [20] }, op: '>' },
            {
              content: { field: 'donors.gq', index: 'Variants', value: ['__missing__'] },
              op: 'in',
            },
          ],
          op: 'or',
        },
      ],
      op: 'and',
      pivot: 'donors',
    };

    const expected = {
      content: [
        {
          content: [
            {
              content: [
                {
                  content: {
                    field: 'donors.gq',
                    index: 'Variants',
                    value: [20],
                  },
                  op: '>',
                },
                {
                  content: {
                    field: 'donors.patient_id',
                    value: ['foo'],
                  },
                  op: 'in',
                },
              ],
              op: 'and',
              pivot: 'donors',
            },
            {
              content: [
                {
                  content: {
                    field: 'donors.gq',
                    index: 'Variants',
                    value: ['__missing__'],
                  },
                  op: 'in',
                },
                {
                  content: {
                    field: 'donors.patient_id',
                    value: ['foo'],
                  },
                  op: 'in',
                },
              ],
              op: 'and',
              pivot: 'donors',
            },
          ],
          op: 'or',
        },
      ],
      op: 'and',
    };
    expect(wrapSqonWithDonorIdAndSrId(initialSqon, 'foo', null)).toEqual(expected);
  });

  test('a complex one', () => {
    const initialSqon = {
      content: [
        {
          content: [
            {
              content: [
                {
                  content: {
                    field: 'donors.gq',
                    index: 'Variants',
                    value: [20],
                  },
                  op: '>',
                },
              ],
              op: 'and',
            },
            {
              content: [
                {
                  content: {
                    field: 'donors.gq',
                    index: 'Variants',
                    value: ['__missing__'],
                  },
                  op: 'in',
                },
              ],
              op: 'and',
            },
          ],
          op: 'or',
        },
        {
          content: [
            {
              content: {
                field: 'consequences.biotype',
                index: 'Variants',
                value: ['processed_pseudogene', 'unprocessed_pseudogene', 'processed_transcript'],
              },
              op: 'in',
            },
          ],
          op: 'and',
        },
      ],
      op: 'and',
      pivot: 'donors',
    };

    const expected = {
      content: [
        {
          content: [
            {
              content: [
                {
                  content: {
                    field: 'donors.gq',
                    index: 'Variants',
                    value: [20],
                  },
                  op: '>',
                },
                {
                  content: {
                    field: 'donors.patient_id',
                    value: ['foo'],
                  },
                  op: 'in',
                },
              ],
              op: 'and',
              pivot: 'donors',
            },
            {
              content: [
                {
                  content: {
                    field: 'donors.gq',
                    index: 'Variants',
                    value: ['__missing__'],
                  },
                  op: 'in',
                },
                {
                  content: {
                    field: 'donors.patient_id',
                    value: ['foo'],
                  },
                  op: 'in',
                },
              ],
              op: 'and',
              pivot: 'donors',
            },
          ],
          op: 'or',
        },
        {
          content: [
            {
              content: {
                field: 'consequences.biotype',
                index: 'Variants',
                value: ['processed_pseudogene', 'unprocessed_pseudogene', 'processed_transcript'],
              },
              op: 'in',
            },
            {
              content: {
                field: 'donors.patient_id',
                value: ['foo'],
              },
              op: 'in',
            },
          ],
          op: 'and',
          pivot: 'donors',
        },
      ],
      op: 'and',
    };
    expect(wrapSqonWithDonorIdAndSrId(initialSqon, 'foo', null)).toEqual(expected);
  });

  test('a complex query containing AND/OR', () => {
    const initialSqon = {
      content: [
        {
          content: [
            {
              content: {
                field: 'donors.gq',
                index: 'Variants',
                value: [200],
              },
              op: '>=',
            },
            {
              content: {
                field: 'donors.gq',
                index: 'Variants',
                value: ['__missing__'],
              },
              op: 'in',
            },
          ],
          op: 'or',
        },
        {
          content: [
            {
              content: {
                field: 'donors.ad_alt',
                index: 'Variants',
                value: [500],
              },
              op: '>=',
            },
            {
              content: {
                field: 'donors.ad_alt',
                index: 'Variants',
                value: ['__missing__'],
              },
              op: 'in',
            },
          ],
          op: 'or',
        },
      ],
      op: 'or',
      pivot: 'donors',
    };

    const expected = {
      content: [
        {
          content: [
            {
              content: [
                {
                  content: {
                    field: 'donors.gq',
                    index: 'Variants',
                    value: [200],
                  },
                  op: '>=',
                },
                {
                  content: {
                    field: 'donors.patient_id',
                    value: ['foo'],
                  },
                  op: 'in',
                },
              ],
              op: 'and',
              pivot: 'donors',
            },
            {
              content: [
                {
                  content: {
                    field: 'donors.gq',
                    index: 'Variants',
                    value: ['__missing__'],
                  },
                  op: 'in',
                },
                {
                  content: {
                    field: 'donors.patient_id',
                    value: ['foo'],
                  },
                  op: 'in',
                },
              ],
              op: 'and',
              pivot: 'donors',
            },
          ],
          op: 'or',
        },
        {
          content: [
            {
              content: [
                {
                  content: {
                    field: 'donors.ad_alt',
                    index: 'Variants',
                    value: [500],
                  },
                  op: '>=',
                },
                {
                  content: {
                    field: 'donors.patient_id',
                    value: ['foo'],
                  },
                  op: 'in',
                },
              ],
              op: 'and',
              pivot: 'donors',
            },
            {
              content: [
                {
                  content: {
                    field: 'donors.ad_alt',
                    index: 'Variants',
                    value: ['__missing__'],
                  },
                  op: 'in',
                },
                {
                  content: {
                    field: 'donors.patient_id',
                    value: ['foo'],
                  },
                  op: 'in',
                },
              ],
              op: 'and',
              pivot: 'donors',
            },
          ],
          op: 'or',
        },
      ],
      op: 'or',
    };

    expect(wrapSqonWithDonorIdAndSrId(initialSqon, 'foo', null)).toEqual(expected);
  });

  test('handles complex query', () => {
    const initialSqon = {
      content: [
        {
          content: [
            {
              content: {
                field: 'donors.gq',
                index: 'Variants',
                value: [20],
              },
              op: '<',
            },
            {
              content: {
                field: 'donors.gq',
                index: 'Variants',
                value: ['__missing__'],
              },
              op: 'in',
            },
          ],
          op: 'or',
        },
        {
          content: {
            field: 'donors.transmission',
            index: 'Variants',
            value: ['autosomal_dominant_de_novo'],
          },
          op: 'in',
        },
      ],
      op: 'and',
    };

    const expected = {
      content: [
        {
          content: [
            {
              content: [
                {
                  content: {
                    field: 'donors.gq',
                    index: 'Variants',
                    value: [20],
                  },
                  op: '<',
                },
                {
                  content: {
                    field: 'donors.patient_id',
                    value: ['922552'],
                  },
                  op: 'in',
                },
              ],
              op: 'and',
              pivot: 'donors',
            },
            {
              content: [
                {
                  content: {
                    field: 'donors.gq',
                    index: 'Variants',
                    value: ['__missing__'],
                  },
                  op: 'in',
                },
                {
                  content: {
                    field: 'donors.patient_id',
                    value: ['922552'],
                  },
                  op: 'in',
                },
              ],
              op: 'and',
              pivot: 'donors',
            },
          ],
          op: 'or',
        },
        {
          content: [
            {
              content: {
                field: 'donors.transmission',
                index: 'Variants',
                value: ['autosomal_dominant_de_novo'],
              },
              op: 'in',
            },
            {
              content: {
                field: 'donors.patient_id',
                value: ['922552'],
              },
              op: 'in',
            },
          ],
          op: 'and',
          pivot: 'donors',
        },
      ],
      op: 'and',
    };

    expect(wrapSqonWithDonorIdAndSrId(initialSqon, '922552', null)).toEqual(expected);
  });

  test('with clinvar AND', () => {
    const initialSqon = {
      content: [
        {
          content: {
            field: 'clinvar.clin_sig',
            index: 'Variants',
            value: ['Benign'],
          },
          op: 'in',
        },
        {
          content: {
            field: 'donors.gq',
            index: 'Variants',
            value: [20],
          },
          op: '>=',
        },
      ],
      op: 'and',
      pivot: 'donors',
    };

    const expected = {
      content: [
        {
          content: [
            {
              content: {
                field: 'clinvar.clin_sig',
                index: 'Variants',
                value: ['Benign'],
              },
              op: 'in',
            },
            {
              content: {
                field: 'donors.patient_id',
                value: ['923753'],
              },
              op: 'in',
            },
          ],
          op: 'and',
          pivot: 'donors',
        },
        {
          content: [
            {
              content: {
                field: 'donors.gq',
                index: 'Variants',
                value: [20],
              },
              op: '>=',
            },
            {
              content: {
                field: 'donors.patient_id',
                value: ['923753'],
              },
              op: 'in',
            },
          ],
          op: 'and',
          pivot: 'donors',
        },
      ],
      op: 'and',
    };

    expect(wrapSqonWithDonorIdAndSrId(initialSqon, '923753', null)).toEqual(expected);
  });
});
