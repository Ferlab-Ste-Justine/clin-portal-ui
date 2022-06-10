import { UNKNOWN_TAG } from '../constants';
import {
  appendBearerIfToken,
  formatLocus,
  formatTimestampToISODate,
  getPatientPosition,
  toExponentialNotation,
  toKebabCase,
} from '../helper';

describe('Utils: Helper', () => {
  describe(`Function: ${toExponentialNotation.name}`, () => {
    test('Should return an exponential notation', () => {
      const numberCandidate: number = 123456789;
      const fractionDigits: number = 3;
      expect(toExponentialNotation(numberCandidate, fractionDigits)).toEqual('1.235e+8');
    });

    test('Should return an exponential notation without fractionDigits', () => {
      const numberCandidate: number = 123456789;
      expect(toExponentialNotation(numberCandidate)).toEqual('1.23e+8');
    });

    test('Should return 0 for numberCandidate = 0', () => {
      const numberCandidate: number = 0;
      expect(toExponentialNotation(numberCandidate)).toEqual(0);
    });
  });

  describe(`Function: ${appendBearerIfToken.name}`, () => {
    test('Should return token appended to Bearer', () => {
      expect(appendBearerIfToken('TestToken')).toEqual('Bearer TestToken');
    });

    test('Should return empty string if empty token', () => {
      expect(appendBearerIfToken('')).toEqual('');
    });

    test('Should return empty string if undefined token', () => {
      expect(appendBearerIfToken(undefined)).toEqual('');
    });

    test('Should return empty string if no token', () => {
      expect(appendBearerIfToken()).toEqual('');
    });
  });

  describe(`Function: ${toKebabCase.name}`, () => {
    test('Should return the input digits', () => {
      expect(toKebabCase('0123')).toEqual('0123');
    });

    test('Should return the lower case input characters', () => {
      expect(toKebabCase('TEST')).toEqual('test');
    });

    test('Should return a dash combination of digits and characters', () => {
      expect(toKebabCase('0123-TEST')).toEqual('0123-test');
    });

    test('Should return a multiple dash combinations of digits and characters', () => {
      expect(toKebabCase('TEST-0123-456-TEST')).toEqual('test-0123-456-test');
    });

    test('Should return input empty string', () => {
      expect(toKebabCase('')).toEqual('');
    });

    test('Should ignore special characters', () => {
      expect(toKebabCase('TEST-*&?%$!()')).toEqual('test');
    });

    test('Should return empty string for only dash input', () => {
      expect(toKebabCase('-')).toEqual('');
    });
  });

  describe(`Function: ${formatTimestampToISODate.name}`, () => {
    test('Should return a date', () => {
      expect(formatTimestampToISODate(1650000000000 as number)).toEqual('2022-04-15');
    });
  });

  describe(`Function: ${getPatientPosition.name}`, () => {
    test('Should return proband (male)', () => {
      expect(getPatientPosition('male', 'proband')).toEqual('proband');
    });

    test('Should return proband (female)', () => {
      expect(getPatientPosition('female', 'proband')).toEqual('proband');
    });

    test('Should return father', () => {
      expect(getPatientPosition('male', 'parent')).toEqual('father');
    });

    test('Should return mother', () => {
      expect(getPatientPosition('female', 'parent')).toEqual('mother');
    });

    test('Should return proband (unknown gender)', () => {
      expect(getPatientPosition(UNKNOWN_TAG, 'proband')).toEqual('proband');
    });

    test('Should return parent (unknown gender)', () => {
      expect(getPatientPosition(UNKNOWN_TAG, 'parent')).toEqual('parent');
    });

    test('Should return UNKNOWN_TAG (unknown position)', () => {
      expect(getPatientPosition('male', UNKNOWN_TAG)).toEqual(UNKNOWN_TAG);
    });

    test('Should return UNKNOWN_TAG (unknown gender and position)', () => {
      expect(getPatientPosition(UNKNOWN_TAG, UNKNOWN_TAG)).toEqual(UNKNOWN_TAG);
    });

    test('Should return proband (empty gender)', () => {
      expect(getPatientPosition('', 'proband')).toEqual('proband');
    });

    test('Should return UNKNOWN_TAG (empty position)', () => {
      expect(getPatientPosition('male', '')).toEqual(UNKNOWN_TAG);
    });
  });

  describe(`Function: ${formatLocus.name}`, () => {
    test('Should return a valid format locus', () => {
      const start: number = 1;
      const bound: number = 1;
      expect(formatLocus(start, 'TEST', bound)).toEqual('chrTEST:0-2');
    });

    test('Should return a valid format locus (without bound)', () => {
      const start: number = 1;
      expect(formatLocus(start, 'TEST')).toEqual('chrTEST:1');
    });

    test('Should return a valid format locus (bound = 0)', () => {
      const start: number = 1;
      const bound: number = 0;
      expect(formatLocus(start, 'TEST')).toEqual('chrTEST:1');
    });

    test('Should return a valid format locus (undefined bound)', () => {
      const start: number = 1;
      expect(formatLocus(start, 'TEST', undefined)).toEqual('chrTEST:1');
    });

    test('Should return a valid format locus (negative start and bound)', () => {
      const start: number = -2;
      const bound: number = -1;
      expect(formatLocus(start, 'TEST', bound)).toEqual('chrTEST:-1--3');
    });

    test('Should return a valid format locus (empty chromosome)', () => {
      const start: number = 1;
      const bound: number = 1;
      expect(formatLocus(start, '', bound)).toEqual('chr:0-2');
    });
  });
});
