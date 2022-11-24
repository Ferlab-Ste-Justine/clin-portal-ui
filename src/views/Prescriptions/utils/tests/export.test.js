import { exportAsTSV, extractSelectionFromResults, makeFilenameDatePart } from '../export';

describe('exportAsTSV', () => {
  test('should be robust', () => {
    expect(exportAsTSV(null, null)).toEqual('');
    expect(exportAsTSV([{ foo: 'bar' }], null)).toEqual('');
  });
  test('should export data', () => {
    expect(exportAsTSV([{ foo: 'bar' }], ['foo'])).toEqual('foo\nbar\n');
  });
  test('should export at least headers', () => {
    expect(exportAsTSV([], ['foo'])).toEqual('foo\n');
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
