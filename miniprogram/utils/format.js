const { TRIP_MODES } = require('../constants/business');

const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return `$${amount.toFixed(2)}`;
};

const formatCompactCurrency = (value) => {
  const amount = Number(value || 0);
  return `$${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;
};

const getTripModeLabel = (mode) => {
  if (mode === TRIP_MODES.UBER) {
    return 'Uber拼单';
  }

  return '顺风车';
};

const getTripModeTagClass = (mode) => {
  return mode === TRIP_MODES.UBER ? 'tag tag--uber' : 'tag tag--ride';
};

module.exports = {
  formatCurrency,
  formatCompactCurrency,
  getTripModeLabel,
  getTripModeTagClass
};