import * as formattingMod from '@ferlab/ui/core/data/arranger/formatting';

import { keyEnhanceBooleanOnlyExcept } from '../Filters';

describe('Filters', () => {
  describe('keyEnhanceBooleanOnlyExcept', () => {
    test('Should only set True or False for boolean content', () => {
      expect(keyEnhanceBooleanOnlyExcept('', 'true', 'boolean')).toEqual('True');
      expect(keyEnhanceBooleanOnlyExcept('', 'false', 'boolean')).toEqual('False');
    });

    test('Should not interpret 0 or 1 value as boolean', () => {
      expect(keyEnhanceBooleanOnlyExcept('', '1')).toEqual('1');
      expect(keyEnhanceBooleanOnlyExcept('', '0')).toEqual('0');
    });

    test('should not call keyEnhance when field is chromosome', () => {
      const spy = jest.spyOn(formattingMod, 'keyEnhance').mockReturnValue('1');
      expect(keyEnhanceBooleanOnlyExcept('chromosome', '1')).toEqual('1');
      expect(spy).not.toHaveBeenCalled();
    });

    test('should call keyEnhance when field anything but chromosome', () => {
      const spy = jest.spyOn(formattingMod, 'keyEnhance').mockReturnValue('1');
      expect(keyEnhanceBooleanOnlyExcept('somethingelse', '1')).toEqual('1');
      expect(spy).toHaveBeenCalled();
    });
  });
});
