/**
 * Format a number to a shor variant, for example 1000 to 1k,
 * 1200000 to 1.2M and so on.
 *
 * @param num {number} Number to be formatted
 * @param decimals {number} How many decimals formatted number should have
 */
export const numberFormatter = (num: number, decimals = 1): string => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((item) => {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(decimals).replace(rx, '$1') + item.symbol
    : '0';
};
