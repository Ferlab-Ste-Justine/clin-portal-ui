const regex = new RegExp(`\\B(?=(\\d{3})+(?!\\d))`, 'g');

export const formatNumber = (number: string | number) => {
  const stringNumber = number.toString();
  return stringNumber.replace(regex, ' ');
};

export const formatDnaLength = (number: string | number, fractionDigits: number = 2) => {
  const num = Number(number);
  if (num < 1000) return num.toFixed(fractionDigits) + ' b';
  if (num < 1000000) return (num / 1000).toFixed(fractionDigits) + ' Kb';
  if (num < 1000000000) return (num / 1000000).toFixed(fractionDigits) + ' Mb';
  return (num / 1000000000).toFixed(fractionDigits) + ' Gb';
};
