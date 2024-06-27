import {
  commonPrescriptionFilterFields,
  getPrescriptionStatusDictionnary,
  prescriptionPriorityDictionnary,
} from '../constant';

describe('getPrescriptionStatusDictionnary', () => {
  test('should be robust', () => {
    expect(getPrescriptionStatusDictionnary()).toBeDefined();
  });
});

describe('prescriptionPriorityDictionnary', () => {
  test('should be robust', () => {
    expect(prescriptionPriorityDictionnary()).toBeDefined();
  });
});

describe('commonPrescriptionFilterFields', () => {
  test('should be robust', () => {
    expect(commonPrescriptionFilterFields.length).toEqual(9);
  });
});
