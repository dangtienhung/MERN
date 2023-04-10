export const useFormatCurrent = (current: number) => {
  const formattedNumber = current
    .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    .replace('₫', '')
    .replace(',', '.');
  return formattedNumber;
};
