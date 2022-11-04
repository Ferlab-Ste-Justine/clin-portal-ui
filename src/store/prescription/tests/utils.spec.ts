import { cleanAnalysisData } from '../utils';

describe('cleanAnalysisData', () => {
  test('Should remove NA from sign', () => {
    const payload = {
      clinical_signs: {
        signs: [
          {
            is_observed: 'NA',
          },
          {
            is_observed: true,
          },
          {
            is_observed: false,
          },
        ],
      },
      mother: {
        signs: [
          {
            is_observed: 'NA',
          },
          {
            is_observed: false,
          },
        ],
      },
      father: {
        signs: [
          {
            is_observed: 'NA',
          },
          {
            is_observed: true,
          },
        ],
      },
    };

    const expected = {
      clinical_signs: {
        signs: [
          {
            is_observed: true,
          },
          {
            is_observed: false,
          },
        ],
      },
      mother: {
        signs: [
          {
            is_observed: false,
          },
        ],
      },
      father: {
        signs: [
          {
            is_observed: true,
          },
        ],
      },
    };

    expect(cleanAnalysisData(payload)).toEqual(expected);
  });
});
