import { combineValue, moveOtherParaclinique } from '..';

describe('paraclinique', () => {
  test('Combine should work with object array and sigle object', () => {
    const paraclinique = [
      {
        id: 'Observation/0001/_history/1',
        code: 'BMET',
        category: 'procedure',
        interpretation: {
          coding: {
            code: 'A',
          },
        },
        valueString: 'bilan',
      },
      {
        id: 'Observation/0001/_history/1',
        code: 'INVES',
        category: 'exam',
        valueString: 'autre',
      },
    ];

    const complexParaclinique = {
      id: 'Observation/660182/_history/1',
      code: 'BMUS',
      interpretation: {
        coding: {
          code: 'N',
        },
      },
    };

    const expected = [
      {
        id: 'Observation/0001/_history/1',
        code: 'BMET',
        category: 'procedure',
        interpretation: {
          coding: {
            code: 'A',
          },
        },
        valueString: 'bilan',
      },
      {
        id: 'Observation/660182/_history/1',
        code: 'BMUS',
        interpretation: {
          coding: {
            code: 'N',
          },
        },
      },
      {
        id: 'Observation/0001/_history/1',
        code: 'INVES',
        category: 'exam',
        valueString: 'autre',
      },
    ];
    expect(combineValue(paraclinique, complexParaclinique)).toMatchObject(expected);
  });

  test('Other examen should be at the end', () => {
    const paraclinique = [
      {
        id: 'Observation/0001/_history/1',
        code: 'BMET',
        category: 'procedure',
        interpretation: {
          coding: {
            code: 'A',
          },
        },
        valueString: 'bilan',
      },
      {
        id: 'Observation/0001/_history/1',
        code: 'INVES',
        category: 'exam',
        valueString: 'autre',
      },
      {
        id: 'Observation/660115/_history/1',
        code: 'OBSG',
        category: 'procedure',
        interpretation: {
          coding: {
            code: 'A',
          },
        },
        valueString: 'obs général',
      },
      {
        id: 'Observation/660116/_history/1',
        code: 'INDIC',
        category: 'procedure',
        interpretation: {
          coding: {
            code: 'A',
          },
        },
        valueString: 'indication',
      },
    ];

    const expected = [
      {
        id: 'Observation/0001/_history/1',
        code: 'BMET',
        category: 'procedure',
        interpretation: {
          coding: {
            code: 'A',
          },
        },
        valueString: 'bilan',
      },
      {
        id: 'Observation/660115/_history/1',
        code: 'OBSG',
        category: 'procedure',
        interpretation: {
          coding: {
            code: 'A',
          },
        },
        valueString: 'obs général',
      },
      {
        id: 'Observation/660116/_history/1',
        code: 'INDIC',
        category: 'procedure',
        interpretation: {
          coding: {
            code: 'A',
          },
        },
        valueString: 'indication',
      },
      {
        id: 'Observation/0001/_history/1',
        code: 'INVES',
        category: 'exam',
        valueString: 'autre',
      },
    ];
    expect(moveOtherParaclinique(paraclinique)).toMatchObject(expected);
  });
});
