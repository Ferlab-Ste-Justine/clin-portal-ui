import {
  ALL_KEYS,
  buildVariantsDownloadCount,
  buildVariantsDownloadSqon,
  convertToPlain,
  customMapping,
  exportAsTSV,
  extractSelectionFromResults,
  makeFilenameDatePart,
  MAX_VARIANTS_DOWNLOAD,
} from '../export';

describe('exportAsTSV', () => {
  test('should be robust', () => {
    expect(exportAsTSV(null, null)).toEqual('');
    expect(exportAsTSV([{ foo: 'bar' }], null)).toEqual('');
  });
  test('should export data', () => {
    expect(exportAsTSV([{ foo: 'bar' }], ['foo'])).toEqual('foo\nbar\n');
  });
  test('should export array', () => {
    expect(exportAsTSV([{ foo: ['bar1', 'bar2'] }], ['foo'])).toEqual('foo\nbar1 bar2\n');
  });
  test('should export object leafs', () => {
    expect(exportAsTSV([{ foo: { sub: 'leaf' } }], ['foo'])).toEqual('foo\nleaf\n');
  });
  test('should ignore some leafs', () => {
    expect(exportAsTSV([{ foo: { sub1: 'Variants', sub2: 'cnv' } }], ['foo'])).toEqual('foo\n\n');
  });
  test('should export at least headers', () => {
    expect(exportAsTSV([], ['foo'])).toEqual('foo\n');
  });
  test('should map header', () => {
    expect(
      exportAsTSV([{ colInData: 'bar' }], ['colInHeader'], { colInHeader: 'colInData' }),
    ).toEqual('colInHeader\nbar\n');
  });
  test('should use custom mapping', () => {
    const row = {
      locus: 'locus',
      varsome: {
        acmg: {
          verdict: {
            verdict: 'Likely Pathogenic',
          },
        },
      },
    };
    expect(exportAsTSV([row], ['acmgVerdict'], {}, 'SNV')).toEqual('acmgVerdict\nLik. Patho.\n');
  });
});

describe('convertToPlain', () => {
  test('should convert HTML to plain text', () => {
    expect(convertToPlain('<div className="foo"><p>bar</p></div>')).toEqual('bar');
  });
});

describe('customMapping SNV', () => {
  test('should map nothing', () => {
    expect(customMapping(null, null, null)).toEqual(null);
  });
  test('should map acmgVerdict', () => {
    const row = {
      locus: 'locus',
      varsome: {
        acmg: {
          verdict: {
            verdict: 'Likely Benign',
          },
        },
      },
    };
    expect(customMapping('SNV', 'acmgVerdict', row)).toEqual('Lik. Benign');
  });
  test('should map omim', () => {
    const row = {
      consequences: {
        hits: {
          edges: [
            {
              node: {
                symbol: 'symbol',
                picked: true,
              },
            },
          ],
        },
      },
      genes: {
        hits: {
          edges: [
            {
              node: {
                symbol: 'symbol',
                omim_gene_id: 'id',
                omim: {
                  hits: {
                    edges: [
                      {
                        node: {
                          inheritance_code: ['IC'],
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'omim', row)).toEqual('IC');
  });
  test('should map acmgcriteria', () => {
    const row = {
      varsome: {
        acmg: {
          classifications: {
            hits: {
              edges: [
                {
                  node: {
                    met_criteria: 'crit',
                    name: 'name',
                  },
                },
              ],
            },
          },
        },
      },
    };
    expect(customMapping('SNV', 'acmgcriteria', row)).toEqual('name');
  });
  test('should map consequence', () => {
    const row = {
      consequences: {
        hits: {
          edges: [
            {
              node: {
                symbol: 'symbol',
                consequences: 'foo',
                vep_impact: 'impact',
                aa_change: 'aa',
                picked: true,
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'consequence', row)).toEqual('F aa');
  });
  test('should map donors.exomiser', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                exomiser: {
                  gene_combined_score: 0.42,
                  acmg_classification: 'foo_bar',
                  acmg_evidence: null,
                },
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'donors.exomiser.gene_combined_score', row, 'p1')).toEqual('0.42');
    expect(customMapping('SNV', 'donors.exomiser.acmg_classification', row, 'p1')).toEqual(
      'Foo Bar',
    );
    expect(customMapping('SNV', 'donors.exomiser.acmg_evidence', row, 'p1')).toEqual('-');
  });
  test('should map donors.gq', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                gq: 42,
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'donors.gq', row, 'p1')).toEqual('42');
  });
  test('should map donors.zygosity', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                zygosity: 'foo',
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'donors.zygosity', row, 'p1')).toEqual('foo');
  });
  test('should map donors_genotype', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                mother_calls: [0, 1],
                father_calls: [2, 3],
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'donors_genotype', row, 'p1')).toEqual('0/1 : 2/3');
  });
  test('should map ch', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                hc_complement: {
                  hits: {
                    edges: [
                      {
                        node: {
                          symbol: 's1',
                          locus: 'l1',
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'ch', row, 'p1')).toEqual('s1 ( 2 )');
  });
  test('should map pch', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                possibly_hc_complement: {
                  hits: {
                    edges: [
                      {
                        node: {
                          symbol: 's2',
                          count: 10,
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'pch', row, 'p1')).toEqual('s2 ( 10 )');
  });
  test('should map transmission', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                transmission: 'foo',
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'transmission', row, 'p1')).toEqual('Foo');
  });
  test('should map qd', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                qd: 42,
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'qd', row, 'p1')).toEqual('42');
  });
  test('should map po', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                parental_origin: 'mother',
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'po', row, 'p1')).toEqual('Mother');
  });
  test('should map alt', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                ad_alt: 42,
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'alt', row, 'p1')).toEqual('42');
  });
  test('should map alttotal', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                ad_total: 42,
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'alttotal', row, 'p1')).toEqual('42');
  });
  test('should map altratio', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                ad_ratio: 42,
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'altratio', row, 'p1')).toEqual('42.00');
  });
  test('should map filter', () => {
    const row = {
      donors: {
        hits: {
          edges: [
            {
              node: {
                patient_id: 'p1',
                filters: ['foo', 'bar'],
              },
            },
          ],
        },
      },
    };
    expect(customMapping('SNV', 'filter', row, 'p1')).toEqual('foobar');
  });
});

describe('customMapping CNV', () => {
  test('should map nothing', () => {
    expect(customMapping(null, null, null)).toEqual(null);
  });
  test('should map alls', () => {
    const row = {
      calls: [-1, 1],
    };
    expect(customMapping('CNV', 'calls', row)).toEqual('./1');
  });
});

describe('makeFilenameDatePart', () => {
  test('should format datetime', () => {
    const date = new Date(2020, 10, 31, 12, 42, 35);
    // don't check hours since it will yield different result
    //  on different machine with different UTC
    expect(makeFilenameDatePart(date).slice(0, 9)).toEqual('20201201T');
  });
});

describe('buildVariantsDownloadCount', () => {
  test('should be robust', () => {
    expect(buildVariantsDownloadCount(null, 0, MAX_VARIANTS_DOWNLOAD)).toEqual(0);
  });
  test('should return 0 if no keys to download', () => {
    expect(buildVariantsDownloadCount([], 0, MAX_VARIANTS_DOWNLOAD)).toEqual(0);
  });
  test('should return 0 if download ALL but total is bigger than MAX', () => {
    expect(
      buildVariantsDownloadCount([ALL_KEYS], MAX_VARIANTS_DOWNLOAD + 1, MAX_VARIANTS_DOWNLOAD),
    ).toEqual(0);
  });
  test('should return TOTAL if download ALL and total <= MAX', () => {
    expect(buildVariantsDownloadCount([ALL_KEYS], 10, MAX_VARIANTS_DOWNLOAD)).toEqual(10);
  });
  test('should return X if bellow MAX', () => {
    expect(buildVariantsDownloadCount(['1', '2', '3'], 10, MAX_VARIANTS_DOWNLOAD)).toEqual(3);
  });
  test('should return 0 if keys length bigger than MAX', () => {
    var keys = [];
    keys.length = MAX_VARIANTS_DOWNLOAD + 1;
    expect(buildVariantsDownloadCount(keys, 10, MAX_VARIANTS_DOWNLOAD)).toEqual(0);
  });
});

describe('buildVariantsDownloadSqon', () => {
  test('should be return empty sqon if no keys', () => {
    expect(buildVariantsDownloadSqon(null, 'key', {})).toEqual({
      content: [{ content: { field: 'key', value: [] }, op: 'in' }],
      op: 'and',
    });
  });
  test('should return filtered sqon when ALL', () => {
    expect(buildVariantsDownloadSqon([ALL_KEYS], 'key', {})).toEqual({});
  });
  test('should return sqon by keys if selection of rows', () => {
    expect(buildVariantsDownloadSqon(['1', '2', '3'], 'key', {})).toEqual({
      content: [{ content: { field: 'key', value: ['1', '2', '3'] }, op: 'in' }],
      op: 'and',
    });
  });
  test('should add patient_id to new sqon', () => {
    expect(buildVariantsDownloadSqon(['1', '2', '3'], 'key', {}, 'patientId')).toEqual({
      content: [
        { content: { field: 'key', value: ['1', '2', '3'] }, op: 'in' },
        { content: { field: 'donors.patient_id', value: ['patientId'] }, op: 'in' },
      ],
      op: 'and',
    });
  });
  test('should add patient_id to existing sqon', () => {
    expect(
      buildVariantsDownloadSqon(
        [ALL_KEYS],
        'key',
        {
          content: [{ content: { field: 'filter1', value: ['value1', 'value2'] }, op: 'in' }],
          op: 'and',
        },
        'patientId',
      ),
    ).toEqual({
      content: [
        { content: { field: 'filter1', value: ['value1', 'value2'] }, op: 'in' },
        { content: { field: 'donors.patient_id', value: ['patientId'] }, op: 'in' },
      ],
      op: 'and',
    });
  });
});

describe('extractSelectionFromResults', () => {
  test('should filter by selection', () => {
    const data = [{ foo: 'bar' }, { field: 'bar' }];
    const selection = ['bar'];
    const expected = [{ field: 'bar' }];
    expect(extractSelectionFromResults(data, selection, 'field')).toEqual(expected);
  });
  test('should return all', () => {
    const data = [{ foo: 'bar' }, { field: 'bar' }];
    const selection = ['*'];
    const expected = [{ foo: 'bar' }, { field: 'bar' }];
    expect(extractSelectionFromResults(data, selection, 'field')).toEqual(expected);
  });
  test('should return nothing', () => {
    const data = [{ foo: 'bar' }, { field: 'bar' }];
    const selection = [];
    const expected = [];
    expect(extractSelectionFromResults(data, selection, 'field')).toEqual(expected);
  });
});
