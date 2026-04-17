const { LOCATIONS } = require('../constants/locations');
const { PAYMENT_METHODS, TRIP_MODES } = require('../constants/business');

const isValidGroup = (groupKey) => Object.prototype.hasOwnProperty.call(LOCATIONS, groupKey);

const normalizePlaceId = (groupKey, placeValue) => {
  if (!isValidGroup(groupKey) || !placeValue) {
    return null;
  }

  const places = LOCATIONS[groupKey].places;
  const matchById = places.find((place) => place.id === placeValue);
  if (matchById) {
    return matchById.id;
  }

  const matchByName = places.find((place) => place.name === placeValue);
  return matchByName ? matchByName.id : null;
};

const isValidPlace = (groupKey, placeValue) => {
  return Boolean(normalizePlaceId(groupKey, placeValue));
};

const validateCreateTrip = (payload = {}) => {
  const errors = [];
  if (![TRIP_MODES.RIDE, TRIP_MODES.UBER].includes(payload.mode)) {
    errors.push('invalid_mode');
  }
  if (!isValidPlace(payload.fromGroupKey, payload.fromPlace || payload.fromLabel)) {
    errors.push('invalid_from_place');
  }
  if (!isValidPlace(payload.toGroupKey, payload.toPlace || payload.toLabel)) {
    errors.push('invalid_to_place');
  }
  if (payload.fromGroupKey === payload.toGroupKey && normalizePlaceId(payload.fromGroupKey, payload.fromPlace || payload.fromLabel) === normalizePlaceId(payload.toGroupKey, payload.toPlace || payload.toLabel)) {
    errors.push('same_route');
  }
  if (![1, 2, 3, 4].includes(Number(payload.seatCount))) {
    errors.push('invalid_seat_count');
  }
  return errors;
};

const validateJoinTrip = ({ paymentMethod }) => {
  const errors = [];
  if (!PAYMENT_METHODS.includes(paymentMethod)) {
    errors.push('invalid_payment_method');
  }
  return errors;
};

const validateCreateTripHint = (payload = {}) => {
  const errors = [];
  if (payload.mode && ![TRIP_MODES.RIDE, TRIP_MODES.UBER].includes(payload.mode)) {
    errors.push('invalid_mode');
  }
  if (payload.fromGroupKey && !isValidGroup(payload.fromGroupKey)) {
    errors.push('invalid_from_group');
  }
  if (payload.toGroupKey && !isValidGroup(payload.toGroupKey)) {
    errors.push('invalid_to_group');
  }
  return errors;
};

module.exports = {
  normalizePlaceId,
  validateCreateTrip,
  validateJoinTrip,
  validateCreateTripHint
};