import { TABLE_EMPTY_PLACE_HOLDER } from '../utils/constants';

export {};
declare global {
  interface Number {
    thousandFormat: (separator?: string) => string;
    toPercentSignificative: (digits?: number) => string;
  }
}

Number.prototype.thousandFormat = function (separator = ' '): string {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

Number.prototype.toPercentSignificative = function (digits = 2): string {
  try {
    const value = this as number;
    if (value * 100 < 1) return '< 1%';
    return (value * 100).toFixed(digits).toString().split('.00')[0] + '%';
  } catch (error) {
    return TABLE_EMPTY_PLACE_HOLDER;
  }
};
