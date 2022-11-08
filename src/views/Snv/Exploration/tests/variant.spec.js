import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import { getAcmgRuleContent, getVariantColumns } from '../variantColumns';

describe('variant: table', () => {
  test('GnomaAD colonne Should look like this', () => {
    const expected = {
      key: 'external_frequencies',
      title: 'gnomAD ',
      tooltip: 'gnomAD Génomes 2.1.1',
      dataIndex: 'external_frequencies',
    };
    const gnomADVariant = getVariantColumns().find((v) => v.key === 'external_frequencies');
    expect(gnomADVariant).toMatchObject(expected);
  });

  describe('Column', () => {
    let varsome;

    beforeEach(() => {
      varsome = {
        acmg: {
          classifications: {
            hits: {
              edges: [],
            },
          },
        },
      };
    });

    describe('getAcmgRuleContent', () => {
      test('should return empty template if no varsome ', () => {
        const results = getAcmgRuleContent(null);
        expect(results).toEqual(TABLE_EMPTY_PLACE_HOLDER);
      });

      test('should return formatted classification name', () => {
        varsome.acmg.classifications.hits.edges.push({
          node: { name: 'test' },
        });

        const results = getAcmgRuleContent(varsome);
        expect(results).toEqual(`test`);
      });

      test('should return formatted classification name concateneted when many edges resutls', () => {
        varsome.acmg.classifications.hits.edges.push({
          node: { name: 'name' },
        });
        varsome.acmg.classifications.hits.edges.push({
          node: { name: 'name2' },
        });
        varsome.acmg.classifications.hits.edges.push({
          node: { name: 'name3' },
        });

        const results = getAcmgRuleContent(varsome);
        expect(results).toEqual(`name, name2, name3`);
      });
    });

    test('should return empty default when there is a varsome but no classification', () => {
      // reduce crash when there is no default and an empty array
      const results = getAcmgRuleContent(varsome);
      expect(results).toEqual(TABLE_EMPTY_PLACE_HOLDER);
    });
  });
});
