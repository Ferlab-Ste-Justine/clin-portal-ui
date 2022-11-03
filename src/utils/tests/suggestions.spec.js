import { filterByTypeAndWeight } from 'utils/suggestions';

describe('filterByTypeAndWeight', () => {
  test('Should be robust', () => {
    expect(filterByTypeAndWeight(null, null)).toEqual([]);
    expect(filterByTypeAndWeight([], null)).toEqual([]);
  });
  test('Should filter by type and default min weight (=0)', () => {
    const suggestions = [
      {
        type: 'variant',
        suggest: [
          {
            weight: 0,
            input: ['foo'],
          },
        ],
      },
      {
        type: 'variant',
        suggest: [
          {
            weight: -1, // weight to low
            input: ['foo'],
          },
        ],
      },
      {
        type: 'gene', // bad type
      },
      {
        type: 'variant',
        // missing suggest
      },
      {
        type: 'variant',
        suggest: [
          {
            weight: 0,
            // missing input
          },
        ],
      },
    ];
    const expected = [
      {
        type: 'variant',
        suggest: [
          {
            weight: 0,
            input: ['foo'],
          },
        ],
      },
    ];
    expect(filterByTypeAndWeight(suggestions, 'variant')).toEqual(expected);
  });
  test('Should filter by type and custom min weight', () => {
    const suggestions = [
      {
        type: 'variant',
        suggest: [
          {
            weight: 0,
            input: ['foo'],
          },
        ],
      },
      {
        type: 'variant',
        suggest: [
          {
            weight: 2,
            input: ['foo'],
          },
        ],
      },
      {
        type: 'variant',
        suggest: [
          {
            weight: 4,
            input: ['foo'],
          },
        ],
      },
    ];
    const expected = [
      {
        type: 'variant',
        suggest: [
          {
            weight: 2,
            input: ['foo'],
          },
        ],
      },
      {
        type: 'variant',
        suggest: [
          {
            weight: 4,
            input: ['foo'],
          },
        ],
      },
    ];
    expect(filterByTypeAndWeight(suggestions, 'variant', 2)).toEqual(expected);
  });
});
