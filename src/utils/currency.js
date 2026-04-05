export const EXCHANGE_RATES = {
  INR: 1,
  USD: 1 / 83,
  EUR: 1 / 90,
  GBP: 1 / 105,
  JPY: 1 / 0.55,
  AED: 1 / 22.6,
  CAD: 1 / 61,
  AUD: 1 / 54
};

export const CURRENCY_SYMBOLS = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AED: 'د.إ',
  CAD: '$',
  AUD: '$'
};

/**
 * Converts an amount from INR to the target currency
 * @param {number} amountInInr 
 * @param {string} targetCurrency 
 * @returns {number}
 */
export const convertFromInr = (amountInInr, targetCurrency) => {
  const rate = EXCHANGE_RATES[targetCurrency] || 1;
  return amountInInr * rate;
};

/**
 * Converts an amount from target currency to INR
 * @param {number} amount 
 * @param {string} fromCurrency 
 * @returns {number}
 */
export const convertToInr = (amount, fromCurrency) => {
  const rate = EXCHANGE_RATES[fromCurrency] || 1;
  return amount / rate;
};

/**
 * Formats a currency value based on the currency code
 * @param {number} value 
 * @param {string} currencyCode 
 * @returns {string}
 */
export const formatCurrency = (value, currencyCode) => {
  return new Intl.NumberFormat(currencyCode === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0
  }).format(value);
};
