import { formatDnaLength, formatNumber, formatRatio } from 'utils/formatNumber';

describe('formatDnaLength', () => {
  test('format kilo dna base pair', () => {
    expect(formatDnaLength('120050')).toContain('120.0');
    expect(formatDnaLength('120050')).toContain('kb');
  });
});

describe('formatRatio', () => {
  test('valid ratio', () => {
    expect(formatRatio(0.3, 2)).toEqual('30.00 %');
    expect(formatRatio(0.3, 2)).toEqual('30.00 %');
    expect(formatRatio('.3', 2)).toEqual('30.00 %');
    expect(formatRatio('0.3', 2)).toEqual('30.00 %');
    expect(formatRatio(0.3)).toEqual('30.0 %');
  });
});

describe('formatNumber', () => {
  test('foramt number', () => {
    expect(formatNumber('3e2')).toEqual('3e2');
    expect(formatNumber(NaN)).toEqual('NaN');
  });
});
