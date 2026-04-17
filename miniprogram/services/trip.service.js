const { callFunction } = require('./cloud');
const { mockTrips, getTripsByType, getTripById } = require('../mock/trips');
const { currentUser } = require('../mock/users');
const { TRIP_STATUS } = require('../constants/business');

const DEBUG_PREFIX = '[trip.service]';

const logDebug = (message, extra) => {
  console.info(`${DEBUG_PREFIX} ${message}`, extra || '');
};

const unwrapResult = (result, fallback, label) => {
  if (result && result.success !== false) {
    logDebug(`${label}: using cloud result`);
    return result;
  }

  logDebug(`${label}: cloud returned unsuccessful result, using fallback`, result);
  return fallback;
};

const getTrips = ({ type } = {}) => {
  return callFunction({ name: 'getTrips', data: { type } })
    .then((res) => unwrapResult(res.result, { trips: getTripsByType(type) }, 'getTrips').trips)
    .catch((error) => {
      logDebug('getTrips: cloud call failed, using mock fallback', error && error.message ? error.message : error);
      return getTripsByType(type);
    });
};

const getTripDetail = ({ tripId }) => {
  return callFunction({ name: 'getTripDetail', data: { tripId } })
    .then((res) => unwrapResult(res.result, { trip: getTripById(tripId) }, 'getTripDetail').trip)
    .catch((error) => {
      logDebug('getTripDetail: cloud call failed, using mock fallback', error && error.message ? error.message : error);
      return getTripById(tripId);
    });
};

const getMyTrips = () => {
  const activeTrips = mockTrips.filter((trip) => [TRIP_STATUS.OPEN, TRIP_STATUS.FULL, TRIP_STATUS.DEPARTED].includes(trip.status));
  const historyTrips = mockTrips.filter((trip) => [TRIP_STATUS.COMPLETED, TRIP_STATUS.CANCELLED].includes(trip.status));
  const fallback = {
    profile: currentUser,
    activeTrips: activeTrips.map((trip) => getTripById(trip.tripId)),
    historyTrips: historyTrips.map((trip) => getTripById(trip.tripId))
  };

  return callFunction({ name: 'getMyTrips' })
    .then((res) => unwrapResult(res.result, fallback, 'getMyTrips'))
    .catch((error) => {
      logDebug('getMyTrips: cloud call failed, using mock fallback', error && error.message ? error.message : error);
      return fallback;
    });
};

const createTrip = (payload) => {
  return callFunction({ name: 'createTrip', data: payload })
    .then((res) => unwrapResult(res.result, { success: true, tripId: `trip_${Date.now()}`, payload }, 'createTrip'))
    .catch((error) => {
      logDebug('createTrip: cloud call failed, using local fallback result', error && error.message ? error.message : error);
      return {
        success: true,
        tripId: `trip_${Date.now()}`,
        payload
      };
    });
};

const joinTrip = ({ tripId, paymentMethod }) => {
  return callFunction({ name: 'joinTrip', data: { tripId, paymentMethod } })
    .then((res) => unwrapResult(res.result, { success: true, tripId, paymentMethod }, 'joinTrip'))
    .catch((error) => {
      logDebug('joinTrip: cloud call failed, using local fallback result', error && error.message ? error.message : error);
      return {
        success: true,
        tripId,
        paymentMethod
      };
    });
};

const getUserProfile = () => {
  return callFunction({ name: 'getUserProfile' })
    .then((res) => unwrapResult(res.result, { profile: currentUser }, 'getUserProfile').profile)
    .catch((error) => {
      logDebug('getUserProfile: cloud call failed, using mock fallback', error && error.message ? error.message : error);
      return currentUser;
    });
};

const leaveTrip = ({ tripId }) => {
  return callFunction({ name: 'leaveTrip', data: { tripId } })
    .then((res) => unwrapResult(res.result, { success: true, tripId }, 'leaveTrip'))
    .catch((error) => {
      logDebug('leaveTrip: cloud call failed, using local fallback result', error && error.message ? error.message : error);
      return { success: true, tripId };
    });
};

const cancelTrip = ({ tripId }) => {
  return callFunction({ name: 'cancelTrip', data: { tripId } })
    .then((res) => unwrapResult(res.result, { success: true, tripId }, 'cancelTrip'))
    .catch((error) => {
      logDebug('cancelTrip: cloud call failed, using local fallback result', error && error.message ? error.message : error);
      return { success: true, tripId };
    });
};

const verifyCU = (payload) => {
  return callFunction({ name: 'verifyCU', data: payload })
    .then((res) => unwrapResult(res.result, { success: true }, 'verifyCU'))
    .catch((error) => {
      logDebug('verifyCU: cloud call failed, using local fallback result', error && error.message ? error.message : error);
      return { success: true };
    });
};

module.exports = {
  getTrips,
  getTripDetail,
  getMyTrips,
  createTrip,
  joinTrip,
  getUserProfile,
  leaveTrip,
  cancelTrip,
  verifyCU
};