const TRIP_MODES = {
  RIDE: 'ride',
  UBER: 'uber'
};

const TRIP_STATUS = {
  OPEN: 'open',
  FULL: 'full',
  DEPARTED: 'departed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

const PARTICIPANT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled'
};

const PAYMENT_METHODS = ['zelle', 'venmo'];
const PASSENGER_FEE = 8;
const GWB_TOLL = 23.3;

module.exports = {
  TRIP_MODES,
  TRIP_STATUS,
  PARTICIPANT_STATUS,
  PAYMENT_METHODS,
  PASSENGER_FEE,
  GWB_TOLL
};