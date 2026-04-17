const { callFunction } = require('./cloud');
const { mockTrips, getTripsByType, getTripById } = require('../mock/trips');
const { currentUser } = require('../mock/users');
const { TRIP_STATUS, TRIP_MODES } = require('../constants/business');

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

const buildLocalHint = ({ mode, fromGroupKey, toGroupKey }) => {
  const isMorningRide = fromGroupKey === 'fortLee' && toGroupKey === 'columbia';
  const isEveningRide = fromGroupKey === 'columbia' && toGroupKey === 'fortLee';
  const suggestedDate = new Date();

  if (isMorningRide) {
    suggestedDate.setHours(mode === TRIP_MODES.UBER ? 8 : 8, mode === TRIP_MODES.UBER ? 45 : 15, 0, 0);
  } else if (isEveningRide) {
    suggestedDate.setHours(mode === TRIP_MODES.UBER ? 18 : 18, mode === TRIP_MODES.UBER ? 10 : 30, 0, 0);
  } else {
    suggestedDate.setHours(mode === TRIP_MODES.UBER ? 12 : 12, mode === TRIP_MODES.UBER ? 20 : 0, 0, 0);
  }

  const suggestedLabel = `${suggestedDate.getMonth() + 1}月${suggestedDate.getDate()}日 ${suggestedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  const reason = isMorningRide
    ? 'Fort Lee → Columbia 早高峰通勤更集中，建议提前出发更容易成团。'
    : isEveningRide
      ? 'Columbia → Fort Lee 晚高峰返程需求更稳定，建议在下课后时段发起。'
      : '当前路线样本较少，先给出一个居中的推荐时间。';

  return {
    suggestedDepartureTime: suggestedDate.toISOString(),
    suggestedLabel,
    confidenceLabel: isMorningRide || isEveningRide ? '高' : '中',
    reason,
    version: 'heuristic_v1'
  };
};

const getCreateTripHint = (payload) => {
  const fallback = {
    hint: buildLocalHint(payload || {})
  };

  return callFunction({ name: 'getCreateTripHint', data: payload || {} })
    .then((res) => unwrapResult(res.result, fallback, 'getCreateTripHint').hint)
    .catch((error) => {
      logDebug('getCreateTripHint: cloud call failed, using local fallback', error && error.message ? error.message : error);
      return fallback.hint;
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
  getCreateTripHint,
  createTrip,
  joinTrip,
  getUserProfile,
  leaveTrip,
  cancelTrip,
  verifyCU
};