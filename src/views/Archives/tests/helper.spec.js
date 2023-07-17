import { extractDocsFromTask } from '../helper';

describe('extracDocsFromTask', () => {
  test('Should be robust', () => {
    expect(extractDocsFromTask(null)).toEqual([]);
    expect(extractDocsFromTask([])).toEqual([]);
  });
  test('Should extract file + index', () => {
    const tasks = [
      {
        id: 'taskId',
        runAlias: 'runAlias',
        authoredOn: '2023-03-23T15:37:28+00:00',
        owner: {
          id: 'Organization/ownerId',
          alias: 'ownerAlias',
        },
        focus: {
          request: {
            id: 'id',
            basedOn: {
              reference: 'reference',
            },
          },
        },
        docs: [
          {
            id: 'id',
            patientReference: 'Patient/foo',
            content: [
              {
                sample: {
                  value: 'sampleValue',
                },
                patientReference: 'Patient/ref',
                type: 'type',
                format: 'CRAM',
                attachment: {
                  hash: 'hash',
                  url: 'url',
                  size: 1024,
                  title: 'title',
                },
              },
              {
                format: 'CRAI',
                attachment: {
                  url: 'url',
                },
              },
            ],
          },
        ],
      },
    ];
    const expected = [
      {
        id: 'id',
        patientReference: 'Patient/foo',
        content: [
          {
            sample: { value: 'sampleValue' },
            patientReference: 'Patient/ref',
            type: 'type',
            format: 'CRAM',
            attachment: { hash: 'hash', url: 'url', size: 1024, title: 'title' },
          },
          { format: 'CRAI', attachment: { url: 'url' } },
        ],
        key: 'title',
        url: 'url',
        taskRunAlias: 'runAlias',
        taskAuthoredOn: '2023-03-23',
        taskOwner: { id: 'Organization/ownerId', alias: 'ownerAlias' },
        taskId: 'taskId',
        patientId: 'foo',
        hash: 'hash',
        srRef: 'id',
        basedOnSrRef: 'reference',
        size: '1.02 KB',
        originalSize: 1024,
        title: 'title',
        format: 'CRAM',
        action: {
          format: 'CRAM',
          metadata: {
            id: 'id',
            patientReference: 'Patient/foo',
            content: [
              {
                sample: { value: 'sampleValue' },
                patientReference: 'Patient/ref',
                type: 'type',
                format: 'CRAM',
                attachment: { hash: 'hash', url: 'url', size: 1024, title: 'title' },
              },
              { format: 'CRAI', attachment: { url: 'url' } },
            ],
          },
          urls: { file: 'url', index: 'url' },
        },
      },
    ];
    expect(extractDocsFromTask(tasks)).toEqual(expected);
  });
  test('Should extract content with multiple files', () => {
    const tasks = [
      {
        authoredOn: '2023-03-23T15:37:28+00:00',
        focus: {
          request: {
            id: 'id',
            basedOn: {
              reference: 'reference',
            },
          },
        },
        docs: [
          {
            content: [
              {
                format: 'IGV',
                attachment: {
                  url: 'title1',
                },
              },
              {
                format: 'IGV',
                attachment: {
                  url: 'title2',
                },
              },
              {
                format: 'IGV',
                attachment: {
                  url: 'title3',
                },
              },
            ],
          },
        ],
      },
    ];
    const expected = [
      {
        content: [
          { format: 'IGV', attachment: { url: 'title1' } },
          { format: 'IGV', attachment: { url: 'title2' } },
          { format: 'IGV', attachment: { url: 'title3' } },
        ],
        url: 'title1',
        taskAuthoredOn: '2023-03-23',
        srRef: 'id',
        basedOnSrRef: 'reference',
        size: '0 B',
        format: 'IGV',
        action: {
          format: 'IGV',
          metadata: {
            content: [
              { format: 'IGV', attachment: { url: 'title1' } },
              { format: 'IGV', attachment: { url: 'title2' } },
              { format: 'IGV', attachment: { url: 'title3' } },
            ],
          },
          urls: { file: 'title1', index: '' },
        },
      },
      {
        content: [
          { format: 'IGV', attachment: { url: 'title1' } },
          { format: 'IGV', attachment: { url: 'title2' } },
          { format: 'IGV', attachment: { url: 'title3' } },
        ],
        url: 'title2',
        taskAuthoredOn: '2023-03-23',
        srRef: 'id',
        basedOnSrRef: 'reference',
        size: '0 B',
        format: 'IGV',
        action: {
          format: 'IGV',
          metadata: {
            content: [
              { format: 'IGV', attachment: { url: 'title1' } },
              { format: 'IGV', attachment: { url: 'title2' } },
              { format: 'IGV', attachment: { url: 'title3' } },
            ],
          },
          urls: { file: 'title2', index: '' },
        },
      },
      {
        content: [
          { format: 'IGV', attachment: { url: 'title1' } },
          { format: 'IGV', attachment: { url: 'title2' } },
          { format: 'IGV', attachment: { url: 'title3' } },
        ],
        url: 'title3',
        taskAuthoredOn: '2023-03-23',
        srRef: 'id',
        basedOnSrRef: 'reference',
        size: '0 B',
        format: 'IGV',
        action: {
          format: 'IGV',
          metadata: {
            content: [
              { format: 'IGV', attachment: { url: 'title1' } },
              { format: 'IGV', attachment: { url: 'title2' } },
              { format: 'IGV', attachment: { url: 'title3' } },
            ],
          },
          urls: { file: 'title3', index: '' },
        },
      },
    ];
    expect(extractDocsFromTask(tasks)).toEqual(expected);
  });
  test('Should ignore index files', () => {
    const tasks = [
      {
        authoredOn: '2023-03-23T15:37:28+00:00',
        focus: {
          request: {
            id: 'id',
            basedOn: {
              reference: 'reference',
            },
          },
        },
        docs: [
          {
            content: [
              {
                format: 'CRAI',
                attachment: {
                  title: 'title1',
                },
              },
              {
                format: 'TBI',
                attachment: {
                  title: 'title2',
                },
              },
            ],
          },
        ],
      },
    ];
    const expected = [];
    expect(extractDocsFromTask(tasks)).toEqual(expected);
  });
});
