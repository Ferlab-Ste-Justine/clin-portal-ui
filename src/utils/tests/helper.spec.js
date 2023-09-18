import { downloadText, extractFilename } from 'utils/helper';

describe('downloadText', () => {
  test('Should be robust', () => {
    downloadText(null, 'file.tsv');
  });
});

describe('extractFilename', () => {
  test('Should returns default file name', () => {
    expect(extractFilename(null)).toEqual('');
    expect(extractFilename('')).toEqual('');
    expect(extractFilename('foo')).toEqual('');
    expect(extractFilename(';=')).toEqual('');
    expect(extractFilename('', 'foo.bar')).toEqual('foo.bar');
  });
  test('Should returns attachment file name', () => {
    expect(extractFilename('attachment; filename=file.name', 'foo.bar')).toEqual('file.name');
    expect(extractFilename('attachment; filename=file.name')).toEqual('file.name');
  });
});
